import {
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useI18n } from "../../lib/i18n";
import type { MessageKey } from "../../lib/translations";
import { Reveal } from "../Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

const ITEMS: {
  title: MessageKey;
  body: MessageKey;
  icon: typeof ChatBubbleLeftRightIcon;
}[] = [
  {
    title: "value.middleman.title",
    body: "value.middleman.body",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: "value.visibility.title",
    body: "value.visibility.body",
    icon: SparklesIcon,
  },
  {
    title: "value.local.title",
    body: "value.local.body",
    icon: MapPinIcon,
  },
];

export function ValueProps() {
  const { t } = useI18n();

  return (
    <Section tight id="about">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {ITEMS.map(({ title, body, icon: Icon }, i) => (
            <Reveal key={title} delay={i * 60}>
              <div className="text-center sm:text-left">
                <span className="inline-flex w-11 h-11 items-center justify-center rounded-2xl surface-primary-soft text-primary">
                  <Icon className="w-5 h-5" aria-hidden />
                </span>
                <h3 className="text-heading font-extrabold text-body-md mt-4">
                  {t(title)}
                </h3>
                <p className="text-muted text-body-sm mt-2 leading-relaxed">{t(body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
