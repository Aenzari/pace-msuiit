export async function getRecruiterProfile({ db, userId }) {
  const profile = await db.recruiterProfile.findUnique({
    where: { userId },
    include: { company: true }
  });
  if (!profile) {
    const error = new Error("Recruiter profile not found");
    error.status = 404;
    error.code = "RECRUITER_PROFILE_NOT_FOUND";
    throw error;
  }
  return profile;
}

export async function updateRecruiterProfile({ db, userId, profile }) {
  try {
    return await db.recruiterProfile.update({
      where: { userId },
      data: profile,
      include: { company: true }
    });
  } catch (error) {
    if (error.code === "P2025") {
      const notFound = new Error("Recruiter profile not found");
      notFound.status = 404;
      notFound.code = "RECRUITER_PROFILE_NOT_FOUND";
      throw notFound;
    }
    throw error;
  }
}
