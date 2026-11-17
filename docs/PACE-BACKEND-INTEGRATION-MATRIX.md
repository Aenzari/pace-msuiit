# PACE backend integration matrix

**Purpose:** Give the backend developer a feature-by-feature hand-off for connecting the PACE frontend without reverse-engineering the UI.

**Contract status:** This is an integration proposal, not an API specification already implemented by the backend. Route examples and field concepts below are recommendations only. The backend owner must confirm exact route names, HTTP methods, schemas, response envelopes, validation, and error codes before frontend code calls them.

**Non-negotiable boundary:** No backend source, Prisma schema, migrations, database records, existing role IDs, authentication/session behavior, existing field names, or existing API contracts were changed in this frontend delivery.

## 1. Existing connected API surface

See [FRONTEND-INTEGRATION.md](../frontend/FRONTEND-INTEGRATION.md) for the existing authentication, registration, and profile routes. The frontend currently connects to the existing auth/session and profile operations described there. The other workflows below are not live until their API contracts and server-side authorization are implemented and tested.

Existing backend role identifiers must remain exactly as defined by the backend: `student`, `counselor`, `recruiter`, `mentor`, `admin`, and `superadmin`.

**Alumni modeling:** The preview has an Alumni workspace for product demonstration. Do not create a new backend `alumni` role without explicit backend-owner approval. The blueprint currently treats Alumni as a post-graduation lifecycle state connected to the existing student identity. The existing `mentor` role is the separate Industry Mentor account type and must not be conflated with an alumnus who volunteers to mentor.

## 2. Feature-to-service matrix

| Feature | Authorized actors | Required backend capabilities | Frontend state today |
|---|---|---|---|
| Counselor discovery and connection | Student; counselor | List counselors accepting students; request, accept/decline, terminate or transfer a counseling connection; enforce capacity and visibility | Preview-only |
| Appointments | Student; connected counselor | Read counselor availability; configure service types, durations, slots and capacity; request, confirm, reschedule, cancel, complete, mark no-show | Preview-only |
| Resume versions | Student; connected counselor | Upload/download securely; version metadata; student-controlled sharing; virus/type/size validation; access audit | File selection only; no upload |
| Resume feedback and assessment | Student; connected counselor | Review a specific resume version; rubric scores; actionable comments; revision history; student-visible feedback; access controls | Preview-only rubric |
| Job listings | Approved recruiter; student | Create/edit/publish/close jobs; moderation/approval if required; list only active approved-partner roles | Preview-only |
| Applications | Student; recruiter for own job | Apply with explicit resume-sharing consent; withdraw; view status; recruiter review and stage changes; prevent duplicate applications | Preview-only |
| Saved jobs | Student | Save/remove/list jobs belonging to the authenticated student | Local in-memory state |
| Messaging | Student, connected counselor, recruiter with application/endorsement relationship | Conversation membership; send/read messages; unread state; attachment policy; block unauthorized participants; retention and audit policy | Local per-contact threads |
| Notifications | All applicable roles | In-app notification feed, read/unread state, delivery preferences, optional email/push integrations | Sample notice UI |
| Events and resources | Student, Alumni; authorized staff for publishing | Publish events/resources; register/cancel; capacity/waitlist; attendance; resource access tracking if required | Preview-only |
| Endorsements | Student; connected counselor; recruiter only after permitted sharing | Student-requested or counselor-initiated draft; explicit disclosure/consent; share/revoke; recruiter visibility only for addressed opportunity | Preview-only |
| Recruiter pipeline | Recruiter; relevant student for own application status | Stage transitions, interview scheduling, evaluation, offer, outcome; company/job ownership | Preview-only |
| Partner company profile | Approved recruiter; Career Center admin | Read/update permitted company fields; approval, suspension, recruiter-company association | Preview-only |
| Account governance | SuperAdmin (Career Center Head Officer) | Invite, approve, activate, suspend, deactivate, restore, and policy-governed deletion/anonymization of counselor/recruiter accounts | Preview-only decisions |
| Institutional analytics | SuperAdmin; scoped counselor reports | Aggregated counts and trends with explicit definitions, cohort filters, employment verification status, and privacy thresholds | Illustrative metrics only |
| Graduate outcomes | Alumni for own information; counselors and SuperAdmin for authorized Career Center tracking | Voluntary outcome updates, follow-up scheduling, self-reported vs verified source, corrections, retention, scoped access | Preview-only |
| Alumni mentorship | Alumni volunteer; approved student request; Career Center reviewer; mentor where applicable | Separate opt-in/decline/later preference; profile approval; directory visibility; requests; accept/decline; capacity; withdrawal | Preview-only |
| Audit trail | SuperAdmin / designated auditor | Immutable security-relevant event log for account, permission, consent, data access, and verification actions | Sample records only |

## 3. Suggested state transitions

These are domain recommendations; the backend owner should confirm or adjust them before implementation.

