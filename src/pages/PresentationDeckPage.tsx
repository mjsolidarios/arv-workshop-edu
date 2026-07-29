import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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

/** How many progressive reveal steps a slide has after the base chrome. */
function getRevealCount(slide: PresentationSlide): number {
  switch (slide.kind) {
    case "title":
      return 2 // subtitle, then meta
    case "overview":
      return 1 + (slide.bullets?.length ?? 0) // body, then each agenda item
    case "section":
      return slide.description ? 1 : 0
    case "bullets":
      return slide.bullets.length + (slide.footer ? 1 : 0)
    case "numbered":
      return slide.items.length
    case "example":
      // learner card, each how-it-works step, materials
      return 1 + slide.howItWorks.length + 1
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

function SlideView({
  slide,
  index,
  total,
  deckTitle,
  revealStep,
  transitionDir,
}: {
  slide: PresentationSlide
  index: number
  total: number
  deckTitle: string
  revealStep: number
  transitionDir: "forward" | "back"
}) {
  const shown = (step: number) => revealStep >= step

  return (
    <article
      key={`${slide.id}-${transitionDir}`}
      className={cn(
        "absolute inset-0 flex flex-col overflow-hidden rounded-none border border-border/80 bg-background text-foreground shadow-sm sm:rounded-2xl",
        transitionDir === "forward"
          ? "deck-slide-enter-forward"
          : "deck-slide-enter-back"
      )}
      aria-roledescription="slide"
      aria-label={`Slide ${index + 1} of ${total}: ${
        "title" in slide ? slide.title : deckTitle
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-muted">
        <div
          className="h-full bg-foreground transition-[width] duration-300 ease-out"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-8 md:p-12 lg:p-14">
        <div className="flex min-h-0 flex-1 flex-col">
          {slide.kind === "title" && (
            <div className="flex min-h-0 flex-1 flex-col justify-between gap-8">
              <div className="min-h-0 overflow-y-auto">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
                  {slide.kicker}
                </p>
                <h1 className="max-w-5xl text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <Fragment show={shown(1)}>
                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
                    {slide.subtitle}
                  </p>
                </Fragment>
              </div>
              <Fragment show={shown(2)}>
                <div className="grid shrink-0 gap-2 border-t pt-5 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
                  {slide.meta.map((item) => (
                    <div key={item} className="leading-snug">
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
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Overview
                </p>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  {slide.title}
                </h2>
              </header>
              <Fragment show={shown(1)}>
                <p className="max-w-4xl shrink-0 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {slide.body}
                </p>
              </Fragment>
              {slide.bullets && slide.bullets.length > 0 && (
                <ol className="grid min-h-0 flex-1 content-start gap-3 overflow-y-auto sm:grid-cols-2">
                  {slide.bullets.map((item, i) => (
                    <Fragment key={item} show={shown(2 + i)} as="li" className="list-none">
                      <div className="flex gap-3 rounded-xl border bg-muted/20 px-4 py-3 text-sm leading-relaxed sm:text-base">
                        <span className="pt-0.5 font-mono text-xs text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{item}</span>
                      </div>
                    </Fragment>
                  ))}
                </ol>
              )}
            </div>
          )}

          {slide.kind === "section" && (
            <div className="flex min-h-0 flex-1 flex-col justify-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
                {slide.kicker}
              </p>
              <h2 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {slide.title}
              </h2>
              {slide.description && (
                <Fragment show={shown(1)}>
                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
                    {slide.description}
                  </p>
                </Fragment>
              )}
            </div>
          )}

          {slide.kind === "bullets" && (
            <div className="flex min-h-0 flex-1 flex-col">
              <header className="mb-5 shrink-0 sm:mb-7">
                {slide.kicker && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {slide.kicker}
                  </p>
                )}
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  {slide.title}
                </h2>
              </header>
              <ul className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1 sm:space-y-4">
                {slide.bullets.map((bullet, i) => (
                  <Fragment key={bullet} show={shown(i + 1)} as="li">
                    <div className="flex gap-3 text-base leading-relaxed sm:text-lg md:text-xl">
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-foreground"
                        aria-hidden
                      />
                      <span>{bullet}</span>
                    </div>
                  </Fragment>
                ))}
              </ul>
              {slide.footer && (
                <Fragment show={shown(slide.bullets.length + 1)}>
                  <p className="mt-5 shrink-0 border-t pt-5 text-sm text-muted-foreground">
                    {slide.footer}
                  </p>
                </Fragment>
              )}
            </div>
          )}

          {slide.kind === "numbered" && (
            <div className="flex min-h-0 flex-1 flex-col">
              <header className="mb-5 shrink-0 sm:mb-7">
                {slide.kicker && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {slide.kicker}
                  </p>
                )}
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  {slide.title}
                </h2>
              </header>
              <ol className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
                {slide.items.map((item, i) => (
                  <Fragment key={item.label} show={shown(i + 1)} as="li">
                    <div className="flex gap-4">
                      <span className="w-8 shrink-0 pt-1 font-mono text-sm text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-base font-semibold sm:text-lg">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </ol>
            </div>
          )}

          {slide.kind === "example" && (
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
              <header className="shrink-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {slide.kicker}
                </p>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  {slide.title}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
                  <span className="rounded-full border px-2.5 py-1">{slide.subject}</span>
                  <span className="rounded-full border px-2.5 py-1">
                    {slide.interaction}
                  </span>
                  {slide.gameElements.map((el) => (
                    <span
                      key={el}
                      className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground"
                    >
                      {el}
                    </span>
                  ))}
                </div>
              </header>

              <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2">
                <Fragment show={shown(1)}>
                  <div className="space-y-3 rounded-xl border p-4 sm:p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Learners & competency
                    </p>
                    <p className="text-sm leading-relaxed sm:text-base">
                      <span className="font-medium">Learners:</span>{" "}
                      {slide.learners}
                    </p>
                    <p className="text-sm leading-relaxed sm:text-base">
                      <span className="font-medium">Competency:</span>{" "}
                      {slide.competency}
                    </p>
                    <p className="text-sm leading-relaxed sm:text-base">
                      <span className="font-medium">AI role:</span> {slide.aiRole}
                    </p>
                  </div>
                </Fragment>
                {revealStep >= 2 && (
                  <div className="rounded-xl border p-4 sm:p-5 deck-fragment-enter">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      How it works
                    </p>
                    <ol className="space-y-2.5">
                      {slide.howItWorks.map((step, i) => (
                        <Fragment key={step} show={shown(2 + i)} as="li">
                          <div className="flex gap-3 text-sm leading-relaxed sm:text-base">
                            <span className="pt-0.5 font-mono text-xs text-muted-foreground">
                              {i + 1}.
                            </span>
                            <span>{step}</span>
                          </div>
                        </Fragment>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              <Fragment show={shown(1 + slide.howItWorks.length + 1)}>
                <div className="shrink-0 rounded-xl border bg-muted/20 p-4 sm:p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Materials
                  </p>
                  <p className="text-sm leading-relaxed sm:text-base">
                    {slide.materials.join(" · ")}
                  </p>
                </div>
              </Fragment>
            </div>
          )}

          {slide.kind === "prompt" && (
            <div className="flex min-h-0 flex-1 flex-col">
              <header className="mb-4 shrink-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {slide.kicker}
                </p>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {slide.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Use for: {slide.useFor}
                </p>
              </header>
              <Fragment show={shown(1)} className="min-h-0 flex-1">
                <div className="h-full min-h-0 overflow-y-auto rounded-xl border bg-muted/25 p-4 sm:p-6">
                  <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground/90 sm:text-sm">
                    {slide.prompt}
                  </pre>
                </div>
              </Fragment>
            </div>
          )}

          {slide.kind === "two-column" && (
            <div className="flex min-h-0 flex-1 flex-col">
              <header className="mb-5 shrink-0">
                {slide.kicker && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {slide.kicker}
                  </p>
                )}
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  {slide.title}
                </h2>
              </header>
              <div className="grid min-h-0 flex-1 gap-4 md:grid-cols-2">
                <div className="overflow-y-auto rounded-xl border p-4 sm:p-5">
                  <p className="mb-3 text-sm font-semibold">{slide.leftTitle}</p>
                  <ul className="space-y-2.5">
                    {slide.left.map((item, i) => (
                      <Fragment key={item} show={shown(i + 1)} as="li">
                        <div className="flex gap-2 text-sm leading-relaxed sm:text-base">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                          <span>{item}</span>
                        </div>
                      </Fragment>
                    ))}
                  </ul>
                </div>
                <div className="overflow-y-auto rounded-xl border p-4 sm:p-5">
                  <p className="mb-3 text-sm font-semibold">{slide.rightTitle}</p>
                  <ul className="space-y-2.5">
                    {slide.right.map((item, i) => (
                      <Fragment
                        key={item}
                        show={shown(slide.left.length + i + 1)}
                        as="li"
                      >
                        <div className="flex gap-2 text-sm leading-relaxed sm:text-base">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                          <span>{item}</span>
                        </div>
                      </Fragment>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {slide.kind === "closing" && (
            <div className="flex min-h-0 flex-1 flex-col justify-between gap-8">
              <div className="min-h-0 overflow-y-auto">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Wrap-up
                </p>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {slide.title}
                </h2>
                <ul className="mt-6 max-w-4xl space-y-3 sm:space-y-4">
                  {slide.bullets.map((bullet, i) => (
                    <Fragment key={bullet} show={shown(i + 1)} as="li">
                      <div className="flex gap-3 text-base leading-relaxed sm:text-lg md:text-xl">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-foreground" />
                        <span>{bullet}</span>
                      </div>
                    </Fragment>
                  ))}
                </ul>
              </div>
              {slide.nextTitle && (
                <Fragment show={shown(slide.bullets.length + 1)}>
                  <div className="shrink-0 rounded-xl border bg-muted/25 px-4 py-4 sm:px-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {slide.nextLabel ?? "Up next"}
                    </p>
                    <p className="mt-1 text-base font-medium sm:text-lg">
                      {slide.nextTitle}
                    </p>
                  </div>
                </Fragment>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex shrink-0 items-center justify-between gap-3 border-t pt-4 text-[11px] text-muted-foreground sm:text-xs">
          <span className="truncate font-medium">{deckTitle}</span>
          <span className="flex items-center gap-2 font-mono tabular-nums">
            {getRevealCount(slide) > 0 && (
              <span className="text-muted-foreground/80">
                reveal {Math.min(revealStep, getRevealCount(slide))}/
                {getRevealCount(slide)}
              </span>
            )}
            <span>
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
  const shellRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    setIndex(0)
    setRevealStep(0)
    setTransitionDir("forward")
  }, [slug])

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
      const dir =
        options?.dir ?? (clamped >= index ? "forward" : "back")
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
  }, [advance, goToSlide, navigate, retreat, toggleFullscreen, total])

  if (!deck) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold">Presentation not found</h1>
        <p className="max-w-md text-muted-foreground">
          No slide deck exists for this session slug.
        </p>
        <Link
          to="/presentation"
          className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
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
        "flex h-dvh max-h-dvh flex-col overflow-hidden bg-muted/40 text-foreground",
        isFullscreen && "h-full max-h-full bg-background"
      )}
    >
      <header className="shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex max-w-7xl flex-wrap items-center gap-2 py-2.5 sm:py-3">
          <Link
            to="/presentation"
            className="inline-flex min-h-[40px] items-center gap-1.5 px-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <Grid3X3 className="h-4 w-4" />
            <span className="hidden sm:inline">All decks</span>
          </Link>

          <div className="hidden h-4 w-px bg-border sm:block" />

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {deck.kindLabel} · {deck.time}
            </p>
            <p className="truncate text-sm font-medium">{deck.shortTitle}</p>
          </div>

          <div className="flex items-center gap-1">
            {neighbors.prev && (
              <Link
                to={`/presentation/${neighbors.prev.slug}`}
                className="hidden items-center gap-1 rounded-md px-2 py-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground md:inline-flex"
                title={neighbors.prev.title}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Prev deck
              </Link>
            )}
            {neighbors.next && (
              <Link
                to={`/presentation/${neighbors.next.slug}`}
                className="hidden items-center gap-1 rounded-md px-2 py-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground md:inline-flex"
                title={neighbors.next.title}
              >
                Next deck
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            )}
            <button
              type="button"
              onClick={() => void toggleFullscreen()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="container flex min-h-0 max-w-7xl flex-1 flex-col py-3 sm:py-4">
        <div
          className="relative min-h-0 w-full flex-1 touch-pan-y"
          onTouchStart={(e) => {
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
          />

          {/* Tap / click zones — right advances reveal or slide, left retreats */}
          <button
            type="button"
            aria-label="Previous reveal or slide"
            onClick={retreat}
            disabled={!canRetreat}
            className="absolute inset-y-0 left-0 z-20 w-[22%] cursor-w-resize opacity-0 disabled:cursor-default sm:w-[16%]"
          />
          <button
            type="button"
            aria-label="Next reveal or slide"
            onClick={advance}
            disabled={!canAdvance}
            className="absolute inset-y-0 right-0 z-20 w-[48%] cursor-e-resize opacity-0 disabled:cursor-default sm:w-[42%]"
          />
        </div>

        <div className="mt-3 flex shrink-0 items-center justify-between gap-3 sm:mt-4">
          <button
            type="button"
            onClick={retreat}
            disabled={!canRetreat}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border bg-background px-3 py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>

          <div className="flex max-w-[45vw] flex-col items-center gap-1 sm:max-w-none">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
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
                    "h-2.5 w-2.5 shrink-0 rounded-full transition-colors",
                    i === index
                      ? "bg-foreground"
                      : "bg-foreground/20 hover:bg-foreground/40"
                  )}
                />
              ))}
            </div>
            {revealMax > 0 && (
              <p className="hidden text-[10px] text-muted-foreground sm:block">
                Space / tap right: reveal next · then next slide
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={advance}
            disabled={!canAdvance}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border bg-background px-3 py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-40"
          >
            {revealStep < revealMax ? "Reveal" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
