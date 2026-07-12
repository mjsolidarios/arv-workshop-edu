import { useParams, Link } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Target,
  Lightbulb,
  Wrench,
  Sparkles,
  BookOpen,
  FlaskConical,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  classroomExamples,
  getModuleNeighbors,
  moduleDetails,
} from "@/data/workshop"

export function ModuleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const module = slug ? moduleDetails[slug] : undefined
  const { prev, next } = slug
    ? getModuleNeighbors(slug)
    : { prev: undefined, next: undefined }
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const relatedExamples = slug
    ? classroomExamples.filter((ex) => ex.relatedModule === slug)
    : []

  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey(null), 1800)
    } catch {
      // ignore
    }
  }

  if (!module) {
    return (
      <div className="container py-16 max-w-3xl text-center">
        <h1 className="text-2xl font-bold mb-4">Module not found</h1>
        <Link
          to="/modules"
          className="text-sm text-muted-foreground hover:underline inline-flex items-center justify-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back to modules
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-6 sm:py-8 max-w-4xl">
      <Link
        to="/modules"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5 sm:mb-6 transition-colors min-h-[44px]"
      >
        <ArrowLeft className="h-4 w-4" />
        All Modules
      </Link>

      <section className="mb-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
          <Clock className="h-4 w-4" />
          <span className="font-mono">{module.time}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-4 tracking-tight">
          {module.title}
        </h1>
        <p className="text-muted-foreground leading-relaxed text-base">
          {module.overview}
        </p>
      </section>

      <Separator className="mb-8" />

      {module.tools && module.tools.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Tools Used
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {module.tools.map((tool) => (
              <Badge key={tool} variant="secondary">
                {tool}
              </Badge>
            ))}
          </div>
        </section>
      )}

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5" />
          <h2 className="text-lg font-bold">Learning Objectives</h2>
        </div>
        <ol className="space-y-2">
          {module.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full border text-xs font-semibold mt-0.5">
                {i + 1}
              </span>
              <span className="text-muted-foreground leading-relaxed pt-0.5">
                {obj}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <Separator className="mb-8" />

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-5 w-5" />
          <h2 className="text-lg font-bold">Topics and Content</h2>
        </div>
        <div className="space-y-4">
          {module.topics.map((topic, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-xs font-bold">
                    {i + 1}
                  </span>
                  {topic.heading}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {topic.points.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/50 shrink-0" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {module.workedExamples && module.workedExamples.length > 0 && (
        <>
          <Separator className="mb-8" />
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical className="h-5 w-5" />
              <h2 className="text-lg font-bold">Worked Examples</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Concrete classroom sketches you can adapt during the workshop.
            </p>
            <div className="space-y-4">
              {module.workedExamples.map((ex, i) => (
                <Card key={i} className="border-foreground/15">
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <Badge variant="secondary">{ex.subject}</Badge>
                      <Badge variant="outline">{ex.interaction}</Badge>
                      <Badge variant="outline">{ex.learners}</Badge>
                    </div>
                    <CardTitle className="text-base">{ex.title}</CardTitle>
                    <p className="text-sm text-muted-foreground pt-1">
                      <span className="font-medium text-foreground/80">
                        Course outcome:{" "}
                      </span>
                      {ex.competency}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        How it works
                      </p>
                      <ol className="space-y-1.5">
                        {ex.howItWorks.map((step, j) => (
                          <li
                            key={j}
                            className="flex gap-2 text-sm text-muted-foreground"
                          >
                            <span className="font-mono text-xs mt-0.5 w-5 shrink-0">
                              {j + 1}.
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-md bg-muted/50 border p-3">
                        <p className="text-xs font-semibold mb-1">Game elements</p>
                        <p className="text-sm text-muted-foreground">
                          {ex.gameElements.join(" · ")}
                        </p>
                      </div>
                      <div className="rounded-md bg-muted/50 border p-3">
                        <p className="text-xs font-semibold mb-1">AI role</p>
                        <p className="text-sm text-muted-foreground">{ex.aiRole}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Materials
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {ex.materials.join(" · ")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}

      {module.samplePrompts && module.samplePrompts.length > 0 && (
        <>
          <Separator className="mb-8" />
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5" />
              <h2 className="text-lg font-bold">Sample AI Prompts</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Copy into Google AI Studio and replace bracketed fields with your
              lesson details. Always review AI output before classroom use.
            </p>
            <div className="space-y-4">
              {module.samplePrompts.map((sp, i) => {
                const key = `${module.slug}-sp-${i}`
                return (
                  <div
                    key={key}
                    className="rounded-lg border p-4 bg-card space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-sm">{sp.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Use for: {sp.useFor}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs gap-1.5 shrink-0"
                        onClick={() => copyText(key, sp.prompt)}
                      >
                        {copiedKey === key ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="text-xs sm:text-sm text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed rounded-md bg-muted/50 p-3 border overflow-x-auto max-w-full">
                      {sp.prompt}
                    </pre>
                  </div>
                )
              })}
            </div>
          </section>
        </>
      )}

      {module.tryThis && module.tryThis.length > 0 && (
        <>
          <Separator className="mb-8" />
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4">Try this</h2>
            <div className="space-y-3">
              {module.tryThis.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg border bg-card text-sm"
                >
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-foreground text-background text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {module.references && module.references.length > 0 && (
        <>
          <Separator className="mb-8" />
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">Verify and explore</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Official documentation behind the technical claims in this lesson.
            </p>
            <div className="space-y-2">
              {module.references.map((reference) => (
                <a
                  key={reference.url}
                  href={reference.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-3 rounded-lg border p-3.5 hover:border-foreground/40 transition-colors"
                >
                  <span>
                    <span className="block text-sm font-semibold group-hover:underline">
                      {reference.label}
                    </span>
                    <span className="block text-sm text-muted-foreground leading-relaxed mt-1">
                      {reference.note}
                    </span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
                </a>
              ))}
            </div>
          </section>
        </>
      )}

      {relatedExamples.length > 0 && (
        <>
          <Separator className="mb-8" />
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">Related classroom examples</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Full setup guides with play flow and prompts live on the Examples page.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedExamples.map((ex) => (
                <Link
                  key={ex.id}
                  to="/examples"
                  className="rounded-lg border p-4 hover:border-foreground/40 transition-colors group"
                >
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <Badge variant="outline" className="text-[10px]">
                      {ex.subject}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">
                      {ex.interaction}
                    </Badge>
                  </div>
                  <p className="font-semibold text-sm group-hover:underline">
                    {ex.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {ex.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      {module.tips && module.tips.length > 0 && (
        <>
          <Separator className="mb-8" />
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5" />
              <h2 className="text-lg font-bold">Facilitator Tips</h2>
            </div>
            <div className="space-y-3">
              {module.tips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border text-sm"
                >
                  <Lightbulb className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <Separator className="mb-6" />
      <div className="flex flex-col sm:flex-row sm:items-stretch sm:justify-between gap-3 sm:gap-4">
        {prev ? (
          <Link
            to={`/modules/${prev.slug}`}
            className="group flex-1 rounded-lg border p-4 hover:border-foreground/40 transition-colors min-w-0"
          >
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
              Previous
            </p>
            <p className="text-sm font-semibold leading-snug group-hover:underline line-clamp-2 break-words">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div className="hidden sm:block flex-1" />
        )}
        {next ? (
          <Link
            to={`/modules/${next.slug}`}
            className="group flex-1 rounded-lg border p-4 hover:border-foreground/40 transition-colors text-left sm:text-right min-w-0"
          >
            <p className="text-xs text-muted-foreground mb-1 flex items-center sm:justify-end gap-1">
              Next
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </p>
            <p className="text-sm font-semibold leading-snug group-hover:underline line-clamp-2 break-words">
              {next.title}
            </p>
          </Link>
        ) : (
          <div className="hidden sm:block flex-1" />
        )}
      </div>
    </div>
  )
}
