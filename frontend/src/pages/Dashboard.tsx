import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { BlockSkeleton } from "../components/Skeletons";
import { api, ApiError } from "../lib/api";
import { useAuth } from "../lib/auth";
import { formatPrice } from "../lib/contact";
import { noHyphen } from "../lib/noHyphen";
import {
  DEFAULT_CATEGORY,
  DEFAULT_CITY,
  PRODUCT_TEMPLATES,
  STORE_ABOUT_TEMPLATE,
} from "../lib/formDefaults";
import type { StorePlanId } from "../lib/plans";
import {
  CATEGORIES,
  type Paginated,
  type Product,
  type StoreProfile,
} from "../lib/types";
import { PlanPicker } from "../components/PlanPicker";
import { Field, inputCls } from "./Login";

/** Vendor dashboard: storefront profile, listings, honest activity signals.
 *  Nothing related to orders or payments — those don't exist on Mboa. */
export function Dashboard() {
  const { user, loading } = useAuth();
  const [params] = useSearchParams();
  const welcome = params.get("welcome") === "1";

  const [store, setStore] = useState<StoreProfile | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [editing, setEditing] = useState<Product | "new" | null>(
    welcome ? "new" : null,
  );

  const isVendor = user?.role === "vendor";

  useEffect(() => {
    if (!isVendor) return;
    api<StoreProfile>("/api/vendors/me/store/", { auth: true }).then(setStore);
    reloadProducts();
  }, [isVendor]);

  const reloadProducts = () => {
    api<Paginated<Product>>("/api/products/mine/", { auth: true }).then((page) =>
      setProducts(page.results),
    );
  };

  if (loading) return <BlockSkeleton className="h-40 max-w-3xl mx-auto mt-6" />;
  if (!user) return <Navigate to="/login" replace />;
  if (!isVendor) return <Navigate to="/" replace />;

  const totalViews = products?.reduce((s, p) => s + p.view_count, 0) ?? 0;
  const totalContacts = products?.reduce((s, p) => s + p.contact_count, 0) ?? 0;

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      {welcome && (
        <div className="anim-pop mt-4 rounded-2xl bg-sun-soft border border-sun p-4">
          <p className="font-bold">Welcome to Mboa Market! 🎉</p>
          <p className="text-sm text-ink/70 mt-0.5">
            Add your first product below. Buyers will contact you directly on
            WhatsApp or by phone. Then fill in your store profile so your
            storefront feels like yours.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mt-6 mb-4">
        <h1 className="text-2xl font-extrabold">My store</h1>
        <Link
          to={`/stores/${user.id}`}
          className="text-sm font-bold text-market hover:underline"
        >
          View my public store →
        </Link>
      </div>

      {/* Honest activity signals */}
      <div className="stagger grid grid-cols-3 gap-3 mb-6">
        <Stat label="Listings" value={products?.length ?? null} />
        <Stat label="Views" value={products ? totalViews : null} />
        <Stat label="Contact taps" value={products ? totalContacts : null} />
      </div>

      <section className="mb-8">
        <h2 className="font-extrabold text-lg mb-3">Store profile</h2>
        {store ? (
          <StoreForm store={store} onSaved={setStore} />
        ) : (
          <BlockSkeleton className="h-48" />
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-extrabold text-lg">Listings</h2>
          <button
            onClick={() => setEditing("new")}
            className="rounded-xl bg-market text-white font-bold px-4 py-2 text-sm hover:bg-market-dark transition"
          >
            + Add product
          </button>
        </div>

        {editing && (
          <ProductForm
            product={editing === "new" ? null : editing}
            defaultPhone={store?.whatsapp_phone ?? ""}
            defaultCity={store?.city ?? ""}
            onDone={() => {
              setEditing(null);
              reloadProducts();
            }}
            onCancel={() => setEditing(null)}
          />
        )}

        {products === null ? (
          <BlockSkeleton className="h-32" />
        ) : products.length === 0 && !editing ? (
          <div className="bg-clay rounded-2xl p-6 text-center text-sm text-ink/60">
            No listings yet. Add your first product. It takes a minute.
          </div>
        ) : (
          <ul className="stagger space-y-2">
            {products.map((p) => (
              <ListingRow
                key={p.id}
                product={p}
                onEdit={() => setEditing(p)}
                onToggled={reloadProducts}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="card-lift bg-white border border-ink/10 rounded-2xl p-4 text-center">
      <p className="text-2xl font-extrabold text-market">
        {value === null ? "…" : <CountUp target={value} />}
      </p>
      <p className="text-xs font-semibold text-ink/60 mt-0.5">{label}</p>
    </div>
  );
}

/** Counts up from 0 when the value first arrives. */
function CountUp({ target, duration = 800 }: { target: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * target));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return <>{display}</>;
}

const SWATCHES = [
  "#12355b",
  "#b45309",
  "#166534",
  "#be185d",
  "#1d4ed8",
  "#7c2d12",
  "#6d28d9",
  "#0f766e",
];

function StoreForm({
  store,
  onSaved,
}: {
  store: StoreProfile;
  onSaved: (s: StoreProfile) => void;
}) {
  const [form, setForm] = useState({
    ...store,
    about: store.about || STORE_ABOUT_TEMPLATE,
    city: store.city || DEFAULT_CITY,
    brand_color: store.brand_color || "#12355b",
    plan: (store.plan as StorePlanId) || "free",
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof StoreProfile) => (e: { target: { value: string } }) =>
    setForm({ ...form, [key]: e.target.value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const updated = await api<StoreProfile>("/api/vendors/me/store/", {
        method: "PATCH",
        auth: true,
        body: form,
      });
      onSaved(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof ApiError ? err.firstMessage() : "Could not save.");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white border border-ink/10 rounded-2xl p-4 space-y-3"
    >
      <Field label="Store name">
        <input required value={form.store_name} onChange={set("store_name")} className={inputCls} />
      </Field>
      <Field
        label="About your store"
        hint="Write like you'd talk to a customer at your store."
      >
        <textarea
          value={form.about}
          onChange={set("about")}
          rows={3}
          className={inputCls}
          placeholder="What do you sell? Since when? Do you deliver?"
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="City">
          <input value={form.city} onChange={set("city")} className={inputCls} placeholder="Douala" />
        </Field>
        <Field label="Neighborhood" hint="If you have a physical store (e.g. Akwa, Bastos).">
          <input
            value={form.neighborhood}
            onChange={set("neighborhood")}
            className={inputCls}
            placeholder="Akwa"
          />
        </Field>
      </div>
      <Field label="WhatsApp / phone">
        <input
          value={form.whatsapp_phone}
          onChange={set("whatsapp_phone")}
          className={inputCls}
          placeholder="+2376XXXXXXXX"
        />
      </Field>
      <Field
        label="Store plan"
        hint="Free works today. Boost and Pro raise your place in search. Mobile Money billing comes later."
      >
        <PlanPicker
          value={(form.plan as StorePlanId) || "free"}
          onChange={(plan) => setForm({ ...form, plan })}
          compact
        />
      </Field>
      <Field
        label="Your store color"
        hint="Your storefront is painted in this color. Make it yours."
      >
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="color"
            value={form.brand_color || "#12355b"}
            onChange={set("brand_color")}
            className="w-12 h-11 rounded-xl border border-ink/15 bg-white cursor-pointer p-1"
            aria-label="Pick your store color"
          />
          {SWATCHES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setForm({ ...form, brand_color: c })}
              aria-label={`Use color ${c}`}
              className={`w-8 h-8 rounded-full border-2 transition hover:scale-110 ${
                form.brand_color === c ? "border-ink" : "border-transparent"
              }`}
              style={{ background: c }}
            />
          ))}
        </div>
      </Field>
      <Field label="Banner photo URL" hint="Optional. Shown as your store banner.">
        <input value={form.cover_image_url} onChange={set("cover_image_url")} className={inputCls} placeholder="https://…" />
      </Field>
      <Field label="Voice intro URL" hint="Optional. A short audio hello, like a WhatsApp voice note.">
        <input value={form.voice_intro_url} onChange={set("voice_intro_url")} className={inputCls} placeholder="https://…" />
      </Field>

      {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
      <button className="rounded-xl bg-market text-white font-bold px-5 py-2.5 hover:bg-market-dark transition">
        {saved ? "Saved ✓" : "Save profile"}
      </button>
    </form>
  );
}

function ProductForm({
  product,
  defaultPhone,
  defaultCity,
  onDone,
  onCancel,
}: {
  product: Product | null;
  defaultPhone: string;
  defaultCity: string;
  onDone: () => void;
  onCancel: () => void;
}) {
  const tpl = PRODUCT_TEMPLATES[0];
  const [form, setForm] = useState({
    title: product?.title ?? tpl.title,
    description: product?.description ?? tpl.description,
    price: product?.price ?? tpl.price,
    whatsapp_phone: product?.whatsapp_phone ?? (defaultPhone || "+2376"),
    city: product?.city ?? (defaultCity || DEFAULT_CITY),
    category: product?.category ?? DEFAULT_CATEGORY,
    image_url: product?.image_url ?? "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set =
    (key: keyof typeof form) => (e: { target: { value: string } }) =>
      setForm({ ...form, [key]: e.target.value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (product) {
        await api(`/api/products/${product.id}/edit/`, {
          method: "PATCH",
          auth: true,
          body: form,
        });
      } else {
        await api("/api/products/", { method: "POST", auth: true, body: form });
      }
      onDone();
    } catch (err) {
      setError(err instanceof ApiError ? err.firstMessage() : "Could not save.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="anim-pop bg-sun-soft border border-sun rounded-2xl p-4 space-y-3 mb-4"
    >
      <p className="font-bold">{product ? "Edit listing" : "New listing"}</p>
      {!product && (
        <p className="text-xs text-ink/55">
          Prefilled with a common listing. Adjust title, price, or pick another template.
        </p>
      )}
      {!product && (
        <div className="flex gap-2 flex-wrap">
          {PRODUCT_TEMPLATES.map((t) => (
            <button
              key={t.title}
              type="button"
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  title: t.title,
                  description: t.description,
                  price: t.price,
                  category: t.category,
                }))
              }
              className="text-xs font-bold rounded-full bg-white px-3 py-1 border border-ink/10"
            >
              {t.title}
            </button>
          ))}
        </div>
      )}
      <Field label="What are you selling?">
        <input required value={form.title} onChange={set("title")} className={inputCls} placeholder="e.g. Palm oil 5L" />
      </Field>
      <Field label="Tell buyers about it" hint="Condition, quantity, delivery: anything they'd ask on the phone.">
        <textarea value={form.description} onChange={set("description")} rows={3} className={inputCls} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Price (FCFA)">
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={set("price")}
            className={inputCls}
            placeholder="15000"
          />
        </Field>
        <Field label="Category">
          <select value={form.category} onChange={set("category")} className={inputCls}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Contact number" hint="Buyers will call / WhatsApp this number.">
          <input
            required
            value={form.whatsapp_phone}
            onChange={set("whatsapp_phone")}
            className={inputCls}
            placeholder="+2376XXXXXXXX"
          />
        </Field>
        <Field label="City">
          <select value={form.city} onChange={set("city")} className={inputCls}>
            <option value="Douala">Douala</option>
            <option value="Yaoundé">Yaoundé</option>
          </select>
        </Field>
      </div>
      <Field label="Photo URL" hint="Optional. Real photos earn more contacts.">
        <input value={form.image_url} onChange={set("image_url")} className={inputCls} placeholder="https://…" />
      </Field>

      {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
      <div className="flex gap-2">
        <button
          disabled={busy}
          className="rounded-xl bg-market text-white font-bold px-5 py-2.5 hover:bg-market-dark transition disabled:opacity-60"
        >
          {busy ? "Saving…" : product ? "Save changes" : "Publish listing"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-ink/15 bg-white font-bold px-5 py-2.5 hover:border-ink/30 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ListingRow({
  product,
  onEdit,
  onToggled,
}: {
  product: Product;
  onEdit: () => void;
  onToggled: () => void;
}) {
  const toggle = async () => {
    await api(`/api/products/${product.id}/edit/`, {
      method: "PATCH",
      auth: true,
      body: { is_active: !product.is_active },
    });
    onToggled();
  };

  return (
    <li
      className={`flex items-center gap-3 bg-white border border-ink/10 rounded-2xl p-3 ${
        product.is_active ? "" : "opacity-60"
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="font-bold truncate">{noHyphen(product.title)}</p>
        <p className="text-sm text-ink/60">
          {formatPrice(product)} · {product.view_count} views ·{" "}
          {product.contact_count} contact taps
          {!product.is_active && " · hidden"}
        </p>
      </div>
      <button
        onClick={onEdit}
        className="text-sm font-bold text-market hover:underline shrink-0"
      >
        Edit
      </button>
      <button
        onClick={toggle}
        className="text-sm font-bold text-ink/50 hover:underline shrink-0"
      >
        {product.is_active ? "Hide" : "Show"}
      </button>
    </li>
  );
}
