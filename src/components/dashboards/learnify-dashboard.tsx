"use client";

import Image from "next/image";
import {
  LayoutGrid,
  User,
  Radio,
  ClipboardList,
  Award,
  Activity,
  MessageSquare,
  Calendar as CalendarIcon,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  PanelLeft,
  ChevronLeft,
  ChevronRight,
  UsersRound,
  CheckCircle2,
  Hourglass,
  Flame,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Static data — swap these for real data sources.
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid, active: true },
  { label: "My Courses", icon: User },
  { label: "Live Classes", icon: Radio },
  { label: "Assignments", icon: ClipboardList },
  { label: "Certificates", icon: Award },
  { label: "Progress", icon: Activity },
  { label: "Messages", icon: MessageSquare },
  { label: "Calendar", icon: CalendarIcon },
];

const STAT_CARDS = [
  { label: "Enrolled", value: "24", icon: UsersRound },
  { label: "Completed", value: "06", icon: CheckCircle2 },
  { label: "Learning Hours", value: "45 hrs", icon: Hourglass },
  { label: "Streak", value: "7 Days", icon: Flame },
];

const RINGS = [
  { value: 32, label: "Current streak", color: "#60a5fa" },
  { value: 126, label: "Learning hours", color: "#c084fc" },
  { value: "3.6K", label: "XP points", color: "#2dd4bf" },
];

const CONTINUE_LEARNING = [
  {
    category: "Design",
    title: "UI/UX Design Masterclass",
    lessons: "16/20 Lessons",
    percent: 80,
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=200&h=200&fit=crop",
  },
  {
    category: "Development",
    title: "React Development",
    lessons: "30/60 Lessons",
    percent: 50,
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=200&h=200&fit=crop",
  },
];

const LIVE_CLASSES = [
  {
    name: "Advanced Prototyping",
    instructor: "Sarah Jenkins",
    time: "LIVE",
    live: true,
  },
  {
    name: "Redux State Mgmt",
    instructor: "David Chan",
    time: "02:30PM",
    live: false,
  },
  {
    name: "Content Strategy 101",
    instructor: "Emily Watson",
    time: "Tomorrow",
    live: false,
  },
];

const PROGRESS_SEGMENTS = [
  { label: "Communication", percent: 60, color: "#3b82f6" },
  { label: "UI Design", percent: 24, color: "#a855f7" },
  { label: "Coding", percent: 16, color: "#2dd4bf" },
];

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// June 2026 calendar grid — Sunday-first, matching the reference layout.
const CALENDAR_WEEKS: {
  day: number;
  muted?: boolean;
  selected?: boolean;
  inWeek?: boolean;
}[][] = [
  [
    { day: 31, muted: true },
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
  ],
  [
    { day: 7 },
    { day: 8 },
    { day: 9, selected: true },
    { day: 10 },
    { day: 11 },
    { day: 12 },
    { day: 13 },
  ],
  [
    { day: 14 },
    { day: 15 },
    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    { day: 20 },
  ],
  [
    { day: 21 },
    { day: 22, inWeek: true },
    { day: 23, inWeek: true },
    { day: 24, inWeek: true },
    { day: 25, inWeek: true },
    { day: 26, inWeek: true },
    { day: 27 },
  ],
  [
    { day: 28 },
    { day: 29 },
    { day: 30 },
    { day: 1, muted: true },
    { day: 2, muted: true },
    { day: 3, muted: true },
    { day: 4, muted: true },
  ],
];

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function ProgressRing({
  value,
  displayValue,
  color,
  size = 88,
  stroke = 7,
}: {
  value: number;
  displayValue: string | number;
  color: string;
  size?: number;
  stroke?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value, 100);
  const offset = circumference - (pct / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text
        x="50%"
        y="50%"
        dy=".35em"
        textAnchor="middle"
        fill="white"
        fontSize="18"
        fontWeight="700"
        className="rotate-90"
        style={{ transformOrigin: "center" }}
      >
        {displayValue}
      </text>
    </svg>
  );
}

function DonutChart({
  segments,
  size = 160,
  stroke = 22,
}: {
  segments: { percent: number; color: string }[];
  size?: number;
  stroke?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <svg width={size} height={size} className="-rotate-90">
      {segments.map((seg, i) => {
        const dash = (seg.percent / 100) * circumference;
        const offset = circumference - cumulative;
        cumulative += dash;
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={seg.color}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={offset}
          />
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#e7e9f5] p-4">
      <div className="mx-auto flex max-w-[1800px] gap-4 rounded-3xl bg-[#f4f5fa] p-3">
        <Sidebar />
        <main className="flex-1 space-y-4 py-2 pr-2">
          <TopBar />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              <WelcomeBanner />
              <ContinueLearning />
              <UpcomingLiveClasses />
            </div>
            <div className="space-y-4">
              <StatGrid />
              <CalendarCard />
              <LearningProgressCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col rounded-2xl bg-[#2f5fe8] p-4 text-white">
      <div className="mb-8 flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-lg font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
            📖
          </div>
          Learnify
        </div>
        <PanelLeft className="h-5 w-5 opacity-80" />
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-white/20 text-white"
                : "text-white/80 hover:bg-white/10 hover:text-white",
            )}
          >
            <Icon className="h-4.5 w-4.5" />
            {label}
          </button>
        ))}
      </nav>

      <Card className="mb-3 border-0 bg-white p-4 text-center text-slate-900 shadow-none">
        <p className="font-semibold leading-tight">Unlock Premium Access</p>
        <p className="mt-1 text-xs text-slate-500">
          Upgrade to Enterprise &amp; enjoy exclusive discounts!
        </p>
        <Button className="mt-3 w-full rounded-lg bg-[#2f5fe8] hover:bg-[#274fc4]">
          Upgrade Pro
        </Button>
      </Card>

      <div className="space-y-1">
        {[
          { label: "Settings", icon: Settings },
          { label: "Help Center", icon: HelpCircle },
          { label: "Logout", icon: LogOut },
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Icon className="h-4.5 w-4.5" />
            {label}
          </button>
        ))}
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search courses, lessons"
          className="h-12 rounded-xl border-slate-200 bg-white pl-11 text-sm shadow-sm"
        />
      </div>
      <Button variant="outline" size="icon" className="h-11 w-11 rounded-full">
        ⊕
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="relative h-11 w-11 rounded-full"
      >
        <Bell className="h-4.5 w-4.5" />
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
      </Button>
      <Avatar className="h-11 w-11 bg-[#2f5fe8] text-white">
        <AvatarFallback className="bg-[#2f5fe8] font-semibold text-white">
          AH
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

