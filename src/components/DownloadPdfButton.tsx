import { useState } from "react"
import { Download, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { downloadWorkshopPdf } from "@/lib/workshopPdf"

interface DownloadPdfButtonProps {
  className?: string
}

export function DownloadPdfButton({ className }: DownloadPdfButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    if (isGenerating) return
    setIsGenerating(true)
    try {
      await downloadWorkshopPdf()
    } catch (error) {
      console.error("Could not generate the workshop PDF", error)
      window.alert("The PDF could not be created. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={className}
      onClick={handleDownload}
      disabled={isGenerating}
      aria-label={isGenerating ? "Preparing PDF download" : "Download program and modules as PDF"}
    >
      {isGenerating ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isGenerating ? "Preparing PDF..." : "Download as PDF"}
    </Button>
  )
}
