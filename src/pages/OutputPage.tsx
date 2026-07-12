import { CheckCircle, Monitor, Wrench, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { outputRequirements, workshopMeta } from "@/data/workshop"

export function OutputPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Expected Workshop Output</h1>
        <p className="text-muted-foreground leading-relaxed">
          {outputRequirements.intro}
        </p>
      </div>

      {/* Requirements */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Output Requirements
        </h2>
        <div className="space-y-3">
          {outputRequirements.requirements.map((req, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-foreground text-background text-xs font-bold mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed">{req}</span>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-10" />

      {/* Output types */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Accepted Output Formats
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Participants may submit or present any of the following:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {outputRequirements.outputTypes.map((type, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-lg border bg-card text-sm"
            >
              <span className="text-muted-foreground mt-0.5">→</span>
              <span className="text-muted-foreground">{type}</span>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-10" />

      {/* Devices and tools */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Devices to Be Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {workshopMeta.devices.map((device) => (
                <li key={device} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 shrink-0" />
                  {device}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Tools to Be Introduced
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {workshopMeta.tools.map((tool) => (
                <Badge key={tool} variant="secondary">
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
