import { Link } from "react-router-dom"
import {
  CheckCircle,
  Monitor,
  Wrench,
  FileText,
  ListChecks,
  Clapperboard,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { outputRequirements, workshopMeta } from "@/data/workshop"

export function OutputPage() {
  return (
    <div className="container py-6 sm:py-8 max-w-4xl">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline">Afternoon workshop</Badge>
          <Badge variant="outline" className="whitespace-normal text-left h-auto py-1">
            2:30–3:30 PM build · 3:30–4:30 PM present
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
          Expected Workshop Output
        </h1>
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
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-lg border bg-card"
            >
              <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-foreground text-background text-xs font-bold mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed">
                {req}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-10" />

      {/* Quality checklist */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
          <ListChecks className="h-5 w-5" />
          Quality checklist
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Use this before you present. If most boxes feel true, your output is ready.
        </p>
        <div className="space-y-2">
          {outputRequirements.qualityChecklist.map((item, i) => (
            <label
              key={i}
              className="flex items-start gap-3 p-3.5 rounded-lg border bg-card text-sm cursor-default"
            >
              <span className="mt-0.5 h-4 w-4 rounded border border-foreground/30 shrink-0" />
              <span className="text-muted-foreground leading-relaxed">{item}</span>
            </label>
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
          Participants may submit or present any of the following. A polished storyboard
          counts — especially for non-coding faculty.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {outputRequirements.outputTypes.map((type, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-lg border bg-card text-sm"
            >
              <span className="text-muted-foreground mt-0.5 font-mono text-xs">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-muted-foreground leading-relaxed">{type}</span>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-10" />

      {/* Storyboard beats */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
          <Clapperboard className="h-5 w-5" />
          Storyboard beats (if you are not coding)
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Six panels are enough for a clear presentation. Sketch on paper or slides.
        </p>
        <ol className="space-y-2">
          {outputRequirements.sampleStoryboardBeats.map((beat, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-3.5 rounded-lg border bg-muted/30 text-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-muted-foreground leading-relaxed pt-0.5">
                {beat}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <Separator className="mb-10" />

      {/* Devices and tools */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
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
                <li
                  key={device}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
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

      {/* CTA */}
      <section className="rounded-lg border bg-muted/40 p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-3">
          <Sparkles className="h-5 w-5 mt-0.5 shrink-0" />
          <div>
            <h2 className="font-semibold mb-1">Need a starting pattern?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Borrow a classroom example, align it with your course outcome, and generate content
              with the included AI prompts. Many faculty finish faster by adapting than
              inventing from zero.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
          <Button asChild size="sm" className="w-full sm:w-auto justify-center">
            <Link to="/examples">
              Browse examples
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto justify-center">
            <Link to="/modules/workshop">Open workshop module</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
