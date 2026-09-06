import { Link } from "react-router-dom";
import { useI18n } from "../../lib/i18n";
import { haptic } from "../../lib/haptics";
import { Reveal } from "../Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

export function FinalCta() {
  const { t } = useI18n();

  return (
    <Section tight>
      <Container>
        <Reveal>
          <div className="rounded-3xl bg-primary px-6 py-12 md:px-12 md:py-14 text-center">
            <h2 className="text-white text-2xl md:text-3xl font-extrabold leading-tight text-constrained mx-auto">
              {t("finalCta.title")}
            </h2>
            <p className="text-white/75 text-body-sm mt-4 text-constrained mx-auto">
              {t("finalCta.subtitle")}
            </p>
            <Link
              to="/register?intent=vendor"
              className="btn-base btn-cta btn-sheen inline-flex mt-8 min-h-[52px] min-w-[16rem] justify-center"
              onClick={() => haptic("light")}
            >
              {t("finalCta.cta")}
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
