"use client";

import { useMemo, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import {
  BookOpen,
  Flame,
  GraduationCap,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import CourseCard, { EnrolledCourse } from "./course-card";

const MY_COURSES: EnrolledCourse[] = [
  {
    id: "1",
    title: "UI/UX Design Masterclass: From Wireframes to Prototypes",
    category: "Design",
    instructor: "Sarah Mitchell",
    instructorAvatar: "https://i.pravatar.cc/40?img=47",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&h=300&fit=crop",
    totalLessons: 20,
    completedLessons: 16,
    status: "in-progress",
    rating: 4.8,
    duration: "12h 30m",
    lastAccessed: "2 days ago",
  },
  {
    id: "2",
    title: "React Development: Build Modern Web Applications",
    category: "Development",
    instructor: "James Carter",
    instructorAvatar: "https://i.pravatar.cc/40?img=12",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&h=300&fit=crop",
    totalLessons: 60,
    completedLessons: 30,
    status: "in-progress",
    rating: 4.6,
    duration: "24h 10m",
    lastAccessed: "5 hours ago",
  },
  {
    id: "3",
    title: "Introduction to AI: Learn Machine Learning in 30 Days",
    category: "Data Science",
    instructor: "Priya Nair",
    instructorAvatar: "https://i.pravatar.cc/40?img=32",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
    totalLessons: 18,
    completedLessons: 18,
    status: "completed",
    rating: 4.9,
    duration: "9h 45m",
    lastAccessed: "Completed 1 week ago",
  },
  {
    id: "4",
    title: "The Complete Digital Marketing Strategy Course",
    category: "Marketing",
    instructor: "Daniel Reyes",
    instructorAvatar: "https://i.pravatar.cc/40?img=5",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=500&h=300&fit=crop",
    totalLessons: 24,
    completedLessons: 0,
    status: "not-started",
    rating: 4.5,
    duration: "11h 20m",
  },
  {
    id: "5",
    title: "Trading Price Action: A Practical Guide for Beginners",
    category: "Finance",
    instructor: "Olivia Bennett",
    instructorAvatar: "https://i.pravatar.cc/40?img=9",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop",
    totalLessons: 32,
    completedLessons: 32,
    status: "completed",
    rating: 4.7,
    duration: "15h 00m",
    lastAccessed: "Completed 3 weeks ago",
  },
  {
    id: "6",
    title: "Art of Pottery: Learn Like a Professional",
    category: "Design",
    instructor: "Marcus Lee",
    instructorAvatar: "https://i.pravatar.cc/40?img=15",
    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=500&h=300&fit=crop",
    totalLessons: 14,
    completedLessons: 4,
    status: "in-progress",
    rating: 4.4,
    duration: "6h 15m",
    lastAccessed: "Yesterday",
  },
  {
    id: "7",
    title: "100 Days of Code: The Complete Front-End Bootcamp",
    category: "Development",
    instructor: "James Carter",
    instructorAvatar: "https://i.pravatar.cc/40?img=12",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&h=300&fit=crop",
    totalLessons: 100,
    completedLessons: 0,
    status: "not-started",
    rating: 4.8,
    duration: "48h 00m",
  },
  {
    id: "8",
    title: "Designing & Tailoring Clothing: Basic to Intermediate",
    category: "Design",
    instructor: "Sophia Turner",
    instructorAvatar: "https://i.pravatar.cc/40?img=20",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=300&fit=crop",
    totalLessons: 22,
    completedLessons: 9,
    status: "in-progress",
    rating: 4.3,
    duration: "10h 40m",
    lastAccessed: "3 days ago",
  },
];

const TABS = [
  { value: "all", label: "All Courses" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "not-started", label: "Not Started" },
] as const;

type SortOption = "recent" | "title-asc" | "progress-desc" | "rating-desc";

function computePercent(course: EnrolledCourse) {
  return course.totalLessons === 0
    ? 0
    : (course.completedLessons / course.totalLessons) * 100;
}

export default function MyCoursesSection() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("recent");

  const stats = useMemo(() => {
    const total = MY_COURSES.length;
    const inProgress = MY_COURSES.filter(
      (c) => c.status === "in-progress",
    ).length;
    const completed = MY_COURSES.filter((c) => c.status === "completed").length;
    return { total, inProgress, completed, certificates: completed };
  }, []);

  const filteredCourses = useMemo(() => {
    let list = MY_COURSES.filter((course) => {
      const matchesTab = activeTab === "all" || course.status === activeTab;
      const matchesQuery =
        query.trim().length === 0 ||
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.instructor.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesQuery;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "progress-desc":
          return computePercent(b) - computePercent(a);
        case "rating-desc":
          return b.rating - a.rating;
        case "recent":
        default:
          return 0;
      }
    });

    return list;
  }, [activeTab, query, sort]);

  return (
    <section className="flex-1">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            My Courses
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your enrolled courses, pick up where you left off, and revisit
            your certificates.
          </p>
        </div>
        <Button className="rounded-full bg-[#2f5fe8] px-5 hover:bg-[#274fc4]">
          Browse New Courses
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="flex-row items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2f5fe8]">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">{stats.total}</p>
            <p className="text-xs text-slate-500">Enrolled Courses</p>
          </div>
        </Card>

        <Card className="flex-row items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">
              {stats.inProgress}
            </p>
            <p className="text-xs text-slate-500">In Progress</p>
          </div>
        </Card>

        <Card className="flex-row items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">
              {stats.completed}
            </p>
            <p className="text-xs text-slate-500">Completed</p>
          </div>
        </Card>

        <Card className="flex-row items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">
              {stats.certificates}
            </p>
            <p className="text-xs text-slate-500">Certificates Earned</p>
          </div>
        </Card>
      </div>

      {/* Tabs + Controls */}
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(String(v))}>
          <TabsList className="flex h-auto flex-wrap gap-1 bg-slate-100 p-1">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="h-8 rounded-md px-3 text-sm data-active:bg-white data-active:text-slate-900 data-active:shadow-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your courses"
              className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-[#2f5fe8] focus:outline-none"
            />
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-full sm:w-44">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Accessed</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="progress-desc">Progress</SelectItem>
              <SelectItem value="rating-desc">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center gap-3 rounded-2xl border-slate-100 p-12 text-center shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">No courses found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search or filters, or explore new courses to
              add to your list.
            </p>
          </div>
          <Button className="rounded-full bg-[#2f5fe8] hover:bg-[#274fc4]">
            Browse New Courses
          </Button>
        </Card>
      )}

      {/* Pagination */}
      {filteredCourses.length > 0 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}
