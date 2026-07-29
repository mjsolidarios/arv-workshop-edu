import { Link } from "react-router-dom"
import {
  ArrowRight,
  Clock,
  Layers,
  Presentation,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { workshopMeta } from "@/data/workshop"
import { listPresentationDecks } from "@/lib/presentationSlides"

export function PresentationsIndexPage() {
  const decks = listPresentationDecks()

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="border-b">
        <div className="container max-w-5xl py-8 sm:py-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="mt-0.5 rounded-md border p-2">
              <Presentation className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                Facilitator slide decks
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Workshop Presentations
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            Detailed HTML slide decks for every instructional block of{" "}
            <span className="text-foreground font-medium">
              {workshopMeta.title}
            </span>
            . Open a deck for full-screen delivery with keyboard navigation.
            These routes are intentionally unlisted in the main navigation.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary">{workshopMeta.date}</Badge>
            <Badge variant="outline">{workshopMeta.venue}</Badge>
            <Badge variant="outline">{decks.length} decks</Badge>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl py-8 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Layers className="h-4 w-4" />
          <span>Select a session deck</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {decks.map((deck, index) => (
            <Link
              key={deck.slug}
              to={`/presentation/${deck.slug}`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
            >
              <Card className="transition-all group-hover:border-foreground/40 group-hover:shadow-sm group-active:border-foreground/30">
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="font-mono text-[10px]">
                        {String(index + 1).padStart(2, "0")}
                      </Badge>
                      <Badge variant="outline">{deck.kindLabel}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {deck.time}
                      </span>
                      <span className="font-mono">{deck.slideCount} slides</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl leading-snug group-hover:underline underline-offset-4 decoration-foreground/30">
                    {deck.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed line-clamp-2">
                    {deck.overview}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 pb-5">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                    Open presentation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="rounded-xl border bg-muted/30 p-4 sm:p-5 mt-8 space-y-4">
          <div>
            <h2 className="text-sm font-semibold mb-2">Delivery tips</h2>
            <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
              <li>
                Press <span className="font-mono text-foreground">F</span> for
                fullscreen — type is sized for reading from the back of the room.
              </li>
              <li>
                Reveal one idea at a time with{" "}
                <span className="font-mono text-foreground">Space</span> so the
                room follows a single thought path.
              </li>
              <li>
                Prefer dark text on light slides under classroom projectors; keep
                lights dimmed if contrast looks soft.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold mb-2">Controls</h2>
            <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
              <li>
                <span className="font-mono text-foreground">→</span> /{" "}
                <span className="font-mono text-foreground">Space</span> / tap right /
                Next — reveal the next content fragment, then advance the slide
              </li>
              <li>
                <span className="font-mono text-foreground">←</span> /{" "}
                <span className="font-mono text-foreground">Backspace</span> / tap left /
                Previous — hide the last fragment, then go back a slide
              </li>
              <li>
                <span className="font-mono text-foreground">Home</span> /{" "}
                <span className="font-mono text-foreground">End</span> — first / last slide
              </li>
              <li>
                <span className="font-mono text-foreground">F</span> — toggle fullscreen
                (chrome auto-hides)
              </li>
              <li>
                <span className="font-mono text-foreground">Esc</span> — leave fullscreen or return to this index
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground pt-4 pb-8">
          Direct URL pattern:{" "}
          <span className="font-mono">/presentation/&lt;session-slug&gt;</span>
        </p>
      </div>
    </div>
  )
}
