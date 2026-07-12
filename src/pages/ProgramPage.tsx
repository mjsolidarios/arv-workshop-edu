import { Link } from "react-router-dom"
import { Calendar, Clock, MapPin, User, Monitor, Wrench, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { workshopMeta, scheduleItems } from "@/data/workshop"

export function ProgramPage() {
  return (
    <div className="container py-8 max-w-5xl">
      {/* Hero */}
      <section className="mb-10">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{workshopMeta.eventType}</Badge>
            <Badge variant="outline">{workshopMeta.deliveryMode}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
            {workshopMeta.title}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {workshopMeta.date} &middot; {workshopMeta.day}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {workshopMeta.resourcePerson}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {workshopMeta.primaryAudience}
            </span>
          </div>
        </div>
      </section>

      <Separator className="mb-8" />

      {/* Quick info cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start gap-3">
              <Monitor className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-semibold mb-1">Devices</p>
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
                <p className="text-sm font-semibold mb-1">Tools to Be Introduced</p>
                <ul className="text-sm text-muted-foreground space-y-0.5 columns-2">
                  {workshopMeta.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
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
                <th className="px-4 py-3 text-left font-semibold w-64">Facilitator / Resource Person</th>
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
              className={`rounded-lg border p-4 ${item.isBreak ? "bg-muted/40" : "bg-card"}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono text-xs text-muted-foreground">{item.time}</span>
                {item.isBreak && (
                  <Badge variant="secondary" className="text-xs shrink-0">
                    Break
                  </Badge>
                )}
              </div>
              {item.moduleSlug ? (
                <Link
                  to={`/modules/${item.moduleSlug}`}
                  className="font-semibold text-sm hover:underline inline-flex items-center gap-1"
                >
                  {item.title}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <p className="font-semibold text-sm">{item.title}</p>
              )}
              {item.description.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {item.description.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-2 text-xs text-muted-foreground">{item.facilitator}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
