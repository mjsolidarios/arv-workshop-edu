export interface PrintableMarker {
  id: string
  title: string
  /** Path under public/, e.g. /markers/plant-01-leaf.png */
  src: string
  filename: string
  /** Suggested print size edge length */
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
  sheetSrc: string
  sheetFilename: string
  markers: PrintableMarker[]
}

export const printTips = [
  "Print at 100% scale (no “fit to page”) on matte paper when possible.",
  "Each individual marker is designed to print about 10–12 cm on a side; the 2×2 sheets are letter/A4 friendly when scaled to fit.",
  "Cut cleanly along the outer border. Avoid glossy laminate—reflections hurt image tracking.",
  "Test each marker in classroom lighting before the session; move closer or print larger if tracking is weak.",
  "Register the same PNG files you printed as Encantar.js reference images (do not re-photograph a low-quality print when you can use the file).",
  "History markers use practice site names only—replace narratives with faculty-verified local sources before assessing students.",
]

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
    markers: [
      {
        id: "plant-01",
        title: "Leaf",
        src: "/markers/plant-01-leaf.png",
        filename: "plant-01-leaf.png",
        printSizeCm: 12,
        description: "Asymmetric leaf with vein detail and a palisade cross-section cue card.",
        learningCue: "Connect visible mesophyll arrangement to light capture.",
      },
      {
        id: "plant-02",
        title: "Stem",
        src: "/markers/plant-02-stem.png",
        filename: "plant-02-stem.png",
        printSizeCm: 12,
        description: "Stem cross-section with uneven vascular bundles and pith.",
        learningCue: "Distinguish xylem vs phloem roles from visible position.",
      },
      {
        id: "plant-03",
        title: "Root",
        src: "/markers/plant-03-root.png",
        filename: "plant-03-root.png",
        printSizeCm: 12,
        description: "Branching root with irregular root-hair clusters for tracking detail.",
        learningCue: "Link surface area of root hairs to water uptake.",
      },
      {
        id: "plant-04",
        title: "Flower",
        src: "/markers/plant-04-flower.png",
        filename: "plant-04-flower.png",
        printSizeCm: 12,
        description: "Seven-petal asymmetric flower with central reproductive cues.",
        learningCue: "Ask how form supports pollination in your course context.",
      },
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
    markers: [
      {
        id: "history-01",
        title: "Town Plaza",
        src: "/markers/history-01-plaza.png",
        filename: "history-01-plaza.png",
        printSizeCm: 12,
        description: "Plaza cartouche with compass rose and radial path detail.",
        learningCue: "Practice station for community gathering places.",
      },
      {
        id: "history-02",
        title: "River Bridge",
        src: "/markers/history-02-bridge.png",
        filename: "history-02-bridge.png",
        printSizeCm: 12,
        description: "Bridge and river path with unique span geometry.",
        learningCue: "Practice station for mobility, trade, or flood narratives.",
      },
      {
        id: "history-03",
        title: "Campus Gate",
        src: "/markers/history-03-gate.png",
        filename: "history-03-gate.png",
        printSizeCm: 12,
        description: "Gate façade with tile pattern and silhouette landmarks.",
        learningCue: "Practice station for institutional or campus heritage.",
      },
      {
        id: "history-04",
        title: "Market Hall",
        src: "/markers/history-04-market.png",
        filename: "history-04-market.png",
        printSizeCm: 12,
        description: "Market street silhouette with roof and stall variation.",
        learningCue: "Practice station for everyday economic life.",
      },
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
    markers: [
      {
        id: "art-01",
        title: "Contrast Study A",
        src: "/markers/art-01-practice.png",
        filename: "art-01-practice.png",
        printSizeCm: 12,
        description: "Dense abstract composition emphasizing value contrast.",
        learningCue: "Describe formal contrast before interpretive claims.",
      },
      {
        id: "art-02",
        title: "Rhythm Study B",
        src: "/markers/art-02-practice.png",
        filename: "art-02-practice.png",
        printSizeCm: 12,
        description: "Repeated shapes and line rhythms for reliable tracking.",
        learningCue: "Analyze rhythm and movement across the picture plane.",
      },
      {
        id: "art-03",
        title: "Balance Study C",
        src: "/markers/art-03-practice.png",
        filename: "art-03-practice.png",
        printSizeCm: 12,
        description: "Asymmetric balance study with overlapping forms.",
        learningCue: "Justify balance decisions using visible evidence.",
      },
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
    markers: [
      {
        id: "practice-01",
        title: "Alpha pattern",
        src: "/markers/practice-01.png",
        filename: "practice-01.png",
        printSizeCm: 12,
        description: "Dense mixed-shape field with orange polygon overlay.",
        learningCue: "Confirm camera permission, lighting, and target-found events.",
      },
      {
        id: "practice-02",
        title: "Beta pattern",
        src: "/markers/practice-02.png",
        filename: "practice-02.png",
        printSizeCm: 12,
        description: "Alternate dense pattern for multi-target registration tests.",
        learningCue: "Practice switching between two registered images.",
      },
      {
        id: "practice-03",
        title: "Gamma pattern",
        src: "/markers/practice-03.png",
        filename: "practice-03.png",
        printSizeCm: 12,
        description: "Third unique practice field for station rotations.",
        learningCue: "Use when a primary target fails under glare.",
      },
    ],
  },
]
