import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { haptic } from "../../lib/haptics";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  /** Play icon → checkmark sequence, then run onSuccess (or onClick). */
  successSequence?: boolean;
  successLabel?: string;
  onSuccess?: () => void;
  icon?: ReactNode;
  children: ReactNode;
};

const variantCls: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

/** Polished button with inner highlight, subtle shadow, optional success animation. */
export function Button({
  variant = "primary",
  successSequence,
  successLabel,
  icon,
  children,
  className = "",
  onClick,
  onSuccess,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const [phase, setPhase] = useState<"idle" | "success">("idle");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    haptic("light");
    if (successSequence && phase === "idle") {
      e.preventDefault();
      setPhase("success");
      haptic("heavy");
      window.setTimeout(() => {
        onSuccess?.();
        onClick?.(e);
        window.setTimeout(() => setPhase("idle"), 400);
      }, 520);
      return;
    }
    onClick?.(e);
  };

  const showSuccess = successSequence && phase === "success";

  return (
    <button
      type={type}
      disabled={disabled || showSuccess}
      onClick={handleClick}
      className={[
        "btn-base btn-sheen",
        variantCls[variant],
        showSuccess ? "btn-success-active" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <span className="btn-icon-slot" aria-hidden>
        {showSuccess ? (
          <CheckIcon className="btn-icon-check w-5 h-5" />
        ) : (
          icon
        )}
      </span>
      <span className={`btn-label ${showSuccess ? "btn-label-success" : ""}`}>
        {showSuccess && successLabel ? successLabel : children}
      </span>
    </button>
  );
}
