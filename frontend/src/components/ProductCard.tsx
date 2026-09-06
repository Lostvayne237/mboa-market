import { noHyphen } from "../lib/noHyphen";
import { Link } from "react-router-dom";
import { formatPrice } from "../lib/contact";
import type { Product } from "../lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="card-lift block bg-white rounded-2xl border border-ink/10 overflow-hidden"
    >
      <div className="img-zoom">
        <ProductImage product={product} className="aspect-[4/3] w-full" />
      </div>
      <div className="p-3">
        <p className="font-bold leading-snug line-clamp-2">{noHyphen(product.title)}</p>
        <p className="text-market font-extrabold mt-1">{formatPrice(product)}</p>
        <p className="text-xs text-ink/60 mt-1 truncate">
          {noHyphen(product.vendor.store_name)}
          {product.city ? ` · ${noHyphen(product.city)}` : ""}
        </p>
      </div>
    </Link>
  );
}

export function ProductImage({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  if (product.image_url) {
    return (
      <img
        src={product.image_url}
        alt={noHyphen(product.title)}
        loading="lazy"
        className={`object-cover bg-clay ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex items-center justify-center bg-sun-soft text-4xl ${className}`}
      aria-hidden
    >
      {categoryEmoji(product.category)}
    </div>
  );
}

export function categoryEmoji(category: string): string {
  const map: Record<string, string> = {
    provisions: "🧺",
    food: "🍲",
    fashion: "🧵",
    electronics: "🔌",
    hardware: "🔩",
    "spare-parts": "⚙️",
    beauty: "💇",
    home: "🏠",
  };
  return map[category] ?? "🛍️";
}
