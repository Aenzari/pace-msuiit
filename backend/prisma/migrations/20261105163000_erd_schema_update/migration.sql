-- 1. Create Roles Table
CREATE TABLE "roles" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- Insert standard roles matching UserRole enum
INSERT INTO "roles" ("id", "name") VALUES
    (gen_random_uuid(), 'student'),
    (gen_random_uuid(), 'counselor'),
    (gen_random_uuid(), 'recruiter'),
    (gen_random_uuid(), 'admin'),
    (gen_random_uuid(), 'superadmin');

-- 2. Alter users table to use role_id foreign key
ALTER TABLE "users" ADD COLUMN "role_id" UUID;

UPDATE "users" u
SET "role_id" = r."id"
FROM "roles" r
WHERE r."name" = u."role"::text;

ALTER TABLE "users" ALTER COLUMN "role_id" SET NOT NULL;
ALTER TABLE "users" DROP COLUMN "role";

ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey"
    FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 3. Alter invitations table to use role_id foreign key
ALTER TABLE "invitations" ADD COLUMN "role_id" UUID;

UPDATE "invitations" i
SET "role_id" = r."id"
FROM "roles" r
WHERE r."name" = i."role"::text;

ALTER TABLE "invitations" ALTER COLUMN "role_id" SET NOT NULL;
ALTER TABLE "invitations" DROP COLUMN "role";

ALTER TABLE "invitations" ADD CONSTRAINT "invitations_role_id_fkey"
    FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

DROP TYPE "UserRole";

-- 4. Alter student_profiles table (match ERD: student_number, gpa, bio, location, career_status)
ALTER TABLE "student_profiles"
    RENAME COLUMN "school_id" TO "student_number";

ALTER TABLE "student_profiles"
    ADD COLUMN "gpa" DECIMAL(4, 2),
    ADD COLUMN "bio" TEXT,
    ADD COLUMN "location" TEXT,
    ADD COLUMN "career_status" TEXT;

-- 5. Alter counselor_profiles table (department, is_available)
ALTER TABLE "counselor_profiles"
    ADD COLUMN "department" TEXT NOT NULL DEFAULT 'Guidance & Counseling',
    ADD COLUMN "is_available" BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE "counselor_profiles" ALTER COLUMN "department" DROP DEFAULT;

-- 6. Create companies table
CREATE TABLE "companies" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "location" TEXT,
    "verification_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- 7. Update recruiter_profiles table (company_id as UUID foreign key, approval_status)
ALTER TABLE "recruiter_profiles" DROP COLUMN "company_name";
ALTER TABLE "recruiter_profiles" DROP COLUMN "company_id";
ALTER TABLE "recruiter_profiles"
    ADD COLUMN "company_id" UUID NOT NULL,
    ADD COLUMN "approval_status" TEXT NOT NULL DEFAULT 'pending';

ALTER TABLE "recruiter_profiles" ADD CONSTRAINT "recruiter_profiles_company_id_fkey"
    FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 8. Create mentor_profiles table
CREATE TABLE "mentor_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "professional_title" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "biography" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "max_mentees" INTEGER NOT NULL DEFAULT 3,
    "availability_notes" TEXT,
    "approval_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "mentor_profiles_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "mentor_profiles_user_id_key" ON "mentor_profiles"("user_id");

