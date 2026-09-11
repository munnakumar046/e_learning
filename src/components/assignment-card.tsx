"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { CalendarClock, Link as LinkIcon, Loader2, Award } from "lucide-react";
import { format, formatDistanceToNow, isPast } from "date-fns";
import type { MyAssignment } from "@/types/assignment";

const STATUS_META: Record<
  MyAssignment["status"],
  { label: string; badgeClass: string }
> = {
  pending: { label: "Pending", badgeClass: "bg-blue-50 text-[#2f5fe8]" },
  submitted: { label: "Submitted", badgeClass: "bg-amber-50 text-amber-600" },
  graded: { label: "Graded", badgeClass: "bg-emerald-50 text-emerald-600" },
  late: { label: "Late", badgeClass: "bg-red-50 text-red-600" },
};

export default function AssignmentCard({
  assignment,
  isPending = false,
  onSubmit,
}: {
  assignment: MyAssignment;
  isPending?: boolean;
  onSubmit?: (
    id: string,
    data: { submissionUrl: string; submissionNote: string },
  ) => Promise<boolean> | void;
}) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(assignment.submissionUrl ?? "");
  const [note, setNote] = useState(assignment.submissionNote ?? "");

  const status = STATUS_META[assignment.status];
  const dueDate = new Date(assignment.dueDate);
  const overdue = isPast(dueDate) && assignment.status === "pending";

  async function handleSubmit() {
    const ok = await onSubmit?.(assignment.id, {
      submissionUrl: url,
      submissionNote: note,
    });
    if (ok !== false) setOpen(false);
  }

  return (
    <Card className="gap-3 rounded-2xl border-slate-100 p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="mb-1 truncate text-xs font-medium text-slate-400">
            {assignment.courseTitle}
          </p>
          <h3 className="line-clamp-2 font-semibold leading-snug text-slate-900">
            {assignment.title}
          </h3>
        </div>
        <Badge
          className={`shrink-0 rounded-md font-medium ${status.badgeClass}`}
        >
          {status.label}
        </Badge>
      </div>

      <div
        className={`flex items-center gap-2 text-sm ${
          overdue ? "text-red-600" : "text-slate-500"
        }`}
      >
        <CalendarClock className="h-3.5 w-3.5" />
        <span>
          Due {format(dueDate, "MMM d, yyyy")} (
          {formatDistanceToNow(dueDate, { addSuffix: true })})
        </span>
      </div>

      {assignment.status === "graded" ? (
        <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2">
          <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
            <Award className="h-4 w-4" />
            Score
          </span>
          <span className="text-sm font-bold text-emerald-700">
            {assignment.score}/{assignment.maxScore}
          </span>
        </div>
      ) : null}

      {assignment.feedback && (
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
          <span className="font-medium text-slate-700">Feedback: </span>
          {assignment.feedback}
        </p>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant={
                assignment.status === "pending" || assignment.status === "late"
                  ? "default"
                  : "outline"
              }
              className={
                assignment.status === "pending" || assignment.status === "late"
                  ? "w-full rounded-full bg-[#2f5fe8] hover:bg-[#274fc4]"
                  : "w-full rounded-full"
              }
            />
          }
        >
          {assignment.status === "graded"
            ? "View Submission"
            : assignment.status === "submitted"
              ? "Edit Submission"
              : "Submit Assignment"}
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{assignment.title}</SheetTitle>
            <SheetDescription>
              {assignment.courseTitle} · Due{" "}
              {format(dueDate, "EEEE, MMM d 'at' h:mm a")}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
            {assignment.description && (
              <p className="text-sm text-slate-600">{assignment.description}</p>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">
                Submission link
              </label>
              <div className="relative">
                <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={assignment.status === "graded"}
                  placeholder="https://drive.google.com/..."
                  className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-[#2f5fe8] focus:outline-none disabled:bg-slate-50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">
                Notes for your instructor
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={assignment.status === "graded"}
                rows={5}
                placeholder="Anything you'd like to add about your submission..."
                className="w-full resize-none rounded-md border border-slate-200 bg-white p-3 text-sm placeholder:text-slate-400 focus:border-[#2f5fe8] focus:outline-none disabled:bg-slate-50"
              />
            </div>
          </div>

          <SheetFooter className="flex-row">
            <SheetClose
              render={
                <Button variant="outline" className="flex-1 rounded-full" />
              }
            >
              Cancel
            </SheetClose>
            {assignment.status !== "graded" && (
              <Button
                className="flex-1 rounded-full bg-[#2f5fe8] hover:bg-[#274fc4]"
                disabled={isPending || (!url.trim() && !note.trim())}
                onClick={handleSubmit}
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Card>
  );
}
