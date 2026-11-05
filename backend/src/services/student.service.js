export async function getStudentProfile({ db, userId }) {
  const profile = await db.studentProfile.findUnique({ where: { userId } });
  if (!profile) {
    const error = new Error("Student profile not found");
    error.status = 404;
    error.code = "STUDENT_PROFILE_NOT_FOUND";
    throw error;
  }
  return profile;
}

export async function updateStudentProfile({ db, userId, profile }) {
  try {
    return await db.studentProfile.update({
      where: { userId },
      data: profile
    });
  } catch (error) {
    if (error.code === "P2025") {
      const notFound = new Error("Student profile not found");
      notFound.status = 404;
      notFound.code = "STUDENT_PROFILE_NOT_FOUND";
      throw notFound;
    }
    throw error;
  }
}
