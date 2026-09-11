"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import LiveClassCard from "./live-class-card";
import { Video, Radio, CalendarClock, CheckCircle2 } from "lucide-react";
import { LiveClassSession } from "@/types/live-class";

const TABS = [
  { value: "all", label: "All Sessions" },
  { value: "live", label: "Live Now" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
] as const;

export default function LiveClassesSection({
  initialLiveClasses,
}: {
  initialLiveClasses: LiveClassSession[];
}) {
  const [sessions, setSessions] =
    useState<LiveClassSession[]>(initialLiveClasses);
  const [activeTab, setActiveTab] = useState("all");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const stats = useMemo(() => {
    return {
      total: sessions.length,
      live: sessions.filter((s) => s.status === "live").length,
      upcoming: sessions.filter((s) => s.status === "upcoming").length,
      completed: sessions.filter((s) => s.status === "completed").length,
    };
  }, [sessions]);

  const filtered = useMemo(() => {
    if (activeTab === "all") return sessions;
    return sessions.filter((s) => s.status === activeTab);
  }, [sessions, activeTab]);

  async function handleToggleRegister(id: string, registered: boolean) {
    setPendingId(id);
    try {
      const res = await fetch(`/api/live-classes/${id}/register`, {
        method: registered ? "DELETE" : "POST",
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.liveClass) {
        setSessions((prev) =>
          prev.map((s) => (s.id === id ? data.liveClass : s)),
        );
        toast.success(
          registered ? "You've left this session" : "You're registered!",
        );
      }
    } catch {
      toast.error("Couldn't update your registration. Try again.");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <section className="flex-1">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Live Classes
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Join live sessions from your courses, or catch up on recordings you
          missed.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="flex-row items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2f5fe8]">
            <Video className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">{stats.total}</p>
            <p className="text-xs text-slate-500">Total Sessions</p>
          </div>
        </Card>
        <Card className="flex-row items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Radio className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">{stats.live}</p>
            <p className="text-xs text-slate-500">Live Now</p>
          </div>
        </Card>
        <Card className="flex-row items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
            <CalendarClock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">{stats.upcoming}</p>
            <p className="text-xs text-slate-500">Upcoming</p>
          </div>
        </Card>
        <Card className="flex-row items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">
              {stats.completed}
            </p>
            <p className="text-xs text-slate-500">Completed</p>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(String(v))}>
        <TabsList className="mb-5 flex h-auto flex-wrap gap-1 bg-slate-100 p-1">
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

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((session) => (
            <LiveClassCard
              key={session.id}
              session={session}
              isPending={pendingId === session.id}
              onToggleRegister={handleToggleRegister}
            />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center gap-3 rounded-2xl border-slate-100 p-12 text-center shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Video className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              No sessions here yet
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Live sessions for your enrolled courses will show up here as
              instructors schedule them.
            </p>
          </div>
        </Card>
      )}
    </section>
  );
}
