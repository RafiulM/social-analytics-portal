# Frontend Guideline Document

This document describes how the frontend of the Social Analytics Portal is built, why it’s set up that way, and how we keep it easy to maintain, fast, and user-friendly.

## 1. Frontend Architecture

### Frameworks and Libraries Used
- **Next.js 13 (App Router)**: Provides file-based routing (`/app` folder), built-in server-side rendering (SSR) and static rendering, and API routes for backend logic.
- **React**: Powers reusable UI components and lets us manage local state cleanly.
- **TypeScript**: Adds type safety across the codebase, reducing bugs and improving developer experience.
- **CSS Modules & Global CSS**: We use plain CSS files (`globals.css`, `theme.css`) and optionally prefix class names following a simple BEM-inspired convention for clarity.
- **Chart.js** or **Recharts**: Renders interactive line and bar charts in the dashboard.
- **SWR** or **React Query**: Manages data fetching, caching, and revalidation on the client.

### Scalability, Maintainability, Performance
- **File-based routing** keeps pages, layouts, and API routes in logical folders—adding or removing features is as simple as adding or deleting directories.
- **Component-based design** means pieces like buttons, forms, and charts live in a `components/` folder and can be reused across pages.
- **Server-side rendering** for public and protected pages ensures fast initial loads and better SEO, while client-side fetching keeps interactions smooth.
- **TypeScript** enforces consistent interfaces for data, making it easier to refactor or onboard new developers.

---

## 2. Design Principles

### Usability
- Clear, primary calls to action (Sign In, Sign Up, Apply filters).
- Consistent layouts (same header, sidebar, footer structure).
- Form validation with inline feedback to guide users.

### Accessibility
- WCAG AA–compliant color contrast in all text and UI elements.
- Keyboard-navigable forms and interactive charts (ARIA attributes on custom components).
- Semantic HTML elements (button, form, nav) for screen readers.

### Responsiveness
- Mobile and tablet breakpoints defined in `theme.css` (e.g., 320px, 768px, 1024px).
- Fluid grid or flex layouts: dashboards adapt from multi-column on desktop to single-column on narrow screens.
- Touch-friendly targets (minimum 44×44px tappable areas).

These principles guide every new component or page: we ask, “Will this be easy to use, accessible to all, and look good on any device?”

---

## 3. Styling and Theming

### Styling Approach
- **CSS Modules & Global CSS**: We use `globals.css` for base element styles (default fonts, margins) and `theme.css` for color variables.
- **BEM-inspired naming**: e.g., `.card--summary`, `.button--primary`, helping us identify components quickly.

### Theming
- All colors and spacing live in CSS variables at the top of `theme.css`. To switch themes (light/dark or brand colors), update these variables in one place.

### Visual Style
- **Flat, modern design** with minimal shadows, crisp edges, and clear typography.
- Focus on a clean white or very light gray background with bold accent colors for primary actions.

### Color Palette
| Role            | Variable            | Light Mode   | Dark Mode      |
|-----------------|---------------------|--------------|----------------|
| Background      | `--bg-color`        | #FFFFFF      | #1E1E1E        |
| Surface (cards) | `--surface-color`   | #F7F9FC      | #2A2A2A        |
| Primary         | `--primary-color`   | #005FCC      | #4791FF        |
| Secondary       | `--secondary-color` | #00BFA6      | #69F0AE        |
| Accent          | `--accent-color`    | #FF6D00      | #FF9100        |
| Text Primary    | `--text-primary`    | #1A202C      | #E0E0E0        |
| Text Secondary  | `--text-secondary`  | #4A5568      | #B0B0B0        |

### Typography
- **Font Family**: `Inter`, sans-serif (loaded via Google Fonts).
- **Base font size**: 16px, scaling up for headings (1.25–2rem).

---

## 4. Component Structure

### Organization
- `app/` holds pages and layouts (Next.js convention).
- `components/` holds shared UI pieces (buttons, inputs, cards, charts).
- `hooks/` contains custom React hooks (e.g., `useAuth`, `useFetchMetrics`).
- `styles/` stores global and theme CSS.

