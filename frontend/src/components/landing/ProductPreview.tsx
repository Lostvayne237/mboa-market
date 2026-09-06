import { useI18n } from "../../lib/i18n";
import type { MessageKey } from "../../lib/translations";
import { Reveal } from "../Reveal";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

const SCREENS: {
  id: "profile" | "listing" | "contact";
  label: MessageKey;
  floatDelay: "" | "is-floating-delay-1" | "is-floating-delay-2";
  labelDelay: "" | "preview-label-delay-1" | "preview-label-delay-2";
}[] = [
  { id: "profile", label: "preview.profile", floatDelay: "", labelDelay: "" },
  {
    id: "listing",
    label: "preview.listing",
    floatDelay: "is-floating-delay-1",
    labelDelay: "preview-label-delay-1",
  },
  {
    id: "contact",
    label: "preview.contact",
    floatDelay: "is-floating-delay-2",
    labelDelay: "preview-label-delay-2",
  },
];

export function ProductPreview() {
  const { t } = useI18n();

  return (
    <Section centered>
      <Container>
        <Reveal>
          <h2 className="text-heading text-2xl font-extrabold text-center">
            {t("preview.title")}
          </h2>
          <p className="text-muted text-body-sm text-center mt-3 text-constrained mx-auto">
            {t("preview.subtitle")}
          </p>
        </Reveal>

        <div className="preview-showcase mt-10">
          <div
            className="preview-showcase-track"
            role="region"
            aria-label={t("preview.title")}
          >
            {SCREENS.map(({ id, label, floatDelay, labelDelay }, i) => (
              <Reveal key={id} delay={i * 100} className="preview-showcase-item">
                <div
                  className={`preview-phone-wrap is-floating ${floatDelay}`.trim()}
                >
                  <PreviewPhone screen={id} />
                </div>
                <p
                  className={`preview-label text-center text-body-sm font-bold text-heading mt-4 ${labelDelay}`.trim()}
                >
                  {t(label)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function PreviewPhone({ screen }: { screen: "profile" | "listing" | "contact" }) {
  return (
    <div className="hero-phone-bezel !w-full !max-w-none mx-auto" aria-hidden>
      <div className="hero-phone-notch" />
      <div className="hero-phone-screen !min-h-[280px] p-3">
        {screen === "profile" && <ProfileScreen />}
        {screen === "listing" && <ListingScreen />}
        {screen === "contact" && <ContactScreen />}
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div>
      <div className="preview-screen-part preview-screen-part-1 h-16 rounded-xl bg-primary" />
      <div className="preview-screen-part preview-screen-part-2 -mt-6 ml-3 w-12 h-12 rounded-xl bg-sun border-2 border-white flex items-center justify-center font-extrabold text-[color:var(--color-cta-ink)]">
        A
      </div>
      <p className="preview-screen-part preview-screen-part-3 mt-2 px-1 text-sm font-extrabold text-heading">
        Amina Fabrics
      </p>
      <p className="preview-screen-part preview-screen-part-3 px-1 text-[10px] text-muted">
        Douala · Akwa
      </p>
      <p className="preview-screen-part preview-screen-part-4 mt-2 px-1 text-[10px] text-muted leading-relaxed">
        Wax prints, lace, and everyday fabric. Message for prices.
      </p>
      <div className="preview-screen-part preview-screen-part-5 mt-3 flex gap-2">
        <span className="flex-1 rounded-lg bg-wa text-white text-[10px] font-bold text-center py-2">
          WhatsApp
        </span>
        <span className="flex-1 rounded-lg bg-primary text-white text-[10px] font-bold text-center py-2">
          Call
        </span>
      </div>
    </div>
  );
}

function ListingScreen() {
  const items = [
    { name: "Wax print 6 yards", price: "18 000" },
    { name: "Lace bundle", price: "12 500" },
    { name: "Ankara set", price: "9 000" },
  ];
  return (
    <div>
      <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary/50 mb-2 preview-screen-part preview-screen-part-1">
        Products
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.name}
            className="preview-inner-item flex items-center gap-2 rounded-xl bg-white border border-neutral/8 p-2"
          >
            <span className="w-10 h-10 rounded-lg bg-sun-soft shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-bold truncate">{item.name}</span>
              <span className="block text-[10px] font-extrabold text-primary">
                {item.price} XAF
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactScreen() {
  return (
    <div className="flex flex-col justify-end min-h-[250px]">
      <div className="preview-contact-sheet rounded-2xl bg-white border border-neutral/10 p-3">
        <p className="text-xs font-extrabold text-heading text-center">
          Contact Amina Fabrics
        </p>
        <p className="text-[10px] text-muted text-center mt-1">
          Deal happens off Mboa — directly with the vendor.
        </p>
        <div className="mt-3 space-y-2">
          <div className="preview-wa-pulse rounded-xl bg-wa text-white text-[11px] font-bold text-center py-2.5">
            Contact on WhatsApp
          </div>
          <div className="preview-screen-part preview-screen-part-2 rounded-xl bg-primary text-white text-[11px] font-bold text-center py-2.5">
            Call vendor
          </div>
        </div>
      </div>
    </div>
  );
}
