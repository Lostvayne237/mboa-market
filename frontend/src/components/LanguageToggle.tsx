import {
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { GlobeAltIcon as GlobeAltSolid } from "@heroicons/react/24/solid";
import { useI18n } from "../lib/i18n";
import type { Locale } from "../lib/translations";
import { haptic } from "../lib/haptics";

/** EN / FR switch. Filled icon when active. */
export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className="flex rounded-full border border-neutral/12 surface-primary-soft p-0.5 text-xs font-extrabold"
      role="group"
      aria-label="Language"
    >
      {(["en", "fr"] as Locale[]).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => {
              haptic("heavy");
              setLocale(code);
            }}
            aria-pressed={active}
            className={`inline-flex items-center gap-1 min-w-[2.5rem] rounded-full px-2.5 py-1.5 uppercase tracking-wide transition ${
              active
                ? "bg-primary text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                : "text-muted hover:text-heading"
            }`}
          >
            {active ? (
              <GlobeAltSolid className="w-3.5 h-3.5" aria-hidden />
            ) : (
              <GlobeAltIcon className="w-3.5 h-3.5 opacity-60" aria-hidden />
            )}
            {code}
          </button>
        );
      })}
    </div>
  );
}