### Reuse and Encapsulation
- Each component has its own folder, e.g. `components/CardSummary/` with `CardSummary.tsx` and `CardSummary.module.css` or scoped CSS.
- Props define the API for each component; no component reaches into another’s internal state.

### Benefits of Component-Based Architecture
- Encourages single responsibility: small, focused components.
- Easier testing: unit-test one component at a time.
- Faster iteration: reuse existing components instead of rewriting similar UI.

---

## 5. State Management

### Data Fetching & Caching
- **SWR** or **React Query** handles server data: calls API routes (`/api/data/metrics`), caches results, and revalidates in the background.
- Loading and error states come built-in, letting us show skeletons or retry buttons easily.

### Global State
- **Authentication Context**: We wrap the app in an `AuthProvider` that tracks user session, exposes `signIn`, `signOut`, and `currentUser` via React Context.
- Storing tokens or session info in HTTP-only cookies; the client reads user info from a `/api/auth/session` endpoint.

### Local State
- Simple UI state (form inputs, modal open/closed) lives in `useState` hooks within components.

---

## 6. Routing and Navigation

### File-Based Routing (Next.js App Router)
- **Pages**: `app/sign-in/page.tsx`, `app/sign-up/page.tsx`, `app/dashboard/page.tsx`, etc. map directly to `/sign-in`, `/sign-up`, `/dashboard`.
- **Layouts**: `layout.tsx` at root wraps every page with header/nav; `dashboard/layout.tsx` adds the sidebar and dashboard header.
- **API Routes**: `app/api/auth/route.ts` handles `POST /api/auth/signin`, `POST /api/auth/signup`, `GET /api/auth/session`, etc.

### Navigation Structure
- **Header and Sidebar** components import `next/link` for client-side transitions.
- Active link highlighting driven by `usePathname` hook to help users know where they are.
- Protected routes check for `currentUser` in the `AuthProvider` and redirect unauthenticated users to `/sign-in`.

---

## 7. Performance Optimization

### Code Splitting & Lazy Loading
- Next.js automatically splits code per route. For heavy components (like charts), we use `dynamic(() => import('…'), { ssr: false })` or lazy imports.

### Asset Optimization
- Built-in Next.js image optimization (`next/image`) for any uploaded media or static icons.
- CSS is tree-shaken and bundled per page.

### Data Strategies
- **Server-side rendering** for the first dashboard load gives a fully rendered HTML quickly.
- **Stale-while-revalidate** (SWR) ensures that data is fresh but doesn’t block the UI.

### Other Tactics
- Prefetch links in the viewport using `<Link prefetch>`.
- Minimize large third-party scripts; only load chart libraries on dashboard pages.

---

## 8. Testing and Quality Assurance

### Unit Tests
- **Jest** + **React Testing Library** to test individual components and hooks.
- Mock API calls with `msw` (Mock Service Worker) for isolated tests.

### Integration Tests
- Combine components with context and routing to test flows like “sign in → view dashboard.”

### End-to-End Tests
- **Cypress** or **Playwright** for full user flows: sign-up, sign-in, filter application, sign-out.

### Linters and Formatters
- **ESLint** with TypeScript rules and **Prettier** for consistent code style.
- Pre-commit hooks (Husky) run linting and tests before each commit.

---

## 9. Conclusion and Overall Frontend Summary

We’ve built the Social Analytics Portal frontend with a modern, scalable stack centered on Next.js, React, and TypeScript. Our architecture supports:
- **Easy growth**—add pages, API routes, or themes without major rewrites.
- **High performance**—fast first loads, smart caching, and minimal bundle sizes.
- **Strong maintainability**—clear folder structure, reusable components, type-safe code.

By following these guidelines—clean component design, consistent styling, robust state management, and thorough testing—we ensure the portal stays reliable, accessible, and delightful to use as it evolves.
