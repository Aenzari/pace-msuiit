CREATE TABLE "student_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "year_level" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "student_profiles_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "student_profiles_user_id_key" ON "student_profiles"("user_id");
CREATE UNIQUE INDEX "student_profiles_school_id_key" ON "student_profiles"("school_id");

ALTER TABLE "student_profiles"
    ADD CONSTRAINT "student_profiles_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
