import prisma from "@/lib/prisma";
import type { AssignmentStatus, MyAssignment } from "@/types/assignment";

/**
 * Assignments for every course a user is enrolled in, left-joined
 * with that user's own submission (if any). An assignment with no
 * submission row yet reads as "pending", or "late" once its due
 * date has passed.
 */
export async function getMyAssignments(userId: string): Promise<MyAssignment[]> {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    select: { courseId: true },
  });
  const courseIds = enrollments.map((e) => e.courseId);

  if (courseIds.length === 0) return [];

  const assignments = await prisma.assignment.findMany({
    where: { courseId: { in: courseIds } },
    include: {
      course: true,
      submissions: { where: { userId } },
    },
    orderBy: { dueDate: "asc" },
  });

  const now = new Date();

  return assignments.map((assignment) => {
    const submission = assignment.submissions[0];

    let status: AssignmentStatus;
    if (submission?.status === "GRADED") {
      status = "graded";
    } else if (submission?.status === "SUBMITTED" || submission?.status === "LATE") {
      status = submission.status === "LATE" ? "late" : "submitted";
    } else {
      status = now > assignment.dueDate ? "late" : "pending";
    }

    return {
      id: assignment.id,
      title: assignment.title,
      description: assignment.description,
      courseTitle: assignment.course.title,
      dueDate: assignment.dueDate.toISOString(),
      maxScore: assignment.maxScore,
      status,
      submissionUrl: submission?.submissionUrl ?? null,
      submissionNote: submission?.submissionNote ?? null,
      submittedAt: submission?.submittedAt?.toISOString() ?? null,
      score: submission?.score ?? null,
      feedback: submission?.feedback ?? null,
    };
  });
}

export async function submitAssignment(
  userId: string,
  assignmentId: string,
  data: { submissionUrl?: string; submissionNote?: string }
) {
  const assignment = await prisma.assignment.findUnique({
    where: { id: assignmentId },
  });
  if (!assignment) return null;

  const isLate = new Date() > assignment.dueDate;

  await prisma.assignmentSubmission.upsert({
    where: { assignmentId_userId: { assignmentId, userId } },
    create: {
      assignmentId,
      userId,
      status: isLate ? "LATE" : "SUBMITTED",
      submissionUrl: data.submissionUrl,
      submissionNote: data.submissionNote,
      submittedAt: new Date(),
    },
    update: {
      status: isLate ? "LATE" : "SUBMITTED",
      submissionUrl: data.submissionUrl,
      submissionNote: data.submissionNote,
      submittedAt: new Date(),
    },
  });

  const assignments = await getMyAssignments(userId);
  return assignments.find((a) => a.id === assignmentId) ?? null;
}
