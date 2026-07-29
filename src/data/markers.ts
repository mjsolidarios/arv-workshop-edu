export interface PrintableMarker {
  id: string
  title: string
  /** Square marker PNG for registration / preview */
  src: string
  filename: string
  /** Full letter page with one marker — no scissors needed */
  pageSrc: string
  pageFilename: string
  /** Suggested print size edge length of the square target */
  printSizeCm: number
  description: string
  learningCue: string
}

export interface MarkerSet {
  id: string
  title: string
  exampleId: string
  exampleTitle: string
  subject: string
  relatedModule: string
  summary: string
  /** Optional 2×2 sheet (requires cutting) */
  sheetSrc: string
  sheetFilename: string
  /** Multi-page PDF: one full page per marker (no cutting) */
  packSrc: string
  packFilename: string
  markers: PrintableMarker[]
}

export const printTips = [
  "Prefer full-page markers when you have no scissors: print each page and place the whole sheet at the station.",
  "Print at 100% scale (no “fit to page”) on matte paper when possible. Avoid glossy laminate—reflections hurt tracking.",
  "The square target on each full page is about 15–16 cm on a letter sheet — large enough for phone scanning from 30–60 cm.",
  "If you do have scissors, the compact 2×2 sheets save paper; cut along the borders before class.",
  "Register the original square PNG files (not a phone photo of the print) as Encantar.js reference images.",
  "Test each marker in classroom lighting before the session; move closer or reprint larger if tracking is weak.",
  "History markers use practice site names only—replace narratives with faculty-verified local sources before assessing students.",
]

function marker(
  id: string,
  title: string,
  file: string,
  description: string,
  learningCue: string
): PrintableMarker {
  return {
    id,
    title,
    src: `/markers/${file}`,
    filename: file,
    pageSrc: `/markers/page-${file}`,
    pageFilename: `page-${file}`,
    printSizeCm: 12,
    description,
    learningCue,
  }
}

export const markerSets: MarkerSet[] = [
  {
    id: "plant-anatomy",
    title: "Plant anatomy stations",
    exampleId: "scan-plant-parts",
    exampleTitle: "Scan-to-Analyze Plant Anatomy",
    subject: "Biology / Agriculture",
    relatedModule: "hands-on",
    summary:
      "Four asymmetrical specimen-style targets for a structure–function AR lab review. Pair with evidence tables and transfer questions.",
    sheetSrc: "/markers/sheet-plant-anatomy.png",
    sheetFilename: "sheet-plant-anatomy.png",
    packSrc: "/markers/pack-plant-anatomy.pdf",
    packFilename: "pack-plant-anatomy.pdf",
    markers: [
      marker(
        "plant-01",
        "Leaf",
        "plant-01-leaf.png",
        "Asymmetric leaf with vein detail and a palisade cross-section cue card.",
        "Connect visible mesophyll arrangement to light capture."
      ),
      marker(
        "plant-02",
        "Stem",
        "plant-02-stem.png",
        "Stem cross-section with uneven vascular bundles and pith.",
        "Distinguish xylem vs phloem roles from visible position."
      ),
      marker(
        "plant-03",
        "Root",
        "plant-03-root.png",
        "Branching root with irregular root-hair clusters for tracking detail.",
        "Link surface area of root hairs to water uptake."
      ),
      marker(
        "plant-04",
        "Flower",
        "plant-04-flower.png",
        "Seven-petal asymmetric flower with central reproductive cues.",
        "Ask how form supports pollination in your course context."
      ),
    ],
  },
  {
    id: "local-history",
    title: "Local history map spots",
    exampleId: "ar-local-history",
    exampleTitle: "AR Local History Spots",
    subject: "Philippine History / Social Science",
    relatedModule: "session-2",
    summary:
      "Four map-style practice targets for a room scavenger exhibit. Swap in faculty-verified local site names and sources before graded use.",
    sheetSrc: "/markers/sheet-local-history.png",
    sheetFilename: "sheet-local-history.png",
    packSrc: "/markers/pack-local-history.pdf",
    packFilename: "pack-local-history.pdf",
    markers: [
      marker(
        "history-01",
        "Town Plaza",
        "history-01-plaza.png",
        "Plaza cartouche with compass rose and radial path detail.",
        "Practice station for community gathering places."
      ),
      marker(
        "history-02",
        "River Bridge",
        "history-02-bridge.png",
        "Bridge and river path with unique span geometry.",
        "Practice station for mobility, trade, or flood narratives."
      ),
      marker(
        "history-03",
        "Campus Gate",
        "history-03-gate.png",
        "Gate façade with tile pattern and silhouette landmarks.",
        "Practice station for institutional or campus heritage."
      ),
      marker(
        "history-04",
        "Market Hall",
        "history-04-market.png",
        "Market street silhouette with roof and stall variation.",
        "Practice station for everyday economic life."
      ),
    ],
  },
  {
    id: "art-practice",
    title: "Art gallery practice targets",
    exampleId: "art-ar-gallery",
    exampleTitle: "Pocket AR Mini-Gallery",
    subject: "Arts",
    relatedModule: "session-2",
    summary:
      "High-detail abstract practice images when student artworks are not ready—or as backup targets if an artwork fails tracking tests.",
    sheetSrc: "/markers/sheet-art-and-practice.png",
    sheetFilename: "sheet-art-and-practice.png",
    packSrc: "/markers/pack-art-practice.pdf",
    packFilename: "pack-art-practice.pdf",
    markers: [
      marker(
        "art-01",
        "Contrast Study A",
        "art-01-practice.png",
        "Dense abstract composition emphasizing value contrast.",
        "Describe formal contrast before interpretive claims."
      ),
      marker(
        "art-02",
        "Rhythm Study B",
        "art-02-practice.png",
        "Repeated shapes and line rhythms for reliable tracking.",
        "Analyze rhythm and movement across the picture plane."
      ),
      marker(
        "art-03",
        "Balance Study C",
        "art-03-practice.png",
        "Asymmetric balance study with overlapping forms.",
        "Justify balance decisions using visible evidence."
      ),
    ],
  },
  {
    id: "workshop-practice",
    title: "Hands-on Encantar practice set",
    exampleId: "scan-plant-parts",
    exampleTitle: "Interactive image-tracking demo",
    subject: "All subjects",
    relatedModule: "hands-on",
    summary:
      "High-frequency black-and-white patterns for first Encantar.js tests during the morning hands-on block.",
    sheetSrc: "/markers/sheet-workshop-practice.png",
    sheetFilename: "sheet-workshop-practice.png",
    packSrc: "/markers/pack-workshop-practice.pdf",
    packFilename: "pack-workshop-practice.pdf",
    markers: [
      marker(
        "practice-01",
        "Alpha pattern",
        "practice-01.png",
        "Dense mixed-shape field with orange polygon overlay.",
        "Confirm camera permission, lighting, and target-found events."
      ),
      marker(
        "practice-02",
        "Beta pattern",
        "practice-02.png",
        "Alternate dense pattern for multi-target registration tests.",
        "Practice switching between two registered images."
      ),
      marker(
        "practice-03",
        "Gamma pattern",
        "practice-03.png",
        "Third unique practice field for station rotations.",
        "Use when a primary target fails under glare."
      ),
    ],
  },
]
