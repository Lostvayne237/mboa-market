import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRightOnRectangleIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../lib/auth";
import { useI18n } from "../lib/i18n";
import { haptic } from "../lib/haptics";
import { Container } from "./ui/Container";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 bg-base/90 backdrop-blur border-b transition-all duration-300 ${
        scrolled
          ? "border-neutral/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_-14px_rgba(7,26,56,0.2)]"
          : "border-transparent"
      }`}
    >
      <Container as="div" className="flex items-center justify-between gap-3 py-3">
        <Link
          to="/"
          className="group flex items-center gap-2 shrink-0"
          onClick={() => haptic("light")}
        >
          <span className="w-9 h-9 rounded-xl bg-primary text-sun flex items-center justify-center font-extrabold surface-polish !shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
            M
          </span>
          <span className="font-extrabold text-lg tracking-tight text-heading">
            Mboa Market
          </span>
        </Link>

        <nav className="flex items-center gap-2 text-body-sm font-semibold">
          <LanguageToggle />
          {user?.role === "vendor" && (
            <Link
              to="/dashboard"
              className="link-underline inline-flex items-center gap-1.5 px-3 py-2 rounded-xl surface-primary-soft hover:bg-primary/10 transition"
              onClick={() => haptic("light")}
            >
              <BuildingStorefrontIcon className="w-4 h-4" aria-hidden />
              {t("nav.myStore")}
            </Link>
          )}
          {user ? (
            <button
              onClick={() => {
                haptic("heavy");
                logout();
                navigate("/");
              }}
              className="link-underline inline-flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-neutral/5 transition"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" aria-hidden />
              {t("nav.logout")}
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="link-underline px-3 py-2 rounded-xl hover:bg-neutral/5 transition"
                onClick={() => haptic("light")}
              >
                {t("nav.login")}
              </Link>
              <Link
                to="/register?intent=vendor"
                className="link-underline px-3 py-2 rounded-xl hover:bg-neutral/5 transition hidden sm:inline-flex"
                onClick={() => haptic("light")}
              >
                {t("nav.sell")}
              </Link>
              <Link
                to="/register"
                className="btn-base btn-cta btn-sheen !py-2 !px-4 text-sm"
                onClick={() => haptic("light")}
              >
                {t("nav.join")}
              </Link>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
}
