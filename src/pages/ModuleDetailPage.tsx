import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Clock, Target, Lightbulb, Wrench } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { moduleDetails } from "@/data/workshop"

export function ModuleDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const module = slug ? moduleDetails[slug] : undefined

  if (!module) {
    return (
      <div className="container py-16 max-w-3xl text-center">
        <h1 className="text-2xl font-bold mb-4">Module not found</h1>
        <Link to="/modules" className="text-sm text-muted-foreground hover:underline flex items-center justify-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to modules
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-4xl">
      {/* Back link */}
      <Link
        to="/modules"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        All Modules
      </Link>

      {/* Header */}
      <section className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Clock className="h-4 w-4" />
          <span className="font-mono">{module.time}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
          {module.title}
        </h1>
        <p className="text-muted-foreground leading-relaxed">{module.overview}</p>
      </section>

      <Separator className="mb-8" />

      {/* Tools */}
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

      {/* Learning Objectives */}
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
              <span className="text-muted-foreground leading-relaxed pt-0.5">{obj}</span>
            </li>
          ))}
        </ol>
      </section>

      <Separator className="mb-8" />

      {/* Topics */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-6">Topics and Content</h2>
        <div className="space-y-6">
          {module.topics.map((topic, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{topic.heading}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {topic.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
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

      {/* Tips */}
      {module.tips && module.tips.length > 0 && (
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
                <span className="text-muted-foreground mt-0.5">💡</span>
                <span className="text-muted-foreground leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <Separator className="mb-6" />
      <div className="flex justify-start">
        <Link
          to="/modules"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all modules
        </Link>
      </div>
    </div>
  )
}
