# PACE Product Blueprint
## Professional Advancement and Career Enhancement
### MSU-IIT Office of Guidance and Counseling — Career Center

**Status:** Product direction approved; implementation and backend integration subject to the boundaries below.  
**Product principle:** One connected, paperless career-development ecosystem for students, counselors, partner recruiters, alumni, and Career Center leadership.

---

## 1. Product purpose

PACE digitalizes Career Center services and makes them more accessible, direct, measurable, and continuous. It supports a student's journey from career exploration and counseling through preparation, recruitment, graduation, employment follow-up, and optional alumni mentorship.

PACE is not merely a job board or appointment scheduler. It is the shared workflow connecting career guidance, career readiness, opportunities, recruitment, alumni engagement, and institutional outcomes.

## 2. User groups and access boundaries

### Student
- Institutional student account; intended email domain: `@g.msuiit.edu.ph`.
- Chooses an available counselor and requests appointments.
- Maintains a career profile and may use AI-assisted resume creation.
- Uploads resume versions for counselor feedback.
- Communicates with connected counselors and recruiters only where an application or approved endorsement establishes the relationship.
- Browses opportunities from approved MSU-IIT partner companies, saves jobs, applies, and tracks application stages.
- Accesses career resources, interview preparation, career-readiness progress, appointment history, and notifications.
- Cannot initiate student-to-student messaging.

### Counselor
- Accesses only students with an established connection (for example, a student-requested/accepted counseling relationship); no unrestricted student directory access.
- Defines appointment types, availability, time slots, capacity, and walk-in options.
- Manages appointment requests, reschedules, cancellations, follow-ups, and counseling history.
- Reviews submitted resume versions and gives structured feedback and ratings.
- Tracks connected students' career-readiness progress and follow-up needs.
- May create student endorsements for partner recruiters. Endorsements can be private recruiter-directed recommendations or shared only after the student's approval.
- Uses the job portal for endorsements and recruiter-related coordination, not general job-posting administration.
- Tracks graduates and career outcomes within authorized Career Center responsibilities.

### Recruiter
- Access is invitation-only; companies are Career Center-approved partners.
- Manages company profile and approved job postings.
- Reviews only candidates who applied or were explicitly endorsed with the required student permission.
- Manages recruitment pipeline stages, interview coordination, candidate evaluation, and hiring outcomes.
- Communicates with applicants and authorized endorsing counselors; no unrestricted access to student records or private counseling notes.
- Cannot access counselor-only graduate tracking or confidential assessment records.

### SuperAdmin
- Reserved for the Career Center Head Officer / authorized head administrator.
- Manages counselor and recruiter account approval, activation, suspension, deactivation, and policy-governed deletion/anonymization when legally and institutionally appropriate. Prefer reversible deactivation for routine access removal; retain required audit records.
- Oversees institutional analytics, service utilization, graduate outcomes, partner activity, and audit logs.
- Does not need routine access to private counseling notes or full resume feedback conversations to perform administrative duties.

### Alumni
- Alumni is a post-graduation account state/experience linked to the student's existing identity and history, not an unrelated duplicate account.
- Retains applicable Alumni access after graduation.
- Can update professional/employment information and respond to voluntary graduate follow-ups.
- Can opt into mentorship, choose “maybe later,” or decline. Declining mentorship never removes Alumni access.
- Can change mentorship preference later or withdraw from mentoring without losing Alumni status.
- Only alumni who have opted in and meet Career Center approval requirements appear in a mentor directory.
- Alumni mentorship participation is separate from employment-tracking consent.
- An alumnus may separately hold a recruiter role only through the recruiter invitation/approval process.

### Industry Mentor role distinction
The repository currently has a separate backend role identifier `mentor`. Do not silently repurpose it as Alumni. The intended Alumni experience should be modeled as a student-to-alumni lifecycle state unless the backend owner approves a separate role/identity design. Industry mentors and alumni mentors may share mentoring concepts, but their account provenance and permissions must remain explicit.

## 3. Core product pillars

1. **Career Guidance:** counselor discovery, appointments, follow-ups, counseling communication.
2. **Career Preparation:** career profile, resume studio, resume review, assessments, resources, interview preparation.
3. **Career Communication:** scoped messaging, notifications, approved relationships, progress updates.
4. **Career Opportunities:** partner-company job portal, applications, endorsements, recruitment pipeline.
5. **Alumni Engagement:** graduate follow-ups, employment outcomes, opt-in mentoring.
6. **Career Intelligence:** Career Center utilization, employment outcomes, partner performance, institutional analytics.

