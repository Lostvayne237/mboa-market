import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GoalProgress } from "../components/GoalProgress";
import { RoleChoice } from "../components/RoleChoice";
import { StorefrontPreview } from "../components/StorefrontPreview";
import { ApiError, api } from "../lib/api";
import { useAuth } from "../lib/auth";
import {
  DEFAULT_CITY,
  NEIGHBORHOOD_BY_CITY,
  PRODUCT_TEMPLATES,
} from "../lib/formDefaults";
import { useI18n } from "../lib/i18n";
import {
  clearDraft,
  loadDraft,
  saveDraft,
  type StoreDraft,
} from "../lib/onboardingDraft";
import type { Role } from "../lib/types";
import type { StorePlanId } from "../lib/plans";
import { Field, inputCls } from "./Login";
import { PlanPicker } from "../components/PlanPicker";

type VendorStep = "design" | "preview" | "account";

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

function parsePlan(raw: string | null): StorePlanId {
  if (raw === "boost" || raw === "pro" || raw === "free") return raw;
  return "free";
}

export function Register() {
  const { register } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const intent = params.get("intent");
  const initialRole: Role | null =
    intent === "vendor" || intent === "seller"
      ? "vendor"
      : intent === "buyer" || intent === "client"
        ? "buyer"
        : null;

  const [role, setRole] = useState<Role | null>(initialRole);
  const [vendorStep, setVendorStep] = useState<VendorStep>("design");
  const [draft, setDraft] = useState<StoreDraft>(() => {
    const d = loadDraft();
    const fromUrl = parsePlan(params.get("plan"));
    if (params.get("plan")) return { ...d, plan: fromUrl };
    return d;
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    saveDraft(draft);
  }, [draft]);

  const vendorSteps = useMemo(
    () => [
      t("onboard.step.started"),
      t("onboard.step.design"),
      t("onboard.step.preview"),
      t("onboard.step.publish"),
    ],
    [t],
  );

  const vendorStepIndex =
    vendorStep === "design" ? 1 : vendorStep === "preview" ? 2 : 3;

  const setDraftField =
    (key: keyof StoreDraft) =>
    (e: { target: { value: string } }) => {
      setDraft((d) => ({ ...d, [key]: e.target.value }));
    };

  const applyTemplate = (idx: number) => {
    const tpl = PRODUCT_TEMPLATES[idx];
    if (!tpl) return;
    setDraft((d) => ({
      ...d,
      sample_product_title: tpl.title,
      sample_product_price: tpl.price,
    }));
  };

  const submitAccount = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const username =
      draft.store_name.trim().toLowerCase().replace(/\s+/g, "_").slice(0, 30) ||
      email.split("@")[0];
    try {
      await register({ email, username, password, role: "vendor" });
      await api("/api/vendors/me/store/", {
        method: "PATCH",
        auth: true,
        body: {
          store_name: draft.store_name,
          about: draft.about,
          city: draft.city,
          neighborhood: draft.neighborhood,
          brand_color: draft.brand_color,
          plan: draft.plan,
        },
      });
      if (draft.sample_product_title.trim()) {
        await api("/api/products/", {
          method: "POST",
          auth: true,
          body: {
            title: draft.sample_product_title,
            description: draft.about,
            price: draft.sample_product_price || "0",
            city: draft.city,
            category: "provisions",
            whatsapp_phone: draft.whatsapp_phone.trim() || "+237650000000",
          },
        });
      }
      clearDraft();
      navigate("/dashboard?welcome=1");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.firstMessage() : "Could not register.",
      );
    } finally {
      setBusy(false);
    }
  };

  const submitBuyer = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register({
        email,
        username: email.split("@")[0],
        password,
        role: "buyer",
      });
      navigate("/");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.firstMessage() : "Could not register.",
      );
    } finally {
      setBusy(false);
    }
  };

  if (role === null) {
    return <RoleChoice onSelect={setRole} />;
  }

  if (role === "vendor") {
    return (
      <div className="anim-fade-up max-w-lg mx-auto px-4 py-10">
        <h1 className="text-2xl font-extrabold">{t("onboard.vendor.title")}</h1>
        <p className="text-ink/60 mt-1">{t("onboard.vendor.subtitle")}</p>

        <GoalProgress
          steps={vendorSteps}
          currentIndex={vendorStepIndex}
          completedBeforeStart={1}
        />

        {vendorStep === "design" && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setVendorStep("preview");
            }}
          >
            <Field label={t("onboard.field.storeName")} hint={t("onboard.hint.adjust")}>
              <input
                required
                value={draft.store_name}
                onChange={setDraftField("store_name")}
                className={inputCls}
                placeholder="Chez Marie"
              />
            </Field>
            <Field label={t("onboard.field.about")} hint={t("onboard.hint.adjust")}>
              <textarea
                value={draft.about}
                onChange={setDraftField("about")}
                rows={3}
                className={inputCls}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t("onboard.field.city")}>
                <select
                  value={draft.city}
                  onChange={(e) => {
                    const city = e.target.value;
                    const hoods = NEIGHBORHOOD_BY_CITY[city] ?? [];
                    setDraft((d) => ({
                      ...d,
                      city,
                      neighborhood: hoods[0] ?? d.neighborhood,
                    }));
                  }}
                  className={inputCls}
                >
                  <option value="Douala">Douala</option>
                  <option value="Yaoundé">Yaoundé</option>
                </select>
              </Field>
              <Field label={t("onboard.field.neighborhood")}>
                <select
                  value={draft.neighborhood}
                  onChange={setDraftField("neighborhood")}
                  className={inputCls}
                >
                  {(NEIGHBORHOOD_BY_CITY[draft.city] ?? [DEFAULT_CITY]).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label={t("onboard.field.color")} hint={t("onboard.hint.endowment")}>
              <div className="flex flex-wrap gap-2">
                {SWATCHES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, brand_color: c }))}
                    className={`w-9 h-9 rounded-full border-2 ${
                      draft.brand_color === c ? "border-ink" : "border-transparent"
                    }`}
                    style={{ background: c }}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </Field>
            <Field label={t("onboard.field.sampleListing")} hint={t("onboard.hint.adjust")}>
              <div className="flex gap-2 mb-2 flex-wrap">
                {PRODUCT_TEMPLATES.map((tpl, i) => (
                  <button
                    key={tpl.title}
                    type="button"
                    onClick={() => applyTemplate(i)}
                    className="text-xs font-bold rounded-full bg-clay px-3 py-1 hover:bg-sun-soft"
                  >
                    {tpl.title}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={draft.sample_product_title}
                  onChange={setDraftField("sample_product_title")}
                  className={inputCls}
                />
                <input
                  value={draft.sample_product_price}
                  onChange={setDraftField("sample_product_price")}
                  className={inputCls}
                  placeholder="15000"
                />
              </div>
            </Field>
            <Field label="WhatsApp / phone" hint={t("onboard.hint.adjust")}>
              <input
                value={draft.whatsapp_phone}
                onChange={setDraftField("whatsapp_phone")}
                className={inputCls}
                placeholder="+2376XXXXXXXX"
              />
            </Field>
            <Field label={t("onboard.field.plan")}>
              <PlanPicker
                value={draft.plan}
                onChange={(plan) => setDraft((d) => ({ ...d, plan }))}
                compact
              />
            </Field>
            <button className="w-full rounded-2xl bg-market text-white font-bold py-3.5">
              {t("onboard.cta.preview")}
            </button>
            <Link
              to="/"
              className="block text-center text-sm font-bold text-red-700/80 hover:underline"
            >
              {t("onboard.loss.leaveDraft")}
            </Link>
          </form>
        )}

        {vendorStep === "preview" && (
          <div className="space-y-4">
            <StorefrontPreview draft={draft} />
            <p className="text-sm text-ink/65">{t("onboard.preview.reciprocity")}</p>
            <button
              onClick={() => setVendorStep("account")}
              className="btn-sheen w-full rounded-2xl bg-market text-white font-bold py-3.5"
            >
              {t("onboard.cta.publish")}
            </button>
            <button
              type="button"
              onClick={() => setVendorStep("design")}
              className="w-full text-sm font-semibold text-market hover:underline"
            >
              {t("onboard.cta.backDesign")}
            </button>
            <Link
              to="/"
              className="block text-center text-sm font-bold text-red-700/80 hover:underline"
            >
              {t("onboard.loss.abandonStore")}
            </Link>
          </div>
        )}

        {vendorStep === "account" && (
          <form onSubmit={submitAccount} className="space-y-4">
            <StorefrontPreview draft={draft} />
            <Field label="Email">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                placeholder="you@example.com"
              />
            </Field>
            <Field label={t("onboard.field.password")} hint={t("onboard.hint.password")}>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputCls}
              />
            </Field>
            {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
            <button
              disabled={busy}
              className="w-full rounded-2xl bg-market text-white font-bold py-3.5 disabled:opacity-60"
            >
              {busy ? t("onboard.cta.publishing") : t("onboard.cta.saveStore")}
            </button>
            <button
              type="button"
              onClick={() => setVendorStep("preview")}
              className="w-full text-sm font-bold text-red-700/80 hover:underline"
            >
              {t("onboard.loss.skipPublish")}
            </button>
          </form>
        )}

        <p className="text-sm text-ink/60 mt-6 text-center">
          <button
            type="button"
            onClick={() => setRole(null)}
            className="font-semibold text-ink/50 hover:text-market"
          >
            ← {t("role.choose.change")}
          </button>
          {" · "}
          {t("onboard.switchBuyer")}{" "}
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className="font-bold text-market"
          >
            {t("onboard.switchBuyerLink")}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="anim-fade-up max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-extrabold">{t("onboard.buyer.title")}</h1>
      <p className="text-ink/60 mt-1">{t("onboard.buyer.subtitle")}</p>

      <GoalProgress
        steps={[t("onboard.step.started"), t("onboard.step.publish")]}
        currentIndex={1}
        completedBeforeStart={1}
      />

      <form onSubmit={submitBuyer} className="mt-4 space-y-4">
        <Field label="Email">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            placeholder="you@example.com"
          />
        </Field>
        <Field label={t("onboard.field.password")} hint={t("onboard.hint.password")}>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
          />
        </Field>
        {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
        <button
          disabled={busy}
          className="w-full rounded-2xl bg-market text-white font-bold py-3.5 disabled:opacity-60"
        >
          {busy ? "…" : t("onboard.buyer.cta")}
        </button>
      </form>

      <p className="text-sm text-ink/60 mt-5 text-center">
        <button
          type="button"
          onClick={() => setRole(null)}
          className="font-semibold text-ink/50 hover:text-market"
        >
          ← {t("role.choose.change")}
        </button>
        {" · "}
        {t("onboard.switchVendor")}{" "}
        <button
          type="button"
          onClick={() => setRole("vendor")}
          className="font-bold text-market"
        >
          {t("onboard.switchVendorLink")}
        </button>
      </p>
    </div>
  );
}
