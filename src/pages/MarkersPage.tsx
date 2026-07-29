import { Link } from "react-router-dom"
import {
  Download,
  ExternalLink,
  Lightbulb,
  Printer,
  ScanLine,
  Target,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { markerSets, printTips } from "@/data/markers"

export function MarkersPage() {
  return (
    <div className="container max-w-5xl py-6 sm:py-8">
      <div className="mb-8 max-w-3xl">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant="outline">Printable AR targets</Badge>
          <Badge variant="outline">Encantar.js ready</Badge>
          <Badge variant="secondary">{markerSets.length} marker sets</Badge>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Printable markers
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          Download or print high-detail image targets for the workshop’s AR
          classroom examples. Use them with Encantar.js image tracking (or the
          interactive demo on the Examples page). Designs are asymmetrical and
          feature-rich so cameras can lock more reliably than plain icons or QR
          codes.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/examples">
              <ScanLine className="h-4 w-4" />
              Open AR examples
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/modules/hands-on">
              <Target className="h-4 w-4" />
              Hands-on module
            </Link>
          </Button>
        </div>
      </div>

      <section className="mb-10 rounded-xl border bg-muted/30 p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          <h2 className="text-base font-semibold">Print & track tips</h2>
        </div>
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {printTips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="space-y-10">
        {markerSets.map((set) => (
          <section key={set.id} id={set.id} className="scroll-mt-20">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">{set.subject}</Badge>
                  <Badge variant="outline">{set.markers.length} markers</Badge>
                </div>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {set.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                  For{" "}
                  <Link
                    to="/examples"
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {set.exampleTitle}
                  </Link>
                  {" · "}
                  <Link
                    to={`/modules/${set.relatedModule}`}
                    className="underline-offset-4 hover:underline"
                  >
                    related module
                  </Link>
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {set.summary}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href={set.sheetSrc} download={set.sheetFilename}>
                    <Printer className="h-4 w-4" />
                    Print sheet (2×2)
                  </a>
                </Button>
                <Button asChild size="sm" variant="secondary">
                  <a href={set.sheetSrc} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Open sheet
                  </a>
                </Button>
              </div>
            </div>

            <Card className="mb-4 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Combined print sheet</CardTitle>
                <CardDescription>
                  Four-up layout for quick classroom printing. Still prefer
                  individual files when registering high-resolution targets.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={set.sheetSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden rounded-lg border bg-background"
                >
                  <img
                    src={set.sheetSrc}
                    alt={`${set.title} printable sheet`}
                    className="h-auto w-full"
                    loading="lazy"
                  />
                </a>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {set.markers.map((marker) => (
                <Card key={marker.id} className="overflow-hidden">
                  <div className="border-b bg-muted/20 p-3">
                    <img
                      src={marker.src}
                      alt={marker.title}
                      className="mx-auto h-auto w-full max-w-sm rounded-md border bg-white"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-snug">
                        {marker.title}
                      </CardTitle>
                      <Badge variant="outline" className="shrink-0 font-mono text-[10px]">
                        ~{marker.printSizeCm} cm
                      </Badge>
                    </div>
                    <CardDescription className="leading-relaxed">
                      {marker.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm leading-relaxed">
                      <span className="font-medium">Learning cue: </span>
                      <span className="text-muted-foreground">
                        {marker.learningCue}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm">
                        <a href={marker.src} download={marker.filename}>
                          <Download className="h-4 w-4" />
                          Download PNG
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <a href={marker.src} target="_blank" rel="noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Open
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12 rounded-xl border p-4 sm:p-5">
        <h2 className="mb-2 text-base font-semibold">Using markers in class</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Download the PNG files you will print (or print a 2×2 sheet and cut).</li>
          <li>
            Register those same image files in your Encantar.js / AI Studio app as
            reference targets.
          </li>
          <li>
            Map each target-found event to faculty-verified content (structure
            labels, history sources, critique prompts).
          </li>
          <li>
            Always offer a non-camera fallback (printed flap, shared device, or
            paper packet) for the same learning task.
          </li>
        </ol>
        <p className="mt-4 text-xs text-muted-foreground">
          Marker art is workshop-generated for training practice. Botanical
          diagrams are simplified teaching aids—not textbook replacements. History
          site names are placeholders until you attach verified local sources.
        </p>
      </section>
    </div>
  )
}
