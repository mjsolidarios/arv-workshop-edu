export const workshopMeta = {
  title: "Gamified Learning Using Augmented Reality, Motion-Based Interaction, and Generative AI",
  shortTitle: "ARV Workshop 2026",
  date: "July 30, 2026",
  day: "Thursday",
  eventType: "Faculty Training / Workshop",
  primaryAudience: "Teachers and faculty members, including non-ICT participants",
  deliveryMode: "Face-to-face, hands-on",
  venue: "WVSU Calinog Campus",
  resourcePerson: "Mr. Mark Joseph J. Solidarios",
  devices: [
    "Laptop with webcam",
    "Smartphone with camera",
  ],
  tools: [
    "Google Stitch",
    "Google AI Studio",
    "Encantar.js",
    "Three.js",
    "PixiJS",
    "Pixi3D",
    "Google MediaPipe",
    "Miro",
  ],
  prerequisites: [
    "Create a free Miro account at miro.com before the event.",
    "Sign in to Miro on the laptop or smartphone you will use during the workshop.",
    "Join the workshop Miro team using the invite link below.",
  ],
  miroTeamInviteUrl:
    "https://miro.com/welcome/TG92Q0VDdHRIS0IxZkF2ay9aNk14TmtyV1cxQS94d3R4Nzk5N3phNStJdVJ6ZmFBMVFnTk02bTlVYS9Na3U0eVVZdk4xcTlqQUhhZnVoSVRQZkNNeEduMkRBOWQ5VEIvTUZlTXdoeUVLMlVJMk9oUisyVWFjeXRBeXlJcEVzZ3h3VHhHVHd5UWtSM1BidUtUYmxycDRnPT0hdjE=?share_link_id=957468752750",
  learningOutcomes: [
    "Differentiate gamified learning from game-based learning and apply core game elements to a real lesson.",
    "Design a simple camera-based activity using AR markers, gestures, or body poses.",
    "Use Google Stitch to plan an accessible app interface and Google AI Studio to develop the working classroom app and its content.",
    "Produce a demonstrable output (working demo, prototype, activity guide, or storyboard) ready for classroom try-out.",
  ],
}

export interface ScheduleItem {
  id: string
  time: string
  title: string
  facilitator: string
  description: string[]
  isBreak?: boolean
  moduleSlug?: string
  kind?: "session" | "forum" | "hands-on" | "workshop" | "presentation" | "ceremony"
}

export const scheduleItems: ScheduleItem[] = [
  {
    id: "registration",
    time: "8:00–8:30 AM",
    title: "Registration",
    facilitator: "Secretariat",
    description: [],
    isBreak: true,
    kind: "ceremony",
  },
  {
    id: "opening",
    time: "8:30–9:00 AM",
    title: "Opening Program",
    facilitator: "Dr. Rosario Clarabel Contreras-Leda, Campus Administrator\nDr. Marie Candy L. Celeste, Director of Academic Affairs",
    description: [
      "National Anthem",
      "Prayer",
      "WVSU Hymn",
      "Calinog Hymn",
      "Opening Remarks",
      "Rationale and Overview of the Training",
    ],
    kind: "ceremony",
  },
  {
    id: "session-1",
    time: "9:00–10:00 AM",
    title: "Session 1: Introduction to Gamified, Augmented Reality, and Motion-Based Learning",
    facilitator: "Mr. Mark Joseph J. Solidarios",
    moduleSlug: "session-1",
    kind: "session",
    description: [
      "Understanding gamified learning and game-based learning",
      "Using challenges, points, rewards, feedback, and progress to motivate learners",
      "Understanding augmented reality and its possible classroom uses",
      "Using camera models to locate hand, face, and body landmarks—and adding rules that turn landmarks into interactions",
      "Using laptops and smartphones as interactive learning tools",
      "Using generative AI to develop lesson ideas, questions, instructions, stories, and activities",
      "Responsible, safe, accessible, and appropriate use of cameras and AI in the classroom",
    ],
  },
  {
    id: "open-forum-1",
    time: "10:00–10:30 AM",
    title: "Open Forum and Guided Discussion (Miro)",
    facilitator: "Mr. Mark Joseph J. Solidarios",
    moduleSlug: "open-forum-1",
    kind: "forum",
    description: [
      "Participants will share their ideas, experiences, questions, and possible classroom applications related to gamified learning, augmented reality, motion-based interaction, and generative AI.",
    ],
  },
  {
    id: "hands-on",
    time: "10:30 AM–12:00 PM",
    title: "Hands-on Demonstration: Creating Interactive Learning Activities Using Laptops and Smartphones",
    facilitator: "Mr. Mark Joseph J. Solidarios",
    moduleSlug: "hands-on",
    kind: "hands-on",
    description: [
      "Overview of the steps in creating a simple interactive learning activity",
      "Using Google Stitch to plan the user flow and design the app interface",
      "Using Google AI Studio to develop the AR and vision-controlled learning apps, including their lesson content and interface",
      "Creating simple activities in which digital objects appear through a smartphone camera",
      "Adding pictures, characters, animations, and learning materials",
      "Using laptop webcams or smartphone cameras to recognize hand gestures and body movements",
      "Demonstration of activities controlled through movement, gestures, or printed images",
      "Testing the activities on laptops and smartphones",
      "Exploring possible applications in different subjects",
    ],
  },
  {
    id: "lunch",
    time: "12:00–1:00 PM",
    title: "Lunch Break",
    facilitator: "—",
    description: [],
    isBreak: true,
    kind: "ceremony",
  },
  {
    id: "session-2",
    time: "1:00–2:00 PM",
    title: "Session 2: Designing Meaningful Gamified Learning Activities with AI",
    facilitator: "Mr. Mark Joseph J. Solidarios",
    moduleSlug: "session-2",
    kind: "session",
    description: [
      "Connecting learning outcomes with game objectives and challenges",
      "Designing simple rules, points, levels, rewards, and feedback",
      "Making activities enjoyable while keeping the lesson meaningful",
      "Using augmented reality and body movements to encourage participation",
      "Designing activities that use hand gestures, body poses, or tracked reference images",
      "Using generative AI to prepare questions, stories, hints, instructions, and feedback",
      "Choosing the appropriate device and activity based on the subject and learners",
      "Examples of possible applications in language, science, mathematics, social studies, arts, physical education, and other disciplines",
    ],
  },
  {
    id: "open-forum-2",
    time: "2:00–2:30 PM",
    title: "Open Forum and Project Consultation (Miro)",
    facilitator: "Mr. Mark Joseph J. Solidarios",
    moduleSlug: "open-forum-2",
    kind: "forum",
    description: [
      "Participants will share their proposed activity ideas, ask questions, and refine their concepts before the workshop.",
    ],
  },
  {
    id: "workshop",
    time: "2:30–3:30 PM",
    title: "Workshop: Developing a Gamified Learning Activity Using a Laptop and Smartphone",
    facilitator: "Mr. Mark Joseph J. Solidarios",
    moduleSlug: "workshop",
    kind: "workshop",
    description: [
      "Identify a course topic, course learning outcome, or teaching-and-learning concern",
      "Identify the target learners and expected learning outcome",
      "Design a simple game objective, challenge, rules, and reward system",
      "Use Google Stitch to plan the app screens, user flow, and visual design",
      "Use Google AI Studio to develop the AR or vision-controlled app and generate its questions, instructions, and activity content",
      "Create a simple activity using the provided guide or template",
      "Use a smartphone camera to display digital learning materials in the real environment",
      "Use a laptop webcam or smartphone camera to respond to hand gestures or body movements",
      "Include at least one game element, such as points, levels, timers, badges, challenges, or rewards",
      "Test the activity using a laptop and smartphone",
      "Prepare a short demonstration, activity guide, or storyboard",
    ],
  },
  {
    id: "presentation",
    time: "3:30–4:30 PM",
    title: "Presentation and Demonstration of Outputs",
    facilitator: "Resource Person and Faculty",
    moduleSlug: "presentation",
    kind: "presentation",
    description: [
      "Presentation of individual or group outputs",
      "Demonstration of the interactive learning activity",
      "Feedback from participants and the resource person",
      "Discussion of possible classroom implementation",
      "Summary of key learning points",
      "Training evaluation",
    ],
  },
  {
    id: "closing",
    time: "4:30–5:00 PM",
    title: "Closing Program",
    facilitator: "Organizing Committee",
    description: [
      "Awarding of Certificates",
      "Closing Remarks",
    ],
    isBreak: true,
    kind: "ceremony",
  },
]

export interface SamplePrompt {
  title: string
  prompt: string
  useFor: string
}

export interface WorkedExample {
  title: string
  subject: string
  learners: string
  competency: string
  interaction: "AR" | "Gesture" | "Pose" | "AR + Gesture" | "Mixed"
  gameElements: string[]
  howItWorks: string[]
  aiRole: string
  materials: string[]
}

export interface ModuleReference {
  label: string
  url: string
  note: string
}

export interface ModuleDetail {
  slug: string
  title: string
  time: string
  overview: string
  objectives: string[]
  topics: { heading: string; points: string[] }[]
  tools?: string[]
  tips?: string[]
  samplePrompts?: SamplePrompt[]
  workedExamples?: WorkedExample[]
  tryThis?: string[]
  references?: ModuleReference[]
}

