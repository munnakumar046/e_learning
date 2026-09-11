import prisma from "@/lib/prisma";
import type { MyCertificate } from "@/types/certificate";

function generateCertificateNumber() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  const year = new Date().getFullYear();
  return `LRN-${year}-${random}`;
}

/**
 * Returns every certificate a user has earned. Completed enrollments
 * that don't yet have a Certificate row get one issued on the fly,
 * so a course finished a moment ago shows up immediately.
 */
export async function getMyCertificates(
  userId: string,
): Promise<MyCertificate[]> {
  const completedEnrollments = await prisma.enrollment.findMany({
    where: { userId, status: "COMPLETED" },
    include: { course: true, certificate: true, user: true },
  });

  const certificates = await Promise.all(
    completedEnrollments.map(async (enrollment) => {
      let certificate = enrollment.certificate;
      if (!certificate) {
        certificate = await prisma.certificate.create({
          data: {
            enrollmentId: enrollment.id,
            userId,
            courseId: enrollment.courseId,
            certificateNumber: generateCertificateNumber(),
            issuedAt: enrollment.completedAt ?? new Date(),
          },
        });
      }

      return {
        id: certificate.id,
        certificateNumber: certificate.certificateNumber,
        courseTitle: enrollment.course.title,
        category: enrollment.course.category,
        instructor: "",
        issuedAt: certificate.issuedAt.toISOString(),
        studentName: enrollment.user.name,
      };
    }),
  );

  // Instructor name requires a second lookup since Course only stores
  // instructorId; batched here to avoid an N+1 on the loop above.
  const instructorIds = [
    ...new Set(completedEnrollments.map((e) => e.course.instructorId)),
  ];
  const instructors = await prisma.user.findMany({
    where: { id: { in: instructorIds } },
    select: { id: true, name: true },
  });
  const instructorNameById = new Map(instructors.map((i) => [i.id, i.name]));

  return certificates.map((certificate, index) => ({
    ...certificate,
    instructor:
      instructorNameById.get(completedEnrollments[index].course.instructorId) ??
      "Learnify Instructor",
  }));
}
