/** Static phone frame teaching the product model — no network images. */
export function HeroMockup() {
  const rows = [
    { initial: "A", name: "Amina Fabrics", city: "Douala · Akwa", color: "#12355b" },
    { initial: "K", name: "Koki Kitchen", city: "Yaoundé · Bastos", color: "#0d7a5f" },
    { initial: "M", name: "Mango Phone Fix", city: "Douala · Bonabéri", color: "#b45309" },
  ];

  return (
    <div className="hero-phone mx-auto" aria-hidden>
      <div className="hero-phone-bezel">
        <div className="hero-phone-notch" />
        <div className="hero-phone-screen">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary/50 px-3 pt-3">
            Near you
          </p>
          <ul className="mt-2 space-y-2 px-2.5 pb-3">
            {rows.map((row) => (
              <li
                key={row.name}
                className="flex items-center gap-2.5 rounded-xl bg-white border border-neutral/8 px-2.5 py-2"
              >
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-extrabold text-white shrink-0"
                  style={{ background: row.color }}
                >
                  {row.initial}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] font-extrabold text-heading truncate">
                    {row.name}
                  </span>
                  <span className="block text-[10px] text-muted truncate">{row.city}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="px-2.5 pb-3">
            <div className="flex items-center justify-center gap-1.5 rounded-xl bg-wa text-white text-[11px] font-bold py-2.5">
              <WhatsAppGlyph />
              Contact on WhatsApp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.3A10 10 0 1 0 12 2Zm5 13.9c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2 .2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3 0 .2 0 .7-.2 1.1Z" />
    </svg>
  );
}
