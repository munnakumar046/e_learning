"use client";

import {
  Boxes,
  Calendar,
  ChevronDown,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard, { Product } from "./ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const tabs = [
  { label: "Course", icon: Users },
  { label: "Community", icon: Sparkles },
  { label: "Events", icon: Calendar },
  { label: "Digital Product", icon: Boxes },
];
const products: Product[] = [
  {
    id: "1",
    title: "100 days of code: The complete front-end...",
    seller: "Stacey Burke",
    sellerAvatar: "https://i.pravatar.cc/40?img=47",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=600&auto=format&fit=crop",
    price: 191,
    originalPrice: 399,
  },
  {
    id: "2",
    title: "Introduction to AI: learn machine learning in 30....",
    seller: "Stacey Burke",
    sellerAvatar: "https://i.pravatar.cc/40?img=47",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop",
    price: 191,
    originalPrice: 399,
  },
  {
    id: "3",
    title: "Art of pottery: learn like a professional",
    seller: "Stacey Burke",
    sellerAvatar: "https://i.pravatar.cc/40?img=47",
    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=600&auto=format&fit=crop",
    price: 191,
    originalPrice: 399,
  },
  {
    id: "4",
    title: "Art of pottery: learn like a professional",
    seller: "Stacey Burke",
    sellerAvatar: "https://i.pravatar.cc/40?img=47",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop",
    price: 191,
    originalPrice: 399,
    badge: "Best Seller",
  },
  {
    id: "5",
    title: "Trading price action: Quit job in 30 days",
    seller: "Stacey Burke",
    sellerAvatar: "https://i.pravatar.cc/40?img=47",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop",
    price: 191,
    originalPrice: 399,
  },
  {
    id: "6",
    title: "Designing & tailoring clothing: Basic to intermediate...",
    seller: "Stacey Burke",
    sellerAvatar: "https://i.pravatar.cc/40?img=47",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop",
    price: 191,
    originalPrice: 399,
  },
];

export default function ProductsSection() {
  return (
    <section className="flex-1">
      <div className="mb-5 flex items-center">
        <h2 className="text-xl font-bold text-slate-900">Discover products</h2>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="Course" className="w-full">
        <TabsList className="flex gap-4">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.label}
              value={tab.label}
              className="flex items-center gap-2 bg-white h-10  "
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {/* searchbar + shortby */}
      <div className="mb-5 pt-5 flex flex-row items-center justify-between gap-3">
        <div className="relative w-full max-width: 160px sm:max-w-xs">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-md border border-slate-200 bg-white py-2 pl-3 text-sm placeholder:text-slate-400"
          />
          <Search
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="hidden sm:inline">Sort by</span>
          <button className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-700 whitespace-nowrap">
            All Courses
            <ChevronDown size={14} className="text-slate-400" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
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
    </section>
  );
}
