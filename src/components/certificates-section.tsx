"use client";

import { useMemo, useState } from "react";
import { Card } from "./ui/card";
import CertificateCard from "./certificate-card";
import type { MyCertificate } from "@/types/certificate";
import { Award, Search } from "lucide-react";

export default function CertificatesSection({
  initialCertificates,
}: {
  initialCertificates: MyCertificate[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return initialCertificates;
    return initialCertificates.filter(
      (c) =>
        c.courseTitle.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase()),
    );
  }, [initialCertificates, query]);

  return (
    <section className="flex-1">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Certificates
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Every certificate you&apos;ve earned by completing a course, ready
            to print or share.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search certificates"
            className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-[#2f5fe8] focus:outline-none"
          />
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>

      <div className="mb-6">
        <Card className="flex-row items-center gap-3 rounded-2xl border-slate-100 p-4 shadow-sm sm:w-fit">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">
              {initialCertificates.length}
            </p>
            <p className="text-xs text-slate-500">Certificates Earned</p>
          </div>
        </Card>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      ) : initialCertificates.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-3 rounded-2xl border-slate-100 p-12 text-center shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              No certificates yet
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Finish a course from My Courses and your certificate will show up
              here automatically.
            </p>
          </div>
        </Card>
      ) : (
        <Card className="flex flex-col items-center justify-center gap-3 rounded-2xl border-slate-100 p-12 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            No certificates match your search.
          </p>
        </Card>
      )}
    </section>
  );
}
