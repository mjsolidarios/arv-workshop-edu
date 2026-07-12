import {
  moduleDetails,
  moduleOrder,
  scheduleItems,
  workshopMeta,
  type ModuleDetail,
} from "@/data/workshop"

const PAGE_WIDTH = 210
const PAGE_HEIGHT = 297
const MARGIN_X = 18
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2
const TOP = 21
const BOTTOM = 278

type PdfDocument = InstanceType<typeof import("jspdf").jsPDF>

const colors = {
  navy: [24, 39, 75] as const,
  blue: [37, 99, 235] as const,
  paleBlue: [239, 246, 255] as const,
  slate: [71, 85, 105] as const,
  lightSlate: [226, 232, 240] as const,
  white: [255, 255, 255] as const,
}

function pdfText(value: string) {
  const normalized = value
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2192/g, "->")
    .replace(/\u00b7/g, "|")
    .replace(/\u2026/g, "...")
    .replace(/\u00d7/g, "x")

  return Array.from(normalized)
    .filter((character) => {
      const code = character.codePointAt(0) ?? 0
      return code === 9 || code === 10 || code === 13 || (code >= 32 && code <= 255)
    })
    .join("")
}

function setTextColor(doc: PdfDocument, color: readonly [number, number, number]) {
  doc.setTextColor(color[0], color[1], color[2])
}

function ensureSpace(doc: PdfDocument, y: number, needed: number) {
  if (y + needed <= BOTTOM) return y
  doc.addPage()
  return TOP
}

function addSectionHeading(doc: PdfDocument, title: string, y: number, level = 1) {
  y = ensureSpace(doc, y, level === 1 ? 16 : 11)
  if (level === 1) {
    doc.setFillColor(...colors.blue)
    doc.roundedRect(MARGIN_X, y - 4.5, 3, 10, 1, 1, "F")
    doc.setFont("helvetica", "bold")
    doc.setFontSize(15)
    setTextColor(doc, colors.navy)
    doc.text(pdfText(title), MARGIN_X + 7, y + 3)
    return y + 11
  }

  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  setTextColor(doc, colors.navy)
  doc.text(pdfText(title), MARGIN_X, y + 1)
  return y + 7
}

function addParagraph(
  doc: PdfDocument,
  text: string,
  y: number,
  options: { bold?: boolean; indent?: number; fontSize?: number; color?: readonly [number, number, number] } = {},
) {
  const indent = options.indent ?? 0
  const fontSize = options.fontSize ?? 9.5
  const lineHeight = fontSize * 0.44
  const lines = doc.splitTextToSize(pdfText(text), CONTENT_WIDTH - indent)
  y = ensureSpace(doc, y, lines.length * lineHeight + 3)
  doc.setFont("helvetica", options.bold ? "bold" : "normal")
  doc.setFontSize(fontSize)
  setTextColor(doc, options.color ?? colors.slate)
  doc.text(lines, MARGIN_X + indent, y, { lineHeightFactor: 1.35 })
  return y + lines.length * lineHeight + 3
}

function addBullets(
  doc: PdfDocument,
  items: string[],
  y: number,
  options: { numbered?: boolean; indent?: number } = {},
) {
  const indent = options.indent ?? 0
  items.forEach((item, index) => {
    const markerWidth = options.numbered ? 8 : 5
    const lines = doc.splitTextToSize(pdfText(item), CONTENT_WIDTH - indent - markerWidth)
    const lineHeight = 4.2
    y = ensureSpace(doc, y, lines.length * lineHeight + 3)
    doc.setFont("helvetica", options.numbered ? "bold" : "normal")
    doc.setFontSize(9)
    setTextColor(doc, colors.blue)
    if (options.numbered) {
      doc.text(`${index + 1}.`, MARGIN_X + indent, y)
    } else {
      doc.circle(MARGIN_X + indent + 1.2, y - 1.2, 0.75, "F")
    }
    doc.setFont("helvetica", "normal")
    setTextColor(doc, colors.slate)
    doc.text(lines, MARGIN_X + indent + markerWidth, y, { lineHeightFactor: 1.35 })
    y += lines.length * lineHeight + 2.5
  })
  return y
}

function addLabelValue(doc: PdfDocument, label: string, value: string, y: number) {
  y = ensureSpace(doc, y, 8)
  doc.setFontSize(8.5)
  doc.setFont("helvetica", "bold")
  setTextColor(doc, colors.navy)
  doc.text(pdfText(`${label}:`), MARGIN_X, y)
  doc.setFont("helvetica", "normal")
  setTextColor(doc, colors.slate)
  const labelWidth = doc.getTextWidth(pdfText(`${label}: `))
  const lines = doc.splitTextToSize(pdfText(value), CONTENT_WIDTH - labelWidth)
  doc.text(lines, MARGIN_X + labelWidth + 1.2, y, { lineHeightFactor: 1.3 })
  return y + Math.max(1, lines.length) * 4 + 2
}

