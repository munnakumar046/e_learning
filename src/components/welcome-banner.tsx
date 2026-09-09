import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

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

export default function WelcomeBanner() {
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
