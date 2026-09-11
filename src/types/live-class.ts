export type LiveClassStatus = "upcoming" | "live" | "completed" | "cancelled";

export type LiveClassSession = {
  id: string;
  title: string;
  description?: string | null;
  courseTitle?: string | null;
  instructor: string;
  instructorAvatar: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  meetingUrl?: string | null;
  status: LiveClassStatus;
  attendeeCount: number;
  isRegistered: boolean;
};
