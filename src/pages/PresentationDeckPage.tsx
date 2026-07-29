import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Grid3X3,
  Maximize,
  Minimize,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  buildPresentationDeck,
  getPresentationNeighbors,
  type PresentationSlide,
} from "@/lib/presentationSlides"

function exampleHasContext(slide: Extract<PresentationSlide, { kind: "example" }>) {
  return Boolean(slide.learners || slide.competency || slide.aiRole)
}

function CopyFullPromptButton({ fullPrompt }: { fullPrompt: string }) {
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current)
    }
  }, [])

  const handleCopy = async (event: MouseEvent) => {
    // Keep deck advance/retreat tap zones from stealing the click.
    event.preventDefault()
    event.stopPropagation()
    try {
      await navigator.clipboard.writeText(fullPrompt)
      setCopied(true)
      if (resetTimer.current) clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for restricted clipboard environments.
      try {
        const ta = document.createElement("textarea")
        ta.value = fullPrompt
        ta.setAttribute("readonly", "")
        ta.style.position = "fixed"
        ta.style.left = "-9999px"
        document.body.appendChild(ta)
        ta.select()
        document.execCommand("copy")
        document.body.removeChild(ta)
        setCopied(true)
        if (resetTimer.current) clearTimeout(resetTimer.current)
        resetTimer.current = setTimeout(() => setCopied(false), 2000)
      } catch {
        // Ignore; user can still select text manually.
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      onPointerDown={(e) => e.stopPropagation()}
      className={cn(
        "pointer-events-auto relative z-30 inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg border-2 px-3.5 py-2 text-base font-semibold transition-colors sm:min-h-[48px] sm:px-4 sm:text-lg",
        copied
          ? "border-foreground bg-foreground text-background"
          : "border-foreground/20 bg-background text-foreground hover:bg-muted"
      )}
      aria-label={
        copied
          ? "Full prompt copied to clipboard"
          : "Copy full prompt to clipboard"
      }
    >
      {copied ? (
        <>
          <Check className="h-5 w-5" aria-hidden />
          Copied full prompt
        </>
      ) : (
        <>
          <Copy className="h-5 w-5" aria-hidden />
          Copy full prompt
        </>
      )}
    </button>
  )
}

/** How many progressive reveal steps a slide has after the base chrome. */
function getRevealCount(slide: PresentationSlide): number {
  switch (slide.kind) {
    case "title":
      return 2 // subtitle, then meta
    case "overview": {
      const bodyStep = slide.body.trim() ? 1 : 0
      return bodyStep + (slide.bullets?.length ?? 0)
    }
    case "section":
      return slide.description ? 1 : 0
    case "bullets":
      return slide.bullets.length + (slide.footer ? 1 : 0)
    case "numbered":
      return slide.items.length
    case "example": {
      // Only sections present on this (possibly continued) slide.
      const context = exampleHasContext(slide) ? 1 : 0
      const materials = slide.materials.length > 0 ? 1 : 0
      return context + slide.howItWorks.length + materials
    }
    case "prompt":
      return 1
    case "two-column":
      return slide.left.length + slide.right.length
    case "closing":
      return slide.bullets.length + (slide.nextTitle ? 1 : 0)
    default:
      return 0
  }
}

function Fragment({
  show,
  children,
  className,
  as: Tag = "div",
}: {
  show: boolean
  children: ReactNode
  className?: string
  as?: "div" | "li" | "p" | "ol" | "ul"
}) {
  if (!show) return null
  return (
    <Tag className={cn("deck-fragment-enter", className)}>{children}</Tag>
  )
}

/** Section label — large enough to read from the back of a room. */
function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/55 sm:mb-4 sm:text-base md:text-lg">
      {children}
    </p>
  )
}

/** Content slide title — projector scale. */
function SlideTitle({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn(
        "text-balance text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]",
        className
      )}
    >
      {children}
    </h2>
  )
}

