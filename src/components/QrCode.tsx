import {
  useCallback,
  useEffect,
  useId,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react"
import { createPortal } from "react-dom"
import { QRCodeSVG } from "qrcode.react"
import { Expand, X } from "lucide-react"
import { cn } from "@/lib/utils"

type QrCodeProps = {
  value: string
  /** Pixel size of the SVG (default 128). */
  size?: number
  className?: string
  /** Accessible label; defaults to "QR code for {value}". */
  title?: string
  /** White background with padding for reliable phone cameras. */
  withFrame?: boolean
  /**
   * When true, click/tap opens a large spotlight overlay so phones can scan
   * from a projector or crowded room.
   */
  zoomable?: boolean
  /** Optional caption shown under the enlarged QR in spotlight mode. */
  spotlightLabel?: string
}

/**
 * Scannable QR for workshop links projected or shown on-site.
 * Uses high error correction so partial glare or edge crop still works.
 */
export function QrCode({
  value,
  size = 128,
  className,
  title,
  withFrame = true,
  zoomable = false,
  spotlightLabel,
}: QrCodeProps) {
  const [open, setOpen] = useState(false)
  const label = title ?? `QR code linking to ${value}`

  const frame = (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        withFrame && "rounded-lg bg-white p-2 shadow-sm ring-1 ring-black/10",
        zoomable &&
          "transition-shadow group-hover:shadow-md group-hover:ring-black/20 group-focus-visible:ring-2 group-focus-visible:ring-foreground"
      )}
    >
      <QRCodeSVG
        value={value}
        size={size}
        level="H"
        marginSize={1}
        bgColor="#ffffff"
        fgColor="#000000"
        title={label}
        className="h-auto max-w-none"
        style={{ width: size, height: size, maxWidth: "none" }}
      />
    </span>
  )

  if (!zoomable) {
    return (
      <span
        className={cn("inline-flex", className)}
        role="img"
        aria-label={label}
      >
        {frame}
      </span>
    )
  }

  return (
    <>
      <button
        type="button"
        className={cn(
          "group relative inline-flex cursor-zoom-in rounded-lg text-left outline-none",
          className
        )}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(true)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            e.stopPropagation()
            setOpen(true)
          }
        }}
        aria-label={`${label}. Click to enlarge for scanning.`}
        title="Click to enlarge QR code"
      >
        {frame}
        <span
          className="pointer-events-none absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-foreground/80 text-background opacity-80 shadow-sm transition-opacity group-hover:opacity-100"
          aria-hidden
        >
          <Expand className="h-3.5 w-3.5" />
        </span>
      </button>
      {open && (
        <QrSpotlight
          value={value}
          title={spotlightLabel ?? title}
          url={value}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

/** High-res SVG modules; CSS scales the graphic to the viewport. */
const SPOTLIGHT_QR_MODULES = 512

function QrSpotlight({
  value,
  title,
  url,
  onClose,
}: {
  value: string
  title?: string
  url: string
  onClose: () => void
}) {
  const titleId = useId()
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "")

  const close = useCallback(() => onClose(), [onClose])

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    const prevPadding = document.body.style.paddingRight
    // Avoid layout shift when the scrollbar disappears.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = "hidden"
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`
    }
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPadding
      window.removeEventListener("keydown", onKey)
    }
  }, [close])

  const overlay = (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex justify-center",
        // Bottom sheet on very short / narrow screens; centered modal otherwise
        "items-end sm:items-center",
        "bg-black/80 backdrop-blur-sm",
        "box-border overflow-y-auto overscroll-contain",
        // Safe-area aware gutter on all sides
        "p-[max(0.5rem,env(safe-area-inset-top))_max(0.5rem,env(safe-area-inset-right))_max(0.5rem,env(safe-area-inset-bottom))_max(0.5rem,env(safe-area-inset-left))]",
        "sm:p-4 md:p-6"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={close}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") close()
      }}
    >
      <div
        className={cn(
          "relative my-auto grid w-full",
          "max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-2rem)]",
          "overflow-y-auto overscroll-contain",
          "rounded-2xl bg-background shadow-2xl",
          "max-w-[min(100%,28rem)] md:max-w-[min(100%,32rem)]",
          // Portrait / default: title, QR, actions stacked
          "grid-cols-1 justify-items-center gap-3 p-4 pt-12",
          "sm:gap-4 sm:p-6 sm:pt-14 md:gap-5 md:p-8",
          // Short landscape: QR | copy+actions
          "max-sm:landscape:max-w-[min(100%,42rem)]",
          "max-sm:landscape:grid-cols-[auto_minmax(0,1fr)]",
          "max-sm:landscape:items-center max-sm:landscape:gap-4",
          "max-sm:landscape:p-4 max-sm:landscape:pt-4"
        )}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-2 top-2 z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background text-foreground transition-colors hover:bg-muted sm:right-3 sm:top-3"
          aria-label="Close enlarged QR code"
        >
          <X className="h-5 w-5" />
        </button>

        <header className="w-full min-w-0 text-center max-sm:landscape:col-start-2 max-sm:landscape:row-start-1 max-sm:landscape:self-end max-sm:landscape:text-left max-sm:landscape:pr-10">
          <p
            id={titleId}
            className="text-base font-bold leading-tight sm:text-lg md:text-xl"
          >
            {title ?? "Scan this code"}
          </p>
          <p className="mt-1 break-all font-mono text-[11px] leading-snug text-muted-foreground sm:text-xs md:text-sm">
            {host}
          </p>
        </header>

        {/*
          QR scales with vmin + remaining viewport height so it stays
          scannable and fully on-screen without JS resize math.
        */}
        <div
          className={cn(
            "shrink-0 rounded-xl bg-white shadow-inner ring-1 ring-black/10",
            "p-[clamp(0.5rem,2vmin,1rem)]",
            "w-[min(100%,min(72vmin,calc(100dvh-16rem),22rem))]",
            "sm:w-[min(100%,min(64vmin,calc(100dvh-18rem),24rem))]",
            "md:w-[min(100%,min(56vmin,calc(100dvh-16rem),26rem))]",
            "max-sm:landscape:col-start-1 max-sm:landscape:row-span-2 max-sm:landscape:row-start-1",
            "max-sm:landscape:w-[min(38vmin,12.5rem)] max-sm:landscape:p-2"
          )}
        >
          <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
            <QRCodeSVG
              value={value}
              size={SPOTLIGHT_QR_MODULES}
              level="H"
              marginSize={2}
              bgColor="#ffffff"
              fgColor="#000000"
              title={title ?? `QR code for ${url}`}
              className="absolute inset-0 block h-full w-full"
              style={{ width: "100%", height: "100%", maxWidth: "100%" }}
              preserveAspectRatio="xMidYMid meet"
            />
          </div>
        </div>

        <div className="flex w-full min-w-0 flex-col items-center text-center max-sm:landscape:col-start-2 max-sm:landscape:row-start-2 max-sm:landscape:items-start max-sm:landscape:self-start max-sm:landscape:text-left">
          <p className="w-full text-xs text-muted-foreground sm:text-sm">
            Point your phone camera at the code, or open the link below.
          </p>
          <div className="mt-3 flex w-full flex-col gap-2 sm:mt-4 sm:flex-row sm:justify-center max-sm:landscape:justify-start">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 sm:flex-initial sm:min-w-[8.5rem]"
            >
              Open link
            </a>
            <button
              type="button"
              onClick={close}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted sm:flex-initial sm:min-w-[8.5rem]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(overlay, document.body)
}

type LinkQrCardProps = {
  name: string
  url: string
  role?: string
  /** Extra class on the outer card. */
  className?: string
  /** QR pixel size (default 120). */
  qrSize?: number
  /** Stack QR above the label (better for projector-facing grids). */
  layout?: "row" | "stack"
  children?: ReactNode
}

/**
 * Name + URL + QR card for tools participants open on their phones.
 * QR opens a spotlight zoom; the title/host still open the website.
 */
export function LinkQrCard({
  name,
  url,
  role,
  className,
  qrSize = 120,
  layout = "row",
}: LinkQrCardProps) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "")
  const stacked = layout === "stack"

  return (
    <div
      className={cn(
        "flex gap-4 rounded-lg border bg-card p-4",
        stacked ? "flex-col items-center" : "flex-row items-start",
        className
      )}
    >
      <QrCode
        value={url}
        size={qrSize}
        title={`Scan to open ${name}`}
        spotlightLabel={name}
        zoomable
      />
      <div
        className={cn(
          "min-w-0 flex-1",
          stacked ? "text-center" : "text-left"
        )}
      >
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="font-semibold leading-tight underline-offset-2 hover:underline"
        >
          {name}
        </a>
        <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
          {host}
        </p>
        {role && (
          <p className="mt-2 text-sm leading-snug text-muted-foreground">
            {role}
          </p>
        )}
        <p className="mt-2 text-xs font-medium text-foreground/70">
          Tap QR to enlarge · scan with your phone
        </p>
      </div>
    </div>
  )
}
