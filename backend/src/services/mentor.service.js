export async function getMentorProfile({ db, userId }) {
  const profile = await db.mentorProfile.findUnique({ where: { userId } });
  if (!profile) {
    const error = new Error("Mentor profile not found");
    error.status = 404;
    error.code = "MENTOR_PROFILE_NOT_FOUND";
    throw error;
  }
  return profile;
}

export async function updateMentorProfile({ db, userId, profile }) {
  try {
    return await db.mentorProfile.update({
      where: { userId },
      data: profile
    });
  } catch (error) {
    if (error.code === "P2025") {
      const notFound = new Error("Mentor profile not found");
      notFound.status = 404;
      notFound.code = "MENTOR_PROFILE_NOT_FOUND";
      throw notFound;
    }
    throw error;
  }
}
