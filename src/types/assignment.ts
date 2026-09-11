export type AssignmentStatus = "pending" | "submitted" | "graded" | "late";

export type MyAssignment = {
  id: string;
  title: string;
  description?: string | null;
  courseTitle: string;
  dueDate: string; // ISO string
  maxScore: number;
  status: AssignmentStatus;
  submissionUrl?: string | null;
  submissionNote?: string | null;
  submittedAt?: string | null;
  score?: number | null;
  feedback?: string | null;
};
