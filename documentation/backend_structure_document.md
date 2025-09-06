# Backend Structure Document

## 1. Backend Architecture

This project uses a **serverless, function-based backend** powered by Next.js API Routes. Here’s how it’s structured:

- **Framework & Design Pattern**
  - Next.js API Routes: each file under `/app/api` becomes its own serverless function (for example, `/app/api/auth/route.ts`).
  - Node.js runtime with TypeScript: shared between frontend and backend for consistency and type safety.
  - Component-based handlers: authentication, data fetching, and user management are split into small, focused modules.

- **Scalability**
  - Serverless functions automatically scale up or down based on traffic.
  - Stateless design means no single server bottleneck—each request is processed independently.

- **Maintainability**
  - Co-located code: API handlers live next to related pages and components, making it easier to find and update logic.
  - TypeScript ensures that changes in data contracts are caught at compile time, reducing runtime errors.

- **Performance**
  - Cold starts are minimized by keeping functions small and focused.
  - Built-in caching at CDN/edge (via hosting provider) accelerates repeated API calls for static data like `dashboard/data.json`.

## 2. Database Management

In the initial version, analytics data is served from a **local JSON file**. User accounts are stored in memory (or would be stored in a simple in-file database). In future releases, this will be swapped out for a real database without changing the UI.

- **Current Data Store**
  - `dashboard/data.json`: holds an array of metric records used by the dashboard.
  - A simple in-memory or file-based user store for authentication data (used only during development).

- **Future Data Store (planned)**
  - **PostgreSQL** with an ORM like Prisma, offering strong relational capabilities.
  - A clear separation of tables for users, sessions, and metrics.

- **Data Access Patterns**
  - API Routes read from the JSON file or database, format data, and return JSON responses.
  - DTO-style handlers ensure that only the expected fields are sent to the frontend, preventing data leaks.

## 3. Database Schema

### A. JSON Schema (v1)

The `dashboard/data.json` file contains an array of objects with the following structure:

- `date`: ISO date string (e.g., "2024-07-15").
- `totalFollowers`: number (e.g., 1024).
- `engagementRate`: percentage as a number (e.g., 4.5).
- `postsCount`: number of posts (e.g., 50).

Sample entry:

    {
      "date": "2024-07-01",
      "totalFollowers": 1000,
      "engagementRate": 4.2,
      "postsCount": 45
    }

### B. SQL Schema (future upgrade)

When migrating to PostgreSQL, the database might look like this:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Metrics table
CREATE TABLE metrics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  date DATE NOT NULL,
  total_followers INTEGER NOT NULL,
  engagement_rate NUMERIC(5,2) NOT NULL,
  posts_count INTEGER NOT NULL
);

-- Sessions table (if storing server-side sessions)
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL
);
```  

## 4. API Design and Endpoints

The backend exposes a set of RESTful endpoints under `/api`. All endpoints return JSON and use standard HTTP status codes.

- **Authentication**
  - `POST /api/auth/signup`  
    • Registers a new user (name, email, password).
  - `POST /api/auth/signin`  
    • Logs in an existing user and issues a session cookie or JWT.
  - `GET  /api/auth/signout`  
    • Clears the user’s session or token.
  - `POST /api/auth/reset-password`  
    • Initiates a password reset flow (sends email).
  - `POST /api/auth/confirm-reset`  
    • Completes password reset with a new password.

- **User Management**
  - `PUT /api/user/update`  
    • Updates profile details (name, email, password).

- **Dashboard Data**
  - `GET /api/data/metrics`  
    • Fetches metrics for the dashboard. Accepts optional query parameters `startDate`, `endDate`, `platform`, `campaign`.

Each handler:

- Validates input (using a library or custom middleware).
- Authenticates the request (cookie or JWT verification).
- Reads or writes data (file or database).
- Returns a clear success or error response.

## 5. Hosting Solutions

We use a modern serverless platform (for example, **Vercel**) to host the backend.

- **Benefits**
  - Zero-configuration for Next.js deployments.
  - Built-in CDN for static assets and JSON data.
  - Automatic SSL certificates and global edge network.
  - Cost-effective: you pay only for function invocations and bandwidth.
  - Easy environment variable management for secrets (database URLs, API keys).

## 6. Infrastructure Components

Several components work together to deliver fast, reliable service:

- **Serverless Functions**  
  Next.js API Routes run as isolated functions, scaling on demand.

- **Content Delivery Network (CDN)**  
  Static assets (`.css`, `.js`, `data.json`) are cached globally for low latency.

- **Load Balancing**  
  Handled automatically by the hosting provider across their edge nodes.

- **Caching Mechanisms**
  - **Edge Caching** for publicly accessible files like `/dashboard/data.json`.
  - **Client-side caching** with SWR or React Query to reduce repeat requests.

- **Environment Configuration**
  - Secure environment variables for secrets and API keys.
  - Separate settings for development, staging, and production.

## 7. Security Measures

We follow industry best practices to protect user data and maintain trust:

- **Password Security**
  - Hash passwords with `bcrypt` before storing.

- **Session Management**
  - Use HTTP-only cookies or signed JWTs to prevent XSS attacks.
  - Implement token expiration and rotation.

- **Input Validation & Sanitization**  
  Prevent injection attacks (SQL, NoSQL, or script injection).

- **TLS Everywhere**
  All traffic served over HTTPS.

- **CSRF Protection**
  Use same-site cookies and/or CSRF tokens for state-changing requests.

- **CORS Headers**
  Restrict API access to the application’s domain.

- **OWASP Compliance**
  Regularly review code against OWASP Top 10 vulnerabilities.

## 8. Monitoring and Maintenance

To keep the backend healthy and performant, we employ these tools and practices:

- **Logging**
  - Serverless function logs via the hosting provider (Vercel logs).
  - Structured logs (JSON) for easy querying and alerting.

- **Error Tracking**
  - Integrate a service like Sentry to capture unhandled exceptions and performance issues.

- **Performance Monitoring**
  - Use built-in analytics (Vercel Insights or similar) to track function latency and cold start times.
  - Monitor API response times and error rates.

- **Automated Testing**
  - Unit tests for API handlers and utility functions.
  - Integration tests for key flows (signup, signin, metrics fetch).

- **Continuous Integration / Continuous Deployment**
  - GitHub Actions: run tests, lint code, and deploy on merge to `main`.

- **Routine Maintenance**
  - Scheduled reviews of dependencies for security updates.
  - Database migrations (once a real database is in use) managed via a tool like Prisma Migrate.

## 9. Conclusion and Overall Backend Summary

This backend setup is designed to be **simple** for the first release yet **flexible** for future growth:

- **Serverless functions** keep infrastructure overhead low and automatically scale with demand.
- **TypeScript** across frontend and backend ensures consistency and reduces bugs.
- A **JSON-based data store** in v1 gives us a clear path to swap in a real database later.
- **RESTful API design** with clear endpoints simplifies frontend integration and future mobile app support.
- **Robust security and monitoring** measures safeguard user data and ensure a reliable experience.

Overall, this architecture meets the project’s goals of fast development, secure authentication, and a responsive dashboard—while laying the groundwork for more advanced data storage and real social media integrations in future phases.