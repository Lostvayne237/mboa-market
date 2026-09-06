import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Hero / final CTA blocks — centered, extra breathing room */
  centered?: boolean;
  /** Skip default 160px vertical rhythm (nested sections) */
  tight?: boolean;
  id?: string;
};

/** Major page block with 160px vertical rhythm and optional center alignment. */
export function Section({ children, className = "", centered, tight, id }: SectionProps) {
  return (
    <section
      id={id}
      className={[
        tight ? "section-tight" : "section-gap",
        centered ? "section-centered" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}