## 4. Approved feature inventory

### Student workspace
- Overview dashboard, analytics, notifications, quick actions.
- Counselor discovery and counselor selection.
- Appointment booking, appointment history, cancellation/rescheduling, reminders.
- Messages with connected counselors and eligible recruiters.
- Career profile and profile completeness.
- AI-assisted Resume Studio; student must review and approve generated content.
- Resume upload, version history, submission, feedback, ratings, and improvement history.
- Partner Job Portal, job details, saved jobs, Quick Apply, application tracker.
- Career Development Tracker with milestones and readiness activities.
- Career resources, templates, interview preparation, event/workshop registration.
- Privacy and sharing controls for recruiter-facing profile/resume information.

### Counselor workspace
- Overview, workload analytics, notifications, pending action queue.
- Connected-student case management and student progress.
- Appointment type configuration, availability calendar, capacity, requests, status changes, and follow-up reminders.
- Scoped messaging with connected students and authorized recruiters.
- Resume review queue, version viewer, structured rubric, feedback, rating, review history.
- Career-readiness assessments, structured student ratings, and improvement recommendations. Ratings must use an approved rubric, be explainable, and must not be exposed to recruiters by default.
- Endorsement creation, student-consent workflow, recruiter delivery, and endorsement history.
- Graduate follow-up and outcomes view with scoped access.
- Partner job portal for endorsement and recruiter coordination.
- Profile and professional availability.

### Recruiter workspace
- Recruiter dashboard and hiring analytics.
- Company profile and company information visible to students.
- Job creation, editing, pause/close/renew, deadlines, and listing status.
- Applicant inbox and candidate profile limited to application/endorsement permissions.
- Recruitment pipeline: Applied, Under Review, Shortlisted, Interview, Offer, Hired, Rejected/Withdrawn.
- Interview scheduling and candidate communication.
- Candidate evaluation and decision records.
- Hiring outcome capture and job performance reporting.
- Notifications and recruiter profile.

### SuperAdmin workspace
- Executive overview and institutional analytics.
- Counselor account approvals, activation/deactivation, and account lifecycle.
- Recruiter and partner-company approval, activation/suspension, and account lifecycle.
- Invitation/account management consistent with backend authorization.
- Audit log for important administrative actions.
- Reports/export for service utilization, appointments, resume support, student engagement, partner activity, graduate outcomes, and employment attribution.
- Analytics must distinguish sample, self-reported, verified, and system-derived data.

### Alumni workspace
- Alumni overview and profile.
- Employment profile and employment history.
- Further education, certifications, and professional qualifications.
- Career progression timeline.
- Graduate follow-up requests and status updates.
- Career resources and approved opportunities.
- Mentorship preference: opt in, maybe later, decline, update preference, or withdraw.
- Mentor profile, expertise, availability, capacity, incoming requests, and mentoring activity only when opted in/approved.
- Mentorship messaging separate from counseling conversations.

## 5. Cross-role workflows

### Student counseling workflow
1. Student discovers available counselors and their offered appointment types.
2. Student chooses a counselor, appointment type, date, and available slot.
3. Counselor receives a request and accepts, declines, or proposes a reschedule.
4. Student receives the decision and can confirm or request another slot.
5. Appointment takes place; counselor records appropriate follow-up actions.
6. Student and counselor continue communication while the relationship is active.
7. Student progress and appointment history are updated.

### Resume feedback workflow
1. Student creates or uploads a resume version.
2. Student selects the version and submits it for feedback.
3. Only an authorized/connected counselor receives the review request.
4. Counselor reviews using a consistent rubric and provides actionable feedback.
5. Student receives feedback and may submit a revised version.
6. Review history is retained and visible to the student and authorized counselor.

### Endorsement workflow
1. Counselor identifies a student suitable for a specific opportunity or employer.
2. Counselor prepares a purpose-specific endorsement.
3. For a student-approved endorsement, student reviews and consents before recruiter disclosure.
4. For a private recruiter-directed endorsement, sharing must still be covered by a clear prior consent/authorization policy; private must not mean undisclosed or outside student privacy rights.
5. Recruiter sees only the endorsement and information necessary for the recruitment purpose.
6. Endorsement status and subsequent recruitment outcome are tracked.

