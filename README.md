# GoGoMeals

A Next.js–based recipe catalog that explores data from TheMealDB. Users can:
- Browse meal lists and incrementally load more items.
- Filter by Ingredient, Category, or Area via an interactive sidebar (with debounced search for Ingredients).
- View a full recipe detail page with ingredients, instructions, images, and YouTube video, complete with SEO metadata and JSON‑LD.

## Tech Stack

| Category       | Technology |
|----------------|------------|
| Framework      | Next.js 16 (App Router), React 19 |
| Language       | TypeScript |
| Styling        | Tailwind CSS v4, shadcn/ui, Radix UI Primitives |
| State & Data   | Redux Toolkit, RTK Query, react‑redux |
| Utilities      | motion (animations), lodash (debounce), lucide‑react (icons), tailwind‑merge |
| Code Quality   | ESLint 9 + eslint-config-next, Prettier (+ sort/organize imports) |

## Project Structure

```
/ (root)
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx           // Root layout + Providers & ClientSideLayout
│  │  ├─ page.tsx             // Home (App Router)
│  │  └─ meal/[id]/page.tsx   // Recipe detail page + JSON-LD
│  ├─ components/
│  │  ├─ custom/              // ContentCard, SmartImage, header waves
│  │  ├─ layout/              // Sidebar, Footer, ClientSideLayout
│  │  ├─ pages/               // Home & Meal Detail (client components)
│  │  ├─ providers/           // Redux Provider
│  │  ├─ skeletons/           // Loading placeholders
│  │  └─ ui/                  // UI components (shadcn)
│  ├─ constants/              // BASE_URL, API_BASE_URL
│  ├─ fetch/                  // Server-side fetch (meal detail)
│  ├─ lib/                    // Utilities & data transformation helpers
│  ├─ store/                  // Redux Toolkit + RTK Query
│  └─ types/                  // TypeScript type definitions
├─ next.config.ts
├─ postcss.config.mjs         // Tailwind v4 via @tailwindcss/postcss
├─ tsconfig.json              // Path alias @/*
├─ components.json            // shadcn/ui configuration
└─ example.env                // Example environment variables
```

## Key Features

- Sidebar filters for Ingredient/Category/Area with debounced Ingredient search and open/close control.
- Meal list with skeleton loading, entrance animations, and a “Load more” button.
- Recipe detail page: merged measure+ingredient list, instructions, and YouTube embed.
- SEO: generateMetadata for OpenGraph/Twitter plus JSON‑LD injection on the detail page.
- Smart image handling: SmartImage component with skeleton, icon fallback, and next/image.
- Clear data layering: RTK Query for lists, separate fetch for detail, strong typing via TypeScript.

## Getting Started

Prerequisites: Node.js LTS and pnpm (recommended, pnpm-lock.yaml included).

```bash
# Install dependencies
pnpm install

# Prepare environment variables
cp example.env .env.local

# Run in development mode
pnpm dev
# Open http://localhost:3000

# Production build
pnpm build

# Start the production server
pnpm start
```

Available scripts:

| Script   | Command              | Description                    |
|----------|----------------------|--------------------------------|
| dev      | next dev             | Start the dev server           |
| build    | next build           | Build for production           |
| start    | next start           | Start the production server    |
| lint     | eslint               | Run linting                    |
| format   | prettier --write .   | Format the entire codebase     |

> npm alternative: replace `pnpm` with `npm run`/`npm i` as needed.

## Configuration

- Environment Variables
  - `NEXT_PUBLIC_BASE_URL` — App base URL, e.g., `http://localhost:3000`.
  - `NEXT_PUBLIC_API_BASE_URL` — TheMealDB endpoint, e.g., `https://www.themealdb.com/api/json/v1/1`.
  - Store them in `.env.local` for local usage.

- Tailwind CSS v4
  - Uses the `@tailwindcss/postcss` plugin (see `postcss.config.mjs`).
  - No `tailwind.config.js`; theme tokens are customized in `src/app/globals.css` via `@theme inline`.
  - Imports: `@import "tailwindcss";`, `@import "shadcn/tailwind.css";`, `@import "tw-animate-css";`.

- UI & Icons
  - shadcn/ui components configured via `components.json` (aliases, baseColor, etc.).
  - Icons powered by `lucide-react`.

- State Management
  - Redux Toolkit + RTK Query: separate UI slices and API endpoints; reducers and middleware wired in `store/`.

## Deployment

- Vercel Preview: https://gogomeals.mufidev.site/
- Preview deployments are built on each push/PR in Vercel (typical setup). Use the link above to validate features and SEO in a production-like environment.

## Notes

- This project uses the App Router (Next.js 16) and React 19. When adding features, follow the established RSC/Client Component patterns.
