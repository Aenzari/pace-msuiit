CREATE TABLE "counselor_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "counselor_profiles_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "recruiter_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "recruiter_profiles_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "counselor_profiles_user_id_key" ON "counselor_profiles"("user_id");
CREATE UNIQUE INDEX "counselor_profiles_employee_id_key" ON "counselor_profiles"("employee_id");
CREATE UNIQUE INDEX "recruiter_profiles_user_id_key" ON "recruiter_profiles"("user_id");

ALTER TABLE "counselor_profiles"
    ADD CONSTRAINT "counselor_profiles_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "recruiter_profiles"
    ADD CONSTRAINT "recruiter_profiles_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
