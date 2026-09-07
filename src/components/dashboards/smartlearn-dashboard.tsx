"use client";

import Image from "next/image";
import {
  Brain,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Star,
  ListChecks,
  Video,
  Upload,
  PenSquare,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Static data — swap these for real data sources.
// ---------------------------------------------------------------------------

const NAV_TABS = [
  "Dashboard",
  "AI HelpMate",
  "Finance",
  "Assessment",
  "Analytics",
];

const QUICK_STATS = [
  { value: "12", label: "Total courses" },
  { value: "92%", label: "Completion rate" },
  { value: "160h", label: "Total study time" },
  { value: "85/100", label: "Avg. test score" },
  { value: "18", label: "Total Certs" },
];

const COURSES = [
  {
    category: "Design",
    title: "Typography in Figma: create readable and stylish text",
    lessons: "1/3 lessons",
    duration: "1h 35min",
    rating: 4.5,
    tone: "bg-violet-100",
    accent: "text-violet-600",
    label: "Aa",
    progress: 20,
  },
  {
    category: "Development",
    title: "Python for Beginners: from zero to first script",
    lessons: "5/16 lessons",
    duration: "8h 10min",
    rating: 4.7,
    tone: "bg-sky-100",
    accent: "text-sky-600",
    label: "</>",
    progress: 31,
  },
  {
    category: "Development",
    title: "JavaScript Essentials: build logic from scratch",
    lessons: "3/12 lessons",
    duration: "3h 12min",
    rating: 4.7,
    tone: "bg-amber-100",
    accent: "text-amber-600",
    label: "{ }",
    progress: 25,
  },
  {
    category: "Digital Marketing",
    title: "Digital Marketing Fundamentals: reach your first online audience",
    lessons: "5/12 lessons",
    duration: "4h 40min",
    rating: 4.6,
    tone: "bg-emerald-100",
    accent: "text-emerald-600",
    label: "📈",
    progress: 42,
  },
];

const SCHEDULE = [
  {
    start: 13.5,
    end: 15.3,
    title: "Figma fundamentals: first step into UI/UX Design",
    time: "13:30 - 15:20",
    color: "bg-emerald-100 border-emerald-300 text-emerald-900",
  },
  {
    start: 16.3,
    end: 18,
    title: "Responsive Design Basics: adapt your UI to any screen",
    time: "16:20 - 18:00",
    color: "bg-sky-100 border-sky-300 text-sky-900",
  },
];

const SCHEDULE_HOURS = [13, 14, 15, 16, 17, 18];

const ACTIVITY_DAYS = [
  "15 Mon",
  "16 Tue",
  "17 Wed",
  "18 Thu",
  "19 Fri",
  "20 Sat",
  "21 Sun",
];
// Two wavy series approximating "Theory" and "Practice" over the week.
const THEORY_SERIES = [30, 55, 40, 70, 45, 60, 50];
const PRACTICE_SERIES = [45, 35, 60, 28, 50, 42, 65];

const CATEGORY_SPLIT = [
  { label: "Design", percent: 47, color: "bg-blue-500" },
  { label: "Marketing", percent: 45, color: "bg-emerald-400" },
  { label: "Development", percent: 5, color: "bg-pink-300" },
  { label: "Finance", percent: 3, color: "bg-slate-300" },
];

const TASKS = [
  {
    icon: PenSquare,
    tone: "bg-sky-100 text-sky-600",
    text: "Write a short reflection on completed module",
    points: "+500",
    progress: 60,
  },
  {
    icon: ListChecks,
    tone: "bg-amber-100 text-amber-600",
    text: "Complete quiz based on last week's material",
    points: "+1,500",
    progress: 35,
  },
  {
    icon: Video,
    tone: "bg-pink-100 text-pink-600",
    text: "Watch the intro lecture and take notes",
    points: "+250",
    progress: 80,
  },
  {
    icon: Upload,
    tone: "bg-emerald-100 text-emerald-600",
    text: "Submit your project draft for review",
    points: "+500",
    progress: 45,
  },
];

const FRIENDS = [
  {
    name: "Michael Turner",
    level: 25,
    hours: "852h",
    rank: 32,
    score: "10,568",
  },
  { name: "Ethan Brooks", level: 23, hours: "752h", rank: 25, score: "10,112" },
  { name: "Daniel Hayes", level: 23, hours: "700h", rank: 28, score: "9,052" },
  {
    name: "Olivia Bennett",
    level: 20,
    hours: "620h",
    rank: 25,
    score: "8,025",
  },
  {
    name: "Logan Mitchell",
    level: 19,
    hours: "540h",
    rank: 21,
    score: "7,410",
  },
];

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function LineChart({
  seriesA,
  seriesB,
  labels,
  height = 160,
}: {
  seriesA: number[];
  seriesB: number[];
  labels: string[];
  height?: number;
}) {
  const width = 700;
  const max = 100;
  const stepX = width / (labels.length - 1);

  const toPath = (series: number[]) =>
    series
      .map((v, i) => {
        const x = i * stepX;
        const y = height - (v / max) * height;
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      preserveAspectRatio="none"
    >
      <path
        d={toPath(seriesA)}
        fill="none"
        stroke="#818cf8"
        strokeWidth={2.5}
      />
      <path
        d={toPath(seriesB)}
        fill="none"
        stroke="#c4b5fd"
        strokeWidth={2.5}
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SmartLearnDashboard() {
  return (
    <div className="min-h-screen bg-[#eef0fb] p-4 md:p-6">
      <div className="mx-auto max-w-[1500px] space-y-6">
        <TopNav />
        <WelcomeHeader />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <MyCourses />
            <ActivitiesCard />
          </div>
          <div className="space-y-6">
            <ScheduleCard />
            <TasksCard />
            <FriendsScoreCard />
          </div>
        </div>
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 px-2 text-lg font-bold text-slate-900">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          <Brain className="h-5 w-5" />
        </div>
        SmartLearn
      </div>

      <nav className="flex flex-wrap items-center gap-1">
        {NAV_TABS.map((tab, i) => (
          <button
            key={tab}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              i === 0
                ? "bg-slate-900 text-white"
                : "text-slate-500 hover:bg-slate-100",
            )}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3 px-2">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
        >
          <Bell className="h-4.5 w-4.5" />
        </Button>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 py-1 pl-1 pr-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-indigo-100 text-xs font-semibold text-indigo-700">
              AR
            </AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900">Alex Rudewel</p>
            <p className="text-xs text-slate-400">4,525</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
}

function WelcomeHeader() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, Alex 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Stay focused, keep learning!
        </p>
      </div>

      <div className="flex flex-wrap gap-8">
        {QUICK_STATS.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MyCourses() {
  return (
    <Card className="rounded-2xl border-slate-100 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">My Courses</h2>
        <a href="#" className="text-sm font-medium text-indigo-600">
          See all
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COURSES.map((course) => (
          <div key={course.title} className="flex flex-col">
            <div
              className={cn(
                "relative flex h-32 flex-col justify-between overflow-hidden rounded-xl p-3",
                course.tone,
              )}
            >
              <div className="flex items-start justify-between">
                <Badge
                  variant="secondary"
                  className="rounded-md bg-white/70 text-[11px] font-medium text-slate-600"
                >
                  {course.category}
                </Badge>
                <Bookmark className="h-4 w-4 text-slate-500" />
              </div>
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg font-bold",
                  course.accent,
                )}
              >
                {course.label}
              </div>
            </div>

            <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-slate-900">
              {course.title}
            </h3>

            <div className="mt-2">
              <Progress value={course.progress} className="h-1.5" />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
              <span>
                {course.lessons} &middot; {course.duration}
              </span>
              <span className="flex items-center gap-1 text-amber-500">
                <Star className="h-3 w-3 fill-amber-500" />
                {course.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ScheduleCard() {
  return (
    <Card className="rounded-2xl border-slate-100 p-5 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            September 15, 2025
          </h2>
          <p className="text-xs text-slate-400">2 Lessons, Today</p>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-[48px_1fr]">
        <div className="flex flex-col justify-between text-xs text-slate-400">
          {SCHEDULE_HOURS.map((h) => (
            <span key={h} className="h-16">{`${h}:00`}</span>
          ))}
        </div>

        <div className="relative border-l border-slate-100">
          {SCHEDULE.map((item) => {
            const top = (item.start - SCHEDULE_HOURS[0]) * 64;
            const height = (item.end - item.start) * 64;
            return (
              <div
                key={item.title}
                className={cn(
                  "absolute left-2 right-1 rounded-lg border p-2 text-xs",
                  item.color,
                )}
                style={{ top, height: Math.max(height, 56) }}
              >
                <p className="font-semibold">{item.time}</p>
                <p className="mt-0.5 leading-snug">{item.title}</p>
              </div>
            );
          })}
          <div style={{ height: SCHEDULE_HOURS.length * 64 }} />
        </div>
      </div>
    </Card>
  );
}

function ActivitiesCard() {
  return (
    <Card className="rounded-2xl border-slate-100 p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-slate-900">Activities</h2>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-indigo-400" /> Theory
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-violet-300" /> Practice
          </span>
        </div>
        <Button variant="outline" size="sm" className="rounded-full text-xs">
          last 7 Days <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </div>

      <LineChart
        seriesA={THEORY_SERIES}
        seriesB={PRACTICE_SERIES}
        labels={ACTIVITY_DAYS}
      />

      <div className="mt-2 flex justify-between text-xs text-slate-400">
        {ACTIVITY_DAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CATEGORY_SPLIT.map((cat) => (
          <div
            key={cat.label}
            className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs"
          >
            <span className="font-semibold text-slate-700">{cat.percent}%</span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className={cn("h-2 w-2 rounded-full", cat.color)} />
              {cat.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TasksCard() {
  return (
    <Card className="rounded-2xl border-slate-100 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Tasks</h2>
        <Button variant="outline" size="sm" className="rounded-full text-xs">
          Day <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-3">
        {TASKS.map((task, i) => {
          const Icon = task.icon;
          return (
            <div key={i} className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  task.tone,
                )}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm text-slate-700">
                  {task.text}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <Progress value={task.progress} className="h-1.5 flex-1" />
                  <span className="shrink-0 text-xs font-medium text-emerald-600">
                    {task.points}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="shrink-0 rounded-lg text-xs"
              >
                Claim
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function FriendsScoreCard() {
  return (
    <Card className="rounded-2xl border-slate-100 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Friends Score</h2>
        <a href="#" className="text-sm font-medium text-indigo-600">
          See all
        </a>
      </div>

      <div className="space-y-3">
        {FRIENDS.map((friend) => (
          <div key={friend.name} className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-slate-100 text-xs font-semibold text-slate-600">
                {friend.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {friend.name}
              </p>
              <p className="text-xs text-slate-400">
                Lvl {friend.level} &middot; {friend.hours} &middot; #
                {friend.rank}
              </p>
            </div>
            <Badge className="flex items-center gap-1 rounded-md bg-amber-50 font-normal text-amber-600 hover:bg-amber-50">
              <Trophy className="h-3 w-3" />
              {friend.score}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
