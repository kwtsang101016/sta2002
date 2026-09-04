# STA2002 Lecture 1 — Interactive Webapp

Interactive lecture notes for **STA2002: Probability and Statistics II**, Lecture 1 (Introduction and Preliminary).

Converted from the Beamer slides in `Lecture1.tex`, with interactive games to reinforce key concepts.

## Quick start

```bash
npm install
npm run dev
```

Open http://127.0.0.1:5175 in your browser.

## Features

- **All slide content** from the original Beamer presentation
- **Interactive games** for probability vs statistics, distributions, LLN, CLT, continuity correction, and Student's Theorem
- **Keyboard navigation** (← →, Space, Home, End)
- **PDF handout** export via the Download PDF button

## Build for deployment

```bash
npm run build
```

Output goes to `dist/`. Configure `base` in `vite.config.ts` for your hosting path.

## Project structure

```
webapp/
├── public/figures/     # Slide images
├── src/
│   ├── lecture/
│   │   ├── games/      # Interactive learning games
│   │   ├── scenes/     # Slide scenes (content from Lecture1.tex)
│   │   ├── Lecture.tsx # Main navigation shell
│   │   └── ...
│   └── App.tsx
└── package.json
```
