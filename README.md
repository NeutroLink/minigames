# MiniGames

A single-page games portal built for the RS School _MiniGames_ assignment (Story 1):
a home page with a hero, a "New Games" carousel, a leaderboard table, an
"Are You a Game Developer?" section, a login/registration dialog and a footer, plus
placeholder routes for Library, Tournaments and Community.

- **Deployed URL:** _not deployed yet_
  <!-- TODO: after deploying, replace this line with the public link, e.g.
  **Deployed URL:** https://your-site.netlify.app -->
- **Screenshot:** _not added yet_
  <!-- TODO: drop a screenshot of the home page here, e.g.
  ![MiniGames home page](./screenshot.png) -->

## Tech stack

| Layer                | What is used                                                                      |
| -------------------- | --------------------------------------------------------------------------------- |
| Language             | TypeScript in `strict` mode                                                       |
| Styles               | Sass (`.scss`) with design tokens, mixins, helper functions and per-area partials |
| Build & dev server   | Vite                                                                              |
| Routing              | Hand-written History API router (`pushState` + `popstate`), no router library     |
| Linting & formatting | ESLint (`typescript-eslint` + `eslint-plugin-unicorn`) and Prettier               |
| Git hooks            | Husky: commitlint on `commit-msg`, lint + format check on `pre-push`              |

No UI framework and no CSS framework — no React, Vue, Angular, Bootstrap, Tailwind,
jQuery or Swiper. Every component is plain DOM code in `src/components`, and the
markup builders live in `src/app/dom.ts`.

## Getting started

Prerequisites: Node.js `^20.19.0 || >=22.12.0` (Vite's own requirement) and npm.

```bash
npm install    # dependencies + Husky Git hooks
npm run dev    # dev server with hot reload, http://localhost:5173
```

## npm scripts

| Script                 | What it does                                                                      |
| ---------------------- | --------------------------------------------------------------------------------- |
| `npm run dev`          | Starts the Vite dev server with hot reload.                                       |
| `npm run build`        | Builds the production bundle into `dist/`.                                        |
| `npm run preview`      | Serves the built `dist/` locally, to check the production output.                 |
| `npm run typecheck`    | Runs `tsc --noEmit` — type-checks without emitting files.                         |
| `npm run lint`         | Runs ESLint over the repository.                                                  |
| `npm run lint:fix`     | Runs ESLint with `--fix`, applying the fixes it can.                              |
| `npm run format`       | Rewrites files with Prettier.                                                     |
| `npm run format:check` | Checks Prettier formatting and fails if anything is unformatted (writes nothing). |
| `npm run prepare`      | Installs the Husky Git hooks; npm runs it automatically after `npm install`.      |

## Project structure

```text
minigames/
├── index.html                 # Vite HTML entry — its <body> holds only the module <script>
├── public/                    # Copied verbatim into dist/ (favicon.svg)
├── src/
│   ├── main.ts                # Entry point: creates #app and boots the app
│   ├── app/
│   │   ├── app.ts             # App shell: header + mobile menu + routed outlet + footer + auth dialog
│   │   ├── router.ts          # History API router: pushState, popstate, scroll reset, document title
│   │   ├── routes.ts          # Route table (/ , /library, /tournaments, /community)
│   │   └── dom.ts             # createElement / clearElement helpers
│   ├── pages/                 # One render function per route, plus not-found.ts
│   ├── components/            # UI blocks: header, mobile-menu, hero, carousel, leaderboard,
│   │                          # developer section, footer, auth-dialog
│   ├── data/                  # Mock content (games, leaderboard rows) for Story 1
│   ├── styles/                # Sass: main.scss entry, _tokens, _mixins, _functions,
│   │                          # _container, _header, _sections, _overlays
│   └── assets/images/         # Images imported by the code (hero.jpg, games/*.jpg)
├── netlify.toml               # Netlify build + SPA fallback
├── vercel.json                # Vercel build + SPA fallback
├── eslint.config.js           # ESLint flat config
├── tsconfig.json              # TypeScript config (strict, noEmit)
├── .prettierrc                # Prettier options
├── .husky/                    # Git hooks
└── .github/pull_request_template.md
```

Routes are rendered client-side from the table in `src/app/routes.ts`; the header,
mobile menu, footer and auth dialog are re-rendered on every navigation, and anything
not in the table falls through to `src/pages/not-found.ts`.

## Deployment

The app uses the History API with real paths, so `/library`, `/tournaments` and
`/community` are not files on disk. A static host must therefore answer any unknown
path with `index.html` (a 200, not a 404) and let the client router decide what to
render. Both configs are already in the repository, so either host works without further
setup:

| Host    | Config file    | What it does                                                                                         |
| ------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| Netlify | `netlify.toml` | Builds with `npm run build`, publishes `dist/`, and redirects `/*` to `/index.html` with status 200. |
| Vercel  | `vercel.json`  | Same build and output directory, expressed as a rewrite of `/(.*)` to `/index.html`.                 |

Real files always win over the fallback on both hosts, so hashed assets, the favicon
and images keep being served normally.

### Netlify — what to do at deploy time

1. Netlify → **Add new site** → **Import an existing project** → pick this GitHub repo.
2. Choose the branch to deploy (`main`, or `story-1` while the story is under review).
3. Leave the build command, publish directory, redirects and Node version untouched —
   `netlify.toml` supplies all of them.
4. Deploy, open the site URL, reload it on `/library` to confirm the fallback works,
   then paste the URL into the **Deployed URL** placeholder at the top of this file.

### Vercel — what to do at deploy time

1. Vercel → **Add New…** → **Project** → import this GitHub repo.
2. Keep the detected Vite preset; `vercel.json` supplies the build command, the output
   directory and the rewrite.
3. Deploy, check `/library` on the deployed domain, then paste the URL into the
   **Deployed URL** placeholder.

### GitHub Pages — not drop-in

GitHub Pages has no redirect/rewrite rule, so a direct hit on `/library` returns a 404
document (the "404.html" trick only works together with extra client-side code).
Deploying there needs three things this repository does not have yet:

1. a `vite.config.ts` with `base: '/<repo-name>/'`, because project sites are served
   from a subpath;
2. a `404.html` that rewrites the deep link into a query string **and** a matching
   snippet in `index.html` that decodes it back into `history.replaceState` — without
   the second half the app boots on the wrong route;
3. a GitHub Actions workflow (or a `gh-pages` branch) that publishes `dist/`.

Netlify and Vercel need none of that, which is why those are the two hosts configured
here.

## Assignment

Story 1 of the RS School _MiniGames_ task:
<https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/minigames/story-1.md>
