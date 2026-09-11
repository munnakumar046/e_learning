"use client";

import Image from "next/image";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Clock,
  MoreVertical,
  Star,
  CheckCircle2,
  Download,
  Share2,
  XCircle,
  PlayCircle,
} from "lucide-react";

export type CourseStatus = "in-progress" | "completed" | "not-started";

export type EnrolledCourse = {
  id: string;
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

const STATUS_META: Record<CourseStatus, { label: string; badgeClass: string }> =
  {
    "in-progress": {
      label: "In Progress",
      badgeClass: "bg-blue-50 text-[#2f5fe8]",
    },
    completed: {
      label: "Completed",
      badgeClass: "bg-emerald-50 text-emerald-600",
    },
    "not-started": {
      label: "Not Started",
      badgeClass: "bg-slate-100 text-slate-600",
    },
  };

export default function CourseCard({ course }: { course: EnrolledCourse }) {
  const percent = Math.round(
    (course.completedLessons / course.totalLessons) * 100,
  );
  const status = STATUS_META[course.status];

  return (
    <Card className="group gap-0 overflow-hidden rounded-2xl border-slate-100 py-0 shadow-sm transition hover:shadow-md">
      <div className="relative h-36 w-full shrink-0 overflow-hidden bg-slate-900">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3">
          <Badge className={`rounded-md font-medium ${status.badgeClass}`}>
            {status.label}
          </Badge>
        </div>

        <div className="absolute right-2 top-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7 rounded-full bg-white/90 text-slate-700 shadow-sm hover:bg-white"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Course options</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <PlayCircle className="h-4 w-4" />
                {course.status === "completed"
                  ? "Watch Again"
                  : "Continue Learning"}
              </DropdownMenuItem>
              <DropdownMenuItem disabled={course.status !== "completed"}>
                <Download className="h-4 w-4" />
                Download Certificate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4" />
                Share Course
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <XCircle className="h-4 w-4" />
                Remove from My Courses
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="rounded-md bg-blue-50 font-normal text-[#2f5fe8]"
          >
            {course.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {course.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-10 font-semibold leading-snug text-slate-900">
          {course.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <img
            src={course.instructorAvatar}
            alt={course.instructor}
            className="h-5 w-5 shrink-0 rounded-full object-cover"
          />
          <span className="truncate text-xs text-slate-500">
            {course.instructor}
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-1 text-xs text-slate-400">
            <Clock className="h-3 w-3" />
            {course.duration}
          </span>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-3">
            <Progress value={percent} className="h-1.5 flex-1" />
            <span className="shrink-0 text-xs font-semibold text-slate-600">
              {percent}%
            </span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-xs text-slate-500">
            <span>
              {course.status === "completed" ? (
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  All lessons complete
                </span>
              ) : (
                `${course.completedLessons}/${course.totalLessons} Lessons`
              )}
            </span>
            {course.lastAccessed && course.status !== "not-started" && (
              <span>{course.lastAccessed}</span>
            )}
          </div>
        </div>

        {course.status === "completed" ? (
          <Button
            variant="outline"
            className="mt-4 w-full rounded-full border-emerald-500 text-emerald-600 hover:bg-emerald-50"
          >
            View Certificate
          </Button>
        ) : course.status === "not-started" ? (
          <Button className="mt-4 w-full rounded-full bg-[#2f5fe8] hover:bg-[#274fc4]">
            Start Course
          </Button>
        ) : (
          <Button
            variant="outline"
            className="mt-4 w-full rounded-full border-[#2f5fe8] text-[#2f5fe8] hover:bg-blue-50"
          >
            Continue Learning
          </Button>
        )}
      </div>
    </Card>
  );
}
