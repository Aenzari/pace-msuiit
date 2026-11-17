# PACE frontend overhaul — delivery and QA notes

## Scope honored

- All implementation changes in this delivery are confined to `frontend/` and `.github/workflows/frontend-validation.yml`.
- No backend source, schema, migration, database, or API implementation files were changed.
- Changes were committed directly to `main`, as requested.

## Delivered in this pass

- Reworked the public landing page around the current PACE name and MSU-IIT maroon/gold identity.
- Rebuilt login and registration interfaces with responsive layouts, accessible form controls, clear errors, and loading/success states.
- Connected login, logout, current-session lookup, and the existing student/counselor/recruiter registration endpoints to the backend's current routes.
- Connected the student and mentor profile editors and recruiter company/contact profile panel to their existing profile endpoints; counselor identity and the availability toggle use the existing counselor profile endpoint.
- Added an authenticated Industry Mentor workspace using the backend's existing mentor profile GET/PATCH endpoints and exposed the mentor portal on the sign-in screen.
- Preserved backend payload field names and role identifiers in shared TypeScript contracts.
- Centralized role-to-dashboard routing.
- Added role-aware session checks to student, recruiter, counselor, mentor, and administrator dashboard entry points.
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
- GitHub Actions successfully completed dependency installation, the production dependency security gate, TypeScript validation, and the Next.js production build for commit `127a595b6ab38a6aa917ac7c0d407a82337d3345` ([workflow run](https://github.com/Aenzari/pace-msuiit/actions/runs/44008297951)).
- The production dependency gate (`npm audit --omit=dev --audit-level=high`) passed. `npm ci` still reports 8 moderate advisories across the full dependency tree; review and schedule dependency updates rather than applying unreviewed automatic fixes.
- The successful build confirms compilation and static generation, not browser-level end-to-end behavior or a live backend deployment.
- The pre-existing `lint` script still points to `next lint`, while this repository uses Next.js 16 and ESLint 8 with an ESLint 9 peer requirement in `eslint-config-next`. Align the ESLint major version, lockfile, and flat config before treating lint as a reliable CI gate.

## Suggested next integration sequence

1. Connect student opportunity, appointment, CV, and verification experiences only when matching backend routes and schemas are available.
2. Connect counselor appointments, scheduling, CV review, and messaging to their corresponding backend services.
3. Connect recruiter company administration, jobs, candidate pipelines, and messaging to their corresponding backend services.
4. Add mentor matching, mentoring sessions, and mentor communications only after the backend exposes those workflows.
5. Connect administrator management and analytics only after confirming the backend's admin endpoints and permissions.
6. Add browser-level integration tests for cookie-based login, role redirects, logout, invitation registration, and each live workflow.


## PACE product blueprint and role preview

- Added the approved product scope, user-role boundaries, workflows, Alumni transition/mentorship rules, privacy requirements, and backend integration dependencies in `../docs/PACE-PRODUCT-BLUEPRINT.md`.
- Added a development-only role preview at `/preview` for Student, Counselor, Recruiter, SuperAdmin, and Alumni workspaces.
- The preview uses fictional data and local simulated interactions only. It does not create accounts, authenticate users, call backend workflow APIs, or persist records.
- The Alumni mentorship preference starts at “Maybe later”; opting in, declining, and deciding later are separate choices, and none removes Alumni access.
- Local setup and limitations are documented in `PACE-PREVIEW.md`.
- The preview route is guarded by `NODE_ENV === "development"` and is not exposed in production builds.

### Important boundary remains

This addition does not change backend source, Prisma schema, migrations, database records, role identifiers, authentication, or API contracts. The role preview is a safe way to inspect proposed experiences while the backend developer implements and confirms the missing services.


## Expanded PACE role-preview interactions

The development-only preview now includes local, non-persistent interactions for:
- Student: counselor selection, appointment request details, resume file selection, AI-style sample draft, counselor feedback display, scoped per-contact messages, partner job saving, saved-opportunity list, application tracker, explicit resume-sharing consent before Quick Apply, resources, events, and editable profile fields.
- Counselor: connected-student caseload, appointment service/availability controls, resume feedback text, overall rating and four-part structured rubric, endorsement draft with student-sharing choice, and graduate outcome follow-up.
- Recruiter: local job-posting drafts, eligible applicant review, recruitment pipeline, scoped messages, and company profile.
- SuperAdmin: account approval/decline/deactivation simulations, illustrative impact analytics, partner oversight, and audit-log preview.
- Alumni: editable sample employment/outcome fields, graduate follow-up response, and three separate mentorship choices. The default is undecided; declining mentorship does not remove Alumni access.

### Manual browser QA checklist

- [ ] Run the frontend in development and open `/preview`.
- [ ] Switch through all five workspaces; verify each workspace has only its own navigation.
- [ ] Try the student appointment, resume, messaging, job, resource, and event interactions.
- [ ] Try counselor availability, feedback/rating, endorsement, and graduate tracking interactions.
- [ ] Try recruiter job draft, applicant, pipeline, message, and company profile interactions.
- [ ] Try SuperAdmin account decisions, partner directory, analytics, and audit-log screens.
- [ ] Try all three Alumni mentorship choices and verify Alumni access messaging remains unchanged.
- [ ] Confirm all preview notices are explicit and no live university data or backend mutations occur.
- [ ] Check desktop and mobile navigation and reduced-motion settings.

**Latest automated validation:** GitHub Actions run [#87](https://github.com/Aenzari/pace-msuiit/actions/runs/44024528391) completed successfully against the complete role-preview revision. Dependency installation, production dependency security audit, TypeScript validation, and the Next.js production build all passed. The workflow supports manual dispatch and cancels superseded runs on the same ref. Browser-level end-to-end testing against a configured backend remains outstanding; the preview itself intentionally uses fictional data and simulated local actions.
