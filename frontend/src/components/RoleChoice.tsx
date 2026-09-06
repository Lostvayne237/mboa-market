import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import {
  ShoppingBagIcon as ShoppingBagSolid,
  BuildingStorefrontIcon as StoreSolid,
} from "@heroicons/react/24/solid";
import { useI18n } from "../lib/i18n";
import type { Role } from "../lib/types";
import { haptic } from "../lib/haptics";
import { Container } from "./ui/Container";
import { Section } from "./ui/Section";

/** Decision architecture: easy question + one badge + effort specificity. */
export function RoleChoice({
  onSelect,
}: {
  onSelect: (role: Role) => void;
}) {
  const { t } = useI18n();

  return (
    <Container>
      <Section centered className="max-w-lg mx-auto">
        <h1 className="anim-fade-up text-heading text-3xl font-extrabold">
          {t("role.choose.title")}
        </h1>
        <p className="anim-fade-up anim-delay-1 text-muted text-body-sm mt-6 text-constrained mx-auto">
          {t("role.choose.subtitle")}
        </p>

        <div className="anim-fade-up anim-delay-2 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
          <button
            type="button"
            onClick={() => {
              haptic("heavy");
              onSelect("buyer");
            }}
            className="card-lift surface-polish p-6 text-left hover:border-primary/20 transition group relative"
          >
            <span className="chip chip-soft !py-1 !px-2.5 text-xs absolute top-4 right-4">
              {t("role.client.badge")}
            </span>
            <ShoppingBagIcon
              className="w-8 h-8 text-primary/70 group-hover:hidden"
              aria-hidden
            />
            <ShoppingBagSolid
              className="w-8 h-8 text-primary hidden group-hover:block"
              aria-hidden
            />
            <span className="block text-heading font-extrabold text-body-md mt-4">
              {t("role.client.title")}
            </span>
            <span className="block text-muted text-body-sm mt-2">
              {t("role.client.subtitle")}
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              haptic("heavy");
              onSelect("vendor");
            }}
            className="card-lift surface-primary-soft border-2 border-primary/25 p-6 text-left hover:border-primary/40 transition group relative"
          >
            <span className="chip !py-1 !px-2.5 text-xs absolute top-4 right-4 bg-primary text-white border-primary">
              {t("role.seller.badge")}
            </span>
            <BuildingStorefrontIcon
              className="w-8 h-8 text-primary/70 group-hover:hidden"
              aria-hidden
            />
            <StoreSolid
              className="w-8 h-8 text-primary hidden group-hover:block"
              aria-hidden
            />
            <span className="block text-heading font-extrabold text-body-md mt-4 pr-16">
              {t("role.seller.title")}
            </span>
            <span className="block text-muted text-body-sm mt-2">
              {t("role.seller.subtitle")}
            </span>
            <span className="block text-fine mt-3">{t("role.seller.why")}</span>
          </button>
        </div>

        <p className="text-muted text-body-sm mt-12">
          {t("role.choose.haveAccount")}{" "}
          <Link to="/login" className="font-bold text-primary">
            {t("nav.login")}
          </Link>
        </p>
      </Section>
    </Container>
  );
}
