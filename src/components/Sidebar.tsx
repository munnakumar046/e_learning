"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronRight, Search } from "lucide-react";

type CheckOption = {
  label: string;
  count?: number | null;
  checked?: boolean;
};

const sellers: (CheckOption & { avatar: string })[] = [
  { label: "Killan james", avatar: "https://i.pravatar.cc/40?img=12" },
  {
    label: "Nagia Williams",
    avatar: "https://i.pravatar.cc/40?img=32",
    checked: true,
  },
  { label: "Pre sell course", avatar: "https://i.pravatar.cc/40?img=5" },
];

const categories: CheckOption[] = [
  { label: "Temp Category", count: 1 },
  { label: "Rahib Three Single", count: null, checked: true },
  { label: "Bundle Course", count: 2 },
  { label: "Video Editing", count: 20 },
];

const levels: CheckOption[] = [
  { label: "All Levels", count: 1 },
  { label: "Beginner", count: 0, checked: true },
  { label: "Intermediate", count: 1 },
  { label: "Advance", count: 0 },
];

function SectionHeading({
  title,
  open,
  onToggle,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between py-3 text-sm font-semibold text-slate-900"
    >
      {title}
      {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
  );
}

function Checkbox({ item }: { item: CheckOption }) {
  const [checked, setChecked] = useState(!!item.checked);
  return (
    <label className="flex cursor-pointer items-center justify-between py-1.5 text-sm text-slate-600">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked((c) => !c)}
          className="h-4 w-4 rounded border-slate-300 text-brand-purple focus:ring-brand-purple"
        />
        {item.label}
      </span>
      {item.count !== null && item.count !== undefined && (
        <span className="text-slate-400">({item.count})</span>
      )}
    </label>
  );
}

function CollapsedRow({ title }: { title: string }) {
  return (
    <button className="flex w-full items-center justify-between border-t border-slate-100 py-3 text-sm font-semibold text-slate-900">
      {title}
      <ChevronRight size={16} className="text-slate-400" />
    </button>
  );
}

export default function Sidebar() {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [levelOpen, setLevelOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <aside className="w-full flex-shrink-0 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-100 lg:w-[280px]">
      {/* Mobile-only toggle header */}
      <button
        onClick={() => setMobileOpen((o) => !o)}
        className="flex w-full items-center justify-between text-base font-bold text-slate-900 lg:hidden"
      >
        Filters
        <ChevronDown
          size={18}
          className={`text-slate-500 transition-transform duration-200 ${
            mobileOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content: always visible on desktop, toggled on mobile */}
      <div className={`${mobileOpen ? "block" : "hidden"} lg:block`}>
        {/* Seller */}
        <div className="border-b border-slate-100 pb-4 pt-4 lg:pt-0">
          <SectionHeading title="Seller" open={true} onToggle={() => {}} />
          <div className="relative mt-1">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md border border-slate-200 py-2 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-brand-purple focus:outline-none"
            />
          </div>
          <div className="mt-3 space-y-1">
            {sellers.map((seller) => (
              <label
                key={seller.label}
                className="flex cursor-pointer items-center gap-2 py-1.5 text-sm text-slate-600"
              >
                <input
                  type="checkbox"
                  defaultChecked={seller.checked}
                  className="h-4 w-4 rounded border-slate-300 text-brand-purple focus:ring-brand-purple"
                />
                <img
                  src={seller.avatar}
                  alt={seller.label}
                  className="h-6 w-6 rounded-full object-cover"
                />
                {seller.label}
              </label>
            ))}
          </div>
        </div>

        {/* Filters heading (desktop only, since mobile has its own toggle header above) */}
        <h3 className="hidden pb-1 pt-4 text-base font-bold text-slate-900 lg:block">
          Filters
        </h3>

        {/* Category */}
        <div className="border-b border-slate-100 pb-2">
          <SectionHeading
            title="Category"
            open={categoryOpen}
            onToggle={() => setCategoryOpen((o) => !o)}
          />
          {categoryOpen && (
            <div className="space-y-0.5 pb-2">
              {categories.map((c) => (
                <Checkbox key={c.label} item={c} />
              ))}
            </div>
          )}
        </div>

        {/* Level */}
        <div className="border-b border-slate-100 pb-2">
          <SectionHeading
            title="Level"
            open={levelOpen}
            onToggle={() => setLevelOpen((o) => !o)}
          />
          {levelOpen && (
            <div className="space-y-0.5 pb-2">
              {levels.map((l) => (
                <Checkbox key={l.label} item={l} />
              ))}
            </div>
          )}
        </div>

        {/* Collapsed rows */}
        <CollapsedRow title="Video Duration" />
        <CollapsedRow title="Price" />
        <CollapsedRow title="Language" />
      </div>
    </aside>
  );
}
