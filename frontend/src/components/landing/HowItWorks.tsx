import { useI18n } from "../../lib/i18n";
import type { MessageKey } from "../../lib/translations";
import { Reveal } from "../Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

const STEPS: MessageKey[] = ["how.create", "how.add", "how.contact"];

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <Section>
      <Container>
        <Reveal>
          <h2 className="text-heading text-2xl font-extrabold text-center">
            {t("how.title")}
          </h2>
          <p className="text-muted text-body-sm text-center mt-3 text-constrained mx-auto">
            {t("how.subtitle")}
          </p>
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step} delay={i * 80}>
              <li className="relative text-center">
                <span className="block text-5xl font-extrabold text-primary/15 leading-none tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-heading font-extrabold text-body-md mt-4">
                  {t(step)}
                </h3>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