function addModule(doc: PdfDocument, module: ModuleDetail, moduleNumber: number) {
  doc.addPage()
  doc.setFillColor(...colors.navy)
  doc.rect(0, 0, PAGE_WIDTH, 43, "F")
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  setTextColor(doc, [147, 197, 253])
  doc.text(`MODULE ${String(moduleNumber).padStart(2, "0")}  |  ${pdfText(module.time)}`, MARGIN_X, 14)
  doc.setFontSize(19)
  setTextColor(doc, colors.white)
  const titleLines = doc.splitTextToSize(pdfText(module.title), CONTENT_WIDTH)
  doc.text(titleLines, MARGIN_X, 24, { lineHeightFactor: 1.12 })

  let y = Math.max(53, 24 + titleLines.length * 8)
  y = addParagraph(doc, module.overview, y, { fontSize: 10 })

  if (module.tools?.length) {
    y = addSectionHeading(doc, "Tools used", y + 2, 2)
    y = addParagraph(doc, module.tools.join("  |  "), y, { bold: true, color: colors.blue })
  }

  y = addSectionHeading(doc, "Learning objectives", y + 2)
  y = addBullets(doc, module.objectives, y, { numbered: true })

  y = addSectionHeading(doc, "Topics and content", y + 3)
  module.topics.forEach((topic, index) => {
    y = addSectionHeading(doc, `${index + 1}. ${topic.heading}`, y + 2, 2)
    y = addBullets(doc, topic.points, y)
  })

  if (module.workedExamples?.length) {
    y = addSectionHeading(doc, "Worked examples", y + 3)
    module.workedExamples.forEach((example, index) => {
      y = ensureSpace(doc, y + 2, 28)
      doc.setFillColor(...colors.paleBlue)
      doc.roundedRect(MARGIN_X, y - 5, CONTENT_WIDTH, 10, 2, 2, "F")
      doc.setFont("helvetica", "bold")
      doc.setFontSize(11)
      setTextColor(doc, colors.navy)
      doc.text(pdfText(`${index + 1}. ${example.title}`), MARGIN_X + 4, y + 1)
      y += 10
      y = addLabelValue(doc, "Subject", `${example.subject} | ${example.learners} | ${example.interaction}`, y)
      y = addLabelValue(doc, "Course outcome", example.competency, y)
      y = addSectionHeading(doc, "How it works", y + 1, 2)
      y = addBullets(doc, example.howItWorks, y, { numbered: true, indent: 2 })
      y = addLabelValue(doc, "Game elements", example.gameElements.join(", "), y)
      y = addLabelValue(doc, "AI role", example.aiRole, y)
      y = addLabelValue(doc, "Materials", example.materials.join(", "), y)
    })
  }

  if (module.samplePrompts?.length) {
    y = addSectionHeading(doc, "Sample AI prompts", y + 3)
    y = addParagraph(
      doc,
      "Replace bracketed fields with your lesson details and review all AI output before classroom use.",
      y,
      { fontSize: 8.5 },
    )
    module.samplePrompts.forEach((sample, index) => {
      y = ensureSpace(doc, y, 32)
      y = addSectionHeading(doc, `${index + 1}. ${sample.title}`, y + 2, 2)
      y = addLabelValue(doc, "Use for", sample.useFor, y)
      y = addParagraph(doc, sample.prompt, y, { indent: 4, fontSize: 8.5 })
    })
  }

  if (module.tryThis?.length) {
    y = addSectionHeading(doc, "Try this", y + 3)
    y = addBullets(doc, module.tryThis, y)
  }

  if (module.tips?.length) {
    y = addSectionHeading(doc, "Facilitator tips", y + 3)
    y = addBullets(doc, module.tips, y)
  }

  if (module.references?.length) {
    y = addSectionHeading(doc, "References and further reading", y + 3)
    module.references.forEach((reference) => {
      y = addParagraph(doc, reference.label, y, { bold: true, fontSize: 9 })
      y = addParagraph(doc, reference.note, y - 1, { fontSize: 8.5 })
      y = addParagraph(doc, reference.url, y - 1, { fontSize: 7.5, color: colors.blue })
    })
  }
}