### Recruitment workflow
1. Career Center approves/invites a partner company and its recruiter.
2. Recruiter publishes a job.
3. Eligible students discover the opportunity and apply with a selected resume and optional cover letter.
4. Recruiter reviews only applicants and properly endorsed candidates.
5. Recruiter updates pipeline stage and communicates with the candidate.
6. Interview and offer outcomes are recorded.
7. Hiring outcome can be attributed accurately (PACE job application, counselor endorsement, or independently sourced).

### Alumni transition and follow-up
1. Graduation is confirmed through an approved process.
2. Student is invited to transition to Alumni while retaining account identity/history.
3. Alumni reviews data-processing information and chooses follow-up preferences.
4. Alumni separately chooses mentorship: opt in, maybe later, or decline.
5. Alumni can update employment, further studies, career progression, and voluntarily provided general whereabouts.
6. Career Center sends scheduled follow-ups (proposed: graduation, 3, 6, and 12 months; timing requires approval).
7. Graduate tracking records are visible only to Career Center Counselors and SuperAdmin. Alumni can view and update their own information. Recruiters have no access to graduate tracking records.
8. Record source and freshness are visible: self-reported, verified, last updated, and verified date.

### Mentorship workflow
1. Alumni voluntarily opts in and completes a mentor profile.
2. Career Center reviews/approves mentor participation if required.
3. Eligible students browse approved mentors and submit a request.
4. Mentor accepts or declines; capacity and availability are enforced.
5. Mentorship goals and meeting expectations are agreed.
6. Mentorship communication and sessions are kept separate from counselor case records.
7. Either party can end the mentorship; Alumni account remains active.

## 6. Data privacy, safety, and trust requirements

- Apply the Philippine Data Privacy Act of 2012 (RA 10173), university policy, purpose limitation, data minimization, and appropriate consent/notice.
- Employment tracking means recording voluntarily provided or properly verified professional information; it is not physical location tracking.
- “General whereabouts” means optional general location/professional circumstances voluntarily provided by the alumnus, never GPS or covert location tracking.
- Alumni follow-up consent and mentorship consent are independent.
- Student-to-student messaging is prohibited.
- Private counselor notes and confidential assessments are never exposed to recruiters.
- Recruiters only see applicant/endorsed candidate information required for recruitment.
- Counselor visibility is limited to connected students.
- Use role-based authorization on the server. Frontend route guards are not security controls.
- Log sensitive administrative actions and data verification events.
- Define data retention, correction, withdrawal, and deletion processes with the university.
- Avoid displaying real student information in demo mode. Use clearly fictional fixtures.

## 7. UX, visual identity, and performance direction

- Premium institutional identity aligned with MSU-IIT and Career Center credibility.
- Maroon/gold identity used with restraint and consistent design tokens.
- Role-specific navigation with predictable information architecture.
- Dashboard-first experiences emphasizing meaningful next actions, not decorative metrics.
- Visual analytics, clear status timelines, calendar views, application pipelines, and progress indicators.
- High-quality micro-interactions, purposeful transitions, and selective 3D hero/illustrative moments.
- Framer Motion for interface motion; Three.js/React Three Fiber only for carefully scoped 3D experiences where justified.
- Respect reduced-motion preferences; avoid motion that delays core tasks.
- Responsive desktop/tablet/mobile layouts, accessible contrast, keyboard navigation, focus states, semantic controls, and screen-reader labels.
- Optimize images, fonts, bundles, animation cost, and data rendering. Avoid loading 3D scenes in routine dashboard workflows.
- Provide loading, empty, error, success, offline, and permission-denied states.

## 8. Demo and test environment

- Provide a clearly labeled, development-only PACE Preview workspace for Student, Counselor, Recruiter, SuperAdmin, and Alumni experiences.
- Preview role switching is a UI demonstration mechanism only; it must never grant real backend permissions or masquerade as authentication.
- Use fictional sample identities and data only.
- Clearly mark simulated actions and sample metrics.
- Demo interactions may update local in-memory state for preview, but must not claim server persistence.
- Do not create shared production dummy accounts or write sample records into the real university database.
- Real test accounts must be provisioned by an authorized backend/database administrator in an isolated test environment, with synthetic email addresses and credentials distributed securely.

## 9. Existing repository and backend integration boundary

At the current repository baseline, the frontend integration notes identify authentication/session endpoints and profile GET/PATCH endpoints as the implemented frontend-connected API surface. The current backend route registration includes auth, students, counselors, mentors, and recruiters, but the student/counselor/recruiter/mentor routers currently expose profile operations only. No appointment, resume-review, job/application, conversation/message, notification, admin analytics/account-management, or alumni-tracking routes were found in the inspected route modules.

