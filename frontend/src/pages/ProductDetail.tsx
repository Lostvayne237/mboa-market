import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactButtons } from "../components/ContactButtons";
import { ProductImage } from "../components/ProductCard";
import { BlockSkeleton } from "../components/Skeletons";
import { TrustChips } from "../components/TrustChips";
import { api } from "../lib/api";
import { formatPrice } from "../lib/contact";
import { noHyphen } from "../lib/noHyphen";
import type { Product } from "../lib/types";

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    setProduct(null);
    setNotFound(false);
    api<Product>(`/api/products/${id}/`)
      .then(setProduct)
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <div className="anim-pop max-w-lg mx-auto px-4 py-20 text-center">
        <p className="float-soft text-5xl mb-4">🕳️</p>
        <h1 className="font-extrabold text-xl">This listing is gone</h1>
        <p className="text-ink/60 mt-1">
          It may have been removed by the vendor.
        </p>
        <Link
          to="/search"
          className="inline-block mt-5 rounded-xl bg-market text-white font-bold px-5 py-2.5"
        >
          Browse other listings
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <BlockSkeleton className="aspect-[4/3]" />
        <BlockSkeleton className="h-24" />
      </div>
    );
  }

  const share = async () => {
    const url = window.location.href;
    const data = {
      title: noHyphen(product.title),
      text: `${noHyphen(product.title)} · ${formatPrice(product)} on Mboa Market`,
      url,
    };
    if (navigator.share) {
      navigator.share(data).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-32">
      <div className="anim-pop">
        <ProductImage
          product={product}
          className="aspect-[4/3] w-full rounded-2xl mt-4"
        />
      </div>

      <div className="anim-fade-up anim-delay-1 mt-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold leading-tight">{noHyphen(product.title)}</h1>
          <p className="text-market text-2xl font-extrabold mt-1">
            {formatPrice(product)}
          </p>
          <p className="text-xs text-ink/50 mt-0.5">
            Price shown by the vendor. Confirm when you contact them.
          </p>
        </div>
        <button
          onClick={share}
          className="shrink-0 rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm font-semibold hover:border-market transition"
        >
          {shared ? "Link copied!" : "Share ↗"}
        </button>
      </div>

      {product.description && (
        <p className="anim-fade-up anim-delay-2 mt-4 text-ink/80 whitespace-pre-line">
          {noHyphen(product.description)}
        </p>
      )}

      {/* Vendor identity carries as much weight as the product itself. */}
      <Link
        to={`/shops/${product.vendor.id}`}
        className="card-lift anim-fade-up anim-delay-3 mt-6 flex items-center gap-3 bg-white border border-ink/10 rounded-2xl p-4"
      >
        <div className="w-12 h-12 rounded-full bg-market text-white flex items-center justify-center font-extrabold text-lg shrink-0">
          {product.vendor.store_name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold">{product.vendor.store_name}</p>
          <TrustChips
            productCount={product.vendor.product_count}
            lastActive={product.vendor.last_active}
            since={product.vendor.member_since}
            city={product.vendor.city || product.city}
          />
        </div>
        <span className="text-ink/40 font-bold">›</span>
      </Link>

      {/* The one action that matters — sticky, like a checkout button elsewhere. */}
      <div className="bar-enter fixed bottom-0 inset-x-0 bg-paper/95 backdrop-blur border-t border-ink/10 p-3 shadow-[0_-8px_24px_-16px_rgba(7,26,56,0.4)]">
        <div className="max-w-2xl mx-auto">
          <ContactButtons phone={product.whatsapp_phone} product={product} pulse />
        </div>
      </div>
    </div>
  );
}
