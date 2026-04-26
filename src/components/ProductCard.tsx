import { Link } from "react-router-dom";
import { GradeBadge } from "./GradeBadge";
import { formatRupiah } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-sm border border-border bg-card transition-shadow hover:shadow-elegant"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3">
          <GradeBadge grade={product.grade} />
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.storeName}</p>
        <h3 className="mt-1 line-clamp-2 font-display text-lg leading-snug text-foreground">
          {product.name}
        </h3>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="font-display text-base font-semibold text-oxblood">
            {formatRupiah(product.price)}
          </span>
          <span className="text-xs text-muted-foreground">
            {product.stock > 0 ? `${product.stock} left` : "Sold"}
          </span>
        </div>
      </div>
    </Link>
  );
}