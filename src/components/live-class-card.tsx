"use client";

import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Clock, Users, Video, Loader2, Radio } from "lucide-react";
import { format } from "date-fns";
import { LiveClassSession } from "@/types/live-class";

const STATUS_META: Record<
  LiveClassSession["status"],
  { label: string; badgeClass: string }
> = {
  live: { label: "Live Now", badgeClass: "bg-red-50 text-red-600" },
  upcoming: { label: "Upcoming", badgeClass: "bg-blue-50 text-[#2f5fe8]" },
  completed: { label: "Completed", badgeClass: "bg-slate-100 text-slate-600" },
  cancelled: { label: "Cancelled", badgeClass: "bg-slate-100 text-slate-400" },
};

export default function LiveClassCard({
  session,
  isPending = false,
  onToggleRegister,
}: {
  session: LiveClassSession;
  isPending?: boolean;
  onToggleRegister?: (id: string, registered: boolean) => void;
}) {
  const start = new Date(session.startTime);
  const end = new Date(session.endTime);
  const status = STATUS_META[session.status];

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-slate-100 p-0 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3 p-4 pb-3">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-2">
            <Badge className={`rounded-md font-medium ${status.badgeClass}`}>
              {session.status === "live" && (
                <Radio className="mr-1 h-3 w-3 animate-pulse" />
              )}
              {status.label}
            </Badge>
            {session.courseTitle && (
              <span className="truncate text-xs text-slate-400">
                {session.courseTitle}
              </span>
            )}
          </div>
          <h3 className="line-clamp-2 font-semibold leading-snug text-slate-900">
            {session.title}
          </h3>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#2f5fe8]">
          <Video className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4 pb-3 text-sm text-slate-500">
        <span className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          {format(start, "EEE, MMM d, yyyy")}
        </span>
        <span className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          {format(start, "h:mm a")} – {format(end, "h:mm a")}
        </span>
        <span className="flex items-center gap-2">
          <Users className="h-3.5 w-3.5 text-slate-400" />
          {session.attendeeCount}{" "}
          {session.attendeeCount === 1 ? "attendee" : "attendees"}
        </span>
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-slate-100 p-3">
        {session.status === "live" && (
          <Button
            className="flex-1 rounded-full bg-red-600 hover:bg-red-700"
            onClick={() => {
              if (session.meetingUrl) window.open(session.meetingUrl, "_blank");
            }}
          >
            Join Now
          </Button>
        )}

        {session.status === "upcoming" && (
          <Button
            variant={session.isRegistered ? "outline" : "default"}
            disabled={isPending}
            className={
              session.isRegistered
                ? "flex-1 rounded-full border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                : "flex-1 rounded-full bg-[#2f5fe8] hover:bg-[#274fc4]"
            }
            onClick={() => onToggleRegister?.(session.id, session.isRegistered)}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {session.isRegistered ? "You're Registered" : "Register"}
          </Button>
        )}

        {session.status === "completed" && (
          <Button
            variant="outline"
            disabled={!session.meetingUrl}
            className="flex-1 rounded-full"
            onClick={() => {
              if (session.meetingUrl) window.open(session.meetingUrl, "_blank");
            }}
          >
            Watch Recording
          </Button>
        )}

        {session.status === "cancelled" && (
          <Button variant="outline" disabled className="flex-1 rounded-full">
            Session Cancelled
          </Button>
        )}
      </div>
    </Card>
  );
}
