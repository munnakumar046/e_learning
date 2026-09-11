"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import AssignmentCard from "./assignment-card";
import type { MyAssignment } from "@/types/assignment";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const TABS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "submitted", label: "Submitted" },
  { value: "graded", label: "Graded" },
  { value: "late", label: "Late" },
] as const;

export default function AssignmentsSection({
  initialAssignments,
}: {
  initialAssignments: MyAssignment[];
}) {
  const [assignments, setAssignments] =
    useState<MyAssignment[]>(initialAssignments);
  const [activeTab, setActiveTab] = useState("all");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const stats = useMemo(() => {
    return {
      total: assignments.length,
      pending: assignments.filter((a) => a.status === "pending").length,
      graded: assignments.filter((a) => a.status === "graded").length,
      late: assignments.filter((a) => a.status === "late").length,
    };
  }, [assignments]);

  const filtered = useMemo(() => {
    if (activeTab === "all") return assignments;
    return assignments.filter((a) => a.status === activeTab);
  }, [assignments, activeTab]);

  async function handleSubmit(
    id: string,
    data: { submissionUrl: string; submissionNote: string },
  ) {
    setPendingId(id);
    try {
      const res = await fetch(`/api/assignments/${id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setAssignments((prev) =>
        prev.map((a) => (a.id === id ? json.assignment : a)),
      );
      toast.success("Assignment submitted!");
      return true;
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Couldn't submit. Try again.",
      );
      return false;
    } finally {
      setPendingId(null);
    }
  }

  return (
    <section className="flex-1">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Assignments
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Keep track of what&apos;s due, submit your work, and review feedback
          from your instructors.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="flex-row items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2f5fe8]">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">{stats.total}</p>
            <p className="text-xs text-slate-500">Total Assignments</p>
          </div>
        </Card>
        <Card className="flex-row items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">{stats.pending}</p>
            <p className="text-xs text-slate-500">Pending</p>
          </div>
        </Card>
        <Card className="flex-row items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">{stats.graded}</p>
            <p className="text-xs text-slate-500">Graded</p>
          </div>
        </Card>
        <Card className="flex-row items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">{stats.late}</p>
            <p className="text-xs text-slate-500">Late</p>
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
          {filtered.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              isPending={pendingId === assignment.id}
              onSubmit={handleSubmit}
            />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center gap-3 rounded-2xl border-slate-100 p-12 text-center shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Nothing here yet</h3>
            <p className="mt-1 text-sm text-slate-500">
              Assignments from your enrolled courses will appear here as
              instructors post them.
            </p>
          </div>
        </Card>
      )}
    </section>
  );
}
