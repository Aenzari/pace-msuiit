-- AlterTable
ALTER TABLE "counselor_profiles" DROP COLUMN IF EXISTS "created_at",
DROP COLUMN IF EXISTS "first_name",
DROP COLUMN IF EXISTS "last_name",
DROP COLUMN IF EXISTS "updated_at";

-- AlterTable
ALTER TABLE "recruiter_profiles" DROP COLUMN IF EXISTS "created_at",
DROP COLUMN IF EXISTS "updated_at";

-- AlterTable
ALTER TABLE "student_profiles" DROP COLUMN IF EXISTS "resume_url";

-- CreateIndex
CREATE INDEX IF NOT EXISTS "activity_logs_user_id_created_at_idx" ON "activity_logs"("user_id", "created_at");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "appointments_student_id_idx" ON "appointments"("student_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "appointments_counselor_id_idx" ON "appointments"("counselor_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "appointments_mentor_id_idx" ON "appointments"("mentor_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "appointments_mentorship_id_idx" ON "appointments"("mentorship_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "appointments_appointment_date_idx" ON "appointments"("appointment_date");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "companies_verification_status_idx" ON "companies"("verification_status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "conversations_participant_2_id_idx" ON "conversations"("participant_2_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "counselor_availability_counselor_id_idx" ON "counselor_availability"("counselor_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "invitations_invited_by_idx" ON "invitations"("invited_by");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "invitations_role_id_idx" ON "invitations"("role_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "job_applications_student_id_idx" ON "job_applications"("student_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "job_applications_resume_id_idx" ON "job_applications"("resume_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "jobs_company_id_idx" ON "jobs"("company_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "jobs_posted_by_idx" ON "jobs"("posted_by");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "jobs_status_posted_at_idx" ON "jobs"("status", "posted_at");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "mentor_profiles_approval_status_idx" ON "mentor_profiles"("approval_status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "mentorship_requests_student_id_idx" ON "mentorship_requests"("student_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "mentorship_requests_mentor_id_idx" ON "mentorship_requests"("mentor_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "mentorship_requests_initiated_by_idx" ON "mentorship_requests"("initiated_by");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "mentorships_student_id_idx" ON "mentorships"("student_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "mentorships_mentor_id_idx" ON "mentorships"("mentor_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "messages_conversation_id_sent_at_idx" ON "messages"("conversation_id", "sent_at");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "messages_sender_id_idx" ON "messages"("sender_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "notifications_user_id_is_read_idx" ON "notifications"("user_id", "is_read");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "oauth_identities_user_id_idx" ON "oauth_identities"("user_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "recruiter_profiles_approval_status_idx" ON "recruiter_profiles"("approval_status");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "resume_reviews_resume_id_idx" ON "resume_reviews"("resume_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "resume_reviews_counselor_id_idx" ON "resume_reviews"("counselor_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "resumes_student_id_idx" ON "resumes"("student_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "resumes_counselor_id_idx" ON "resumes"("counselor_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "users_role_id_idx" ON "users"("role_id");

