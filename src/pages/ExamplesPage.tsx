import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  Camera,
  Clock,
  Copy,
  Check,
  Gamepad2,
  Sparkles,
  Target,
  Layers,
  Accessibility,
  CircleCheckBig,
  Code2,
  WifiOff,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  classroomExamples,
  subjectFilters,
  type ClassroomExample,
} from "@/data/workshop"
import { cn } from "@/lib/utils"
import {
  HandTrackingDemo,
  ImageTrackingDemo,
} from "@/components/examples/InteractiveExamples"

function interactionLabel(interaction: ClassroomExample["interaction"]) {
  return interaction
}

export function ExamplesPage() {
  const [subject, setSubject] = useState<(typeof subjectFilters)[number]>("All")
  const [interaction, setInteraction] = useState<string>("All")
  const [expandedId, setExpandedId] = useState<string | null>(
    classroomExamples[0]?.id ?? null
  )
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const interactions = useMemo(() => {
    const set = new Set(classroomExamples.map((e) => e.interaction))
    return ["All", ...Array.from(set)]
  }, [])

  const filtered = useMemo(() => {
    return classroomExamples.filter((ex) => {
      const subjectOk =
        subject === "All" ||
        ex.subjects.some((s) => s.toLowerCase() === subject.toLowerCase()) ||
        ex.subject.toLowerCase() === subject.toLowerCase()
      const interactionOk =
        interaction === "All" || ex.interaction === interaction
      return subjectOk && interactionOk
    })
  }, [subject, interaction])

  const copyPrompt = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey(null), 1800)
    } catch {
      // Clipboard may be unavailable; ignore
    }
  }

  return (
    <div className="container py-6 sm:py-8 max-w-5xl">
      <div className="mb-6 sm:mb-8 max-w-3xl">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline">Ready to adapt</Badge>
          <Badge variant="outline">{classroomExamples.length} classroom examples</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
          Classroom Examples
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Concrete activities you can borrow for the workshop output or next week&apos;s
          class. Each example links game elements, camera interaction, and generative AI
          to a real college course outcome—including setup, play flow, and sample prompts.
        </p>
      </div>

      <section className="mb-10" aria-labelledby="working-examples-heading">
        <div className="mb-4">
          <Badge variant="secondary" className="mb-2">
            Try it now
          </Badge>
          <h2 id="working-examples-heading" className="text-xl font-bold">
            Working camera examples
          </h2>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Experience the same browser-based image and hand tracking used in the
            lessons. Camera frames and uploaded images stay in your browser.
          </p>
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          <ImageTrackingDemo />
          <HandTrackingDemo />
        </div>
      </section>

      {/* Filters */}
      <div className="mb-6 space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Subject
          </p>
          <div className="flex flex-wrap gap-2 -mx-1 px-1">
            {subjectFilters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSubject(s)}
                className={cn(
                  "text-xs px-3 py-2 min-h-[36px] rounded-full border transition-colors touch-manipulation",
                  subject === s
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground hover:border-foreground/40 active:bg-muted"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Interaction
          </p>
          <div className="flex flex-wrap gap-2 -mx-1 px-1">
            {interactions.map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setInteraction(i)}
                className={cn(
                  "text-xs px-3 py-2 min-h-[36px] rounded-full border transition-colors touch-manipulation",
                  interaction === i
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground hover:border-foreground/40 active:bg-muted"
                )}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        Showing {filtered.length} of {classroomExamples.length}
      </p>

      <div className="space-y-4">
        {filtered.map((ex) => {
          const open = expandedId === ex.id
          return (
            <Card
              key={ex.id}
              className={cn(
                "overflow-hidden transition-shadow",
                open && "shadow-md ring-1 ring-foreground/10"
              )}
            >
              <button
                type="button"
                className="w-full text-left"
                onClick={() => setExpandedId(open ? null : ex.id)}
                aria-expanded={open}
              >
                <CardHeader className="pb-3 px-4 sm:px-6">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-3">
                    <div className="space-y-2 min-w-0 flex-1">
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="secondary">{ex.subject}</Badge>
                        <Badge variant="outline">{ex.difficulty}</Badge>
                        <Badge variant="outline">{interactionLabel(ex.interaction)}</Badge>
                      </div>
                      <CardTitle className="text-base sm:text-lg md:text-xl leading-snug break-words">
                        {ex.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {ex.summary}
                      </p>
                    </div>
                    <div className="flex flex-row sm:flex-col flex-wrap sm:items-end gap-x-3 gap-y-1 text-xs text-muted-foreground shrink-0">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        ~{ex.timeMinutes} min
                      </span>
                      <span>{ex.grade}</span>
                      <span className="text-foreground/70 font-medium sm:mt-0.5">
                        {open ? "Hide details ▲" : "View details ▼"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {ex.gameElements.map((g) => (
                      <span
                        key={g}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                      >
                        <Gamepad2 className="h-3 w-3 shrink-0" />
                        {g}
                      </span>
                    ))}
                  </div>
                </CardHeader>
              </button>

              {open && (
                <CardContent className="space-y-6 border-t pt-6 px-4 sm:px-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="rounded-lg border p-3.5 sm:p-4 bg-muted/30">
                      <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                        <Target className="h-4 w-4 shrink-0" />
                        Course learning outcome
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed break-words">
                        {ex.competency}
                      </p>
                    </div>
                    <div className="rounded-lg border p-3.5 sm:p-4 bg-muted/30">
                      <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                        <Camera className="h-4 w-4 shrink-0" />
                        Interaction
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed break-words">
                        {ex.interaction} · Related module:{" "}
                        <Link
                          to={`/modules/${ex.relatedModule}`}
                          className="underline underline-offset-2 hover:text-foreground"
                          onClick={(e) => e.stopPropagation()}
                        >
                          view lesson
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      Setup
                    </h3>
                    <ol className="space-y-1.5">
                      {ex.setup.map((step, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span className="font-mono text-xs mt-0.5 w-5 shrink-0">
                            {i + 1}.
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2">Play flow</h3>
                    <ol className="space-y-1.5">
                      {ex.playFlow.map((step, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span className="font-mono text-xs mt-0.5 w-5 shrink-0">
                            {i + 1}.
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2">
                      Concrete sample content
                    </h3>
                    <div className="rounded-lg border bg-muted/30 p-3.5 sm:p-4">
                      <ul className="space-y-2">
                        {ex.sampleContent.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/50 shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Sample AI prompts
                    </h3>
                    <div className="space-y-3">
                      {ex.aiPrompts.map((prompt, i) => {
                        const key = `${ex.id}-prompt-${i}`
                        return (
                          <div
                            key={key}
                            className="rounded-lg border bg-card p-3 sm:p-4"
                          >
                            <pre className="text-xs sm:text-sm text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed overflow-x-auto max-w-full">
                              {prompt}
                            </pre>
                            <div className="mt-3">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs gap-1.5"
                                onClick={() => copyPrompt(key, prompt)}
                              >
                                {copiedKey === key ? (
                                  <>
                                    <Check className="h-3.5 w-3.5" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3.5 w-3.5" />
                                    Copy prompt
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3.5 sm:p-4">
                      <h3 className="text-sm font-semibold mb-2">Assessment</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {ex.assessment}
                      </p>
                    </div>
                    <div className="rounded-lg border p-3.5 sm:p-4">
                      <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <CircleCheckBig className="h-4 w-4" />
                        Success criteria
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {ex.successCriteria}
                      </p>
                    </div>
                    <div className="rounded-lg border p-3.5 sm:p-4">
                      <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <WifiOff className="h-4 w-4" />
                        No-camera fallback
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {ex.fallback}
                      </p>
                    </div>
                    <div className="rounded-lg border p-3.5 sm:p-4">
                      <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Accessibility className="h-4 w-4" />
                        Inclusive participation
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {ex.inclusion}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3.5 sm:p-4">
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Code2 className="h-4 w-4" />
                      What the technology does—and does not do
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {ex.buildNote}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2">Variations</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      {ex.variations.map((v, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
                          <span className="leading-relaxed">{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}

        {filtered.length === 0 && (
          <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
            No examples match these filters. Try another subject or interaction type.
          </div>
        )}
      </div>

      <div className="mt-10 rounded-lg border bg-muted/40 p-5 sm:p-6">
        <h2 className="font-semibold mb-2">How to use these examples</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
            Swap the subject content but keep the interaction + scoring pattern.
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
            Copy a prompt into Google AI Studio, then edit it for your discipline,
            course outcome, and year level.
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
            A storyboard of one of these flows is a valid workshop output if you cannot code.
          </li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild variant="default" size="sm">
            <Link to="/output">View output requirements</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/modules">Browse modules</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
