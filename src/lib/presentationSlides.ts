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
      learners: string
      competency: string
      interaction: string
      gameElements: string[]
      howItWorks: string[]
      aiRole: string
      materials: string[]
    }
  | {
      id: string
      kind: "prompt"
      kicker: string
      title: string
      useFor: string
      prompt: string
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

const MAX_BULLETS = 5

function chunk<T>(items: T[], size: number): T[][] {
  if (items.length === 0) return [[]]
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size))
  }
  return out
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
  if (module.tips?.length) items.push("Facilitator tips")
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
    const part =
      groups.length > 1 ? ` (${index + 1}/${groups.length})` : ""
    slides.push({
      id: `${baseId}-${index + 1}`,
      kind: "bullets",
      kicker: options?.kicker,
      title: `${title}${part}`,
      bullets: group,
      footer: options?.footer,
    })
  })
}

function buildExampleSlides(
  slides: PresentationSlide[],
  examples: WorkedExample[],
  slug: string
) {
  examples.forEach((example, index) => {
    slides.push({
      id: `${slug}-example-${index + 1}`,
      kind: "example",
      kicker: `Worked example ${index + 1} of ${examples.length}`,
      title: example.title,
      subject: example.subject,
      learners: example.learners,
      competency: example.competency,
      interaction: example.interaction,
      gameElements: example.gameElements,
      howItWorks: example.howItWorks,
      aiRole: example.aiRole,
      materials: example.materials,
    })
  })
}

function buildPromptSlides(
  slides: PresentationSlide[],
  prompts: SamplePrompt[],
  slug: string
) {
  prompts.forEach((prompt, index) => {
    slides.push({
      id: `${slug}-prompt-${index + 1}`,
      kind: "prompt",
      kicker: `Sample prompt ${index + 1} of ${prompts.length}`,
      title: prompt.title,
      useFor: prompt.useFor,
      prompt: prompt.prompt,
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
    kicker: `${workshopMeta.shortTitle} · ${kindLabel}`,
    title: module.title,
    subtitle: module.overview,
    meta: [
      module.time,
      workshopMeta.venue,
      workshopMeta.resourcePerson,
      workshopMeta.date,
    ],
  })

  slides.push({
    id: `${slug}-overview`,
    kind: "overview",
    title: "What this block covers",
    body: module.overview,
    bullets: agendaFor(module).slice(0, 8),
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

  if (module.tips?.length) {
    slides.push({
      id: `${slug}-tips-section`,
      kind: "section",
      kicker: "Facilitation",
      title: "Tips for running this block",
    })
    pushBulletSlides(slides, `${slug}-tips`, "Facilitator tips", module.tips, {
      kicker: "Tips",
    })
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
  ].slice(0, 5)

  const { nextLabel, nextTitle } = neighborTitles(slug)

  slides.push({
    id: `${slug}-closing`,
    kind: "closing",
    title: "Key takeaways",
    bullets:
      takeaways.length > 0
        ? takeaways
        : [
            "Keep the course learning outcome first.",
            "Use camera interaction only when it strengthens the task.",
            "Review every AI-generated artifact before class use.",
          ],
    nextLabel,
    nextTitle,
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
