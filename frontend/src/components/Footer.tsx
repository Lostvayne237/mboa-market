import { Link } from "react-router-dom";
import { Container } from "./ui/Container";
import { useI18n } from "../lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer id="terms" className="mt-auto bg-navy-deep text-white">
      <Container className="py-12 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-sun text-[color:var(--color-cta-ink)] flex items-center justify-center font-extrabold">
              M
            </span>
            <span className="font-extrabold text-lg tracking-tight">Mboa Market</span>
          </div>
          <p className="text-body-sm text-white/70 mt-4 max-w-xs leading-relaxed">
            {t("footer.tagline")}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-body-sm font-semibold">
            <li>
              <a href="#about" className="text-white/80 hover:text-sun transition">
                {t("footer.about")}
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@mboamarket.cm"
                className="text-white/80 hover:text-sun transition"
              >
                {t("footer.contact")}
              </a>
            </li>
            <li>
              <a href="#terms" className="text-white/80 hover:text-sun transition">
                {t("footer.terms")}
              </a>
            </li>
            <li>
              <Link to="/search" className="text-white/80 hover:text-sun transition">
                {t("home.seeAll")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/237650000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-white/10 hover:bg-wa transition"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-5 text-fine text-white/50 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Mboa Market. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.3A10 10 0 1 0 12 2Zm5 13.9c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2 .2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3 0 .2 0 .7-.2 1.1Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
      <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.5v3.2h2.6V22h3.4Z" />
    </svg>
  );
}
