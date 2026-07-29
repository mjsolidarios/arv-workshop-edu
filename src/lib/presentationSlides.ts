import {
  moduleDetails,
  moduleOrder,
  scheduleItems,
  workshopMeta,
  type ModuleDetail,
  type SamplePrompt,
  type WorkedExample,
} from "@/data/workshop"

export type PresentationSlide =
  | {
      id: string
      kind: "title"
      kicker: string
      title: string
      subtitle: string
      meta: string[]
    }
  | {
      id: string
      kind: "overview"
      title: string
      body: string
      bullets?: string[]
      /** 0-based index of the first agenda item on this slide (continued numbering). */
      bulletsStart?: number
    }
  | {
      id: string
      kind: "section"
      kicker: string
      title: string
      description?: string
    }
  | {
      id: string
      kind: "bullets"
      kicker?: string
      title: string
      bullets: string[]
      footer?: string
    }
  | {
      id: string
      kind: "numbered"
      kicker?: string
      title: string
      items: { label: string; text: string }[]
    }
  | {
      id: string
      kind: "example"
      kicker: string
      title: string
      subject: string
      /** Omitted on continuation slides that only show steps or materials. */
      learners?: string
      competency?: string
      interaction: string
      gameElements: string[]
      howItWorks: string[]
      /** 0-based index of the first step on this slide (for continued numbering). */
      howItWorksStart?: number
      aiRole?: string
      materials: string[]
    }
  | {
      id: string
      kind: "prompt"
      kicker: string
      title: string
      useFor: string
      /** Prompt fragment shown on this slide (may be one part of a split). */
      prompt: string
      /** Complete original prompt for copy-to-clipboard (all parts). */
      fullPrompt: string
    }
  | {
      id: string
      kind: "two-column"
      kicker?: string
      title: string
      leftTitle: string
      left: string[]
      rightTitle: string
      right: string[]
    }
  | {
      id: string
      kind: "closing"
      title: string
      bullets: string[]
      nextLabel?: string
      nextTitle?: string
    }

export interface PresentationDeck {
  slug: string
  title: string
  shortTitle: string
  time: string
  kindLabel: string
  overview: string
  slideCount: number
  slides: PresentationSlide[]
}

/** Keep slides sparse so large type remains readable from the back of the room. */
const MAX_BULLETS = 4
const MAX_HOW_IT_WORKS = 3
const MAX_AGENDA = 4
/**
 * Soft cap for prompt text per slide at projector body scale
 * (matches large deck type: ~text-xl → text-3xl).
 */
const MAX_PROMPT_CHARS = 360

function chunk<T>(items: T[], size: number): T[][] {
  if (items.length === 0) return [[]]
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size))
  }
  return out
}

function partLabel(index: number, total: number): string {
  return total > 1 ? ` (${index + 1}/${total})` : ""
}

/** Split long prompt text into continuation-sized chunks at natural breaks. */
function splitPromptText(text: string, maxChars = MAX_PROMPT_CHARS): string[] {
  const normalized = text.replace(/\r\n/g, "\n").trim()
  if (normalized.length <= maxChars) return [normalized]

  const chunks: string[] = []
  let remaining = normalized

  while (remaining.length > maxChars) {
    const window = remaining.slice(0, maxChars)
    const breakAt = Math.max(
      window.lastIndexOf("\n\n"),
      window.lastIndexOf("\n"),
      window.lastIndexOf(". "),
      window.lastIndexOf("; "),
      window.lastIndexOf(", "),
      window.lastIndexOf(" ")
    )
    const cut = breakAt > maxChars * 0.4 ? breakAt + 1 : maxChars
    chunks.push(remaining.slice(0, cut).trim())
    remaining = remaining.slice(cut).trim()
  }
  if (remaining) chunks.push(remaining)
  return chunks.length > 0 ? chunks : [normalized]
}

function shortTitle(title: string): string {
  return title
    .replace(/^Session \d+:\s*/i, "")
    .replace(/^Open Forum and\s*/i, "Forum: ")
    .replace(/^Hands-on Demonstration:\s*/i, "Hands-on: ")
    .replace(/^Workshop:\s*/i, "Workshop: ")
    .replace(/^Presentation and Demonstration of Outputs$/i, "Output Presentations")
}

function kindLabelFor(slug: string): string {
  const item = scheduleItems.find((s) => s.moduleSlug === slug)
  switch (item?.kind) {
    case "session":
      return "Session"
    case "forum":
      return "Open Forum"
    case "hands-on":
      return "Hands-on Demo"
    case "workshop":
      return "Workshop"
    case "presentation":
      return "Showcase"
    default:
      return "Module"
  }
}

function agendaFor(module: ModuleDetail): string[] {
  const items: string[] = ["Context & learning objectives"]
  for (const topic of module.topics) {
    items.push(topic.heading)
  }
  if (module.workedExamples?.length) items.push("Worked classroom examples")
  if (module.samplePrompts?.length) items.push("Sample AI prompts")
  if (module.tryThis?.length) items.push("Try-this tasks")
  items.push("Key takeaways")
  return items
}