function WelcomeBanner() {
  return (
    <Card className="relative overflow-hidden rounded-2xl border-0 bg-[#0b0f1a] p-8 text-white shadow-sm">
      <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            Welcome back, Alex 👋
          </h1>
          <p className="mt-2 max-w-sm text-sm text-slate-300">
            You&apos;ve completed 85% of your weekly goal. Keep going to hit 20
            learning hours!
          </p>
          <Button className="mt-5 rounded-lg bg-[#2f5fe8] px-5 hover:bg-[#274fc4]">
            Continue Learning
          </Button>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <ProgressRing value={64} displayValue={32} color="#60a5fa" />
            <span className="text-xs text-slate-300">Current streak</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ProgressRing value={78} displayValue={126} color="#c084fc" />
            <span className="text-xs text-slate-300">Learning hours</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ProgressRing value={90} displayValue="3.6K" color="#2dd4bf" />
            <span className="text-xs text-slate-300">XP points</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StatGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {STAT_CARDS.map(({ label, value, icon: Icon }) => (
        <Card
          key={label}
          className="flex items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2f5fe8]">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-lg font-bold text-slate-900">{value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ContinueLearning() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Continue Learning</h2>
        <a href="#" className="text-sm font-medium text-[#2f5fe8]">
          View My Courses
        </a>
      </div>

      <div className="space-y-3">
        {CONTINUE_LEARNING.map((course) => (
          <Card
            key={course.title}
            className="flex flex-col gap-4 rounded-2xl border-slate-100 p-4 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <Badge
                variant="secondary"
                className="mb-1 rounded-md bg-blue-50 font-normal text-[#2f5fe8]"
              >
                {course.category}
              </Badge>
              <h3 className="font-semibold text-slate-900">{course.title}</h3>
              <div className="mt-2 flex items-center gap-3">
                <Progress value={course.percent} className="h-1.5 max-w-xs" />
                <span className="shrink-0 text-xs text-slate-500">
                  {course.lessons}
                </span>
                <span className="ml-auto shrink-0 text-xs font-medium text-slate-500 sm:ml-0">
                  {course.percent}% Complete
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="rounded-full border-[#2f5fe8] text-[#2f5fe8] hover:bg-blue-50"
            >
              Resume Lesson
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function UpcomingLiveClasses() {
  return (
    <Card className="rounded-2xl border-slate-100 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">
          Upcoming Live Classes
        </h2>
        <a href="#" className="text-sm font-medium text-[#2f5fe8]">
          View All
        </a>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-xs text-slate-500">
            <th className="pb-3 font-medium">Class Name</th>
            <th className="pb-3 font-medium">Instructor</th>
            <th className="pb-3 font-medium">Time</th>
            <th className="pb-3 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {LIVE_CLASSES.map((cls) => (
            <tr key={cls.name} className="border-t border-slate-100">
              <td className="py-3 font-medium text-slate-900">{cls.name}</td>
              <td className="py-3 text-slate-600">{cls.instructor}</td>
              <td className="py-3">
                {cls.live ? (
                  <Badge className="rounded-md bg-red-50 font-normal text-red-500 hover:bg-red-50">
                    LIVE
                  </Badge>
                ) : (
                  <span className="text-slate-600">{cls.time}</span>
                )}
              </td>
              <td className="py-3 text-right">
                {cls.live ? (
                  <Button className="rounded-lg bg-[#2f5fe8] hover:bg-[#274fc4]">
                    Join Now
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="rounded-lg border-[#2f5fe8] text-[#2f5fe8] hover:bg-blue-50"
                  >
                    Set Reminder
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function CalendarCard() {
  return (
    <Card className="rounded-2xl border-slate-100 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">June 09, 2026</h2>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
        {WEEKDAYS.map((d) => (
          <span key={d} className="text-xs font-semibold text-slate-400">
            {d}
          </span>
        ))}

        {CALENDAR_WEEKS.flat().map((cell, i) => (
          <div key={i} className="flex items-center justify-center py-0.5">
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full",
                cell.muted && "text-slate-300",
                !cell.muted &&
                  !cell.selected &&
                  !cell.inWeek &&
                  "text-slate-700",
                cell.inWeek && !cell.selected && "bg-blue-50 text-slate-700",
                cell.selected && "bg-[#2f5fe8] font-semibold text-white",
              )}
            >
              {cell.day}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function LearningProgressCard() {
  return (
    <Card className="rounded-2xl border-slate-100 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Learning Progress</h2>
        <Button variant="outline" size="sm" className="rounded-full text-xs">
          Weekly
        </Button>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <ul className="space-y-2 text-sm">
          {PROGRESS_SEGMENTS.map((seg) => (
            <li key={seg.label} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-slate-600">
                {seg.label} - {seg.percent}%
              </span>
            </li>
          ))}
        </ul>

        <DonutChart segments={PROGRESS_SEGMENTS} />
      </div>
    </Card>
  );
}
