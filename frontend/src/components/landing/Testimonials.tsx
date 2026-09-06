import { useI18n } from "../../lib/i18n";
import type { MessageKey } from "../../lib/translations";
import { Reveal } from "../Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

const KEYS: {
  quote: MessageKey;
  name: MessageKey;
  meta: MessageKey;
}[] = [
  {
    quote: "testimonials.amina.quote",
    name: "testimonials.amina.name",
    meta: "testimonials.amina.meta",
  },
  {
    quote: "testimonials.paul.quote",
    name: "testimonials.paul.name",
    meta: "testimonials.paul.meta",
  },
  {
    quote: "testimonials.grace.quote",
    name: "testimonials.grace.name",
    meta: "testimonials.grace.meta",
  },
];

export function Testimonials() {
  const { t } = useI18n();

  return (
    <Section>
      <Container>
        <Reveal>
          <h2 className="text-heading text-2xl font-extrabold text-center">
            {t("testimonials.title")}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {KEYS.map((item, i) => (
            <Reveal key={item.name} delay={i * 70}>
              <blockquote className="h-full">
                <p className="text-heading text-body-md font-medium leading-relaxed">
                  “{t(item.quote)}”
                </p>
                <footer className="mt-5 text-body-sm text-muted">
                  <span className="font-extrabold text-heading">{t(item.name)}</span>
                  <span className="block mt-0.5">{t(item.meta)}</span>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
