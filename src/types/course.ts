export type CourseStatus = "in-progress" | "completed" | "not-started";

export type EnrolledCourse = {
  /** Enrollment id — used for progress + removal API calls. */
  id: string;
  /** The underlying Course id, in case a link to a course detail page is added later. */
  courseId: string;
  title: string;
  category: string;
  instructor: string;
  instructorAvatar: string;
  image: string;
  totalLessons: number;
  completedLessons: number;
  status: CourseStatus;
  rating: number;
  duration: string;
  lastAccessed?: string;
};
