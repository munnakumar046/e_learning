import Image from "next/image";
import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
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

export default function ContinueLearning() {
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