The Prisma schema contains data models for several concepts (including resumes, reviews, jobs, applications, appointments, counselor availability, conversations/messages, notifications, mentorship, and activity logs). A database model alone is not a usable API contract. Do not invent endpoints or assume these workflows persist.

**Preserve the established boundary:** frontend-only implementation unless the owner explicitly authorizes backend changes. Do not modify backend source, Prisma schema, migrations, database records, role identifiers, authentication/session behavior, existing API field names, or route contracts as part of frontend work.

Before connecting any new workflow, obtain the backend developer's confirmed route, HTTP method, request/response schema, authorization policy, ownership rules, error behavior, and test coverage. Where no contract exists, keep the UI in clearly labeled preview mode and document the integration dependency.

Existing backend role identifiers: `student`, `counselor`, `recruiter`, `mentor`, `admin`, `superadmin`. Do not invent a new `alumni` role without backend-owner approval. Alumni should initially be treated as a student lifecycle state in product design.

## 10. Delivery phases and acceptance criteria

### Phase 1 — Discovery and contract audit
- Inventory routes, schema, auth roles, existing frontend pages, and current mock behavior.
- Map each approved feature to an existing API contract or a documented backend dependency.
- Confirm data access boundaries and lifecycle states.

**Accept when:** every feature is classified as existing/live, frontend preview, or backend-dependent; no invented API contracts remain.

### Phase 2 — Product architecture and information design
- Finalize role-specific navigation, module groupings, shared components, and cross-role journeys.
- Define states, permissions, notifications, and responsive behavior.

**Accept when:** each user role has a coherent navigation map and each core workflow has a documented start-to-finish journey.

### Phase 3 — Design system and interaction foundation
- Establish tokens, typography, spacing, colors, component patterns, accessibility, motion, and responsive behavior.
- Define selective 3D usage and performance budgets.

**Accept when:** shared components are consistent and reduced-motion/accessibility behavior is included.

### Phase 4 — Role workspaces and preview environment
- Complete Student, Counselor, Recruiter, SuperAdmin, and Alumni experience concepts.
- Add a safe development-only preview mechanism with fictional data and explicit simulation labels.
- Keep Industry Mentor role distinct.

**Accept when:** all workspaces and navigation areas can be previewed without a real university account and without writing to the backend.

### Phase 5 — Workflow interaction and state handling
- Implement frontend interactions for appointment requests, resume feedback, job applications, candidate pipeline, endorsements, alumni follow-ups, and mentorship preference.
- Clearly separate simulated local state from live server state.

**Accept when:** each preview workflow has complete success, error, empty, loading, and permission states, and simulated actions are never represented as persisted records.

### Phase 6 — Integration readiness
- Preserve current API types, field names, role identifiers, routes, and auth/session behavior.
- Provide an integration matrix for each backend-dependent feature.

**Accept when:** backend developers can implement the missing services without reverse-engineering UI assumptions.

### Phase 7 — QA and handoff
- Run install, typecheck, production build, dependency/security checks, and available automated tests.
- Perform responsive/accessibility review and browser-level tests where a runnable environment exists.
- Document known limitations and local preview instructions.

**Accept when:** automated checks pass, backend changes are absent unless separately authorized, and all simulated/live boundaries are documented.

---

## 11. Decisions requiring institutional confirmation before production

These are not blockers for a clearly labeled frontend preview, but must be agreed before production use:
- Exact appointment cancellation, no-show, rescheduling, and counselor response policies.
- Whether student-to-counselor selection creates an immediate connection or requires counselor acceptance.
- Counselor rating/assessment rubric and whether students can see each rating.
- Consent wording and legal basis for sharing endorsements and candidate data.
- Graduate follow-up schedule, consent, data retention, and verification procedure.
- Who verifies employment and what evidence is acceptable.
- Alumni mentor approval criteria, safeguarding, reporting, and communication rules.
- Partner-company invitation, recruiter approval, job moderation, and suspension policy.
- SuperAdmin analytics definitions and employment attribution methodology.
- Accessibility, hosting, security, backup, incident response, and service-level expectations.

## 12. Definition of done

PACE is ready for institutional acceptance only when its user journeys are validated with the Career Center, backend services and authorization policies support the workflows, data protection requirements are approved, real test accounts operate in an isolated test environment, and end-to-end tests confirm that actions persist correctly. A visually complete frontend preview alone is not production readiness.