function pushBulletSlides(
  slides: PresentationSlide[],
  baseId: string,
  title: string,
  bullets: string[],
  options?: { kicker?: string; footer?: string; max?: number }
) {
  const max = options?.max ?? MAX_BULLETS
  const groups = chunk(bullets, max)
  groups.forEach((group, index) => {
    const part = partLabel(index, groups.length)
    const continued = index > 0 ? " · continued" : ""
    slides.push({
      id: `${baseId}-${index + 1}`,
      kind: "bullets",
      kicker: options?.kicker
        ? `${options.kicker}${continued}`
        : index > 0
          ? "Continued"
          : undefined,
      title: `${title}${part}`,
      bullets: group,
      // Footer only on the last part so it is not repeated mid-list.
      footer: index === groups.length - 1 ? options?.footer : undefined,
    })
  })
}

function buildExampleSlides(
  slides: PresentationSlide[],
  examples: WorkedExample[],
  slug: string
) {
  examples.forEach((example, index) => {
    const baseKicker = `Worked example ${index + 1} of ${examples.length}`
    const baseId = `${slug}-example-${index + 1}`
    const stepGroups = chunk(example.howItWorks, MAX_HOW_IT_WORKS)
    const hasMaterials = example.materials.length > 0

    // Context slide — learners, competency, AI role (never cramped with steps).
    slides.push({
      id: `${baseId}-context`,
      kind: "example",
      kicker: baseKicker,
      title: example.title,
      subject: example.subject,
      learners: example.learners,
      competency: example.competency,
      interaction: example.interaction,
      gameElements: example.gameElements,
      howItWorks: [],
      aiRole: example.aiRole,
      materials: [],
    })

    // How-it-works continuation slides — limited steps so type stays large.
    stepGroups.forEach((steps, groupIndex) => {
      if (steps.length === 0) return
      const part = partLabel(groupIndex, stepGroups.length)
      slides.push({
        id: `${baseId}-steps-${groupIndex + 1}`,
        kind: "example",
        kicker: `${baseKicker} · How it works${part}`,
        title: example.title,
        subject: example.subject,
        interaction: example.interaction,
        gameElements: example.gameElements,
        howItWorks: steps,
        howItWorksStart: groupIndex * MAX_HOW_IT_WORKS,
        materials: [],
      })
    })

    // Materials on its own continuation slide when present.
    if (hasMaterials) {
      slides.push({
        id: `${baseId}-materials`,
        kind: "example",
        kicker: `${baseKicker} · Materials`,
        title: example.title,
        subject: example.subject,
        interaction: example.interaction,
        gameElements: example.gameElements,
        howItWorks: [],
        materials: example.materials,
      })
    }
  })
}

function buildPromptSlides(
  slides: PresentationSlide[],
  prompts: SamplePrompt[],
  slug: string
) {
  prompts.forEach((prompt, index) => {
    const fullPrompt = prompt.prompt
    const parts = splitPromptText(fullPrompt)
    parts.forEach((text, partIndex) => {
      const continued = partIndex > 0 ? " · continued" : ""
      const part = partLabel(partIndex, parts.length)
      slides.push({
        id: `${slug}-prompt-${index + 1}-${partIndex + 1}`,
        kind: "prompt",
        kicker: `Sample prompt ${index + 1} of ${prompts.length}${continued}${part}`,
        title: prompt.title,
        useFor: prompt.useFor,
        prompt: text,
        fullPrompt,
      })
    })
  })
}

function neighborTitles(slug: string) {
  const index = moduleOrder.indexOf(slug as (typeof moduleOrder)[number])
  const nextSlug =
    index >= 0 && index < moduleOrder.length - 1
      ? moduleOrder[index + 1]
      : undefined
  if (!nextSlug) return { nextLabel: undefined, nextTitle: undefined }
  const next = moduleDetails[nextSlug]
  return {
    nextLabel: "Up next",
    nextTitle: next ? shortTitle(next.title) : undefined,
  }
}

