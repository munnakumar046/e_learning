import { formatDistanceToNow } from "date-fns";
import prisma from "@/lib/prisma";
import type { CourseStatus, EnrolledCourse } from "@/types/course";

const STATUS_MAP: Record<string, CourseStatus> = {
  NOT_STARTED: "not-started",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
};

const FALLBACK_COURSE_IMAGE =
  "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&h=300&fit=crop";

/** Formats a lesson-duration total (in minutes) as e.g. "12h 30m". */
export function formatDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

/**
 * Fetches every course a user is enrolled in, along with their lesson
 * progress, and shapes it into the flat `EnrolledCourse` type the
 * My Courses UI renders.
 */
export async function getMyCourses(userId: string): Promise<EnrolledCourse[]> {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          lessons: true,
          instructor: true,
        },
      },
      lessonProgress: true,
    },
    orderBy: [{ lastAccessedAt: "desc" }, { enrolledAt: "desc" }],
  });

  return enrollments.map((enrollment) => {
    const totalLessons = enrollment.course.lessons.length;
    const completedLessons = enrollment.lessonProgress.filter(
      (progress) => progress.completed
    ).length;

    let lastAccessed: string | undefined;
    if (enrollment.status === "COMPLETED" && enrollment.completedAt) {
      lastAccessed = `Completed ${formatDistanceToNow(enrollment.completedAt, {
        addSuffix: true,
      })}`;
    } else if (enrollment.lastAccessedAt) {
      lastAccessed = formatDistanceToNow(enrollment.lastAccessedAt, {
        addSuffix: true,
      });
    }

    return {
      id: enrollment.id,
      courseId: enrollment.course.id,
      title: enrollment.course.title,
      category: enrollment.course.category,
      instructor: enrollment.course.instructor.name,
      instructorAvatar:
        enrollment.course.instructor.image ??
        `https://i.pravatar.cc/40?u=${enrollment.course.instructor.id}`,
      image: enrollment.course.image ?? FALLBACK_COURSE_IMAGE,
      totalLessons,
      completedLessons,
      status: STATUS_MAP[enrollment.status] ?? "not-started",
      rating: enrollment.course.rating,
      duration: formatDuration(enrollment.course.durationMinutes),
      lastAccessed,
    };
  });
}

/**
 * Marks the next incomplete lesson in a course as done, advances the
 * enrollment's status accordingly (in-progress / completed), and
 * returns that single course re-shaped for the UI. Throws if the
 * enrollment doesn't exist or doesn't belong to `userId`.
 */
export async function advanceEnrollmentProgress(
  userId: string,
  enrollmentId: string
) {
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      course: { include: { lessons: { orderBy: { order: "asc" } } } },
      lessonProgress: true,
    },
  });

  if (!enrollment || enrollment.userId !== userId) {
    return null;
  }

  const completedLessonIds = new Set(
    enrollment.lessonProgress
      .filter((progress) => progress.completed)
      .map((progress) => progress.lessonId)
  );

  const nextLesson = enrollment.course.lessons.find(
    (lesson) => !completedLessonIds.has(lesson.id)
  );

  if (nextLesson) {
    await prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId,
          lessonId: nextLesson.id,
        },
      },
      create: {
        enrollmentId,
        lessonId: nextLesson.id,
        completed: true,
        completedAt: new Date(),
      },
      update: { completed: true, completedAt: new Date() },
    });
    completedLessonIds.add(nextLesson.id);
  }

  const isCourseComplete =
    enrollment.course.lessons.length > 0 &&
    completedLessonIds.size >= enrollment.course.lessons.length;

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: {
      status: isCourseComplete ? "COMPLETED" : "IN_PROGRESS",
      lastAccessedAt: new Date(),
      completedAt: isCourseComplete ? new Date() : null,
    },
  });

  const courses = await getMyCourses(userId);
  return courses.find((course) => course.id === enrollmentId) ?? null;
}

/**
 * Removes a course from a user's "My Courses" list. Throws if the
 * enrollment doesn't exist or doesn't belong to `userId`.
 */
export async function removeEnrollment(userId: string, enrollmentId: string) {
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
  });

  if (!enrollment || enrollment.userId !== userId) {
    return false;
  }

  await prisma.enrollment.delete({ where: { id: enrollmentId } });
  return true;
}