export const moduleOrder = [
  "session-1",
  "open-forum-1",
  "hands-on",
  "session-2",
  "open-forum-2",
  "workshop",
  "presentation",
] as const

export const moduleDetails: Record<string, ModuleDetail> = {
  "session-1": {
    slug: "session-1",
    title: "Session 1: Introduction to Gamified, Augmented Reality, and Motion-Based Learning",
    time: "9:00–10:00 AM",
    overview:
      "This session introduces the foundational concepts behind gamified learning, augmented reality, and motion-based interaction. Participants will explore how these technologies can transform ordinary classroom activities into engaging, interactive experiences — and how generative AI can assist teachers in designing lesson content. Everything is framed for faculty who may not have an ICT background.",
    objectives: [
      "Understand the difference between gamified learning and game-based learning.",
      "Identify game elements such as challenges, points, rewards, feedback, and progress that motivate learners.",
      "Explain what augmented reality is and describe practical classroom applications.",
      "Describe how camera models return hand, face, and body landmarks, and how activity logic turns them into interactions.",
      "Recognize how laptops and smartphones can serve as interactive teaching tools.",
      "Use generative AI to brainstorm lesson ideas, questions, instructions, stories, and activities.",
      "Apply responsible, safe, accessible, and discipline-appropriate practices when using cameras and AI in higher education.",
    ],
    topics: [
      {
        heading: "Gamified Learning vs. Game-Based Learning",
        points: [
          "Gamification adds game elements (points, badges, leaderboards, levels) to non-game activities — e.g., awarding badges for completed lab reports.",
          "Game-based learning uses an actual game as the learning medium—e.g., an evidence-classification challenge in Research Methods.",
          "Both can support practice and feedback when the mechanic matches the learning goal; neither guarantees engagement or learning by itself.",
          "Rule of thumb: if the lesson still works without the game layer, you are gamifying. If the game is the lesson, you are doing game-based learning.",
        ],
      },
      {
        heading: "Game Elements That Motivate Learners",
        points: [
          "Challenges: clear tasks with achievable difficulty (e.g., “Name 5 parts of a plant in 60 seconds”).",
          "Points and scoring: instant feedback that makes progress visible.",
          "Rewards and badges: recognition for effort and mastery, not only for being first.",
          "Levels and progression: vocabulary → comprehension → application, so success builds.",
          "Timers and countdowns: optional pacing tools. Use them only when speed is relevant, and offer untimed or extended-time participation when needed.",
          "Immediate feedback: “Correct — evaporation turns liquid into gas” teaches more than “Wrong.”",
        ],
      },
      {
        heading: "Augmented Reality in the Classroom",
        points: [
          "AR overlays digital content (images, 3D objects, text) on the real world viewed through a camera.",
          "Students scan a printed marker or recognized image; the device reveals related learning materials.",
          "This workshop uses browser-based AR, so no headset is required. Camera access, WebGL2/WebAssembly support, and performance still vary by browser and device; test the actual classroom devices first.",
          "Classroom uses: AR flashcards, virtual specimens, 3D shapes for geometry, historical site overlays on maps.",
          "Start simple: one marker → one fact or one 3D model is enough for a first successful demo.",
        ],
      },
      {
        heading: "Motion-Based Interaction",
        points: [
          "Camera models can return hand, body, and face landmarks in real time; an activity still needs rules or code that translate those landmarks into a gesture, pose, or response.",
          "Students interact with content through movement — raise a hand for choice A, open palm for choice B.",
          "Google MediaPipe provides browser-capable hand, pose, and face landmark models. These detect landmarks, not the learning answer itself.",
          "Strong fit for PE, science process skills, vocabulary drills, and inclusive activities where reading is not required to participate.",
          "Privacy advantage: MediaPipe inference can run in the browser, so frames need not be uploaded. Verify that the surrounding app does not record or transmit them.",
        ],
      },
      {
        heading: "Generative AI as a Teacher's Assistant",
        points: [
          "Tools like Google AI Studio draft lesson plans, quiz items, instructions, and stories in seconds.",
          "Faculty remain accountable for accuracy, disciplinary context, intellectual rigor, and appropriateness for the course level.",
          "AI can generate differentiated versions of the same content for basic, intermediate, and advanced learners.",
          "AI-generated images can become visual aids or possible tracking targets, but teachers must review accuracy, representation, and tracking suitability before use.",
          "Good prompts name the discipline, course or year level, course learning outcome, output format, and tone.",
        ],
      },
      {
        heading: "Responsible and Safe Use",
        points: [
          "Obtain appropriate consent before recording or processing student images.",
          "Prefer on-device camera processing; avoid uploading student video to external servers when possible.",
          "Choose tools and tasks that are appropriate to the discipline, course level, and accessibility needs of college students.",
          "Discuss digital citizenship and privacy with students before the first camera-based activity.",
          "Never use AI-generated content that could mislead learners about facts, history, or safety without teacher review.",
        ],
      },
    ],
    tools: ["Google AI Studio", "Google MediaPipe", "Miro"],
    tips: [
      "Start with a simple gamification layer — adding points to an existing quiz is a low-barrier entry point.",
      "Use a Miro board to collect participants’ prior experience with AR and group similar responses before the demos.",
      "Show a 60–90 second live demo of AR or gesture control before theory — seeing beats explaining.",
      "Invite one non-ICT teacher to try the demo first; peer success reduces anxiety.",
    ],
    samplePrompts: [
      {
        title: "Lesson idea generator",
        useFor: "Brainstorming a first activity idea",
        prompt:
          "I teach a first-year Environmental Science course at a Philippine college. Course learning outcome: analyze the movement of water through an ecosystem and explain how human activity affects it. Suggest 3 short gamified activities using either (a) smartphone image tracking or (b) hand gestures. For each idea, list the outcome alignment, materials, rules, scoring, evidence of learning, and how AI can help prepare content. Keep setup under 15 minutes.",
      },
      {
        title: "Quiz questions at the right level",
        useFor: "Generating review items",
        prompt:
          "Create 8 concept-check questions for an introductory Statistics course on selecting and interpreting measures of central tendency. Include 2 foundational, 4 application, and 2 analysis items. For each item provide: question, 4 plausible choices, correct answer, and a concise rationale. Use authentic Philippine higher-education or community data contexts and avoid trick wording.",
      },
    ],
    workedExamples: [
      {
        title: "Thumbs-Up Vocabulary",
        subject: "English / Filipino",
        learners: "First-year college students",
        competency: "Infer the meaning and disciplinary use of academic vocabulary from context",
        interaction: "Gesture",
        gameElements: ["Points", "Timer", "Immediate feedback"],
        howItWorks: [
          "A word appears on the laptop screen with two meanings (A / B).",
          "Students show thumbs-up for A or open palm for B in front of the webcam.",
          "Correct answers earn points; wrong answers show a short explanation.",
          "Three rounds: solo practice → pair challenge → class high score.",
        ],
        aiRole: "Generate discipline-specific terms, authentic contexts, distractors, and concise feedback for the course level.",
        materials: ["Laptop with webcam", "Projector (optional)", "Google MediaPipe demo page"],
      },
    ],
    tryThis: [
      "Pick one quiz you already use. Add one purposeful game element—such as progress, retries, or specific feedback—and explain how it supports the learning goal.",
      "On your phone browser, open a MediaPipe Hands demo and try pinching vs. open palm. Note how students might use each gesture as an answer choice.",
    ],
    references: [
      {
        label: "Google MediaPipe Tasks overview",
        url: "https://ai.google.dev/edge/mediapipe/solutions/tasks",
        note: "Official overview of the vision tasks that return landmarks and other model outputs.",
      },
      {
        label: "Google AI Studio",
        url: "https://ai.google.dev/aistudio",
        note: "Official starting point for prompting and building with available Gemini models.",
      },
    ],
  },
  "open-forum-1": {
    slug: "open-forum-1",
    title: "Open Forum and Guided Discussion",
    time: "10:00–10:30 AM",
    overview:
      "An interactive discussion supported by a shared Miro board. Participants post reactions to Session 1, organize questions, and explore how the concepts could apply in their own classrooms and disciplines. There are no wrong answers — the goal is to surface real classroom constraints and opportunities.",
    objectives: [
      "Reflect on the concepts introduced in Session 1.",
      "Share initial reactions, questions, and concerns about using AR, motion-based interaction, and AI in teaching.",
      "Identify at least one potential application relevant to a course you teach.",
    ],
    topics: [
      {
        heading: "Discussion Prompts",
        points: [
          "What surprised you most about what cameras can detect?",
          "Which game element would work best in your class right now? Why?",
          "What concerns do you have about cameras or AI with students?",
          "Name one lesson that is hard to teach with worksheets alone — could AR or motion help?",
          "If you had only one shared classroom laptop, what activity would still be feasible?",
        ],
      },
      {
        heading: "How to Use the Miro Board",
        points: [
          "Sign in to the Miro account you created before the event.",
          "Open the workshop board link or QR code shared by the facilitator.",
          "Add one sticky note for each question, concern, or classroom application.",
          "Place related notes together and use reactions or voting to prioritize topics for discussion.",
          "Do not add student names, photos, or other private information to the shared board.",
        ],
      },
      {
        heading: "Capture Your Idea Seed",
        points: [
          "Discipline + course/year level + one course learning outcome (one sentence).",
          "One interaction type: AR marker, gesture, or pose.",
          "One game element: points, levels, timer, badge, or challenge.",
          "Write this on paper or in Notes — you will refine it after lunch.",
        ],
      },
    ],
    tools: ["Miro"],
    tips: [
      "Point people toward their most challenging lesson — that is often the best seed for a gamified or AR activity.",
      "Keep discussion grounded: prioritize what is feasible with one smartphone or one laptop.",
      "Park technical deep-dives for the hands-on block so the forum stays pedagogical.",
    ],
    tryThis: [
      "Post one Miro sticky note about a constraint in your school, such as bandwidth, devices, or large class size.",
      "Draft a one-sentence activity seed: “In [subject], students will [action] using [camera/AI] so they can [learning outcome].”",
    ],
  },
  "hands-on": {
    slug: "hands-on",
    title: "Hands-on Demonstration: Creating Interactive Learning Activities",
    time: "10:30 AM–12:00 PM",
    overview:
      "Participants observe and follow along as the resource person walks through the end-to-end process of creating a simple interactive learning activity — from generating content with AI, to displaying AR objects through a smartphone camera, to making activities respond to hand gestures and body movements. Expect to try both laptop and phone workflows.",
    objectives: [
      "Follow the step-by-step process for building a basic interactive learning activity.",
      "Use Google Stitch to plan the screen flow and create an accessible interface design before development.",
      "Use Google AI Studio to develop a browser-based AR or vision-controlled app, including its lesson content, interface, and interaction logic.",
      "Understand how AR markers and camera-based image recognition work in a browser.",
      "See how gesture and pose detection can be integrated into a simple activity.",
      "Identify at least two higher-education disciplines where the demonstrated technique could support an authentic learning task.",
    ],
    topics: [
      {
        heading: "Step-by-Step Overview",
        points: [
          "Step 1: Define the course learning outcome and target college students in one sentence each.",
          "Step 2: Choose the interaction method: AR image tracking, hand gestures, or body-pose detection.",
          "Step 3: Use Google Stitch to plan the user journey and design the welcome, instructions, camera activity, feedback, and results screens.",
          "Step 4: Review the Stitch design for readability, accessibility, and clear camera guidance, then export or document the approved design.",
          "Step 5: Bring the Stitch design into Google AI Studio and generate the working browser app, learning content, and camera-interaction code.",
          "Step 6: Test on a laptop and a smartphone — camera permission, lighting, distance, and orientation matter.",
          "Step 7: Refine the app for clarity, fairness, and learning effectiveness (not just “cool factor”).",
        ],
      },
      {
        heading: "Planning and Designing with Google Stitch",
        points: [
          "Describe the learning objective, target learners, camera interaction, required screens, and the feeling the interface should create.",
          "Generate a mobile-first interface and connect the screens into a simple prototype so the complete learner journey can be reviewed before coding.",
          "Check that camera instructions, live status, feedback, score, and fallback controls are visible and understandable.",
          "Refine color contrast, text size, touch-target size, and portrait/landscape behavior before approving the design.",
          "Export the design or its design rules for Google AI Studio, and clearly note camera behaviors that a static prototype cannot demonstrate.",
        ],
      },
      {
        heading: "Developing the App with Google AI Studio",
        points: [
          "Start with a clear build prompt that names the discipline, course level, course learning outcome, authentic task, device constraints, game rules, and camera interaction.",
          "Ask AI Studio to create a browser-based app and integrate the appropriate library: Encantar.js for image-tracked AR or MediaPipe for hand and pose landmarks.",
          "Generate the quiz content, answer keys, feedback, and student-facing instructions as part of the app.",
          "Preview the app, test camera permission and interaction behavior, then describe errors and request focused code revisions in AI Studio.",
          "Prepare distinct, detailed, asymmetrical reference images for tracking; plain shapes and repetitive patterns are usually poor targets. Test every image before printing a full set.",
          "Export and keep a copy of the working app files so later prompts do not overwrite a stable version.",
        ],
      },
      {
        heading: "Augmented Reality with Encantar.js",
        points: [
          "Encantar.js supports browser-based image tracking without an app-store install, but the activity must be served from a web page and the target device must pass its compatibility check.",
          "Register a suitable reference image in the activity; when Encantar.js tracks it, your rendering code positions the related 2D or 3D content.",
          "Pair with Three.js or PixiJS/Pixi3D for educational models or animations.",
          "It targets major modern mobile and desktop browsers and requires WebGL2 and WebAssembly; test camera permissions and performance on the devices learners will use.",
          "Lighting tip: avoid glossy paper and extreme backlight for more reliable tracking.",
        ],
      },
      {
        heading: "Motion Detection with Google MediaPipe",
        points: [
          "MediaPipe Hand Landmarker returns 21 landmarks and handedness per detected hand; gesture labels such as pinch or open palm require a Gesture Recognizer model or your own classification rules.",
          "MediaPipe Pose Landmarker returns body landmarks; pose matching requires additional angle, distance, or similarity logic that you define and calibrate.",
          "MediaPipe Face Landmarker can optionally return blendshape coefficients. Avoid inferring emotions or personal traits, and use face-based activities only with a clear learning need and appropriate consent.",
          "Inference can stay in the browser, but confirm that your full app does not save or send camera frames.",
          "Design for one clear gesture per answer choice; multi-gesture combos confuse beginners.",
        ],
      },
      {
        heading: "Testing Checklist (Laptop + Phone)",
        points: [
          "Camera permission granted in the browser?",
          "Marker printed large enough (at least 10×10 cm recommended for first tests)?",
          "Participant standing 1–2 meters from the webcam for pose detection?",
          "Text readable on a phone screen without zooming?",
          "Fallback plan if camera fails: paper version of the same quiz or discussion cards.",
        ],
      },
    ],
    tools: ["Google Stitch", "Google AI Studio", "Encantar.js", "Three.js", "PixiJS", "Pixi3D", "Google MediaPipe"],
    tips: [
      "Keep the live demo simple — a flashcard quiz where the correct answer appears as a 3D object is powerful and achievable.",
      "Pair participants: one holds the phone while the other interacts.",
      "Leave 10–15 minutes of freeplay after the structured walkthrough.",
      "When something fails (lighting, browser permission), treat it as a teachable classroom moment.",
    ],
    samplePrompts: [
      {
        title: "Design the app in Google Stitch first",
        useFor: "Planning the interface and learner flow before development",
        prompt:
          "Design a mobile-first laboratory review app called ‘Scan-to-Analyze Plant Anatomy’ for first-year Botany students. The course outcome is to identify major plant structures from specimen images and relate visible structure to function. Create and connect these screens: (1) welcome and Start button, (2) concise camera-permission and laboratory-use instructions, (3) live AR activity with a large camera area, tracking status, progress 0/4, score, and a visible non-camera fallback, (4) an analysis question with large answer controls and evidence-based feedback, and (5) results plus a two-item reflection. Use accessible contrast, large touch targets, and a clean laboratory visual style. Design for phone portrait first and include a laptop layout. The interface must not imply that camera frames are recorded or uploaded. Create a clickable prototype, then summarize the user flow, reusable design rules, and components for Google AI Studio development.",
      },
      {
        title: "Build an image-tracked AR learning app",
        useFor: "Creating a complete Encantar.js AR app in Google AI Studio",
        prompt:
          "Build a mobile-first browser app for a first-year Botany laboratory activity titled ‘Scan-to-Analyze Plant Anatomy.’ Use Encantar.js for image tracking and Three.js or PixiJS for the AR overlay. The app must recognize four instructor-supplied specimen or diagram images. When a target is tracked, anchor a readable card with the structure name, functional significance, and one application or analysis question. Award points using a transparent rubric and show progress out of 4. Include a start screen, concise camera instructions, permission handling, loading and tracking status, reset, and a non-camera fallback containing the same evidence. Keep camera processing in the browser and do not upload or record frames. Use accessible controls and terminology appropriate for an introductory college course. Generate all app files and sample content, clearly mark where the reference images belong, and flag scientific claims for faculty verification. Do not replace Encantar.js with QR scanning or markerless WebXR. Explain how to test the app on a phone.",
      },
      {
        title: "Build a vision-controlled gesture quiz",
        useFor: "Creating a complete MediaPipe app in Google AI Studio",
        prompt:
          "Build a responsive browser app called ‘Statistics Claim Check’ for an introductory college Statistics course. Use Google MediaPipe in the browser to read one hand from the webcam. Map a clearly detected thumbs-up to SUPPORTED and an open palm to NOT SUPPORTED; implement the gesture rules from hand landmarks or use MediaPipe Gesture Recognizer when available. Show a mirrored camera preview, detected gesture and confidence, and 10 evidence-based claims about interpreting graphs, averages, correlation, and sampling. Require a gesture to remain stable for about 800 milliseconds, then lock input until the next claim. Award 1 point per defensible classification and show a concise rationale, progress, final score, and restart. Include camera permission/errors, keyboard and touch equivalents, and an untimed option. Process video locally; never save or upload frames. Use accessible, high-contrast controls. Generate all app files, faculty-verifiable claims, and testing instructions.",
      },
    ],
    workedExamples: [
      {
        title: "Scan-to-Analyze Plant Anatomy",
        subject: "Biology / Agriculture",
        learners: "First-year Biology or Agriculture students",
        competency: "Identify plant structures from specimens and explain structure–function relationships",
        interaction: "AR",
        gameElements: ["Levels", "Points", "Badges"],
        howItWorks: [
          "Students scan instructor-verified specimen photos or diagrams with a phone browser.",
          "Each target reveals diagnostic features and a structure–function analysis question.",
          "After three scans, an unfamiliar-specimen transfer task unlocks.",
          "Students complete an evidence table and compare reasoning with another group.",
        ],
        aiRole: "Draft faculty-verifiable structure–function prompts, feedback, and transfer cases from supplied laboratory sources.",
        materials: ["Printed markers", "Smartphone", "Encantar.js demo", "Projector optional"],
      },
      {
        title: "Hydrologic Systems Pose Model",
        subject: "Environmental Science",
        learners: "First-year Environmental Science students",
        competency: "Model water-cycle processes and analyze human influences on water movement",
        interaction: "Pose",
        gameElements: ["Challenge", "Timer", "Team points"],
        howItWorks: [
          "A land-use scenario appears and students model the affected hydrologic flow.",
          "MediaPipe checks the agreed pose while the instructor evaluates the scientific explanation.",
          "Teams earn points for a correct process, causal mechanism, and stated model limitation.",
          "Debrief compares the physical metaphor with a formal systems diagram.",
        ],
        aiRole: "Write pose cues, scientific explanations, and fair team scoring rules.",
        materials: ["Laptop + webcam", "Open space", "MediaPipe Pose demo"],
      },
    ],
    tryThis: [
      "Generate 5 quiz items with AI for your subject, then map each to a gesture (A/B/C).",
      "Print one detailed, asymmetrical reference image and test whether the activity tracks it in classroom lighting.",
    ],
    references: [
      {
        label: "Google Stitch",
        url: "https://stitch.withgoogle.com/",
        note: "Google's interface-design tool for creating and refining app screens and prototypes before development.",
      },
      {
        label: "Encantar.js image-tracking guide",
        url: "https://encantar.dev/tutorial/set-up-the-tracker/",
        note: "Official setup guide, including reference-image registration and compatibility checking.",
      },
      {
        label: "MediaPipe Hand Landmarker result",
        url: "https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/HandLandmarkerResult",
        note: "Shows that the task returns handedness and landmark coordinates rather than classroom gesture meanings.",
      },
      {
        label: "MediaPipe Pose Landmarker",
        url: "https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/PoseLandmarker",
        note: "Official task reference for body-landmark detection in images, video, and live streams.",
      },
    ],
  },
  "session-2": {
    slug: "session-2",
    title: "Session 2: Designing Meaningful Gamified Learning Activities with AI",
    time: "1:00–2:00 PM",
    overview:
      "Building on the morning demonstrations, this session focuses on pedagogical design. Participants learn how to connect game mechanics to real learning outcomes, use AI effectively as a content creation tool, and adapt activities across subject areas — without letting “fun” replace rigor.",
    objectives: [
      "Align game objectives and challenges with course and program learning outcomes.",
      "Design a simple but complete game structure including rules, points, levels, rewards, and feedback.",
      "Balance enjoyment with educational purpose.",
      "Integrate AR and motion-based elements to promote active participation.",
      "Use generative AI to produce differentiated content for learners at different levels.",
      "Select appropriate devices and tools based on the subject matter and learner profile.",
    ],
    topics: [
      {
        heading: "Connecting Learning Outcomes to Game Design",
        points: [
          "Start with the course or program learning outcome—ideally aligned with the syllabus, outcomes-based education plan, or relevant CHED policy—not with the tool.",
          "Map the game challenge directly to the skill or knowledge being assessed.",
          "Example: an Environmental Science challenge asks students to model hydrologic processes with poses, then justify how land-use change affects each process.",
          "If removing the camera still leaves a clear learning task, the design is healthy.",
          "Avoid decoration: AR that only “looks cool” without requiring thinking is not enough.",
        ],
      },
      {
        heading: "Designing the Game Structure",
        points: [
          "Rules: short enough to explain in under one minute; write them on a slide or card.",
          "Points: reward correctness and progress; optionally small bonuses for collaboration.",
          "Levels: increase cognitive demand — identify → explain → apply.",
          "Rewards: badges, certificates, praise, or unlocked bonus content — not only competition.",
          "Feedback: immediate and specific (“Correct: the nucleus holds genetic material”).",
          "Failure: allow retries; productive struggle beats public humiliation on a leaderboard.",
        ],
      },
      {
        heading: "Using AR and Movement to Encourage Participation",
        points: [
          "Movement-based tasks can include students who struggle with dense text.",
          "AR can make spatial relationships visible, while movement can create another way to participate and explain understanding.",
          "Simple gesture maps (raise hand = A, open palm = B) are quick to learn.",
          "Pose activities invite PE integration and cross-disciplinary projects.",
          "Always offer an alternative input (click/tap) for mobility or camera limitations.",
        ],
      },
      {
        heading: "Generative AI for Differentiated Content",
        points: [
          "Ask AI for a prerequisite refresher, course-level explanation, and advanced extension while preserving disciplinary terminology.",
          "Generate alternative analogies, local examples (Philippine context), and visual descriptions.",
          "Create optional scaffolds, worked examples, and extension prompts without reducing the intellectual demand of the course outcome.",
          "Use authentic cases, datasets, simulations, or professional scenarios to situate abstract concepts.",
          "Faculty checklist: disciplinary accuracy, evidence, bias, course-level rigor, outcome alignment, and citation integrity.",
        ],
      },
      {
        heading: "Cross-Disciplinary Applications",
        points: [
          "Language and Humanities: rhetorical-function sorting, AR textual annotations, and source comparison.",
          "Science and Agriculture: AR specimens, systems modeling, and laboratory procedure checks.",
          "Mathematics and Research: statistical-claim classification, data-visualization critique, and model selection.",
          "Social Sciences: sourced AR map exhibits, stakeholder scenarios, and evidence-based timelines.",
          "Arts and Music: AR critique galleries, composition analysis, and performance cues.",
          "Physical Education and Health: pose-supported movement analysis with instructor-led safety assessment.",
        ],
      },
      {
        heading: "Choosing Device and Complexity",
        points: [
          "One shared laptop + projector: best for whole-class gesture quizzes.",
          "Student smartphones: best for small-group AR marker stations.",
          "No reliable internet: pre-download demos, use offline storyboard + printed markers for practice.",
          "Large class (40+): stations and rotations beat everyone scanning at once.",
          "Beginner stack: Google AI Studio (app development) + MediaPipe (vision interaction) + paper scoring sheet.",
        ],
      },
    ],
    tools: ["Google AI Studio", "Google MediaPipe", "Encantar.js", "Miro"],
    tips: [
      "Start from a lesson teachers already teach well — the game layer should enhance expertise, not replace it.",
      "Remind participants that a storyboard or activity guide is a valid, high-value output.",
      "Collect and cluster subject-area ideas in Miro to build a shared bank of applications.",
      "Use a design template on the board: Course outcome → Authentic task → Interaction → Evidence of learning → AI support.",
    ],
    samplePrompts: [
      {
        title: "Align the activity to a course outcome",
        useFor: "Design planning",
        prompt:
          "Course learning outcome: [paste outcome]. Course/year level: [level]. Discipline: [discipline]. Design a 20-minute higher-education activity using [image-tracked AR OR hand gestures]. Include: outcome alignment, authentic task, materials, procedure, transparent scoring criteria, evidence of learning, accessibility alternative, and a 3-item formative check. Keep it feasible with 1 laptop and 1 smartphone.",
      },
      {
        title: "Differentiate one reading",
        useFor: "Inclusive content",
        prompt:
          "Rewrite the following explanation as (1) a prerequisite refresher, (2) a course-level explanation, and (3) an advanced extension for Filipino college students. Preserve disciplinary accuracy, key terminology, and citations supplied by the instructor. Add one relevant Philippine professional or community context at each level. Text: [paste text].",
      },
    ],
    workedExamples: [
      {
        title: "Statistics Gesture Arena",
        subject: "Statistics / Mathematics",
        learners: "First-year college students",
        competency: "Interpret descriptive statistics and justify the best-supported comparison",
        interaction: "Gesture",
        gameElements: ["Points", "Levels", "Immediate feedback"],
        howItWorks: [
          "Two summaries or graphs appear; students gesture left or right for the better-supported interpretation.",
          "Level 1: center and spread; Level 2: misleading graphs; Level 3: correlation and sampling claims.",
          "A correct choice earns one point; a defensible statistical rationale earns a second.",
          "Exit task: analyze an unfamiliar graph and state one limitation without using the game.",
        ],
        aiRole: "Generate faculty-verifiable datasets, plausible interpretations, distractors, and concise statistical rationales.",
        materials: ["Laptop + webcam", "Projector", "Paper exit tickets"],
      },
      {
        title: "AR Local History Spots",
        subject: "Philippine History / Social Science",
        learners: "Undergraduate Philippine History or Social Science students",
        competency: "Construct a sourced interpretation of a local historical site or event",
        interaction: "AR",
        gameElements: ["Challenge", "Progress checklist", "Team rewards"],
        howItWorks: [
          "Printed map markers around the room represent local landmarks.",
          "Scanning a marker reveals a short narrative, a primary-source quote, and a question.",
          "Teams complete a scavenger checklist; bonus for connecting past events to present community life.",
          "Culminating task: 1-minute oral summary without reading from the phone.",
        ],
        aiRole: "Organize instructor-supplied evidence into concise exhibit labels and sourcing questions without inventing facts or quotations.",
        materials: ["Printed map markers", "Smartphones (shared OK)", "Checklist handouts"],
      },
    ],
    tryThis: [
      "Fill the template: Course outcome / Authentic task / Interaction / AI support / Students will demonstrate learning by ___.",
      "Write success criteria students can understand: “I can explain X using my own words after the activity.”",
    ],
  },
  "open-forum-2": {
    slug: "open-forum-2",
    title: "Open Forum and Project Consultation",
    time: "2:00–2:30 PM",
    overview:
      "A focused consultation where participants present preliminary activity ideas, receive targeted feedback from the resource person and peers, and refine plans before the hands-on workshop. Aim to leave this block with a clear build plan.",
    objectives: [
      "Present a clear initial concept for your workshop activity.",
      "Receive constructive feedback on alignment between the game design and learning objective.",
      "Identify any technical or content-related challenges and plan solutions.",
    ],
    topics: [
      {
        heading: "Consultation Framework (2–3 minutes per group)",
        points: [
          "What course or program learning outcome are you addressing?",
          "Who are your target learners and what is their level?",
          "What is the main game mechanic (AR marker, gesture, pose, or combination)?",
          "What content will AI help you create?",
          "How will learners know they have achieved the learning objective?",
          "What is your fallback if the camera fails mid-class?",
        ],
      },
      {
        heading: "Common Challenges and Solutions",
        points: [
          "No coding background → describe the complete app in Google AI Studio, generate a working first version, and revise it through focused prompts; a detailed storyboard remains an accepted fallback.",
          "Students lack smartphones → design for one shared laptop/webcam or station rotation.",
          "Abstract concept → use gesture classification, a spatial AR model, or an evidence-sorting task tied to disciplinary reasoning.",
          "Unsure which tool → use AI Studio to develop the app, then use MediaPipe for gesture/pose interaction or Encantar.js for image-tracked AR.",
          "Weak internet → prepare offline content packs; practice storyboard and printed markers first.",
          "Large class → team captains operate the camera; others use paper response boards.",
        ],
      },
      {
        heading: "Peer Feedback Protocol",
        points: [
          "One strength: what already aligns well with the course outcome and assessment evidence?",
          "One question: what might confuse learners?",
          "One suggestion: how to simplify rules or materials?",
          "Keep feedback kind, specific, and actionable.",
        ],
      },
    ],
    tools: ["Google AI Studio", "Miro"],
    tips: [
      "Keep consultations brief so every group gets airtime.",
      "Peer feedback within the same subject area is often the most practical.",
      "If an idea is too big, cut scope: one course outcome, one authentic task, one interaction, and one evidence source.",
    ],
    tryThis: [
      "State your idea in 30 seconds using the framework questions.",
      "Write your minimum viable output: demo OR storyboard OR activity guide — pick one primary format.",
    ],
  },
  workshop: {
    slug: "workshop",
    title: "Workshop: Developing a Gamified Learning Activity",
    time: "2:30–3:30 PM",
    overview:
      "The core hands-on session. Working individually or in small groups, participants design and build a gamified learning activity that combines at least one game element with either AR or motion-based interaction, supported by AI-generated content. Completion quality beats unfinished ambition.",
    objectives: [
      "Produce a complete or near-complete gamified learning activity, prototype, or activity guide.",
      "Demonstrate that the activity addresses a real course learning outcome.",
      "Show that the activity uses the camera in a meaningful way.",
      "Include at least one game element such as points, challenges, levels, timers, rewards, or feedback.",
      "Use Google Stitch to plan and review the app interface and learner journey before development.",
      "Use Google AI Studio to develop the AR or vision-controlled app and its learning content.",
    ],
    topics: [
      {
        heading: "Workshop Steps (60 minutes)",
        points: [
          "Step 1 — Define the course and students (5 min): course outcome, year level, prior knowledge, class size, and devices.",
          "Step 2 — Choose the camera interaction (5 min): image-tracked AR, hand gesture, or body pose.",
          "Step 3 — Plan and design in Google Stitch (10 min): create the screen flow, interface, feedback states, and fallback controls.",
          "Step 4 — Finalize the game (10 min): rules, scoring, rewards, questions, and feedback using the approved screen flow.",
          "Step 5 — Build in Google AI Studio (15 min): import or reference the Stitch design and generate the browser app and selected interaction.",
          "Step 6 — Verify camera interaction (5 min): test the tracked image or gesture/pose path on the target device.",
          "Step 7 — Test and package (10 min): record one needed fix and prepare the demo, guide, or storyboard.",
        ],
      },
      {
        heading: "Accepted Output Formats",
        points: [
          "A working browser-based learning activity",
          "A simple augmented reality classroom activity",
          "A motion-controlled or gesture-based learning activity",
          "A clickable or interactive prototype",
          "A detailed activity guide (written or printed)",
          "A storyboard showing the activity flow",
        ],
      },
      {
        heading: "Minimum Requirements for the Output",
        points: [
          "Addresses a specific course or program learning outcome.",
          "Can be used on a laptop or smartphone.",
          "Uses the camera to display digital materials or respond to gestures/body movements.",
          "Includes at least one game element (points, challenges, levels, timers, rewards, or immediate feedback).",
          "Uses generative AI for at least one component (content, images, instructions, or questions).",
          "Can be demonstrated or explained during the presentation.",
        ],
      },
      {
        heading: "Activity Guide Template (if not coding)",
        points: [
          "Title, discipline, course/year level, and time needed",
          "Course learning outcome and clear learner-facing objective",
          "Materials and device setup",
          "Rules, scoring, and safety/privacy notes",
          "Step-by-step teacher procedure",
          "Screenshots or sketches of each screen/scene",
          "AI prompts you used (for reproducibility)",
          "Assessment: how you know learning happened",
        ],
      },
    ],
    tools: ["Google Stitch", "Google AI Studio", "Encantar.js", "Three.js", "PixiJS", "Pixi3D", "Google MediaPipe"],
    tips: [
      "Ship one small complete activity rather than an ambitious unfinished one.",
      "Approve the learner flow in Stitch before asking AI Studio to build; late screen-flow changes consume testing time.",
      "Use AI Studio for the first working build, then reserve time to test the code, verify answers, simplify instructions, and add local context.",
      "Not coding? A detailed storyboard with wireframes is equally valued.",
      "Name a presenter and a demo operator before the next session starts.",
    ],
    samplePrompts: [
      {
        title: "Plan my classroom app in Google Stitch",
        useFor: "Customizable design prompt before the workshop build",
        prompt:
          "Design a mobile-first learning app. Discipline: [DISCIPLINE]. Course/year level: [LEVEL]. Course learning outcome: [PASTE OUTCOME]. App title: [TITLE]. Camera interaction: [IMAGE-TRACKED AR / HAND GESTURE / BODY POSE]. Learner action: [DESCRIBE]. Game elements: [POINTS / LEVELS / TIMER / BADGES]. Create a connected prototype with welcome, concise consent and camera instructions, authentic course task, loading/error/tracking states, evidence-based feedback, progress, results, reflection, and a non-camera fallback. Use accessible contrast, readable type, large controls, and phone and laptop layouts. Summarize the final user flow, component list, design rules, interaction states, and implementation notes for Google AI Studio.",
      },
      {
        title: "Build my classroom camera app",
        useFor: "Customizable first-build prompt for the workshop",
        prompt:
          "Using the attached or pasted Google Stitch design, build a complete mobile-friendly browser learning app in Google AI Studio. Preserve its approved flow, component hierarchy, visual design, accessibility rules, and fallback states. Discipline: [DISCIPLINE]. Course/year level: [LEVEL]. Course learning outcome: [PASTE OUTCOME]. App title: [TITLE]. Camera interaction: [IMAGE-TRACKED AR using Encantar.js / HAND GESTURE using MediaPipe / BODY POSE using MediaPipe]. Learner action: [DESCRIBE THE TARGET, GESTURE, OR POSE]. Create [NUMBER] authentic challenges with faculty-verifiable answers, transparent scoring, and feedback that explains disciplinary reasoning. Implement camera permission and loading states, live interaction status, progress, restart, and a final reflection or application task. Add touch or keyboard controls that provide equivalent participation when camera use is unavailable. Keep camera frames on the device and do not record or upload them. Generate the working app files, comment the camera-interaction logic, identify required assets, and provide a device-testing checklist. If a Stitch element cannot be implemented as designed, explain the limitation and retain the closest accessible behavior. Do not claim a gesture, pose, or image target works until it has been tested.",
      },
      {
        title: "Fix and refine the generated app",
        useFor: "Iterating after the first camera test",
        prompt:
          "Review the current app and fix only the problems listed below without removing working features. Problems observed: [PASTE ERRORS OR DESCRIBE WHAT HAPPENED]. Target device and browser: [DEVICE + BROWSER]. Expected behavior: [DESCRIBE]. First explain the likely cause briefly. Then update the app so it: (1) shows useful camera and model-loading errors, (2) avoids counting the same gesture or pose more than once, (3) remains readable on a phone in portrait orientation, and (4) keeps touch/keyboard fallback controls working. Preserve local-only camera processing. After editing, list the exact checks I should perform to confirm the fix.",
      },
    ],
    workedExamples: [
      {
        title: "Minimum Viable Gesture Quiz",
        subject: "Any subject",
        learners: "Your class",
        competency: "Your chosen course learning outcome",
        interaction: "Gesture",
        gameElements: ["Points", "Timer"],
        howItWorks: [
          "Eight true/false or A/B items generated with AI.",
          "Thumbs-up vs open palm mapped to answers; 20-second timer per item.",
          "Scoreboard on paper if the demo page has no built-in score.",
          "One-minute oral recap by a student volunteer.",
        ],
        aiRole: "Items, feedback, instructions, and exit ticket.",
        materials: ["Laptop + webcam", "Printed score sheet", "AI Studio draft"],
      },
    ],
    tryThis: [
      "Set a 40-minute build timer; freeze features after that and only polish for presentation.",
      "Rehearse a 3-minute pitch: course outcome → authentic task → interaction → evidence of learning → AI use.",
    ],
  },
  presentation: {
    slug: "presentation",
    title: "Presentation and Demonstration of Outputs",
    time: "3:30–4:30 PM",
    overview:
      "Participants share completed activities, prototypes, storyboards, or activity guides. Each group demonstrates or explains their work, receives feedback, and reflects on classroom implementation. Celebrate learning and useful ideas — not only technical polish.",
    objectives: [
      "Present or demonstrate the workshop output clearly and confidently.",
      "Receive constructive feedback from peers and the resource person.",
      "Identify practical next steps for implementing the activity in your classroom.",
      "Reflect on key learning points from the full-day workshop.",
    ],
    topics: [
      {
        heading: "Presentation Guide (3–5 minutes)",
        points: [
          "Introduce subject, lesson topic, and target learners.",
          "State the course learning outcome and clear learner-facing objective.",
          "Explain the game mechanic and camera interaction.",
          "Show how AI was used (and how you edited the result).",
          "Demonstrate the activity or walk through the storyboard.",
          "Share one improvement you would make before class use.",
        ],
      },
      {
        heading: "Feedback Framework",
        points: [
          "Is the learning objective clear and achievable through this activity?",
          "Is the game mechanic simple enough for the target learners?",
          "Is the camera interaction meaningful, or only decorative?",
          "Is AI-generated content accurate, appropriate, and level-right?",
          "Could this run with minimal prep in a real classroom next week?",
        ],
      },
      {
        heading: "After the Workshop",
        points: [
          "Pilot with a small group before whole-class rollout.",
          "Note device, lighting, and timing issues from the first run.",
          "Share working templates with department colleagues.",
          "Keep a folder of prompts that produced good content.",
        ],
      },
      {
        heading: "Training Evaluation",
        points: [
          "Complete the evaluation form from the organizing committee.",
          "Rate relevance, clarity, and overall quality of the training.",
          "Suggest topics for future workshops.",
        ],
      },
    ],
    tools: ["Miro"],
    tips: [
      "Keep each presentation to 3–5 minutes so all groups share.",
      "Celebrate effort and creativity, not just technical polish.",
      "Encourage contact exchange for post-workshop collaboration.",
      "Capture photos of storyboards (with permission) as a campus idea bank.",
    ],
    tryThis: [
      "Write your next-week pilot plan: date, class section, materials to print, success metric.",
      "List two colleagues who could co-facilitate a second run.",
    ],
  },
}