export function buildPresentationDeck(slug: string): PresentationDeck | undefined {
  const module = moduleDetails[slug]
  if (!module) return undefined

  const slides: PresentationSlide[] = []
  const kindLabel = kindLabelFor(slug)
  const schedule = scheduleItems.find((s) => s.moduleSlug === slug)

  slides.push({
    id: `${slug}-title`,
    kind: "title",
    // Full training title — same string as the website hero (workshopMeta.title).
    kicker: workshopMeta.title,
    title: module.title,
    subtitle: module.overview,
    meta: [
      kindLabel,
      module.time,
      workshopMeta.venue,
      workshopMeta.resourcePerson,
      workshopMeta.date,
    ],
  })

  // Overview body alone, then agenda cards in sparse continuation slides.
  slides.push({
    id: `${slug}-overview`,
    kind: "overview",
    title: "What this block covers",
    body: module.overview,
  })
  const agenda = agendaFor(module)
  const agendaGroups = chunk(agenda, MAX_AGENDA)
  agendaGroups.forEach((group, index) => {
    const part = partLabel(index, agendaGroups.length)
    slides.push({
      id: `${slug}-overview-agenda-${index + 1}`,
      kind: "overview",
      title:
        index === 0
          ? `Agenda for this block${part}`
          : `Agenda · continued${part}`,
      body: "",
      bullets: group,
      bulletsStart: index * MAX_AGENDA,
    })
  })

  slides.push({
    id: `${slug}-objectives-section`,
    kind: "section",
    kicker: "Learning design",
    title: "Learning objectives",
    description:
      "By the end of this block, participants should be able to do the following.",
  })

  pushBulletSlides(slides, `${slug}-objectives`, "By the end of this block", module.objectives, {
    kicker: "Objectives",
  })

  if (module.tools?.length) {
    slides.push({
      id: `${slug}-tools`,
      kind: "bullets",
      kicker: "Toolkit",
      title: "Tools used in this block",
      bullets: module.tools,
      footer: "Prefer free or freemium accounts and browser-based demos when possible.",
    })
  }

  module.topics.forEach((topic, topicIndex) => {
    slides.push({
      id: `${slug}-topic-${topicIndex + 1}-section`,
      kind: "section",
      kicker: `Topic ${topicIndex + 1} of ${module.topics.length}`,
      title: topic.heading,
    })

    pushBulletSlides(
      slides,
      `${slug}-topic-${topicIndex + 1}`,
      topic.heading,
      topic.points,
      { kicker: "Key points" }
    )
  })

  if (module.workedExamples?.length) {
    slides.push({
      id: `${slug}-examples-section`,
      kind: "section",
      kicker: "Classroom transfer",
      title: "Worked examples",
      description:
        "Concrete activity patterns you can adapt to your subject and learners.",
    })
    buildExampleSlides(slides, module.workedExamples, slug)
  }

  if (module.samplePrompts?.length) {
    slides.push({
      id: `${slug}-prompts-section`,
      kind: "section",
      kicker: "AI support",
      title: "Sample prompts",
      description:
        "Copy, adapt, and verify. Faculty remain accountable for accuracy and appropriateness.",
    })
    buildPromptSlides(slides, module.samplePrompts, slug)
  }

  if (module.tryThis?.length) {
    slides.push({
      id: `${slug}-try-section`,
      kind: "section",
      kicker: "Practice",
      title: "Try this now",
      description: "Short tasks participants can complete during or right after the block.",
    })
    pushBulletSlides(slides, `${slug}-try`, "Try this", module.tryThis, {
      kicker: "Action",
    })
  }

  if (module.references?.length) {
    pushBulletSlides(
      slides,
      `${slug}-refs`,
      "Useful references",
      module.references.map((ref) => `${ref.label} — ${ref.note}`),
      { kicker: "Resources", max: 4 }
    )
  }

  // Closing takeaways synthesized from first objectives and schedule description
  const takeaways = [
    ...module.objectives.slice(0, 3),
    ...(schedule?.description.slice(0, 2) ?? []),
  ].slice(0, 8)

  const { nextLabel, nextTitle } = neighborTitles(slug)
  const closingBullets =
    takeaways.length > 0
      ? takeaways
      : [
          "Keep the course learning outcome first.",
          "Use camera interaction only when it strengthens the task.",
          "Review every AI-generated artifact before class use.",
        ]
  const closingGroups = chunk(closingBullets, MAX_BULLETS)
  closingGroups.forEach((group, index) => {
    const part = partLabel(index, closingGroups.length)
    const isLast = index === closingGroups.length - 1
    slides.push({
      id: `${slug}-closing-${index + 1}`,
      kind: "closing",
      title:
        index === 0
          ? `Key takeaways${part}`
          : `Key takeaways · continued${part}`,
      bullets: group,
      nextLabel: isLast ? nextLabel : undefined,
      nextTitle: isLast ? nextTitle : undefined,
    })
  })

  return {
    slug,
    title: module.title,
    shortTitle: shortTitle(module.title),
    time: module.time,
    kindLabel,
    overview: module.overview,
    slideCount: slides.length,
    slides,
  }
}

export function listPresentationDecks(): PresentationDeck[] {
  return moduleOrder
    .map((slug) => buildPresentationDeck(slug))
    .filter((deck): deck is PresentationDeck => Boolean(deck))
}

export function getPresentationNeighbors(slug: string) {
  const index = moduleOrder.indexOf(slug as (typeof moduleOrder)[number])
  if (index === -1) return { prev: undefined, next: undefined }
  const prevSlug = index > 0 ? moduleOrder[index - 1] : undefined
  const nextSlug = index < moduleOrder.length - 1 ? moduleOrder[index + 1] : undefined
  return {
    prev: prevSlug ? buildPresentationDeck(prevSlug) : undefined,
    next: nextSlug ? buildPresentationDeck(nextSlug) : undefined,
  }
}
