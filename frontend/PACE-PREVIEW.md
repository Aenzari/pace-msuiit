# PACE Development Preview

**No dummy login is required.** The `/preview` route opens a development-only role sandbox directly; use the top-right role switcher to inspect Student, Counselor, Recruiter, SuperAdmin, and Alumni. It is not an authenticated account and does not connect to live records.

The role preview is a **development-only UI sandbox** for reviewing the approved PACE experience without creating real accounts or touching university records.

**Role-modeling note:** Alumni is a lifecycle workspace shown in this preview, not a newly created backend role or authorization grant. Existing backend role IDs remain unchanged. The existing Industry Mentor (`mentor`) account type is separate from Alumni and is not represented by the five-role preview switcher.

## Start the preview

1. Clone or update the repository:
   ```powershell
   git clone https://github.com/Aenzari/pace-msuiit.git
   cd pace-msuiit
   ```
   If you already have the repository locally:
   ```powershell
   git pull origin main
   ```

2. Start the backend separately if you want to test the real sign-in/profile flows. The backend defaults to port `3000`.

3. In a terminal, start the frontend on port `3001` so it does not collide with the backend's default port:
   ```powershell
   cd frontend
   npm ci --legacy-peer-deps
   npm run dev -- -p 3001
   ```

4. Open:
   - PACE preview workspace: [http://localhost:3001/preview](http://localhost:3001/preview)
   - Existing sign-in page: [http://localhost:3001/auth/login](http://localhost:3001/auth/login)

## What can be previewed

The development preview provides a role switcher for:
- Student
- Counselor
- Recruiter
- SuperAdmin
- Alumni

Each workspace has sample navigation and representative screens for its approved modules. The Alumni mentorship preference defaults to **Maybe later** so the preview does not imply consent. The options to opt in, decide later, or decline can be selected; all options preserve Alumni access.

## Important limitations

- This is not a dummy account and does not authenticate against the backend.
- Preview identities, metrics, messages, jobs, appointments, and records are fictional.
- Preview buttons simulate interactions in the browser only. They do not call backend APIs, upload files, send real messages, create appointments, or persist database records.
- The preview route is guarded by `NODE_ENV === "development"` and returns not-found in production builds.
- Do not use real student names, resumes, contact details, or other personal information in preview fixtures.
- Real test accounts must be created by an authorized backend/database administrator in an isolated non-production environment. Do not create test records in the live university database.

## Real backend connection

The existing API base URL is configured with `NEXT_PUBLIC_API_BASE_URL`. The backend default is `http://localhost:3000`; the frontend preview does not require the backend to be running. For real authentication and profile requests, configure the frontend origin in the backend's `ALLOWED_ORIGINS` and use the existing integration notes in [FRONTEND-INTEGRATION.md](./FRONTEND-INTEGRATION.md).

The current backend exposes authentication and profile operations; appointments, resume review, job/application management, messaging, admin analytics/account management, and alumni tracking still require confirmed backend endpoints and authorization contracts before they can become live workflows.
