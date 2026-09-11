import prisma from "@/lib/prisma";
import type { LiveClassStatus, LiveClassSession } from "@/types/live-class";

/**
 * Live status is time-derived rather than trusted from the stored
 * column, so a class that was scheduled as "UPCOMING" automatically
 * reads as "live" once the clock enters its window, and "completed"
 * once it's passed — without a cron job flipping the column.
 */
function deriveStatus(
  storedStatus: string,
  startTime: Date,
  endTime: Date,
): LiveClassStatus {
  if (storedStatus === "CANCELLED") return "cancelled";
  const now = new Date();
  if (now < startTime) return "upcoming";
  if (now >= startTime && now <= endTime) return "live";
  return "completed";
}

/**
 * Live classes relevant to a user: sessions for courses they're
 * enrolled in, plus any session they've personally RSVP'd to.
 */
export async function getMyLiveClasses(
  userId: string,
): Promise<LiveClassSession[]> {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    select: { courseId: true },
  });
  const courseIds = enrollments.map((e) => e.courseId);

  const liveClasses = await prisma.liveClass.findMany({
    where: {
      OR: [
        courseIds.length > 0 ? { courseId: { in: courseIds } } : undefined,
        { attendees: { some: { userId } } },
      ].filter(Boolean) as object[],
    },
    include: {
      course: true,
      instructor: true,
      attendees: true,
    },
    orderBy: { startTime: "asc" },
  });

  return liveClasses.map((session) => ({
    id: session.id,
    title: session.title,
    description: session.description,
    courseTitle: session.course?.title ?? null,
    instructor: session.instructor.name,
    instructorAvatar:
      session.instructor.image ??
      `https://i.pravatar.cc/40?u=${session.instructor.id}`,
    startTime: session.startTime.toISOString(),
    endTime: session.endTime.toISOString(),
    meetingUrl: session.meetingUrl,
    status: deriveStatus(session.status, session.startTime, session.endTime),
    attendeeCount: session.attendees.length,
    isRegistered: session.attendees.some(
      (attendee) => attendee.userId === userId,
    ),
  }));
}

export async function registerForLiveClass(
  userId: string,
  liveClassId: string,
) {
  const liveClass = await prisma.liveClass.findUnique({
    where: { id: liveClassId },
  });
  if (!liveClass) return false;

  await prisma.liveClassAttendee.upsert({
    where: {
      liveClassId_userId: { liveClassId, userId },
    },
    create: { liveClassId, userId },
    update: {},
  });
  return true;
}

export async function unregisterFromLiveClass(
  userId: string,
  liveClassId: string,
) {
  await prisma.liveClassAttendee
    .delete({
      where: { liveClassId_userId: { liveClassId, userId } },
    })
    .catch(() => null);
  return true;
}