export async function downloadWorkshopPdf() {
  const [{ jsPDF }, { default: autoTable }] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ])
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true })

  doc.setProperties({
    title: `${workshopMeta.shortTitle} - Program and Module Guide`,
    subject: "Workshop program and module documentation",
    author: workshopMeta.resourcePerson,
    creator: workshopMeta.shortTitle,
  })

  // Cover
  doc.setFillColor(...colors.navy)
  doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "F")
  doc.setFillColor(...colors.blue)
  doc.rect(0, 0, 7, PAGE_HEIGHT, "F")
  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  setTextColor(doc, [147, 197, 253])
  doc.text("OFFLINE WORKSHOP GUIDE", 22, 48)
  doc.setFontSize(27)
  setTextColor(doc, colors.white)
  const coverTitle = doc.splitTextToSize(pdfText(workshopMeta.title), 164)
  doc.text(coverTitle, 22, 67, { lineHeightFactor: 1.12 })
  const coverEnd = 67 + coverTitle.length * 12
  doc.setDrawColor(96, 165, 250)
  doc.setLineWidth(0.6)
  doc.line(22, coverEnd + 7, 80, coverEnd + 7)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(12)
  setTextColor(doc, [203, 213, 225])
  doc.text(pdfText(`${workshopMeta.date} | ${workshopMeta.venue}`), 22, coverEnd + 19)
  doc.text(pdfText(workshopMeta.eventType), 22, coverEnd + 28)
  doc.setFontSize(10)
  doc.text("Program of activities, learning objectives, detailed module notes,", 22, 246)
  doc.text("worked examples, AI prompts, facilitator tips, and references.", 22, 252)
  doc.setFont("helvetica", "bold")
  doc.text(pdfText(`Resource person: ${workshopMeta.resourcePerson}`), 22, 270)

  // Workshop overview
  doc.addPage()
  let y = addSectionHeading(doc, "Workshop at a glance", TOP)
  y = addLabelValue(doc, "Date", `${workshopMeta.date} (${workshopMeta.day})`, y)
  y = addLabelValue(doc, "Venue", workshopMeta.venue, y)
  y = addLabelValue(doc, "Delivery", workshopMeta.deliveryMode, y)
  y = addLabelValue(doc, "Audience", workshopMeta.primaryAudience, y)
  y = addLabelValue(doc, "Resource person", workshopMeta.resourcePerson, y)
  y = addSectionHeading(doc, "Learning outcomes", y + 5)
  y = addBullets(doc, workshopMeta.learningOutcomes, y, { numbered: true })
  y = addSectionHeading(doc, "What to bring", y + 4)
  y = addBullets(doc, workshopMeta.devices, y)
  y = addSectionHeading(doc, "Tools introduced", y + 4)
  y = addParagraph(doc, workshopMeta.tools.join("  |  "), y, { bold: true, color: colors.blue })
  y = addSectionHeading(doc, "Before the event", y + 4)
  y = addBullets(doc, workshopMeta.prerequisites, y)
  y = addParagraph(doc, `Miro team invitation: ${workshopMeta.miroTeamInviteUrl}`, y + 1, {
    fontSize: 7.5,
    color: colors.blue,
  })

  // Program table
  doc.addPage()
  addSectionHeading(doc, "Program of activities", TOP)
  autoTable(doc, {
    startY: 35,
    margin: { left: MARGIN_X, right: MARGIN_X, top: TOP, bottom: 20 },
    head: [["Time", "Activity and topics", "Facilitator / Resource person"]],
    body: scheduleItems.map((item) => [
      pdfText(item.time),
      pdfText([item.title, ...item.description.map((point) => `- ${point}`)].join("\n")),
      pdfText(item.facilitator),
    ]),
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 7.6,
      cellPadding: 3,
      lineColor: [...colors.lightSlate],
      lineWidth: 0.25,
      textColor: [...colors.slate],
      valign: "top",
      overflow: "linebreak",
    },
    headStyles: {
      fillColor: [...colors.navy],
      textColor: [...colors.white],
      fontStyle: "bold",
      fontSize: 8,
    },
    columnStyles: {
      0: { cellWidth: 27, fontStyle: "bold", textColor: [...colors.navy] },
      1: { cellWidth: 94 },
      2: { cellWidth: 53 },
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  })

  moduleOrder.forEach((slug, index) => addModule(doc, moduleDetails[slug], index + 1))

  const totalPages = doc.getNumberOfPages()
  for (let page = 2; page <= totalPages; page += 1) {
    doc.setPage(page)
    doc.setDrawColor(...colors.lightSlate)
    doc.setLineWidth(0.25)
    doc.line(MARGIN_X, 284, PAGE_WIDTH - MARGIN_X, 284)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    setTextColor(doc, [100, 116, 139])
    doc.text(pdfText(workshopMeta.shortTitle), MARGIN_X, 290)
    doc.text(`Program & Module Guide  |  ${page} of ${totalPages}`, PAGE_WIDTH - MARGIN_X, 290, {
      align: "right",
    })
  }

  doc.save("ARV-Workshop-2026-Program-and-Modules.pdf")
}