ALTER TABLE "mentor_profiles" ADD CONSTRAINT "mentor_profiles_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 9. Create resumes table
CREATE TABLE "resumes" (
    "id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "counselor_id" UUID,
    "file_url" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "is_current" BOOLEAN NOT NULL DEFAULT true,
    "is_counselor_verified" BOOLEAN NOT NULL DEFAULT false,
    "verification_code" TEXT,
    "verified_at" TIMESTAMP(3),
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "resumes_verification_code_key" ON "resumes"("verification_code");

ALTER TABLE "resumes" ADD CONSTRAINT "resumes_student_id_fkey"
    FOREIGN KEY ("student_id") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_counselor_id_fkey"
    FOREIGN KEY ("counselor_id") REFERENCES "counselor_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- 10. Create resume_reviews table
CREATE TABLE "resume_reviews" (
    "id" UUID NOT NULL,
    "resume_id" UUID NOT NULL,
    "counselor_id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'reviewed',
    "reviewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resume_reviews_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "resume_reviews" ADD CONSTRAINT "resume_reviews_resume_id_fkey"
    FOREIGN KEY ("resume_id") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "resume_reviews" ADD CONSTRAINT "resume_reviews_counselor_id_fkey"
    FOREIGN KEY ("counselor_id") REFERENCES "counselor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 11. Create jobs table
CREATE TABLE "jobs" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "posted_by" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "employment_type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salary_range" TEXT,
    "application_deadline" DATE,
    "status" TEXT NOT NULL DEFAULT 'open',
    "posted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_fkey"
    FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_posted_by_fkey"
    FOREIGN KEY ("posted_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 12. Create saved_jobs table
CREATE TABLE "saved_jobs" (
    "student_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "saved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "saved_jobs_pkey" PRIMARY KEY ("student_id", "job_id")
);

ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_student_id_fkey"
    FOREIGN KEY ("student_id") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_job_id_fkey"
    FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 13. Create job_applications table
CREATE TABLE "job_applications" (
    "id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "resume_id" UUID,
    "status" TEXT NOT NULL DEFAULT 'submitted',
    "cover_letter" TEXT,
    "applied_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "job_applications_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "job_applications_job_id_student_id_key" ON "job_applications"("job_id", "student_id");

ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_job_id_fkey"
    FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_student_id_fkey"
    FOREIGN KEY ("student_id") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_resume_id_fkey"
    FOREIGN KEY ("resume_id") REFERENCES "resumes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- 14. Create mentorship_requests table
CREATE TABLE "mentorship_requests" (
    "id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "mentor_id" UUID NOT NULL,
    "initiated_by" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "response_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responded_at" TIMESTAMP(3),
    CONSTRAINT "mentorship_requests_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "mentorship_requests" ADD CONSTRAINT "mentorship_requests_student_id_fkey"
    FOREIGN KEY ("student_id") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "mentorship_requests" ADD CONSTRAINT "mentorship_requests_mentor_id_fkey"
    FOREIGN KEY ("mentor_id") REFERENCES "mentor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "mentorship_requests" ADD CONSTRAINT "mentorship_requests_initiated_by_fkey"
    FOREIGN KEY ("initiated_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 15. Create mentorships table
CREATE TABLE "mentorships" (
    "id" UUID NOT NULL,
    "request_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "mentor_id" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "goals" TEXT,
    "meeting_frequency" TEXT,
    "started_at" DATE,
    "ended_at" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "mentorships_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "mentorships_request_id_key" ON "mentorships"("request_id");

ALTER TABLE "mentorships" ADD CONSTRAINT "mentorships_request_id_fkey"
    FOREIGN KEY ("request_id") REFERENCES "mentorship_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "mentorships" ADD CONSTRAINT "mentorships_student_id_fkey"
    FOREIGN KEY ("student_id") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "mentorships" ADD CONSTRAINT "mentorships_mentor_id_fkey"
    FOREIGN KEY ("mentor_id") REFERENCES "mentor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 16. Create appointments table
CREATE TABLE "appointments" (
    "id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "counselor_id" UUID,
    "mentor_id" UUID,
    "mentorship_id" UUID,
    "appointment_type" TEXT NOT NULL,
    "appointment_date" DATE NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "appointments" ADD CONSTRAINT "appointments_student_id_fkey"
    FOREIGN KEY ("student_id") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_counselor_id_fkey"
    FOREIGN KEY ("counselor_id") REFERENCES "counselor_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_mentor_id_fkey"
    FOREIGN KEY ("mentor_id") REFERENCES "mentor_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_mentorship_id_fkey"
    FOREIGN KEY ("mentorship_id") REFERENCES "mentorships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- 17. Create counselor_availability table
CREATE TABLE "counselor_availability" (
    "id" UUID NOT NULL,
    "counselor_id" UUID NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "is_walk_in" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "counselor_availability_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "counselor_availability" ADD CONSTRAINT "counselor_availability_counselor_id_fkey"
    FOREIGN KEY ("counselor_id") REFERENCES "counselor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 18. Create conversations table
CREATE TABLE "conversations" (
    "id" UUID NOT NULL,
    "participant_1_id" UUID NOT NULL,
    "participant_2_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "conversations_participant_1_id_participant_2_id_key"
    ON "conversations"("participant_1_id", "participant_2_id");

ALTER TABLE "conversations" ADD CONSTRAINT "conversations_participant_1_id_fkey"
    FOREIGN KEY ("participant_1_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_participant_2_id_fkey"
    FOREIGN KEY ("participant_2_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 19. Create messages table
CREATE TABLE "messages" (
    "id" UUID NOT NULL,
    "conversation_id" UUID NOT NULL,
    "sender_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_fkey"
    FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey"
    FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 20. Create notifications table
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "reference_type" TEXT,
    "reference_id" UUID,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 21. Create activity_logs table
CREATE TABLE "activity_logs" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" UUID,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

