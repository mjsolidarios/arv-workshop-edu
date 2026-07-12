export const workshopMeta = {
  title: "Gamified Learning Using Augmented Reality, Motion-Based Interaction, and Generative AI",
  date: "July 30, 2026",
  day: "Thursday",
  eventType: "Faculty Training / Workshop",
  primaryAudience: "Teachers and faculty members, including non-ICT participants",
  deliveryMode: "Face-to-face, hands-on",
  resourcePerson: "Mr. Mark Joseph J. Solidarios",
  devices: [
    "Laptop with webcam",
    "Smartphone with camera",
  ],
  tools: [
    "Google AI Studio",
    "Encantar.js",
    "Three.js",
    "PixiJS",
    "Pixi3D",
    "Google MediaPipe",
    "Slido",
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
}

export const scheduleItems: ScheduleItem[] = [
  {
    id: "registration",
    time: "8:00–8:30 AM",
    title: "Registration",
    facilitator: "Secretariat",
    description: [],
    isBreak: true,
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
  },
  {
    id: "session-1",
    time: "9:00–10:00 AM",
    title: "Session 1: Introduction to Gamified, Augmented Reality, and Motion-Based Learning",
    facilitator: "Mr. Mark Joseph J. Solidarios",
    moduleSlug: "session-1",
    description: [
      "Understanding gamified learning and game-based learning",
      "Using challenges, points, rewards, feedback, and progress to motivate learners",
      "Understanding augmented reality and its possible classroom uses",
      "Using cameras to recognize hand movements, facial expressions, and body movements",
      "Using laptops and smartphones as interactive learning tools",
      "Using generative AI to develop lesson ideas, questions, instructions, stories, and activities",
      "Responsible, safe, accessible, and appropriate use of cameras and AI in the classroom",
    ],
  },
  {
    id: "open-forum-1",
    time: "10:00–10:30 AM",
    title: "Open Forum and Guided Discussion (Slido)",
    facilitator: "Mr. Mark Joseph J. Solidarios",
    moduleSlug: "open-forum-1",
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
    description: [
      "Overview of the steps in creating a simple interactive learning activity",
      "Using Google AI Studio to generate lesson ideas, questions, instructions, images, and activity guides",
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
  },
  {
    id: "session-2",
    time: "1:00–2:00 PM",
    title: "Session 2: Designing Meaningful Gamified Learning Activities with AI",
    facilitator: "Mr. Mark Joseph J. Solidarios",
    moduleSlug: "session-2",
    description: [
      "Connecting learning outcomes with game objectives and challenges",
      "Designing simple rules, points, levels, rewards, and feedback",
      "Making activities enjoyable while keeping the lesson meaningful",
      "Using augmented reality and body movements to encourage participation",
      "Designing activities that use hand gestures, facial expressions, body poses, or printed images",
      "Using generative AI to prepare questions, stories, hints, instructions, and feedback",
      "Choosing the appropriate device and activity based on the subject and learners",
      "Examples of possible applications in language, science, mathematics, social studies, arts, physical education, and other disciplines",
    ],
  },
  {
    id: "open-forum-2",
    time: "2:00–2:30 PM",
    title: "Open Forum and Project Consultation (Slido)",
    facilitator: "Mr. Mark Joseph J. Solidarios",
    moduleSlug: "open-forum-2",
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
    description: [
      "Identify a lesson, learning competency, or classroom concern",
      "Identify the target learners and expected learning outcome",
      "Design a simple game objective, challenge, rules, and reward system",
      "Use Google AI Studio to generate ideas, questions, instructions, and activity content",
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
  },
]

export interface ModuleDetail {
  slug: string
  title: string
  time: string
  overview: string
  objectives: string[]
  topics: { heading: string; points: string[] }[]
  tools?: string[]
  tips?: string[]
}

export const moduleDetails: Record<string, ModuleDetail> = {
  "session-1": {
    slug: "session-1",
    title: "Session 1: Introduction to Gamified, Augmented Reality, and Motion-Based Learning",
    time: "9:00–10:00 AM",
    overview:
      "This session introduces the foundational concepts behind gamified learning, augmented reality, and motion-based interaction. Participants will explore how these technologies can transform ordinary classroom activities into engaging, interactive experiences — and how generative AI can assist teachers in designing lesson content.",
    objectives: [
      "Understand the difference between gamified learning and game-based learning.",
      "Identify game elements such as challenges, points, rewards, feedback, and progress that motivate learners.",
      "Explain what augmented reality is and describe practical classroom applications.",
      "Describe how device cameras can detect hand movements, facial expressions, and body poses.",
      "Recognize how laptops and smartphones can serve as interactive teaching tools.",
      "Use generative AI to brainstorm lesson ideas, questions, instructions, stories, and activities.",
      "Apply responsible, safe, accessible, and age-appropriate practices when using cameras and AI.",
    ],
    topics: [
      {
        heading: "Gamified Learning vs. Game-Based Learning",
        points: [
          "Gamification adds game elements (points, badges, leaderboards, levels) to non-game activities.",
          "Game-based learning uses actual games as the learning medium.",
          "Both approaches increase motivation, engagement, and immediate feedback.",
        ],
      },
      {
        heading: "Game Elements That Motivate Learners",
        points: [
          "Challenges: tasks with clear difficulty that push learners forward.",
          "Points and scoring: instant feedback on progress.",
          "Rewards and badges: recognition for achievement.",
          "Levels and progression: structured growth toward mastery.",
          "Timers and countdowns: urgency that keeps learners focused.",
        ],
      },
      {
        heading: "Augmented Reality in the Classroom",
        points: [
          "AR overlays digital content (images, 3D objects, text) on the real world viewed through a camera.",
          "Students can scan printed markers or use image recognition to reveal learning materials.",
          "AR is accessible on any smartphone or laptop with a functioning camera.",
          "Examples: AR flashcards, virtual lab specimens, 3D geometry models.",
        ],
      },
      {
        heading: "Motion-Based Interaction",
        points: [
          "Cameras can be trained to recognize hand gestures, body poses, and facial expressions.",
          "Motion-based activities allow students to interact with content through physical movement.",
          "Tools like Google MediaPipe provide pre-built gesture and pose detection models.",
          "Applications range from physical education games to vocabulary drills controlled by gestures.",
        ],
      },
      {
        heading: "Generative AI as a Teacher's Assistant",
        points: [
          "AI tools like Google AI Studio can generate lesson plans, quiz questions, and activity instructions in seconds.",
          "Teachers can prompt AI to create differentiated content for different learner levels.",
          "AI-generated images can serve as AR markers or visual aids.",
          "Always review and edit AI-generated content for accuracy and appropriateness.",
        ],
      },
      {
        heading: "Responsible and Safe Use",
        points: [
          "Always obtain appropriate consent before recording or processing student images.",
          "Process camera data locally on the device when possible — avoid uploading student footage.",
          "Choose tools that are age-appropriate and accessible to all learners.",
          "Discuss digital citizenship and privacy with students before using camera-based activities.",
        ],
      },
    ],
    tools: ["Google AI Studio", "Google MediaPipe", "Slido"],
    tips: [
      "Start with a simple gamification layer — adding a point system to an existing quiz is a low-barrier entry point.",
      "Use Slido to run live polls and gauge how familiar participants are with AR before diving into demos.",
      "Show a brief video demonstration of AR and motion detection before discussing the underlying technology.",
    ],
  },
  "open-forum-1": {
    slug: "open-forum-1",
    title: "Open Forum and Guided Discussion",
    time: "10:00–10:30 AM",
    overview:
      "An interactive discussion session powered by Slido. Participants are invited to share their reactions to Session 1, raise questions, and explore how the concepts introduced could apply in their own classrooms and disciplines.",
    objectives: [
      "Reflect on the concepts introduced in Session 1.",
      "Share initial reactions, questions, and concerns about using AR, motion-based interaction, and AI in teaching.",
      "Identify at least one potential application relevant to your own subject area.",
    ],
    topics: [
      {
        heading: "Discussion Prompts",
        points: [
          "What surprised you most about what cameras can detect?",
          "Which game element do you think would work best in your class? Why?",
          "What concerns do you have about using AI or camera-based tools with students?",
          "Can you think of one lesson where an AR activity would be more effective than a traditional approach?",
        ],
      },
      {
        heading: "How to Use Slido",
        points: [
          "Open slido.com or use the Slido app on your device.",
          "Enter the event code provided by the facilitator.",
          "Submit questions, participate in live polls, and upvote questions from other participants.",
          "Responses are displayed anonymously on the projector screen.",
        ],
      },
    ],
    tools: ["Slido"],
    tips: [
      "Encourage participants to think about their most challenging lesson to teach — that is often a good starting point for a gamified or AR activity.",
      "Keep the discussion grounded in classroom reality: focus on what is immediately feasible with a smartphone or laptop.",
    ],
  },
  "hands-on": {
    slug: "hands-on",
    title: "Hands-on Demonstration: Creating Interactive Learning Activities",
    time: "10:30 AM–12:00 PM",
    overview:
      "Participants observe and follow along as the resource person walks through the end-to-end process of creating a simple interactive learning activity — from generating content with AI, to displaying AR objects through a smartphone camera, to making activities respond to hand gestures and body movements.",
    objectives: [
      "Follow the step-by-step process for building a basic interactive learning activity.",
      "Use Google AI Studio to generate lesson content, images, and activity instructions.",
      "Understand how AR markers and camera-based image recognition work in a browser.",
      "See how gesture and pose detection can be integrated into a simple activity.",
      "Identify at least two subject areas where the demonstrated technique could be applied.",
    ],
    topics: [
      {
        heading: "Step-by-Step Overview",
        points: [
          "Step 1: Define the learning objective and target learners.",
          "Step 2: Use Google AI Studio to generate questions, instructions, and supporting images.",
          "Step 3: Choose the interaction method: AR markers, image recognition, or gesture/pose detection.",
          "Step 4: Add the generated content (text, images, 3D models) to the activity.",
          "Step 5: Test the activity on a laptop and a smartphone.",
          "Step 6: Refine based on usability and learning effectiveness.",
        ],
      },
      {
        heading: "Generating Content with Google AI Studio",
        points: [
          "Write clear prompts describing the lesson topic, audience, and desired output.",
          "Generate multiple-choice or open-ended questions for quizzes.",
          "Request instructions written at an appropriate reading level for your students.",
          "Generate descriptive images that can be used as AR markers or visual aids.",
        ],
      },
      {
        heading: "Augmented Reality with Encantar.js",
        points: [
          "Encantar.js is a browser-based AR library — no app installation required.",
          "Print or display a reference image; Encantar.js detects it and overlays 3D content.",
          "Combine with Three.js or PixiJS to render educational 3D models or 2D animations.",
          "Activities run entirely in the browser on any smartphone or laptop with a camera.",
        ],
      },
      {
        heading: "Motion Detection with Google MediaPipe",
        points: [
          "MediaPipe Hands detects 21 key points on each hand in real time.",
          "MediaPipe Pose detects full body landmarks for pose-based interactions.",
          "MediaPipe Face Mesh enables facial-expression-controlled activities.",
          "All processing happens on-device — no student footage is sent to external servers.",
        ],
      },
    ],
    tools: ["Google AI Studio", "Encantar.js", "Three.js", "PixiJS", "Pixi3D", "Google MediaPipe"],
    tips: [
      "Keep the demo activity simple — a flashcard quiz where the correct answer appears as a 3D object through the camera is a powerful yet achievable first example.",
      "Pair participants so that one person holds the phone while the other interacts with the activity.",
      "Allow time for freeplay after the structured demo so participants can experiment on their own.",
    ],
  },
  "session-2": {
    slug: "session-2",
    title: "Session 2: Designing Meaningful Gamified Learning Activities with AI",
    time: "1:00–2:00 PM",
    overview:
      "Building on the morning demonstrations, this session focuses on the pedagogical design of gamified learning activities. Participants learn how to connect game mechanics to real learning outcomes, use AI effectively as a content creation tool, and adapt activities across multiple subject areas.",
    objectives: [
      "Align game objectives and challenges with specific learning competencies.",
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
          "Start with the DepEd learning competency or lesson objective.",
          "Map the game challenge directly to the skill or knowledge being assessed.",
          "Example: A science quiz on the water cycle → students mime rain, evaporation, and condensation using body poses to advance to the next level.",
          "The game must serve the lesson, not distract from it.",
        ],
      },
      {
        heading: "Designing the Game Structure",
        points: [
          "Rules: clear, simple instructions that even non-ICT participants can follow.",
          "Points: assign values to correct answers, fast responses, or creative contributions.",
          "Levels: increase difficulty progressively — vocabulary → comprehension → application.",
          "Rewards: badges, certificates, praise, or bonus content unlocked after completing a level.",
          "Feedback: immediate and specific — tell students what they got right and what to improve.",
        ],
      },
      {
        heading: "Using AR and Movement to Encourage Participation",
        points: [
          "Activities requiring physical movement are naturally inclusive — no reading required to participate.",
          "AR activities spark curiosity and are especially effective for visual and kinesthetic learners.",
          "Gesture-based controls (raise hand = answer A, open palm = answer B) are quick to learn.",
          "Body-pose activities encourage PE integration and cross-disciplinary connections.",
        ],
      },
      {
        heading: "Generative AI for Differentiated Content",
        points: [
          "Ask AI to generate the same lesson content at three reading levels: basic, intermediate, and advanced.",
          "Use AI to create alternative explanations, analogies, and visual descriptions.",
          "Generate hint text and scaffolded clues to support struggling learners.",
          "Use AI-generated stories or scenarios to contextualise abstract concepts.",
        ],
      },
      {
        heading: "Cross-Disciplinary Applications",
        points: [
          "Language: gesture-controlled vocabulary flashcards, AR storytelling, pose-based grammar drills.",
          "Science: AR lab simulations, motion-based cell biology activities.",
          "Mathematics: gesture-controlled equation solvers, AR geometry explorers.",
          "Social Studies: AR map overlays, timeline activities controlled by body movement.",
          "Arts: AR drawing tools, music composition using hand gestures.",
          "Physical Education: pose-matching games, AR fitness challenges.",
        ],
      },
    ],
    tools: ["Google AI Studio", "Google MediaPipe", "Encantar.js", "Slido"],
    tips: [
      "Encourage teachers to start with a lesson they already teach well — the game layer should enhance, not replace, their existing expertise.",
      "Remind participants that a storyboard or activity guide is a valid output, even without a working prototype.",
      "Use Slido to collect subject-area ideas from participants — this builds a shared bank of cross-disciplinary applications.",
    ],
  },
  "open-forum-2": {
    slug: "open-forum-2",
    title: "Open Forum and Project Consultation",
    time: "2:00–2:30 PM",
    overview:
      "A focused consultation session where participants present their preliminary activity ideas, receive targeted feedback from the resource person and peers, and refine their plans before the hands-on workshop begins.",
    objectives: [
      "Present a clear initial concept for your workshop activity.",
      "Receive constructive feedback on alignment between the game design and learning objective.",
      "Identify any technical or content-related challenges and plan solutions.",
    ],
    topics: [
      {
        heading: "Consultation Framework",
        points: [
          "What is the learning competency you are addressing?",
          "Who are your target learners and what is their level?",
          "What is the main game mechanic (AR marker, gesture, pose, or a combination)?",
          "What content will AI help you create?",
          "How will learners know they have achieved the learning objective?",
        ],
      },
      {
        heading: "Common Challenges and Solutions",
        points: [
          "Challenge: I don't have a coding background. Solution: Use pre-built templates and AI-generated code snippets.",
          "Challenge: My students don't have smartphones. Solution: Design the activity for a shared class laptop with a webcam.",
          "Challenge: My lesson is very abstract (e.g., grammar rules). Solution: Use AR visual metaphors and gesture-based sorting activities.",
          "Challenge: I'm not sure which tool to use. Solution: Start with Google AI Studio for content and MediaPipe for interaction — the simplest stack for beginners.",
        ],
      },
    ],
    tools: ["Google AI Studio", "Slido"],
    tips: [
      "Keep consultations brief (2–3 minutes per group) so all participants receive feedback.",
      "Encourage peer-to-peer feedback — teachers in the same subject area often have the best practical insights.",
    ],
  },
  workshop: {
    slug: "workshop",
    title: "Workshop: Developing a Gamified Learning Activity",
    time: "2:30–3:30 PM",
    overview:
      "The core hands-on session. Working individually or in small groups, participants design and build a gamified learning activity that combines at least one game element with either AR or motion-based interaction, supported by AI-generated content.",
    objectives: [
      "Produce a complete or near-complete gamified learning activity, prototype, or activity guide.",
      "Demonstrate that the activity addresses a real lesson or learning competency.",
      "Show that the activity uses the camera in a meaningful way.",
      "Include at least one game element such as points, challenges, levels, timers, rewards, or feedback.",
      "Use generative AI to support content creation.",
    ],
    topics: [
      {
        heading: "Workshop Steps",
        points: [
          "Step 1 — Define the lesson: Choose a specific competency, topic, or classroom challenge.",
          "Step 2 — Identify learners: Who will use this activity? What are their needs and level?",
          "Step 3 — Design the game: Write the game objective, rules, scoring system, and rewards.",
          "Step 4 — Generate content: Use Google AI Studio to create questions, instructions, images, and stories.",
          "Step 5 — Build the activity: Use the provided template or create a custom browser-based activity.",
          "Step 6 — Add camera interaction: Implement AR markers (Encantar.js) or gesture/pose detection (MediaPipe).",
          "Step 7 — Test and refine: Run the activity on both a laptop and a smartphone.",
          "Step 8 — Prepare the output: Create a storyboard, activity guide, or working demo for the presentation.",
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
          "Addresses a specific lesson or learning competency.",
          "Can be used on a laptop or smartphone.",
          "Uses the camera to display digital materials or respond to gestures or body movements.",
          "Includes at least one game element (points, challenges, levels, timers, rewards, or immediate feedback).",
          "Uses generative AI for at least one component (content, images, instructions, or questions).",
          "Can be demonstrated or explained during the presentation.",
        ],
      },
    ],
    tools: ["Google AI Studio", "Encantar.js", "Three.js", "PixiJS", "Pixi3D", "Google MediaPipe"],
    tips: [
      "Focus on completing one small but complete activity rather than an ambitious but unfinished one.",
      "Use AI to generate all text content quickly so you can spend most of your time on the interaction design.",
      "If you are not comfortable coding, create a detailed storyboard with annotated wireframes — this is equally valuable.",
    ],
  },
  presentation: {
    slug: "presentation",
    title: "Presentation and Demonstration of Outputs",
    time: "3:30–4:30 PM",
    overview:
      "Participants share their completed activities, prototypes, storyboards, or activity guides. Each group or individual demonstrates or explains their work, receives feedback from peers and the resource person, and reflects on how the activity could be used in an actual classroom.",
    objectives: [
      "Present or demonstrate the workshop output clearly and confidently.",
      "Receive constructive feedback from peers and the resource person.",
      "Identify practical next steps for implementing the activity in your classroom.",
      "Reflect on key learning points from the full-day workshop.",
    ],
    topics: [
      {
        heading: "Presentation Guide",
        points: [
          "Introduce the subject area, lesson topic, and target learners.",
          "Explain the game mechanic and camera interaction used.",
          "Show or describe how AI was used to create content.",
          "Demonstrate the activity (or walk through the storyboard).",
          "Share one thing you would change or improve.",
        ],
      },
      {
        heading: "Feedback Framework",
        points: [
          "Is the learning objective clear and achievable through this activity?",
          "Is the game mechanic simple enough for the target learners?",
          "Is the camera interaction meaningful, or is it decorative?",
          "Is the AI-generated content accurate, appropriate, and at the right level?",
          "Could this activity be used with minimal preparation in a real classroom?",
        ],
      },
      {
        heading: "Training Evaluation",
        points: [
          "Complete the evaluation form provided by the organizing committee.",
          "Rate the relevance, clarity, and overall quality of the training.",
          "Provide suggestions for future workshop topics.",
        ],
      },
    ],
    tools: ["Slido"],
    tips: [
      "Keep each presentation to 3–5 minutes to allow all groups to share.",
      "Celebrate effort and creativity, not just technical polish.",
      "Encourage participants to exchange contact information so they can collaborate after the workshop.",
    ],
  },
}

export const outputRequirements = {
  intro:
    "Each participant or group will prepare a simple gamified learning activity, interactive demonstration, activity guide, or storyboard that meets the following requirements:",
  requirements: [
    "Addresses a specific lesson or learning competency.",
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
}
