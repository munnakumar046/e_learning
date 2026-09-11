"use client";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Award, Printer } from "lucide-react";
import { format } from "date-fns";
import type { MyCertificate } from "@/types/certificate";
import { useState } from "react";

export default function CertificateCard({
  certificate,
}: {
  certificate: MyCertificate;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="gap-3 overflow-hidden rounded-2xl border-slate-100 p-0 shadow-sm transition hover:shadow-md">
        <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-amber-50 py-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-amber-300 bg-amber-50 text-amber-500">
            <Award className="h-7 w-7" />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <p className="text-xs font-medium text-slate-400">
            {certificate.category}
          </p>
          <h3 className="line-clamp-2 min-h-10 font-semibold leading-snug text-slate-900">
            {certificate.courseTitle}
          </h3>
          <p className="text-xs text-slate-500">
            Issued {format(new Date(certificate.issuedAt), "MMM d, yyyy")}
          </p>
          <p className="font-mono text-xs text-slate-400">
            {certificate.certificateNumber}
          </p>
          <Button
            className="mt-2 w-full rounded-full bg-[#2f5fe8] hover:bg-[#274fc4]"
            onClick={() => setOpen(true)}
          >
            View Certificate
          </Button>
        </div>
      </Card>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl">
          <SheetHeader className="print:hidden">
            <SheetTitle>Certificate of Completion</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4">
            <div
              id="certificate-print-area"
              className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-xl border-8 border-double border-amber-300 bg-gradient-to-br from-white via-blue-50/40 to-amber-50/60 p-8 text-center"
            >
              <Award className="h-10 w-10 text-amber-500" />
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
                Certificate of Completion
              </p>
              <p className="text-sm text-slate-500">This certifies that</p>
              <p className="font-heading text-2xl font-bold text-slate-900">
                {certificate.studentName}
              </p>
              <p className="max-w-xs text-sm text-slate-500">
                has successfully completed the course
              </p>
              <p className="text-lg font-semibold text-[#2f5fe8]">
                {certificate.courseTitle}
              </p>
              <p className="text-sm text-slate-500">
                Instructed by {certificate.instructor}
              </p>
              <div className="mt-4 flex w-full items-center justify-between border-t border-slate-200 pt-3 text-xs text-slate-400">
                <span>
                  Issued{" "}
                  {format(new Date(certificate.issuedAt), "MMMM d, yyyy")}
                </span>
                <span className="font-mono">
                  {certificate.certificateNumber}
                </span>
              </div>
            </div>
          </div>

          <SheetFooter className="flex-row print:hidden">
            <SheetClose
              render={
                <Button variant="outline" className="flex-1 rounded-full" />
              }
            >
              Close
            </SheetClose>
            <Button
              className="flex-1 rounded-full bg-[#2f5fe8] hover:bg-[#274fc4]"
              onClick={() => window.print()}
            >
              <Printer className="h-4 w-4" />
              Print / Save as PDF
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
