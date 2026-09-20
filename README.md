# MiniGames

A small games portal built for the RS School qualifying-stage task (Story 1).
One HTML file, everything else drawn by TypeScript: a hero, a "New Games"
carousel, a leaderboard, a call for game developers, a footer, and a
login/registration dialog.

**Live:** https://neutrolink.github.io/minigames/

## Built with

TypeScript (strict), Sass, Vite. No frameworks — no React, Vue, Bootstrap,
Tailwind, jQuery or Swiper. The carousel, the dialog and the router are all
hand-written. ESLint, Prettier and Husky keep the code tidy on the way in.

## Running it

Needs Node 20.19+ or 22.12+.

```bash
npm install
npm run dev     # http://localhost:5173/minigames/
```

## Scripts

| Script                    | What it does                   |
| ------------------------- | ------------------------------ |
| `dev`                     | Dev server with hot reload     |
| `build`                   | Production bundle into `dist/` |
| `preview`                 | Serve the built bundle locally |
| `typecheck`               | `tsc --noEmit`                 |
| `lint` / `lint:fix`       | ESLint, optionally fixing      |
| `format` / `format:check` | Prettier, writing or checking  |

## Layout

```text
src/
├── main.ts          # boots the app
├── app/             # router, route table, DOM helpers, path helpers
├── pages/           # one render function per route
├── components/      # header, mobile menu, hero, carousel, leaderboard,
│                    # developer section, footer, auth dialog
├── data/            # game and leaderboard content
├── styles/          # tokens, mixins, functions and per-area partials
└── assets/images/   # hero and game artwork
```

## Deployment

Pushing to `story-1` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`).

Pages serves the site from a subpath and cannot rewrite unknown URLs, so two
small pieces make deep links work: `public/404.html` encodes the requested path
into a query string, and a snippet in `index.html` restores it before the router
starts. `src/app/paths.ts` keeps the `/minigames/` prefix out of the route table.

## Task

<https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/story-1.md>
