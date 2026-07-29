import { Link } from "react-router-dom"
import {
  Download,
  ExternalLink,
  FileText,
  Lightbulb,
  Printer,
  ScanLine,
  Scissors,
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
          <Badge variant="secondary">No scissors option</Badge>
          <Badge variant="outline">Encantar.js ready</Badge>
          <Badge variant="secondary">{markerSets.length} marker sets</Badge>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Printable markers
        </h1>
        <p className="leading-relaxed text-muted-foreground">
          Download or print high-detail image targets for the workshop’s AR
          classroom examples. Prefer{" "}
          <span className="font-medium text-foreground">full-page markers</span>{" "}
          if you cannot cut paper—print each page and place the whole sheet at
          the station. Compact 2×2 sheets are also available when scissors are
          on hand.
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

      <section className="mb-10 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border-2 border-foreground/15 bg-background p-4 sm:p-5">
          <div className="mb-2 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <h2 className="text-base font-semibold">Full page · no scissors</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            One large marker centered on a letter-size page. Print the PDF pack
            for a whole set, or open a single page PNG. Place the printed page
            flat—no cutting required.
          </p>
        </div>
        <div className="rounded-xl border bg-muted/30 p-4 sm:p-5">
          <div className="mb-2 flex items-center gap-2">
            <Scissors className="h-5 w-5" />
            <h2 className="text-base font-semibold">2×2 sheet · needs cutting</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Four markers on one page to save paper. Cut along the borders before
            class if you have scissors available.
          </p>
        </div>
      </section>

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
              <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                <Button asChild size="sm">
                  <a href={set.packSrc} download={set.packFilename}>
                    <FileText className="h-4 w-4" />
                    PDF pack · no scissors
                  </a>
                </Button>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <Button asChild size="sm" variant="outline">
                    <a href={set.sheetSrc} download={set.sheetFilename}>
                      <Scissors className="h-4 w-4" />
                      2×2 sheet
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="secondary">
                    <a href={set.packSrc} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Open PDF
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <Card className="mb-4 overflow-hidden border-2 border-foreground/10">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Printer className="h-4 w-4" />
                  Full-page sample (no cutting)
                </CardTitle>
                <CardDescription>
                  Preview of page 1. Download the PDF pack for all markers in
                  this set, or open individual full-page PNGs below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={set.markers[0]?.pageSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="block max-w-md overflow-hidden rounded-lg border bg-background"
                >
                  <img
                    src={set.markers[0]?.pageSrc}
                    alt={`${set.title} full-page marker sample`}
                    className="h-auto w-full"
                    loading="lazy"
                  />
                </a>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {set.markers.map((m) => (
                <Card key={m.id} className="overflow-hidden">
                  <div className="border-b bg-muted/20 p-3">
                    <img
                      src={m.src}
                      alt={m.title}
                      className="mx-auto h-auto w-full max-w-sm rounded-md border bg-white"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-snug">
                        {m.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="shrink-0 font-mono text-[10px]"
                      >
                        ~{m.printSizeCm} cm square
                      </Badge>
                    </div>
                    <CardDescription className="leading-relaxed">
                      {m.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm leading-relaxed">
                      <span className="font-medium">Learning cue: </span>
                      <span className="text-muted-foreground">
                        {m.learningCue}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm">
                        <a href={m.pageSrc} download={m.pageFilename}>
                          <Download className="h-4 w-4" />
                          Full page
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <a href={m.pageSrc} target="_blank" rel="noreferrer">
                          <Printer className="h-4 w-4" />
                          Print page
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="secondary">
                        <a href={m.src} download={m.filename}>
                          <Download className="h-4 w-4" />
                          Square PNG
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
          <li>
            Download a <strong className="text-foreground">PDF pack</strong> (no
            scissors) or individual full-page PNGs.
          </li>
          <li>
            Print at 100% scale, place each page flat at a station, and tape
            corners if fans or AC move the paper.
          </li>
          <li>
            Register the matching <strong className="text-foreground">square PNG</strong>{" "}
            files in your Encantar.js / AI Studio app as reference targets.
          </li>
          <li>
            Map each target-found event to faculty-verified content, and keep a
            non-camera fallback for the same learning task.
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