function SlideView({
  slide,
  index,
  total,
  deckTitle,
  revealStep,
  transitionDir,
  isFullscreen,
}: {
  slide: PresentationSlide
  index: number
  total: number
  deckTitle: string
  revealStep: number
  transitionDir: "forward" | "back"
  isFullscreen: boolean
}) {
  const shown = (step: number) => revealStep >= step

  return (
    <article
      key={`${slide.id}-${transitionDir}`}
      className={cn(
        "absolute inset-0 flex flex-col overflow-hidden border border-border/70 bg-background text-foreground shadow-sm",
        isFullscreen
          ? "rounded-none border-0 shadow-none"
          : "rounded-none sm:rounded-2xl",
        transitionDir === "forward"
          ? "deck-slide-enter-forward"
          : "deck-slide-enter-back"
      )}
      aria-roledescription="slide"
      aria-label={`Slide ${index + 1} of ${total}: ${
        "title" in slide ? slide.title : deckTitle
      }`}
    >
      {/* Thick progress rail — readable at a glance from distance */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1.5 bg-foreground/10 sm:h-2">
        <div
          className="h-full bg-foreground transition-[width] duration-300 ease-out"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      {/* Left accent edge — anchors the slide visually on a projector */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1.5 bg-foreground sm:w-2"
        aria-hidden
      />

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          /* Extra left padding clears the accent rail and keeps type away from the edge. */
          isFullscreen
            ? "py-8 pl-10 pr-8 sm:py-12 sm:pl-14 sm:pr-12 md:py-16 md:pl-16 md:pr-16 lg:py-20 lg:pl-20 lg:pr-20"
            : "py-6 pl-8 pr-6 sm:py-10 sm:pl-12 sm:pr-10 md:py-12 md:pl-14 md:pr-12 lg:py-16 lg:pl-16 lg:pr-16"
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          {slide.kind === "title" && (
            <div className="flex min-h-0 flex-1 flex-col justify-between gap-10">
              <div className="min-h-0 overflow-y-auto">
                {/* Full training title — sentence case for readability (not uppercase kicker). */}
                <p className="mb-4 max-w-5xl text-base font-semibold leading-snug text-foreground/55 sm:mb-5 sm:text-lg md:text-xl md:leading-snug">
                  {slide.kicker}
                </p>
                <h1 className="max-w-6xl text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  {slide.title}
                </h1>
                <Fragment show={shown(1)}>
                  <p className="mt-6 max-w-4xl text-xl leading-snug text-foreground/75 sm:mt-8 sm:text-2xl md:text-3xl md:leading-snug">
                    {slide.subtitle}
                  </p>
                </Fragment>
              </div>
              <Fragment show={shown(2)}>
                <div className="grid shrink-0 gap-4 border-t-2 border-foreground/15 pt-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:pt-8">
                  {slide.meta.map((item) => (
                    <div
                      key={item}
                      className="text-base font-medium leading-snug text-foreground/80 sm:text-lg md:text-xl"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </Fragment>
            </div>
          )}

          {slide.kind === "overview" && (
            <div className="flex min-h-0 flex-1 flex-col gap-6 md:gap-8">
              <header className="shrink-0">
                <Kicker>Overview</Kicker>
                <SlideTitle>{slide.title}</SlideTitle>
              </header>
              {slide.body.trim() && (
                <Fragment show={shown(1)}>
                  <p className="max-w-5xl shrink-0 text-xl leading-snug text-foreground/75 sm:text-2xl md:text-[1.65rem] md:leading-snug">
                    {slide.body}
                  </p>
                </Fragment>
              )}
              {slide.bullets && slide.bullets.length > 0 && (
                <ol className="grid min-h-0 flex-1 content-start gap-3 overflow-y-auto sm:grid-cols-2 sm:gap-4">
                  {slide.bullets.map((item, i) => {
                    const revealAt = (slide.body.trim() ? 2 : 1) + i
                    const number = (slide.bulletsStart ?? 0) + i + 1
                    return (
                      <Fragment
                        key={`${number}-${item}`}
                        show={shown(revealAt)}
                        as="li"
                        className="list-none"
                      >
                        <div className="flex h-full gap-4 rounded-2xl border-2 border-foreground/10 bg-muted/30 px-4 py-4 sm:px-5 sm:py-5">
                          <span className="shrink-0 font-mono text-lg font-bold tabular-nums text-foreground/40 sm:text-xl md:text-2xl">
                            {String(number).padStart(2, "0")}
                          </span>
                          <span className="text-lg font-medium leading-snug sm:text-xl md:text-2xl">
                            {item}
                          </span>
                        </div>
                      </Fragment>
                    )
                  })}
                </ol>
              )}
            </div>
          )}

          {slide.kind === "section" && (
            <div className="flex min-h-0 flex-1 flex-col justify-center">
              <Kicker>{slide.kicker}</Kicker>
              <h2 className="max-w-5xl text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {slide.title}
              </h2>
              {slide.description && (
                <Fragment show={shown(1)}>
                  <p className="mt-6 max-w-4xl text-xl leading-snug text-foreground/75 sm:mt-8 sm:text-2xl md:text-3xl md:leading-snug">
                    {slide.description}
                  </p>
                </Fragment>
              )}
            </div>
          )}

          {slide.kind === "bullets" && (
            <div className="flex min-h-0 flex-1 flex-col">
              <header className="mb-6 shrink-0 sm:mb-8 md:mb-10">
                {slide.kicker && <Kicker>{slide.kicker}</Kicker>}
                <SlideTitle>{slide.title}</SlideTitle>
              </header>
              <ul className="min-h-0 flex-1 space-y-5 overflow-y-auto pr-1 sm:space-y-6 md:space-y-7">
                {slide.bullets.map((bullet, i) => (
                  <Fragment key={bullet} show={shown(i + 1)} as="li">
                    <div className="flex gap-4 sm:gap-5">
                      <span
                        className="mt-2.5 h-3 w-3 shrink-0 rounded-full bg-foreground sm:mt-3 sm:h-3.5 sm:w-3.5"
                        aria-hidden
                      />
                      <span className="text-xl font-medium leading-snug sm:text-2xl md:text-[1.75rem] md:leading-snug lg:text-3xl lg:leading-snug">
                        {bullet}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </ul>
              {slide.footer && (
                <Fragment show={shown(slide.bullets.length + 1)}>
                  <p className="mt-6 shrink-0 border-t-2 border-foreground/15 pt-5 text-lg font-medium leading-snug text-foreground/70 sm:mt-8 sm:pt-6 sm:text-xl md:text-2xl">
                    {slide.footer}
                  </p>
                </Fragment>
              )}
            </div>
          )}

          {slide.kind === "numbered" && (
            <div className="flex min-h-0 flex-1 flex-col">
              <header className="mb-6 shrink-0 sm:mb-8 md:mb-10">
                {slide.kicker && <Kicker>{slide.kicker}</Kicker>}
                <SlideTitle>{slide.title}</SlideTitle>
              </header>
              <ol className="min-h-0 flex-1 space-y-6 overflow-y-auto pr-1 sm:space-y-7">
                {slide.items.map((item, i) => (
                  <Fragment key={item.label} show={shown(i + 1)} as="li">
                    <div className="flex gap-4 sm:gap-6">
                      <span className="w-12 shrink-0 font-mono text-2xl font-bold tabular-nums text-foreground/35 sm:w-14 sm:text-3xl md:text-4xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p className="text-xl font-bold leading-snug sm:text-2xl md:text-3xl">
                          {item.label}
                        </p>
                        <p className="mt-2 text-lg leading-snug text-foreground/70 sm:mt-2.5 sm:text-xl md:text-2xl md:leading-snug">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </ol>
            </div>
          )}

          {slide.kind === "example" && (() => {
            const hasContext = exampleHasContext(slide)
            const hasSteps = slide.howItWorks.length > 0
            const hasMaterials = slide.materials.length > 0
            const stepOffset = slide.howItWorksStart ?? 0
            // Reveal order: context (optional) → each step → materials (optional)
            const contextReveal = hasContext ? 1 : 0
            const materialsReveal =
              contextReveal + slide.howItWorks.length + (hasMaterials ? 1 : 0)

            return (
              <div className="flex min-h-0 flex-1 flex-col gap-5 sm:gap-6">
                <header className="shrink-0">
                  <Kicker>{slide.kicker}</Kicker>
                  <SlideTitle>{slide.title}</SlideTitle>
                  <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-5 sm:gap-3">
                    <span className="rounded-full border-2 border-foreground/20 px-3.5 py-1.5 text-base font-semibold sm:px-4 sm:py-2 sm:text-lg">
                      {slide.subject}
                    </span>
                    <span className="rounded-full border-2 border-foreground/20 px-3.5 py-1.5 text-base font-semibold sm:px-4 sm:py-2 sm:text-lg">
                      {slide.interaction}
                    </span>
                    {slide.gameElements.map((el) => (
                      <span
                        key={el}
                        className="rounded-full bg-muted px-3.5 py-1.5 text-base font-medium text-foreground/70 sm:px-4 sm:py-2 sm:text-lg"
                      >
                        {el}
                      </span>
                    ))}
                  </div>
                </header>

                <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
                  {hasContext && (
                    <Fragment show={shown(1)}>
                      <div className="space-y-4 rounded-2xl border-2 border-foreground/10 p-5 sm:p-6 md:p-7">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground/50 sm:text-base">
                          Learners & competency
                        </p>
                        {slide.learners && (
                          <p className="text-lg leading-snug sm:text-xl md:text-2xl">
                            <span className="font-bold">Learners:</span>{" "}
                            <span className="text-foreground/80">
                              {slide.learners}
                            </span>
                          </p>
                        )}
                        {slide.competency && (
                          <p className="text-lg leading-snug sm:text-xl md:text-2xl">
                            <span className="font-bold">Competency:</span>{" "}
                            <span className="text-foreground/80">
                              {slide.competency}
                            </span>
                          </p>
                        )}
                        {slide.aiRole && (
                          <p className="text-lg leading-snug sm:text-xl md:text-2xl">
                            <span className="font-bold">AI role:</span>{" "}
                            <span className="text-foreground/80">
                              {slide.aiRole}
                            </span>
                          </p>
                        )}
                      </div>
                    </Fragment>
                  )}

                  {hasSteps && (
                    <div className="min-h-0 rounded-2xl border-2 border-foreground/10 p-5 sm:p-6 md:p-7">
                      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-foreground/50 sm:text-base">
                        How it works
                        {stepOffset > 0 ? " · continued" : ""}
                      </p>
                      <ol className="space-y-4 sm:space-y-5">
                        {slide.howItWorks.map((step, i) => (
                          <Fragment
                            key={`${stepOffset + i}-${step}`}
                            show={shown(contextReveal + 1 + i)}
                            as="li"
                          >
                            <div className="flex gap-3.5 sm:gap-4">
                              <span className="shrink-0 font-mono text-lg font-bold tabular-nums text-foreground/40 sm:text-xl md:text-2xl">
                                {String(stepOffset + i + 1).padStart(2, "0")}
                              </span>
                              <span className="text-lg font-medium leading-snug sm:text-xl md:text-2xl md:leading-snug">
                                {step}
                              </span>
                            </div>
                          </Fragment>
                        ))}
                      </ol>
                    </div>
                  )}

                  {hasMaterials && (
                    <Fragment show={shown(materialsReveal)}>
                      <div className="shrink-0 rounded-2xl border-2 border-foreground/10 bg-muted/30 p-5 sm:p-6 md:p-7">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-foreground/50 sm:text-base">
                          Materials
                        </p>
                        <p className="text-lg font-medium leading-snug sm:text-xl md:text-2xl">
                          {slide.materials.join(" · ")}
                        </p>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            )
          })()}

          {slide.kind === "prompt" && (
            <div className="flex min-h-0 flex-1 flex-col">
              <header className="mb-4 shrink-0 sm:mb-5 md:mb-6">
                <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <Kicker>{slide.kicker}</Kicker>
                    <SlideTitle>{slide.title}</SlideTitle>
                    <p className="mt-3 text-xl font-medium leading-snug text-foreground/65 sm:mt-3.5 sm:text-2xl md:text-[1.65rem]">
                      Use for: {slide.useFor}
                    </p>
                  </div>
                  <CopyFullPromptButton fullPrompt={slide.fullPrompt} />
                </div>
              </header>
              <Fragment show={shown(1)} className="min-h-0 flex-1">
                {/* Same body type scale as bullets / takeaways — large enough for the room. */}
                <div className="flex h-full min-h-0 flex-1 overflow-y-auto rounded-2xl border-2 border-foreground/10 bg-muted/35 p-5 sm:p-7 md:p-8 lg:p-10">
                  <p className="whitespace-pre-wrap text-xl font-medium leading-snug text-foreground sm:text-2xl sm:leading-snug md:text-[1.75rem] md:leading-snug lg:text-3xl lg:leading-snug">
                    {slide.prompt}
                  </p>
                </div>
              </Fragment>
            </div>
          )}

          {slide.kind === "two-column" && (
            <div className="flex min-h-0 flex-1 flex-col">
              <header className="mb-6 shrink-0 sm:mb-8">
                {slide.kicker && <Kicker>{slide.kicker}</Kicker>}
                <SlideTitle>{slide.title}</SlideTitle>
              </header>
              <div className="grid min-h-0 flex-1 gap-4 md:grid-cols-2 md:gap-5">
                <div className="overflow-y-auto rounded-2xl border-2 border-foreground/10 p-5 sm:p-6 md:p-7">
                  <p className="mb-4 text-xl font-bold sm:mb-5 sm:text-2xl">
                    {slide.leftTitle}
                  </p>
                  <ul className="space-y-4 sm:space-y-5">
                    {slide.left.map((item, i) => (
                      <Fragment key={item} show={shown(i + 1)} as="li">
                        <div className="flex gap-3.5">
                          <span
                            className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-foreground sm:mt-3 sm:h-3 sm:w-3"
                            aria-hidden
                          />
                          <span className="text-lg font-medium leading-snug sm:text-xl md:text-2xl">
                            {item}
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </ul>
                </div>
                <div className="overflow-y-auto rounded-2xl border-2 border-foreground/10 p-5 sm:p-6 md:p-7">
                  <p className="mb-4 text-xl font-bold sm:mb-5 sm:text-2xl">
                    {slide.rightTitle}
                  </p>
                  <ul className="space-y-4 sm:space-y-5">
                    {slide.right.map((item, i) => (
                      <Fragment
                        key={item}
                        show={shown(slide.left.length + i + 1)}
                        as="li"
                      >
                        <div className="flex gap-3.5">
                          <span
                            className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-foreground sm:mt-3 sm:h-3 sm:w-3"
                            aria-hidden
                          />
                          <span className="text-lg font-medium leading-snug sm:text-xl md:text-2xl">
                            {item}
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {slide.kind === "closing" && (
            <div className="flex min-h-0 flex-1 flex-col justify-between gap-10">
              <div className="min-h-0 overflow-y-auto">
                <Kicker>Wrap-up</Kicker>
                <h2 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                  {slide.title}
                </h2>
                <ul className="mt-8 max-w-5xl space-y-5 sm:mt-10 sm:space-y-6 md:space-y-7">
                  {slide.bullets.map((bullet, i) => (
                    <Fragment key={bullet} show={shown(i + 1)} as="li">
                      <div className="flex gap-4 sm:gap-5">
                        <span
                          className="mt-2.5 h-3 w-3 shrink-0 rounded-full bg-foreground sm:mt-3 sm:h-3.5 sm:w-3.5"
                          aria-hidden
                        />
                        <span className="text-xl font-medium leading-snug sm:text-2xl md:text-[1.75rem] md:leading-snug lg:text-3xl lg:leading-snug">
                          {bullet}
                        </span>
                      </div>
                    </Fragment>
                  ))}
                </ul>
              </div>
              {slide.nextTitle && (
                <Fragment show={shown(slide.bullets.length + 1)}>
                  <div className="shrink-0 rounded-2xl border-2 border-foreground/15 bg-muted/30 px-5 py-5 sm:px-7 sm:py-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground/50 sm:text-base">
                      {slide.nextLabel ?? "Up next"}
                    </p>
                    <p className="mt-2 text-xl font-bold sm:text-2xl md:text-3xl">
                      {slide.nextTitle}
                    </p>
                  </div>
                </Fragment>
              )}
            </div>
          )}
        </div>

        <div className="mt-5 flex shrink-0 items-center justify-between gap-4 border-t-2 border-foreground/10 pt-4 text-sm text-foreground/50 sm:mt-6 sm:pt-5 sm:text-base md:text-lg">
          <span className="truncate font-semibold tracking-tight">
            {deckTitle}
          </span>
          <span className="flex items-center gap-3 font-mono tabular-nums">
            {getRevealCount(slide) > 0 && (
              <span className="hidden text-foreground/40 sm:inline">
                reveal {Math.min(revealStep, getRevealCount(slide))}/
                {getRevealCount(slide)}
              </span>
            )}
            <span className="font-bold text-foreground/70">
              {index + 1} / {total}
            </span>
          </span>
        </div>
      </div>
    </article>
  )
}

export function PresentationDeckPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const deck = useMemo(
    () => (slug ? buildPresentationDeck(slug) : undefined),
    [slug]
  )
  const neighbors = useMemo(
    () =>
      slug
        ? getPresentationNeighbors(slug)
        : { prev: undefined, next: undefined },
    [slug]
  )

  const [index, setIndex] = useState(0)
  const [revealStep, setRevealStep] = useState(0)
  const [transitionDir, setTransitionDir] = useState<"forward" | "back">(
    "forward"
  )
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [chromeVisible, setChromeVisible] = useState(true)
  const shellRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const chromeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setIndex(0)
    setRevealStep(0)
    setTransitionDir("forward")
  }, [slug])

  const bumpChrome = useCallback(() => {
    setChromeVisible(true)
    if (chromeTimer.current) clearTimeout(chromeTimer.current)
    if (isFullscreen) {
      chromeTimer.current = setTimeout(() => setChromeVisible(false), 2800)
    }
  }, [isFullscreen])

  useEffect(() => {
    if (!isFullscreen) {
      setChromeVisible(true)
      if (chromeTimer.current) clearTimeout(chromeTimer.current)
      return
    }
    bumpChrome()
    return () => {
      if (chromeTimer.current) clearTimeout(chromeTimer.current)
    }
  }, [isFullscreen, bumpChrome])

  const total = deck?.slides.length ?? 0
  const currentSlide = deck?.slides[index]
  const revealMax = currentSlide ? getRevealCount(currentSlide) : 0

  const goToSlide = useCallback(
    (
      nextIndex: number,
      options?: { reveal?: "start" | "end"; dir?: "forward" | "back" }
    ) => {
      if (!deck || total === 0) return
      const clamped = Math.max(0, Math.min(total - 1, nextIndex))
      const dir = options?.dir ?? (clamped >= index ? "forward" : "back")
      const target = deck.slides[clamped]
      const max = target ? getRevealCount(target) : 0
      setTransitionDir(dir)
      setIndex(clamped)
      setRevealStep(options?.reveal === "end" ? max : 0)
    },
    [deck, index, total]
  )

  const advance = useCallback(() => {
    if (!deck || !currentSlide) return
    if (revealStep < revealMax) {
      setRevealStep((s) => s + 1)
      return
    }
    if (index < total - 1) {
      goToSlide(index + 1, { reveal: "start", dir: "forward" })
    }
  }, [currentSlide, deck, goToSlide, index, revealMax, revealStep, total])

  const retreat = useCallback(() => {
    if (!deck || !currentSlide) return
    if (revealStep > 0) {
      setRevealStep((s) => s - 1)
      return
    }
    if (index > 0) {
      goToSlide(index - 1, { reveal: "end", dir: "back" })
    }
  }, [currentSlide, deck, goToSlide, index, revealStep])

  const toggleFullscreen = useCallback(async () => {
    const el = shellRef.current
    if (!el) return
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      // Fullscreen may be blocked; ignore.
    }
  }, [])

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return
      }

      bumpChrome()

      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          event.preventDefault()
          advance()
          break
        case "ArrowLeft":
        case "PageUp":
        case "Backspace":
          event.preventDefault()
          retreat()
          break
        case "Home":
          event.preventDefault()
          goToSlide(0, { reveal: "start", dir: "back" })
          break
        case "End":
          event.preventDefault()
          goToSlide(total - 1, { reveal: "end", dir: "forward" })
          break
        case "f":
        case "F":
          event.preventDefault()
          void toggleFullscreen()
          break
        case "Escape":
          if (!document.fullscreenElement) {
            navigate("/presentation")
          }
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [
    advance,
    bumpChrome,
    goToSlide,
    navigate,
    retreat,
    toggleFullscreen,
    total,
  ])

  if (!deck) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Presentation not found
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          No slide deck exists for this session slug.
        </p>
        <Link
          to="/presentation"
          className="inline-flex items-center gap-1.5 text-base font-medium underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          All presentations
        </Link>
      </div>
    )
  }

  const slide = deck.slides[index]
  const canAdvance = index < total - 1 || revealStep < revealMax
  const canRetreat = index > 0 || revealStep > 0

  return (
    <div
      ref={shellRef}
      className={cn(
        "flex h-dvh max-h-dvh flex-col overflow-hidden bg-muted/50 text-foreground",
        isFullscreen && "h-full max-h-full bg-background"
      )}
      onMouseMove={bumpChrome}
      onTouchStart={bumpChrome}
    >
      <header
        className={cn(
          "shrink-0 border-b bg-background/95 backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-background/85",
          isFullscreen &&
            !chromeVisible &&
            "pointer-events-none -translate-y-full opacity-0"
        )}
      >
        <div
          className={cn(
            "flex flex-wrap items-center gap-2 py-2.5 sm:py-3",
            isFullscreen
              ? "px-4 sm:px-6 lg:px-8"
              : "container max-w-7xl"
          )}
        >
          <Link
            to="/presentation"
            className="inline-flex min-h-[44px] items-center gap-1.5 px-1 text-base text-muted-foreground hover:text-foreground"
          >
            <Grid3X3 className="h-5 w-5" />
            <span className="hidden sm:inline">All decks</span>
          </Link>

          <div className="hidden h-5 w-px bg-border sm:block" />

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:text-sm">
              {deck.kindLabel} · {deck.time}
            </p>
            <p className="truncate text-base font-semibold sm:text-lg">
              {deck.shortTitle}
            </p>
          </div>

          <div className="flex items-center gap-1">
            {neighbors.prev && (
              <Link
                to={`/presentation/${neighbors.prev.slug}`}
                className="hidden items-center gap-1 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground md:inline-flex"
                title={neighbors.prev.title}
              >
                <ChevronLeft className="h-4 w-4" />
                Prev deck
              </Link>
            )}
            {neighbors.next && (
              <Link
                to={`/presentation/${neighbors.next.slug}`}
                className="hidden items-center gap-1 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground md:inline-flex"
                title={neighbors.next.title}
              >
                Next deck
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
            <button
              type="button"
              onClick={() => void toggleFullscreen()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-muted"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          isFullscreen
            ? "px-0 py-0"
            : "container max-w-7xl py-3 sm:py-4"
        )}
      >
        <div
          className="relative min-h-0 w-full flex-1 touch-pan-y"
          onTouchStart={(e) => {
            bumpChrome()
            touchStartX.current = e.changedTouches[0]?.clientX ?? null
            touchStartY.current = e.changedTouches[0]?.clientY ?? null
          }}
          onTouchEnd={(e) => {
            const startX = touchStartX.current
            const startY = touchStartY.current
            const endX = e.changedTouches[0]?.clientX
            const endY = e.changedTouches[0]?.clientY
            touchStartX.current = null
            touchStartY.current = null
            if (startX == null || endX == null || startY == null || endY == null)
              return
            const dx = endX - startX
            const dy = endY - startY
            if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return
            if (dx < 0) advance()
            else retreat()
          }}
        >
          <SlideView
            slide={slide}
            index={index}
            total={total}
            deckTitle={deck.shortTitle}
            revealStep={revealStep}
            transitionDir={transitionDir}
            isFullscreen={isFullscreen}
          />

          {/* Tap / click zones — right advances reveal or slide, left retreats.
              Top band is left clear so header controls (e.g. Copy full prompt) stay clickable. */}
          <button
            type="button"
            aria-label="Previous reveal or slide"
            onClick={retreat}
            disabled={!canRetreat}
            className="absolute bottom-0 left-0 top-28 z-20 w-[22%] cursor-w-resize opacity-0 disabled:cursor-default sm:top-32 sm:w-[16%]"
          />
          <button
            type="button"
            aria-label="Next reveal or slide"
            onClick={advance}
            disabled={!canAdvance}
            className="absolute bottom-0 right-0 top-28 z-20 w-[48%] cursor-e-resize opacity-0 disabled:cursor-default sm:top-32 sm:w-[42%]"
          />
        </div>

        <div
          className={cn(
            "flex shrink-0 items-center justify-between gap-3 transition-all duration-300",
            isFullscreen
              ? cn(
                  "absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-background via-background/95 to-transparent px-4 pb-4 pt-10 sm:px-6 sm:pb-5",
                  !chromeVisible &&
                    "pointer-events-none translate-y-4 opacity-0"
                )
              : "mt-3 sm:mt-4"
          )}
        >
          <button
            type="button"
            onClick={retreat}
            disabled={!canRetreat}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border-2 border-foreground/15 bg-background px-4 py-2.5 text-base font-semibold hover:bg-muted disabled:opacity-40"
          >
            <ArrowLeft className="h-5 w-5" />
            Previous
          </button>

          <div className="flex max-w-[45vw] flex-col items-center gap-1.5 sm:max-w-none">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {deck.slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() =>
                    goToSlide(i, {
                      reveal: i < index ? "end" : "start",
                      dir: i >= index ? "forward" : "back",
                    })
                  }
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "h-3 w-3 shrink-0 rounded-full transition-colors sm:h-3.5 sm:w-3.5",
                    i === index
                      ? "bg-foreground"
                      : "bg-foreground/25 hover:bg-foreground/45"
                  )}
                />
              ))}
            </div>
            {revealMax > 0 && !isFullscreen && (
              <p className="hidden text-xs text-muted-foreground sm:block sm:text-sm">
                Space / tap right: reveal next · then next slide
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={advance}
            disabled={!canAdvance}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border-2 border-foreground/15 bg-background px-4 py-2.5 text-base font-semibold hover:bg-muted disabled:opacity-40"
          >
            {revealStep < revealMax ? "Reveal" : "Next"}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
