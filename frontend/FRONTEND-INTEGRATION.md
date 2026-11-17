# PACE frontend integration notes

This document is the frontend hand-off reference for the backend developer. The frontend overhaul must not change backend files or redefine backend contracts.

## Runtime configuration

Set `NEXT_PUBLIC_API_BASE_URL` to the backend **origin** (no trailing slash and no `/api` suffix).

- Local example: `http://localhost:3000`
- Frontend local development commonly runs at `http://localhost:3001`.
- The backend's `ALLOWED_ORIGINS` must include the exact deployed frontend origin.
- Production authentication uses an HTTP-only `pace_session` cookie. The browser client therefore sends requests with `credentials: "include"`.
- The backend currently sets `SameSite=None; Secure` when `NODE_ENV=production`. Frontend and backend deployment domains must be compatible with browser third-party-cookie restrictions. Prefer same-site subdomains or a same-origin reverse proxy in production.

## Authentication endpoints already implemented by the backend

| Method | Endpoint | Frontend use |
|---|---|---|
| POST | `/api/auth/login` | Sign in with `email` and `password` |
| POST | `/api/auth/logout` | End the current session |
| GET | `/api/auth/me` | Resolve the current session |
| POST | `/api/auth/register/student` | Public student registration |
| POST | `/api/auth/register/counselor` | Invitation-based counselor registration |
| POST | `/api/auth/register/recruiter` | Invitation-based recruiter registration |
| POST | `/api/auth/register/admin` | Invitation-based administrator registration |

The API is mounted under `/api` in `backend/src/app.js`.

## Exact registration payloads

All registration requests include `email` and `password`.

**Student** additionally sends `firstName`, `lastName`, `studentNumber`, `course`, `yearLevel` (integer), `phone`, and `address`.

**Counselor** additionally sends `token`, `employeeId`, `department`, and `phone`.

**Recruiter** additionally sends `token`, `firstName`, `lastName`, `companyId` (UUID), `jobTitle`, and `phone`.

Counselor and recruiter registration require an invitation token. Recruiter registration requires an existing company UUID; the UI must not manufacture one. Administrator registration is not exposed as public self-registration.

## Role identifiers

Use the backend values exactly: `student`, `counselor`, `recruiter`, `admin`, and `superadmin`. UI labels such as “Career Counselor” are presentation only. Never authorize access based on a client-side role selector; the backend session and protected API routes remain authoritative.

## Current limitations / integration checklist

- The backend's `/api/auth/me` route is mounted with optional authentication and returns `{ user: null }` when there is no valid session.
- The current login endpoint returns `{ user }` and sets an HTTP-only session cookie.
- Logout returns HTTP 204.
- The current backend CSRF middleware validates the request Origin for state-changing requests when secure cookies are enabled. Keep the frontend origin in `ALLOWED_ORIGINS`.
- Registration endpoints return `{ user }`; registration does not automatically create a login session in the current controller.
- Do not persist passwords, invitation tokens, or session tokens in localStorage/sessionStorage.
- Dashboard demo records remain presentation fixtures until their respective backend endpoints and data contracts are connected. Do not represent fixture values as live institutional data.

## Files that define the contract

- `backend/src/app.js`
- `backend/src/routes/auth.routes.js`
- `backend/src/controllers/auth.controller.js`
- `backend/src/schemas/auth.schemas.js`
- `backend/src/config.js`
- `frontend/src/lib/api/types.ts`
- `frontend/src/lib/api/client.ts`
