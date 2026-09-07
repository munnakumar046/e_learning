import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export type Product = {
  id: string;
  title: string;
  seller: string;
  sellerAvatar: string;
  image: string;
  price: number;
  originalPrice: number;
  badge?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md w-full">
      <div className="relative h-36 w-full bg-slate-900 sm:h-40 md:h-44">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <img
            src={product.sellerAvatar}
            alt={product.seller}
            className="h-5 w-5 shrink-0 rounded-full object-cover"
          />
          <span className="truncate text-xs text-slate-500">
            {product.seller}
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
          {product.title}
        </h3>

        <div className="mt-auto flex flex-col gap-2 pt-4 xs:flex-row xs:items-center xs:justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          </div>
          <Link
            href="/courses"
            className="w-full rounded-md px-3 py-1.5 text-xs font-semibold text-white text-center bg-blue-500"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}
