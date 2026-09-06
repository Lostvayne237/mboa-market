import type { ReactNode } from "react";

/** Centered 960px grid shell — all page content lives inside this. */
export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
}) {
  return <Tag className={`container-ui ${className}`.trim()}>{children}</Tag>;
}
