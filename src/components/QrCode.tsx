import { QRCodeSVG } from "qrcode.react"
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
}: QrCodeProps) {
  const label = title ?? `QR code linking to ${value}`

  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        withFrame && "rounded-lg bg-white p-2 shadow-sm ring-1 ring-black/10",
        className
      )}
      role="img"
      aria-label={label}
    >
      <QRCodeSVG
        value={value}
        size={size}
        level="H"
        marginSize={1}
        bgColor="#ffffff"
        fgColor="#000000"
        title={label}
      />
    </div>
  )
}

type LinkQrCardProps = {
  name: string
  url: string
  role?: string
  /** Extra class on the outer card. */
  className?: string
  /** QR pixel size (default 120). */
  qrSize?: number
  /** When true, the whole card is a link (default true). */
  asLink?: boolean
  /** Stack QR above the label (better for projector-facing grids). */
  layout?: "row" | "stack"
}

/**
 * Name + URL + QR card for tools participants open on their phones.
 */
export function LinkQrCard({
  name,
  url,
  role,
  className,
  qrSize = 120,
  asLink = true,
  layout = "row",
}: LinkQrCardProps) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "")
  const stacked = layout === "stack"

  const body = (
    <>
      <QrCode value={url} size={qrSize} title={`Scan to open ${name}`} />
      <div
        className={cn(
          "min-w-0 flex-1",
          stacked ? "text-center" : "text-left"
        )}
      >
        <p className="font-semibold leading-tight">{name}</p>
        <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
          {host}
        </p>
        {role && (
          <p className="mt-2 text-sm leading-snug text-muted-foreground">
            {role}
          </p>
        )}
        <p className="mt-2 text-xs font-medium text-foreground/70">
          Scan with your phone camera
        </p>
      </div>
    </>
  )

  const cardClass = cn(
    "flex gap-4 rounded-lg border bg-card p-4 transition-colors",
    stacked ? "flex-col items-center" : "flex-row items-start",
    asLink && "hover:border-foreground/40 hover:bg-muted/40",
    className
  )

  if (asLink) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={cardClass}
      >
        {body}
      </a>
    )
  }

  return <div className={cardClass}>{body}</div>
}
