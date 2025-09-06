# Tech Stack Document

This document explains the main technologies and tools used to build the Social Analytics Portal. It’s written in everyday language so that anyone—technical or non-technical—can understand why we chose each technology and how it helps the project succeed.

## 1. Frontend Technologies

These are the tools that create the parts of the application you see and interact with in your web browser.

- **Next.js (v13, App Router)**
  - Provides a clear, folder-based structure for pages (`/app/dashboard`, `/app/sign-in`, etc.).
  - Automatically handles routing so links and URLs map directly to files.
  - Offers both server-side rendering (fast first load) and client-side updates (smooth interactions).

- **React**
  - Powers reusable pieces of the interface (buttons, forms, charts).
  - Lets us break the UI into small, easy-to-manage components.

- **TypeScript**
  - Adds “type safety,” catching mistakes early in development.
  - Makes code easier to understand and maintain over time.

- **Styling with CSS**
  - Global styles in `globals.css` for consistent fonts, colors, and spacing.
  - Theme variables in `theme.css` so changing colors or fonts is quick and predictable.
  - Responsive breakpoints ensure the portal looks good on desktop and tablet.

- **Data Visualization**
  - **Chart.js** or **Recharts** for drawing line charts and bar charts.
  - These libraries turn raw numbers into interactive visuals, helping users spot trends quickly.

- **Client-Side Data Fetching**
  - **SWR** or **React Query** for fetching, caching, and updating data without full page reloads.
  - Provides built-in loading states and automatic data refresh.

By combining these technologies, the frontend is fast to load, easy to navigate, and straightforward to develop and maintain.

## 2. Backend Technologies

These are the tools that run behind the scenes on the server, handling data storage, authentication, and any logic you don’t see directly in the browser.

- **Next.js API Routes**
  - Serverless functions placed under `/app/api` (for example, `/app/api/auth/route.ts`).
  - Handle sign-up, sign-in, password reset, and data requests.
  - Automatically scale on platforms like Vercel—no separate server to manage.

- **Node.js & TypeScript**
  - The API routes run on Node.js, using TypeScript for consistency with the frontend.

- **Authentication & User Management**
  - **Password Hashing** with **bcrypt** to store passwords safely.
  - **JSON Web Tokens (JWTs)** or **HTTP-only cookies** to keep users logged in securely.
  - A custom or NextAuth.js credentials provider to validate credentials and manage sessions.

- **Data Storage**
  - **Local JSON file** (`dashboard/data.json`) holds initial analytics data in version 1.
  - Designed so that in future we can swap this out for a real database (e.g., PostgreSQL with Prisma) without changing the UI.

- **Email Service Integration**
  - For password reset emails, we plan to use a service like **SendGrid** or **Amazon SES**.
  - Keeps password-reset workflows reliable and scalable.

Together, these backend pieces keep user data safe, make your login experience smooth, and deliver analytics data on demand.

## 3. Infrastructure and Deployment

These choices define where and how the application lives online, how we manage changes, and how we ensure reliability.

- **Version Control: Git & GitHub**
  - All code is stored in a Git repository on GitHub.
  - Branching, pull requests, and code reviews help maintain code quality.

- **CI/CD: GitHub Actions**
  - Automated tests and checks run on every push.
  - Successful merges to the `main` branch trigger deployment.

- **Hosting: Vercel (or similar)**
  - Instantly deploys Next.js applications with zero-config.
  - Scales serverless functions automatically to handle spikes in traffic.
  - Manages SSL certificates and global content delivery without extra setup.

- **Environment Management**
  - Environment variables for secrets (API keys, database URLs) are stored securely in Vercel settings.
  - Keeps sensitive information out of the codebase.

This infrastructure setup means less time spent managing servers and more time building features—and ensures the portal stays up and running smoothly.

## 4. Third-Party Integrations

While the core portal runs on our own code, several external tools and services extend its functionality.

- **Chart.js / Recharts**
  - Trusted libraries for drawing attractive, interactive charts.

- **SWR / React Query**
  - Libraries that simplify and speed up data fetching in React apps.

- **SendGrid / Amazon SES (Email Service)**
  - Sends password reset links and other transactional emails reliably.

- **Future Social Media APIs**
  - In later versions, we will connect to Facebook, Twitter, and Instagram APIs to pull real analytics data.

- **(Optional) Google Analytics**
  - Can be added to track how users navigate the portal and which features they use most.

These integrations minimize custom work and leverage industry-proven services.

## 5. Security and Performance Considerations

Security Measures:
- **Password Hashing** (bcrypt) ensures raw passwords are never stored.
- **JWTs or HTTP-only Cookies** prevent client-side scripts from stealing session tokens.
- **CSRF & XSS Protections** using built-in Next.js headers and careful data handling.
- Compliance with **OWASP Top 10** best practices.

Performance Optimizations:
- **Server-Side Rendering (SSR)** for fast first-load times (< 2 seconds).
- **Client-Side Caching** with SWR/React Query to avoid unnecessary network calls.
- **Skeleton Loaders** and spinners for a polished loading experience.
- **Code Splitting & Tree Shaking** thanks to Next.js—and only the code you need is sent to the browser.

By combining these measures, we keep user data safe and ensure the portal feels snappy and reliable.

## 6. Conclusion and Overall Tech Stack Summary

We chose a modern, integrated stack built around **Next.js**, **React**, and **TypeScript** because it:

- Delivers fast, friendly user experiences with minimal configuration.
- Scales automatically via serverless functions, reducing infrastructure overhead.
- Keeps code maintainable and consistent across frontend and backend.
- Allows us to start with simple local data storage and easily plug in real databases or external APIs later.

Unique Highlights:
- File-based routing maps your folder structure directly to the site’s URLs.
- A unified codebase where UI components and API endpoints live side-by-side.
- Flexible theming via global and per-page CSS, making design tweaks straightforward.

Overall, this tech stack balances simplicity, speed, and security—giving marketing teams a dependable place to sign in, monitor social media performance, and make data-driven decisions every day.