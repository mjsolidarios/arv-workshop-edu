import { Link } from "react-router-dom"
import {
  ChevronRight,
  Clock,
  MessageCircle,
  Presentation,
  FlaskConical,
  BookOpen,
  Wrench,
  Mic2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { moduleDetails, scheduleItems, type ScheduleItem } from "@/data/workshop"

function kindMeta(item: ScheduleItem) {
  switch (item.kind) {
    case "session":
      return { label: "Session", icon: BookOpen }
    case "forum":
      return { label: "Forum", icon: MessageCircle }
    case "hands-on":
      return { label: "Hands-on", icon: FlaskConical }
    case "workshop":
      return { label: "Workshop", icon: Wrench }
    case "presentation":
      return { label: "Presentation", icon: Mic2 }
    default:
      return { label: "Module", icon: Presentation }
  }
}

export function ModulesPage() {
  const moduleSessions = scheduleItems.filter((item) => item.moduleSlug)

  return (
    <div className="container py-6 sm:py-8 max-w-5xl">
      <div className="mb-6 sm:mb-8 max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
          Workshop Modules
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Detailed guides for each session: learning objectives, topic breakdowns,
          worked classroom examples, sample AI prompts, and facilitator tips.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {moduleSessions.map((item, index) => {
          const detail = item.moduleSlug
            ? moduleDetails[item.moduleSlug]
            : undefined
          const meta = kindMeta(item)
          const Icon = meta.icon
          const exampleCount = detail?.workedExamples?.length ?? 0
          const promptCount = detail?.samplePrompts?.length ?? 0

          return (
            <Link
              key={item.id}
              to={`/modules/${item.moduleSlug}`}
              className="group"
            >
              <Card className="h-full transition-all hover:border-foreground/40 hover:shadow-sm active:border-foreground/30">
                <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="secondary" className="text-[10px] gap-1">
                      <Icon className="h-3 w-3" />
                      {meta.label}
                    </Badge>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span className="font-mono break-words">{item.time}</span>
                  </div>
                  <CardTitle className="text-base leading-snug group-hover:underline break-words">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="mt-1 text-xs line-clamp-2">
                    {detail?.overview ?? item.facilitator}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                  {item.description.length > 0 && (
                    <ul className="space-y-1 text-xs text-muted-foreground mb-4">
                      {item.description.slice(0, 3).map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                          <span className="line-clamp-2">{d}</span>
                        </li>
                      ))}
                      {item.description.length > 3 && (
                        <li className="text-muted-foreground/60 flex items-center gap-1">
                          <ChevronRight className="h-3 w-3" />
                          {item.description.length - 3} more topics
                        </li>
                      )}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {exampleCount > 0 && (
                      <Badge variant="outline" className="text-[10px]">
                        {exampleCount} example{exampleCount > 1 ? "s" : ""}
                      </Badge>
                    )}
                    {promptCount > 0 && (
                      <Badge variant="outline" className="text-[10px]">
                        {promptCount} AI prompt{promptCount > 1 ? "s" : ""}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-[10px]">
                      Open →
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="mt-10 rounded-lg border p-5 sm:p-6 bg-muted/30">
        <h2 className="font-semibold mb-2">Looking for ready-made activities?</h2>
        <p className="text-sm text-muted-foreground mb-3">
          The Examples gallery has full setup guides, play flows, assessment ideas, and
          copy-ready prompts across subjects.
        </p>
        <Link
          to="/examples"
          className="text-sm font-medium inline-flex items-center gap-1 hover:underline"
        >
          Browse classroom examples
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
