export async function getCounselorProfile({ db, userId }) {
  const profile = await db.counselorProfile.findUnique({ where: { userId } });
  if (!profile) {
    const error = new Error("Counselor profile not found");
    error.status = 404;
    error.code = "COUNSELOR_PROFILE_NOT_FOUND";
    throw error;
  }
  return profile;
}

export async function updateCounselorProfile({ db, userId, profile }) {
  try {
    return await db.counselorProfile.update({
      where: { userId },
      data: profile
    });
  } catch (error) {
    if (error.code === "P2025") {
      const notFound = new Error("Counselor profile not found");
      notFound.status = 404;
      notFound.code = "COUNSELOR_PROFILE_NOT_FOUND";
      throw notFound;
    }
    throw error;
  }
}
