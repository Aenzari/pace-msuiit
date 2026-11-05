export async function getStudentProfile({ db, userId }) {
  const profile = await db.studentProfile.findUnique({ where: { userId } });
  if (!profile) {
    const error = new Error('Student profile not found');
    error.status = 404;
    error.code = 'STUDENT_PROFILE_NOT_FOUND';
    throw error;
  }
  return profile;
}

export async function updateStudentProfile({ db, userId, profile }) {
  const existingProfile = await db.studentProfile.findUnique({
    where: { userId }
  });

  if (!existingProfile) {
    const error = new Error('Student profile not found');
    error.status = 404;
    error.code = 'STUDENT_PROFILE_NOT_FOUND';
    throw error;
  }

  return db.studentProfile.update({
    where: { userId },
    data: profile
  });
}
