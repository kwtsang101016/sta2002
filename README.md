# STA2002 — Interactive Lectures (CUHK(SZ))

Interactive HTML lecture apps for **STA2002 Probability and Statistics II**. Each topic is a standalone Vite + React + TypeScript webapp in its own folder.

## Lectures

| Topic | Folder | Live (GitHub Pages) | Local dev |
|-------|--------|---------------------|-----------|
| Introduction & Preliminary | [`introduction/`](introduction/) | [Open lecture](https://kwtsang101016.github.io/sta2002/introduction/) | `npm run dev` → http://127.0.0.1:5175 |
| Parameter Estimation | [`parameter-estimation/`](parameter-estimation/) | [Open lecture](https://kwtsang101016.github.io/sta2002/parameter-estimation/) | `npm run dev` → http://127.0.0.1:5176 |
| Confidence Intervals | [`confidence-intervals/`](confidence-intervals/) | [Open lecture](https://kwtsang101016.github.io/sta2002/confidence-intervals/) | `npm run dev` → http://127.0.0.1:5177 |

**Course hub:** https://kwtsang101016.github.io/sta2002/

## Quick start

Each app is independent. From the app folder:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

From the repo root you can also run:

```bash
npm run dev:intro
npm run dev:pe
npm run dev:ci
npm run build:all
```

## Adding a new topic

1. Copy an existing app folder (e.g. `introduction/`) and rename it.
2. Update `package.json`, ports in `vite.config.ts`, and lecture content.
3. Add a row to the table above in this README.
4. Add the app to `.github/workflows/deploy.yml` and a card in `site/index.html`.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- Math via [KaTeX](https://katex.org/)
- PDF handout export via `html2pdf.js`
