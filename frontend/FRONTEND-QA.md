# PACE frontend overhaul — delivery and QA notes

## Scope honored

- All implementation changes in this delivery are confined to `frontend/` and `.github/workflows/frontend-validation.yml`.
- No backend source, schema, migration, database, or API implementation files were changed.
- Changes were committed directly to `main`, as requested.

## Delivered in this pass

- Reworked the public landing page around the current PACE name and MSU-IIT maroon/gold identity.
- Rebuilt login and registration interfaces with responsive layouts, accessible form controls, clear errors, and loading/success states.
- Connected login, logout, current-session lookup, and the existing student/counselor/recruiter registration endpoints to the backend's current routes.
- Connected the student profile editor and recruiter company/contact profile panel to their existing profile endpoints; counselor identity and the availability toggle use the existing counselor profile endpoint.
- Preserved backend payload field names and role identifiers in shared TypeScript contracts.
- Centralized role-to-dashboard routing.
- Added role-aware session checks to student, recruiter, counselor, and administrator dashboard entry points.
- Replaced navigation-only logout with the existing backend logout endpoint.
- Added explicit preview notices wherever dashboard fixtures or simulated actions remain.
- Added global focus, selection, and reduced-motion foundations.
- Added environment setup and backend hand-off documentation.
- Added a GitHub Actions workflow for frontend type checking and production builds.
- Removed 477 tracked generated Next.js/build-cache files (approximately 296 MB) and the generated TypeScript build-info file; the frontend ignore rules now prevent these artifacts from being re-added.

## Important boundary: dashboards are not yet live data products

The existing role dashboards contain substantial mock records and local-only interactions. This delivery preserves their current feature concepts and improves access/session handling, but it does **not** pretend that appointments, CV reviews, recruiter jobs, candidate messages, availability, announcements, analytics, or administrative actions are persisted by the backend.

Those workflows need their corresponding existing backend routes, request/response schemas, authorization requirements, and data ownership rules mapped before replacing fixtures with live API calls. The preview notices are intentional so sample data is not mistaken for real university records.

## Backend developer hand-off

1. Set `NEXT_PUBLIC_API_BASE_URL` in the frontend deployment to the backend origin (see `.env.example`).
2. Add the exact deployed frontend origin to backend `ALLOWED_ORIGINS`.
3. Verify production cookie behavior across the chosen frontend/backend domains. The current backend uses an HTTP-only `pace_session` cookie and `SameSite=None; Secure` in production.
4. Keep the existing API payload names and role identifiers. The frontend contracts in `src/lib/api/types.ts` intentionally mirror the current backend schemas.
5. Confirm recruiter company UUID assignment and invitation issuance before enabling recruiter self-service onboarding.
6. Keep authorization enforced by backend middleware and route policies. Frontend guards are for navigation/UX, not a security boundary.

## Validation status

- Repository comparison confirms this delivery changes frontend files plus the frontend validation workflow only; no backend files were changed.
- A GitHub Actions workflow now runs `npm ci --legacy-peer-deps`, `npm run typecheck`, and `npm run build` for frontend changes.
- A successful build/typecheck has not been asserted in this document; the workflow result must be checked after GitHub Actions finishes.
- The pre-existing `lint` script still points to `next lint`, while this repository uses Next.js 16 and ESLint 8 with an ESLint 9 peer requirement in `eslint-config-next`. Align the ESLint major version, lockfile, and flat config before treating lint as a reliable CI gate.

## Suggested next integration sequence

1. Connect student profile and opportunity data to the existing student API routes.
2. Connect counselor appointments, availability, CV review, and messaging to their existing route contracts.
3. Connect recruiter company, job, and candidate workflows to the existing recruiter routes.
4. Connect administrator management and analytics only after confirming the backend's admin endpoints and permissions.
5. Add integration tests for cookie-based login, role redirects, logout, invitation registration, and each live workflow.