/** Ready-to-adapt classroom examples for the Examples gallery */
export interface ClassroomExample {
  id: string
  title: string
  subject: string
  subjects: string[]
  grade: string
  difficulty: "Beginner" | "Intermediate"
  interaction: "AR" | "Gesture" | "Pose" | "AR + Gesture" | "Mixed"
  gameElements: string[]
  timeMinutes: number
  summary: string
  competency: string
  setup: string[]
  playFlow: string[]
  sampleContent: string[]
  aiPrompts: string[]
  assessment: string
  successCriteria: string
  fallback: string
  inclusion: string
  buildNote: string
  variations: string[]
  relatedModule: string
}

export const classroomExamples: ClassroomExample[] = [
  {
    id: "thumbs-up-vocab",
    title: "Academic Vocabulary Claim Check",
    subject: "English",
    subjects: ["English", "Filipino"],
    grade: "First-year college",
    difficulty: "Beginner",
    interaction: "Gesture",
    gameElements: ["Points", "Timer", "Feedback"],
    timeMinutes: 15,
    summary:
      "A webcam concept check where students distinguish between two discipline-specific meanings using simple hand gestures.",
    competency: "Infer and apply academic or discipline-specific vocabulary in context",
    setup: [
      "Open a workshop template that already maps MediaPipe hand landmarks to thumbs-up and open-palm responses.",
      "Project the screen and mark one well-lit response zone for one learner at a time.",
      "Load 8–12 faculty-reviewed terms from the current course unit with two contextual interpretations.",
      "Post rules: thumbs-up = interpretation A, open palm = interpretation B; reasoning earns the bonus point.",
    ],
    playFlow: [
      "The instructor shows a term in an authentic disciplinary passage.",
      "Two interpretations appear (A / B).",
      "Volunteer or class section gestures the answer.",
      "The system awards a point; the instructor asks one student to justify the interpretation using textual evidence.",
      "Rotate volunteers; keep a running score on the board.",
    ],
    sampleContent: [
      "Term: validity. Context: A research instrument may be reliable without measuring the intended construct. A: accuracy of the intended inference · B: consistency alone. Answer: A.",
      "Feedback: Validity concerns whether evidence supports the intended interpretation; reliability is necessary but not sufficient.",
      "Instructor check: ask the student to distinguish construct validity from reliability in a course-relevant example.",
    ],
    aiPrompts: [
      "Using this instructor-provided glossary and reading excerpt, create 12 first-year college concept checks. Each item: term | authentic context | interpretation A | interpretation B | defensible answer | concise rationale citing the supplied material. Do not introduce definitions unsupported by the source. Glossary and excerpt: [paste].",
    ],
    assessment: "Minute paper: accurately use three course terms to explain a new disciplinary scenario.",
    successCriteria: "At least 8 of 10 interpretations are defensible, followed by two accurate applications in the minute paper.",
    fallback: "Learners hold up paper A/B cards; use the same items, timing, feedback, and exit ticket.",
    inclusion: "Remove the timer for learners who need more processing time and provide tap/click or paper-card responses instead of gestures.",
    buildNote: "MediaPipe Hand Landmarker supplies coordinates; the thumbs-up/open-palm decision must already be implemented and tested in the workshop template.",
    variations: [
      "Technical Filipino and English term comparisons",
      "Research-methods terminology or discipline-specific jargon",
      "Paper paddles labeled A/B if the camera is unreliable",
    ],
    relatedModule: "session-1",
  },
  {
    id: "scan-plant-parts",
    title: "Scan-to-Analyze Plant Anatomy",
    subject: "Biology",
    subjects: ["Science"],
    grade: "First-year college",
    difficulty: "Beginner",
    interaction: "AR",
    gameElements: ["Levels", "Points", "Badge"],
    timeMinutes: 25,
    summary:
      "Specimen photos and diagrams unlock structure–function evidence and analysis questions when scanned during a Botany laboratory review.",
    competency: "Identify plant structures and justify structure–function relationships from visible evidence",
    setup: [
      "Choose 4–6 instructor-verified specimen or micrograph images with distinct, asymmetrical detail and test tracking before class.",
      "Place markers at stations around the room.",
      "Open the AR activity link on shared smartphones.",
      "Prepare an evidence table for structure, observed feature, inferred function, and confidence.",
    ],
    playFlow: [
      "Pairs rotate stations and scan each marker.",
      "Each reveal provides a structure label, scale or orientation cue, and an analysis question.",
      "Pairs record visible evidence before viewing the explanatory feedback.",
      "After all stations, complete a four-item transfer task using unfamiliar specimens.",
      "Full evidence tables unlock a synthesis challenge.",
    ],
    sampleContent: [
      "Leaf cross-section reveal: identify the palisade mesophyll and connect its cell arrangement to light capture.",
      "Evidence challenge: Which visible vascular feature supports the identification of xylem rather than phloem?",
      "Transfer question: Predict how root-hair damage changes water potential and plant turgor; cite one observed structure.",
    ],
    aiPrompts: [
      "Using only the Botany laboratory manual and specimen notes I provide, draft content for 6 AR stations. For each: structure label, visible diagnostic feature, structure–function explanation, analysis question, evidence-based answer, and one transfer question. Flag claims not supported by the supplied sources. Materials: [paste].",
    ],
    assessment: "Analyze an unfamiliar specimen image and submit a claim–evidence–reasoning response.",
    successCriteria: "Correctly identify at least 4 of 6 structures and justify each function using visible anatomical evidence.",
    fallback: "Use numbered station cards with printed fact flaps or QR links; keep the same recording sheet and final diagram.",
    inclusion: "Provide large-print fact cards, text alternatives for visual overlays, and one shared device role that does not require holding a phone.",
    buildNote: "Encantar.js tracks registered reference images; you still need code or a prepared template to connect each target-found event to the correct content.",
    variations: [
      "Use real leaves as image targets if the library supports image tracking",
      "Add a “myth vs fact” card set for misconceptions",
      "Compare monocot and dicot vascular organization",
    ],
    relatedModule: "hands-on",
  },
  {
    id: "pose-water-cycle",
    title: "Hydrologic Systems Pose Model",
    subject: "Environmental Science",
    subjects: ["Science", "Physical Education"],
    grade: "First-year college",
    difficulty: "Intermediate",
    interaction: "Pose",
    gameElements: ["Challenge", "Timer", "Team points"],
    timeMinutes: 20,
    summary:
      "Students use a physical systems model to represent hydrologic processes, then analyze how land use changes storage and flow.",
    competency: "Model hydrologic processes and evaluate human influences on system flows",
    setup: [
      "Clear space 2 meters in front of a laptop webcam.",
      "Post process and system-boundary cards on the wall.",
      "Load MediaPipe Pose (or workshop template).",
      "Form 3–4 teams; one mover per turn.",
    ],
    playFlow: [
      "A scenario appears, such as urbanization reducing infiltration and increasing runoff.",
      "Mover has 10 seconds to match the agreed pose.",
      "The instructor confirms the pose; the team earns the reasoning point only after explaining the affected reservoir and flow.",
      "The next scenario changes one variable, such as vegetation cover, temperature, or impervious surface.",
      "Bonus round: critique the limitations of the physical model.",
    ],
    sampleContent: [
      "Infiltration cue: lower hands toward the floor; explain how soil texture and saturation affect the rate.",
      "Runoff cue: move laterally; explain why impervious cover changes lag time and peak discharge.",
      "Model critique: a pose represents flow direction but not magnitude, residence time, or uncertainty.",
    ],
    aiPrompts: [
      "Design 5 safe poses for an introductory Environmental Science systems model: precipitation, infiltration, evapotranspiration, runoff, and groundwater flow. For each provide the pose, scientifically accurate explanation, controlling variables, model limitation, and seated alternative. Use the course notes I supply as the source: [paste].",
    ],
    assessment: "Individual concept map: predict how one land-use intervention changes at least three hydrologic flows.",
    successCriteria: "Construct a coherent causal explanation linking the intervention to three flows, with one limitation or uncertainty.",
    fallback: "A peer or teacher matches pose cards by observation; seated learners may order and explain process cards.",
    inclusion: "Offer seated or hand-only versions of every pose, avoid jump-based movements, and score the science explanation separately from movement accuracy.",
    buildNote: "Pose Landmarker returns coordinates, not named water-cycle poses. A coded version needs calibrated joint-angle rules; teacher confirmation is the safest first prototype.",
    variations: [
      "Watershed-management scenario with competing stakeholder goals",
      "Outdoor version with instructor observation instead of computer vision",
      "Advanced: add residence time and water-quality indicators",
    ],
    relatedModule: "hands-on",
  },
  {
    id: "statistics-gesture-arena",
    title: "Statistics Gesture Arena",
    subject: "Mathematics",
    subjects: ["Mathematics"],
    grade: "First-year college",
    difficulty: "Beginner",
    interaction: "Gesture",
    gameElements: ["Points", "Levels", "Reasoning bonus"],
    timeMinutes: 20,
    summary:
      "Compare two statistical interpretations with left/right gestures, then defend the choice using evidence from the data display.",
    competency: "Interpret descriptive statistics and evaluate claims made from data",
    setup: [
      "Laptop + projector + webcam.",
      "Faculty-verified datasets and interpretation pairs sorted into 3 cognitive levels.",
      "A short reasoning rubric for evidence, statistical concept, and limitation.",
      "Use a tested template that maps a hand moved into the left or right answer zone; mirror the camera preview so directions feel natural.",
    ],
    playFlow: [
      "Two interpretations of a dataset or graph appear; a student gestures toward the better-supported claim.",
      "Immediate feedback identifies the relevant statistic, visual evidence, or sampling limitation.",
      "Clear Level 1 to unlock Level 2, and so on.",
      "A correct choice plus defensible reasoning earns a bonus point.",
    ],
    sampleContent: [
      "Level 1: choose the better description of center and spread for a skewed distribution.",
      "Level 2: identify which graph exaggerates a difference through a truncated axis.",
      "Level 3: reject a causal claim drawn from correlation in an observational study.",
    ],
    aiPrompts: [
      "Using the datasets and learning outcomes I provide, create 18 introductory Statistics claim comparisons in three levels: descriptive measures, data visualization, and correlation/sampling. Format: evidence | claim A | claim B | better-supported claim | statistical rationale | common misconception. Recalculate every numerical value and flag any ambiguity for faculty review. Sources: [paste].",
    ],
    assessment: "Analyze one unfamiliar data display and write a claim–evidence–limitation response.",
    successCriteria: "Select at least 4 of 5 defensible interpretations and justify two using correct statistical reasoning.",
    fallback: "Learners point to projected left/right zones or hold arrow cards while the teacher advances the same slide deck.",
    inclusion: "Allow eye gaze, pointing, keyboard, or partner-assisted response; do not make speed part of the mathematics score.",
    buildNote: "Hand Landmarker does not label 'left answer' or 'right answer.' The template must compare a stable landmark coordinate with two on-screen zones and debounce repeated detections.",
    variations: [
      "Research-methods claim check with supported/not-supported gestures",
      "Ethical data-visualization critique",
      "Student teams author and peer-review the next item set",
    ],
    relatedModule: "session-2",
  },
  {
    id: "ar-local-history",
    title: "AR Local History Spots",
    subject: "Philippine History",
    subjects: ["Araling Panlipunan", "Social Studies"],
    grade: "Undergraduate",
    difficulty: "Intermediate",
    interaction: "AR",
    gameElements: ["Scavenger checklist", "Team reward", "Oral challenge"],
    timeMinutes: 30,
    summary:
      "Room-sized map of local landmarks. Scanning markers reveals narratives and questions; teams connect past events to community life today.",
    competency: "Construct a sourced historical interpretation of a local site or event",
    setup: [
      "Teacher-verified facts about 5 local sites (do not rely on AI for unverified history).",
      "Print map-style markers and place them around the room.",
      "Shared phones with AR link; team checklists.",
      "Attach a source label to every passage, image, and quotation used in a reveal.",
    ],
    playFlow: [
      "Teams scan markers in any order.",
      "Each reveal shows a short sourced narrative, a verified excerpt or image, and a discussion question.",
      "Record a claim, corroborating detail, and source limitation at each station.",
      "Culmination: a two-minute interpretation that compares evidence from at least two stations.",
    ],
    sampleContent: [
      "Reveal structure: site name · 80-word verified account · source label · one archival image or short verified excerpt.",
      "Evidence question: Which detail in the source supports the claim that this place mattered to the community?",
      "Connection question: What has changed and what has remained in the site’s role today? Cite one detail from the reveal.",
    ],
    aiPrompts: [
      "Using ONLY the primary and secondary source notes I provide, draft a concise undergraduate AR exhibit label, one sourcing question, one corroboration question, and an instructor key for each site. Preserve citations, distinguish evidence from interpretation, and flag gaps or contested claims instead of inventing details. Sources: [paste].",
    ],
    assessment: "Interpretive brief rubric: defensible thesis, corroborated evidence, sourcing, contextualization, and acknowledged limitation.",
    successCriteria: "A two-minute interpretation makes a defensible claim supported by two cited details and acknowledges one source limitation.",
    fallback: "Place printed source packets under the same map markers and conduct the identical evidence hunt without phones.",
    inclusion: "Provide transcripts, image descriptions, and a recorder or evidence-finder role; allow an audio-recorded or written summary.",
    buildNote: "AI may organize teacher-supplied evidence but must not invent quotations, dates, or local history. Preserve source names in both the AR reveal and teacher key.",
    variations: [
      "Campus heritage walk with outdoor markers",
      "Students curate and peer-review the next class’s AR stations",
      "Pair with Arts or Architecture: analyze how built form communicates memory",
    ],
    relatedModule: "session-2",
  },
  {
    id: "academic-writing-sort",
    title: "Academic Writing Evidence Sort",
    subject: "English",
    subjects: ["English", "Filipino"],
    grade: "First-year college",
    difficulty: "Beginner",
    interaction: "Gesture",
    gameElements: ["Points", "Streak", "Feedback"],
    timeMinutes: 15,
    summary:
      "Excerpts flash on screen; students classify each as claim, evidence, or reasoning using distinct gestures.",
    competency: "Distinguish claims, evidence, and reasoning in academic arguments",
    setup: [
      "Define three accessible responses for claim, evidence, and reasoning; include keyboard and card equivalents.",
      "Use faculty-selected excerpts from course readings and remove cases that are ambiguous without context.",
      "Laptop webcam focused on one responder or small group.",
    ],
    playFlow: [
      "A short excerpt appears with enough surrounding context.",
      "The student gestures the rhetorical function.",
      "Feedback identifies textual cues and explains how the sentence functions in the argument.",
      "A streak unlocks a transfer item requiring revision of a weak claim or unsupported inference.",
    ],
    sampleContent: [
      "Claim: Community-based monitoring can improve the timeliness of local flood warnings.",
      "Evidence: In the supplied case study, reporting time fell from 40 minutes to 12 minutes after the protocol changed.",
      "Reasoning prompt: Explain why the reported timing difference does or does not support the claim.",
    ],
    aiPrompts: [
      "Using only the article excerpts I provide, create 18 first-year college classification items balanced across claim, evidence, and reasoning. Include enough context, the defensible category, textual cues, and a concise explanation. Flag ambiguous excerpts and preserve source citations. Excerpts: [paste].",
    ],
    assessment: "Annotate a short course-related argument and revise one unsupported claim.",
    successCriteria: "Classify at least 8 of 10 excerpts and justify two classifications using textual evidence.",
    fallback: "Use three labeled cards, keyboard controls, or a shared annotation document with the same excerpts.",
    inclusion: "Read sentences aloud, keep them visible, and offer cards, switches, or verbal answers as equivalents to gestures.",
    buildNote: "Point-up/point-sideways categories require custom landmark rules or a trained recognizer. Start with two visually distinct, tested gestures and one learner in frame.",
    variations: [
      "Source credibility: primary / secondary / tertiary",
      "Research abstracts: purpose / method / finding",
      "Filipino academic writing and translation analysis",
    ],
    relatedModule: "session-1",
  },
  {
    id: "pe-pose-match",
    title: "Form Check Pose Match",
    subject: "Physical Education",
    subjects: ["Physical Education", "Health"],
    grade: "College PE / wellness",
    difficulty: "Intermediate",
    interaction: "Pose",
    gameElements: ["Levels", "Timer", "Team points"],
    timeMinutes: 25,
    summary:
      "College students use pose landmarks for coarse movement feedback while applying exercise-science principles and peer coaching.",
    competency: "Demonstrate proper form in basic fitness movements",
    setup: [
      "Choose safe poses appropriate for your learners; model each first.",
      "MediaPipe Pose on a laptop; large open area.",
      "Safety rules posted; modifications for injuries.",
    ],
    playFlow: [
      "Demo pose for 5 seconds.",
      "Student matches pose within timer; peer coach gives one cue.",
      "Points for attempt + improved form on second try.",
      "Cool-down reflection: which muscle groups worked?",
    ],
    sampleContent: [
      "Bodyweight squat cue: knees track in the same direction as toes; keep the movement within a comfortable range.",
      "Peer feedback stem: I noticed ____. On the next try, you could ____.",
      "Reflection: Which cue helped you control the movement, and how did your second attempt change?",
    ],
    aiPrompts: [
      "Create a 6-station introductory college wellness circuit with movement purpose, observable cues, common errors, safer modifications, contraindication reminders, and appropriate work/rest guidance. Do not present camera similarity as clinical assessment. Include an instructor safety checklist and cite the exercise guidance I provide: [paste].",
    ],
    assessment: "Peer checklist: 3 form cues observed correctly.",
    successCriteria: "Demonstrate three teacher-selected safety cues or accurately explain a suitable modification; improvement matters more than model similarity.",
    fallback: "Teacher models each movement and peers use a printed observation checklist; no camera score is required.",
    inclusion: "Provide seated, reduced-range, and non-hold alternatives; never require a learner to disclose an injury publicly.",
    buildNote: "Landmark similarity is not a clinical or safety assessment. Use the camera only for coarse participation feedback and keep the teacher responsible for movement selection and safety.",
    variations: [
      "Dance steps instead of fitness poses",
      "Health class: “stress relief stretch” sequence",
      "Teacher judgment only if computer vision is unavailable",
    ],
    relatedModule: "session-2",
  },
  {
    id: "art-ar-gallery",
    title: "Pocket AR Mini-Gallery",
    subject: "Arts",
    subjects: ["Arts", "Values Education"],
    grade: "Undergraduate studio arts",
    difficulty: "Intermediate",
    interaction: "AR",
    gameElements: ["Challenge", "Peer feedback", "Exhibition badge"],
    timeMinutes: 40,
    summary:
      "Students use their artworks as tracking targets; scanning reveals artist statements, process documentation, and a structured critique prompt.",
    competency: "Articulate intentional design decisions and conduct evidence-based peer critique",
    setup: [
      "Students create a visually distinct artwork with enough non-repeating detail for image tracking.",
      "Photograph and register artworks as reference images, then test each one; use a separate printed target if an artwork does not track reliably.",
      "AI helps polish artist statements (student ideas first).",
    ],
    playFlow: [
      "Gallery walk: scan peers’ works on phones.",
      "Each reveal shows title, statement, process note, and a describe–analyze–interpret critique prompt.",
      "Students document two formal or conceptual strategies for future studio work.",
      "The class curates a collaborative digital exhibition map.",
    ],
    sampleContent: [
      "Artist statement frame: I emphasized ___ through ___. I chose ___ because ___. I want viewers to notice ___.",
      "Peer response: Name one visible detail, describe its effect, then ask one curious question.",
      "Example: The repeated diagonal lines create movement and guide my eye toward the yellow center.",
    ],
    aiPrompts: [
      "Help a college studio-art student revise these notes into a concise 100-word artist statement. Preserve the student’s voice and conceptual intent, name visible formal choices, and do not invent biography or influences. Return the revision plus three questions the student should answer before finalizing it. Notes: [paste].",
    ],
    assessment: "Rubric: craftsmanship, intentional use of one design element, clarity of statement.",
    successCriteria: "Identify one intentional design choice, explain its effect with visible evidence, and give one specific, respectful peer response.",
    fallback: "Display printed artist statements beside the work or use numbered audio/text links; critique and assessment remain unchanged.",
    inclusion: "Provide typed or recorded statements, alt text for every artwork, and a seated/non-scanning gallery role.",
    buildNote: "Not every artwork is a reliable tracking target. Test contrast, detail, asymmetry, glare, and camera distance before the gallery opens.",
    variations: [
      "Music: scan score snippets to reveal practice tips",
      "Humanities: AR annotations that surface competing interpretations",
      "Group mural sections as markers for a larger narrative",
    ],
    relatedModule: "workshop",
  },
]

