import { Button } from "./ui/button";
import { Card } from "./ui/card";

const PROGRESS_SEGMENTS = [
  { label: "Communication", percent: 60, color: "#3b82f6" },
  { label: "UI Design", percent: 24, color: "#a855f7" },
  { label: "Coding", percent: 16, color: "#2dd4bf" },
];

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

export default function LearningProgressCard() {
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
