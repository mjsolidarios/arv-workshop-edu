# Gamified Learning Workshop 2026

A workshop website for **"Gamified Learning Using Augmented Reality, Motion-Based Interaction, and Generative AI"** — a faculty training event held on July 30, 2026 at WVSU Calinog Campus.

## Tech Stack

- **Vite** — development server and bundler
- **React 19 + TypeScript** — UI framework
- **Tailwind CSS v3** — utility-first styling
- **shadcn/ui** — accessible component library
- **React Router v7** — client-side routing
- **Lucide React** — icon library

## Features

- **Program of Activities** — full workshop schedule with times, activity types, and facilitators
- **Day learning outcomes** — clear end-of-day goals on the home page
- **Module Detail Pages** — objectives, topic breakdowns, worked examples, sample AI prompts, try-this tasks, and facilitator tips
- **Classroom Examples gallery** — filterable, ready-to-adapt activities across subjects with setup, play flow, assessment, and copyable prompts
- **Workshop Output Guide** — requirements, quality checklist, accepted formats, and storyboard beats
- **Light / Dark Mode** — theme toggle with localStorage persistence
- **Responsive Layout** — table view on desktop, card timeline on mobile; mobile nav menu
- **Black-and-white design** — clean monochrome theme using shadcn CSS variables

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Lint

```bash
npm run lint
```

## Content map

| Route | Purpose |
|-------|---------|
| `/` | Program, outcomes, devices/tools |
| `/modules` | Module cards for each session |
| `/modules/:slug` | Full lesson content |
| `/examples` | Classroom activity gallery |
| `/output` | Expected workshop deliverable |