- **Counseling connection:** `requested → accepted → active → closed`; allow `declined` and `transferred` terminal/transition states with actor and timestamps.
- **Appointment:** `requested → confirmed → completed`; alternate transitions `reschedule_requested`, `cancelled`, `declined`, `no_show`.
- **Resume review:** `submitted → in_review → feedback_published → revised`; retain immutable version references and feedback history.
- **Job:** `draft → pending_review → published → closed`; only approved partner recruiters can publish under the agreed moderation policy.
- **Application:** `submitted → under_review → shortlisted → interview → offer → hired`; allow `rejected` and `withdrawn`. Enforce allowed transitions server-side.
- **Endorsement:** `draft → awaiting_student_consent → shared → viewed`; allow `declined`, `revoked`, `expired`.
- **Mentorship:** `not_decided`, `declined`, `opted_in_pending_review`, `approved`, `paused`, `withdrawn`. Decline/withdrawal must never deactivate Alumni access.
- **Employment outcome:** preserve source (`self_reported` or `verified`), verification actor/time, effective date, and correction history. Never infer verification from a self-reported update.

## 4. Authorization and privacy rules to enforce on the server

1. **Student isolation:** A student can read and change only their own profile, resumes, appointments, saved jobs, applications, messages, and mentorship requests.
2. **Counselor isolation:** A counselor can access only students with an active/authorized counseling connection. A directory lookup must not reveal other students' identities or records.
3. **Recruiter isolation:** A recruiter can access only their own approved company and jobs, plus applicants to those jobs or candidates explicitly endorsed for the relevant opportunity with the required permission.
4. **No student-to-student chat:** Do not allow a student to create or join a conversation with another student.
5. **Private assessment:** Counselor rubric ratings, private notes, and feedback conversations are not recruiter-visible. Share only the explicitly authorized endorsement/application material.
6. **Alumni privacy:** Alumni outcome records are visible only to authorized Career Center counselors and SuperAdmin; recruiters and student mentor-directory users must never receive those records.
7. **Mentorship consent:** Mentorship preference is separate from employment follow-up. `declined`, `not_decided`, and `withdrawn` must not revoke Alumni access. Only approved opt-in profiles appear in the student directory.
8. **SuperAdmin scope:** Restrict sensitive account governance and institution-wide analytics to the authorized Career Center Head Officer. Do not expose private counseling notes merely because a user has an administrative role.
9. **Consent and disclosure:** Record what was shared, with whom, for which purpose, under which notice/consent, and when. Quick Apply must not transmit a resume before the student has selected it and confirmed sharing.
10. **Audit and retention:** Log sensitive access and administrative changes; define retention, correction, export, withdrawal, and deletion/anonymization policies with the university. Apply the Philippine Data Privacy Act and institutional policy.
11. **Server authority:** Frontend navigation and role selectors are UX only. Every resource lookup and mutation must be authorized by backend session identity and server-side policy.

## 5. Minimum response and error behavior

Agree one consistent envelope and error vocabulary before integration. At minimum, endpoints should distinguish:
- `400` validation failure with field-level details;
- `401` missing/expired session;
- `403` authenticated but not authorized for the resource;
- `404` resource absent or intentionally undiscoverable to this actor;
- `409` conflicting state/duplicate application/slot conflict;
- `413` upload too large;
- `415` unsupported upload type;
- `422` invalid domain transition or consent state;
- `429` rate limit;
- `5xx` unexpected server failure with a safe correlation/request ID.

Use pagination for lists, stable resource IDs, server timestamps, explicit status enums, and optimistic-concurrency/version handling for records that can be edited by multiple actors. Do not expose stack traces, private records, or existence details through error messages.

## 6. Recommended implementation order

1. Confirm the existing route/schema/role audit and document exact ownership rules.
2. Implement counselor connections and appointment availability/booking.
3. Implement secure resume upload/versioning and counselor review.
4. Implement approved partner job management, student applications, saved jobs, and recruiter pipeline.
5. Implement conversation membership, messaging, and notifications.
6. Implement endorsements and student consent/audit events.
7. Implement Alumni lifecycle, voluntary graduate follow-ups, and separate mentorship opt-in/approval.
8. Implement SuperAdmin account governance, audit access, and aggregate analytics.
9. Add isolated synthetic test accounts and end-to-end tests for every positive and denied-access path.

## 7. Frontend integration acceptance checklist

Before replacing a preview interaction with an API call, the backend developer should provide:

- [ ] Confirmed route and HTTP method (not a guessed route).
- [ ] Request and response TypeScript types or OpenAPI schema.
- [ ] Authentication and role/ownership policy.
- [ ] Consent, disclosure, and audit requirements.
- [ ] Validation and error response behavior.
- [ ] Pagination, sorting, and filtering rules where relevant.
- [ ] Automated tests for allowed and denied access.
- [ ] A test-environment URL and synthetic test accounts.
- [ ] Confirmation that existing role IDs, field names, and auth/session contracts remain unchanged.

**Do not connect simulated UI actions to guessed endpoints.** Until the above contract is approved, retain the preview label and local-only behavior.
