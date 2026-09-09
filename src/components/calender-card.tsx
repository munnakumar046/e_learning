import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

export default function CalendarCard() {
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