export const outputRequirements = {
  intro:
    "Each participant or group will prepare a simple gamified learning activity, interactive demonstration, activity guide, or storyboard that meets the following requirements:",
  requirements: [
    "Addresses a specific course or program learning outcome.",
    "Can be used through a laptop or smartphone.",
    "Uses the camera to display digital learning materials or respond to gestures and body movements.",
    "Includes at least one game element, such as points, challenges, levels, timers, rewards, or immediate feedback.",
    "Uses generative AI to help create lesson content, questions, instructions, stories, images, or activity ideas.",
    "Can be demonstrated or explained during the presentation of outputs.",
  ],
  outputTypes: [
    "A working browser-based learning activity",
    "A simple augmented reality classroom activity",
    "A motion-controlled or gesture-based learning activity",
    "A clickable or interactive prototype",
    "A detailed activity guide",
    "A storyboard showing the activity flow",
  ],
  qualityChecklist: [
    "A student who missed class could still understand the objective from your guide.",
    "Rules take under one minute to explain.",
    "Camera use is essential to the task, not decoration.",
    "AI output was reviewed for accuracy and appropriateness.",
    "There is a non-camera fallback for device failure.",
    "You can name one way you will assess learning after the activity.",
  ],
  sampleStoryboardBeats: [
    "Title screen: course + year level + activity time",
    "Course outcome and objective in clear learner-facing language",
    "How to use the camera (gesture map or marker photo)",
    "One sample challenge with scoring",
    "Feedback example (correct / incorrect)",
    "Exit ticket or reflection prompt",
  ],
}

export function getModuleNeighbors(slug: string) {
  const index = moduleOrder.indexOf(slug as (typeof moduleOrder)[number])
  if (index === -1) return { prev: undefined, next: undefined }
  const prevSlug = index > 0 ? moduleOrder[index - 1] : undefined
  const nextSlug = index < moduleOrder.length - 1 ? moduleOrder[index + 1] : undefined
  return {
    prev: prevSlug ? moduleDetails[prevSlug] : undefined,
    next: nextSlug ? moduleDetails[nextSlug] : undefined,
  }
}

export const subjectFilters = [
  "All",
  "English",
  "Filipino",
  "Science",
  "Mathematics",
  "Araling Panlipunan",
  "Physical Education",
  "Arts",
] as const
