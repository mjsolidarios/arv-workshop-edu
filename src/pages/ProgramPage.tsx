import { Link } from "react-router-dom"
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Monitor,
  Wrench,
  UserPlus,
  ChevronRight,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Target,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { workshopMeta, scheduleItems, type ScheduleItem } from "@/data/workshop"

function kindBadge(item: ScheduleItem) {
  if (item.isBreak) return null
  const labels: Record<string, string> = {
    session: "Session",
    forum: "Forum",
    "hands-on": "Hands-on",
    workshop: "Workshop",
    presentation: "Presentation",
    ceremony: "Program",
  }
  if (!item.kind || !labels[item.kind]) return null
  return (
    <Badge variant="outline" className="text-[10px] font-medium">
      {labels[item.kind]}
    </Badge>
  )
}

export function ProgramPage() {
  const moduleCount = scheduleItems.filter((i) => i.moduleSlug).length

  return (
    <div className="container py-6 sm:py-8 max-w-5xl">
      {/* Hero */}
      <section className="mb-8 sm:mb-10">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{workshopMeta.eventType}</Badge>
            <Badge variant="outline">{workshopMeta.deliveryMode}</Badge>
            <Badge variant="secondary">{workshopMeta.venue}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight max-w-4xl">
            {workshopMeta.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-start sm:items-center gap-1.5">
              <Calendar className="h-4 w-4 shrink-0 mt-0.5 sm:mt-0" />
              <span>
                {workshopMeta.date} &middot; {workshopMeta.day}
              </span>
            </span>
            <span className="flex items-start sm:items-center gap-1.5">
              <User className="h-4 w-4 shrink-0 mt-0.5 sm:mt-0" />
              <span className="min-w-0 break-words">{workshopMeta.resourcePerson}</span>
            </span>
            <span className="flex items-start sm:items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 sm:mt-0" />
              <span className="min-w-0 break-words">{workshopMeta.primaryAudience}</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2 pt-2">
            <Button asChild size="sm" className="w-full sm:w-auto justify-center">
              <Link to="/modules">
                <BookOpen className="h-4 w-4" />
                Explore {moduleCount} modules
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto justify-center">
              <Link to="/examples">
                <Sparkles className="h-4 w-4" />
                Classroom examples
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto justify-center">
              <Link to="/output">
                <CheckCircle2 className="h-4 w-4" />
                Output guide
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Learning outcomes */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5" />
          <h2 className="text-lg font-bold">By the end of the day</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {workshopMeta.learningOutcomes.map((outcome, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border bg-card p-4 text-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold mt-0.5">
                {i + 1}
              </span>
              <span className="text-muted-foreground leading-relaxed">
                {outcome}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-8" />

      {/* Quick info cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start gap-3">
              <Monitor className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-semibold mb-1">Devices to bring</p>
                <ul className="text-sm text-muted-foreground space-y-0.5">
                  {workshopMeta.devices.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start gap-3">
              <Wrench className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-semibold mb-1">Tools to be introduced</p>
                <ul className="text-sm text-muted-foreground space-y-0.5 columns-1 min-[400px]:columns-2">
                  {workshopMeta.tools.map((t) => (
                    <li key={t} className="break-inside-avoid">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start gap-3">
              <UserPlus className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-semibold mb-1">Before the event</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  {workshopMeta.prerequisites.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Button asChild variant="outline" size="sm" className="mt-3 w-full sm:w-auto">
                  <a
                    href={workshopMeta.miroTeamInviteUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Join the Miro team
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How to use this site */}
      <section className="mb-10 rounded-lg border bg-muted/40 p-5 sm:p-6">
        <h2 className="font-semibold mb-3">How to use this site</h2>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="font-mono text-xs mt-0.5 w-5 shrink-0">1.</span>
            <span>
              Skim the program below, then open each linked module for objectives,
              worked examples, and AI prompts.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-xs mt-0.5 w-5 shrink-0">2.</span>
            <span>
              Browse{" "}
              <Link to="/examples" className="underline underline-offset-2 hover:text-foreground">
                classroom examples
              </Link>{" "}
              to pick a pattern you can adapt to your subject.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-xs mt-0.5 w-5 shrink-0">3.</span>
            <span>
              Check the{" "}
              <Link to="/output" className="underline underline-offset-2 hover:text-foreground">
                output requirements
              </Link>{" "}
              before the afternoon workshop so your demo or storyboard meets the checklist.
            </span>
          </li>
        </ol>
      </section>

      {/* Schedule */}
      <section>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Program of Activities
        </h2>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left font-semibold w-36">Time</th>
                <th className="px-4 py-3 text-left font-semibold">Activity</th>
                <th className="px-4 py-3 text-left font-semibold w-64">
                  Facilitator / Resource Person
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scheduleItems.map((item, idx) => (
                <tr
                  key={item.id}
                  className={
                    item.isBreak
                      ? "bg-muted/40"
                      : idx % 2 === 0
                        ? "bg-background"
                        : "bg-muted/20"
                  }
                >
                  <td className="px-4 py-4 align-top">
                    <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {item.time}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {kindBadge(item)}
                      </div>
                      {item.moduleSlug ? (
                        <Link
                          to={`/modules/${item.moduleSlug}`}
                          className="font-semibold hover:underline inline-flex items-center gap-1 group"
                        >
                          {item.title}
                          <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ) : (
                        <span className="font-semibold">{item.title}</span>
                      )}
                      {item.description.length > 0 && (
                        <ul className="mt-2 space-y-1 text-muted-foreground">
                          {item.description.map((d, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top text-muted-foreground text-xs whitespace-pre-line">
                    {item.facilitator}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden space-y-3">
          {scheduleItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg border p-3.5 sm:p-4 ${item.isBreak ? "bg-muted/40" : "bg-card"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-muted-foreground break-words">
                  {item.time}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.isBreak && (
                    <Badge variant="secondary" className="text-xs shrink-0">
                      Break
                    </Badge>
                  )}
                  {kindBadge(item)}
                </div>
              </div>
              {item.moduleSlug ? (
                <Link
                  to={`/modules/${item.moduleSlug}`}
                  className="font-semibold text-sm hover:underline inline-flex items-start gap-1 min-w-0"
                >
                  <span className="min-w-0 break-words">{item.title}</span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                </Link>
              ) : (
                <p className="font-semibold text-sm break-words">{item.title}</p>
              )}
              {item.description.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {item.description.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                      <span className="min-w-0 break-words">{d}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-2 text-xs text-muted-foreground whitespace-pre-line break-words">
                {item.facilitator}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
