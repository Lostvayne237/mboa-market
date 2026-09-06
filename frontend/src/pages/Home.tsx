import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { FinalCta } from "../components/landing/FinalCta";
import { HeroMockup } from "../components/landing/HeroMockup";
import { HowItWorks } from "../components/landing/HowItWorks";
import { ProductPreview } from "../components/landing/ProductPreview";
import { Testimonials } from "../components/landing/Testimonials";
import { ValueProps } from "../components/landing/ValueProps";
import { Reveal } from "../components/Reveal";
import { StoreCard } from "../components/StoreCard";
import { BleedCarousel } from "../components/ui/BleedCarousel";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { haptic } from "../lib/haptics";
import { api } from "../lib/api";
import {
  resolveFeaturedShops,
} from "../lib/featuredShops";
import { useI18n } from "../lib/i18n";
import { CITIES, type VendorSummary } from "../lib/types";

export function Home() {
  const { t } = useI18n();
  const [liveStores, setLiveStores] = useState<VendorSummary[] | null>(null);

  useEffect(() => {
    api<VendorSummary[]>("/api/vendors/")
      .then((data) => setLiveStores(data))
      .catch(() => setLiveStores([]));
  }, []);

  const featured = resolveFeaturedShops(liveStores);
  const loadingLive = liveStores === null;

  return (
    <div className="relative pb-16">
      <div className="hero-dots absolute inset-x-0 top-0 h-[32rem] pointer-events-none" aria-hidden />
      <div className="glow-primary absolute inset-x-0 top-16 h-72 pointer-events-none" aria-hidden />

      {/* 1. Hero */}
      <Container className="relative">
        <Section centered className="!pt-12 !pb-6 md:!pt-16">
          <p className="anim-fade-up text-heading text-lg font-extrabold tracking-tight">
            Mboa Market
          </p>
          <h1 className="anim-fade-up anim-delay-1 text-heading text-[2rem] sm:text-4xl md:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] mt-4 max-w-xl mx-auto">
            {t("hero.title")}
          </h1>
          <p className="anim-fade-up anim-delay-2 text-muted text-body-md mt-5 text-constrained mx-auto">
            {t("hero.tagline")}
          </p>

          <div className="anim-fade-up anim-delay-3 mt-10 flex flex-col sm:flex-row gap-3 justify-center text-constrained mx-auto w-full">
            <Link
              to="/search"
              className="btn-base btn-cta btn-sheen min-h-[52px] w-full sm:w-auto sm:min-w-[11rem] justify-center"
              onClick={() => haptic("light")}
            >
              {t("hero.browse")}
            </Link>
            <Link
              to="/register?intent=vendor"
              className="btn-base btn-secondary min-h-[52px] w-full sm:w-auto sm:min-w-[11rem] justify-center"
              onClick={() => haptic("light")}
            >
              {t("hero.list")}
            </Link>
          </div>

          <div className="anim-fade-up anim-delay-3 mt-12">
            <HeroMockup />
          </div>
        </Section>
      </Container>

      {/* 2. Value props */}
      <ValueProps />

      {/* 3. How it works */}
      <HowItWorks />

      {/* 4. Featured shops */}
      <Container>
        <Section tight>
          <Reveal>
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-heading text-2xl font-extrabold">
                {t("home.stores")}
              </h2>
              <Link
                to="/search"
                className="link-underline text-body-sm font-bold text-primary shrink-0"
              >
                {t("home.seeAll")}
              </Link>
            </div>
          </Reveal>

          <div
            className={`stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${
              loadingLive ? "opacity-90" : ""
            }`}
          >
            {featured.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </Section>
      </Container>

      {/* City chips below proof — not in hero */}
      <BleedCarousel ariaLabel={t("home.browseCities")}>
        {CITIES.map((city) => (
          <Link
            key={city}
            to={`/search?city=${encodeURIComponent(city)}`}
            className="chip chip-soft"
          >
            <MapPinIcon className="w-4 h-4 text-primary/70" aria-hidden />
            {city}
          </Link>
        ))}
      </BleedCarousel>

      {/* 5. Product preview */}
      <ProductPreview />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Final CTA */}
      <FinalCta />
    </div>
  );
}
