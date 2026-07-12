import { Link } from "react-router-dom"
import { ChevronRight, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { scheduleItems } from "@/data/workshop"

export function ModulesPage() {
  const moduleSessions = scheduleItems.filter((item) => item.moduleSlug)

  return (
    <div className="container py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Workshop Modules</h1>
        <p className="text-muted-foreground">
          Detailed guides for each session and activity in the workshop.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {moduleSessions.map((item) => (
          <Link key={item.id} to={`/modules/${item.moduleSlug}`} className="group">
            <Card className="h-full transition-colors hover:border-foreground/40">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="font-mono">{item.time}</span>
                </div>
                <CardTitle className="text-base leading-snug group-hover:underline">
                  {item.title}
                </CardTitle>
                <CardDescription className="mt-1 text-xs">
                  {item.facilitator}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {item.description.length > 0 && (
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {item.description.slice(0, 3).map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                        {d}
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
                <div className="mt-4">
                  <Badge variant="outline" className="text-xs">
                    View module →
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
