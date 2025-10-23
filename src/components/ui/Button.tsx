import { ButtonProps } from "@/types/components";
import { cn } from "@/lib/utils";
import { ReactElement, cloneElement } from "react";

/**
 * Button component with multiple variants and sizes
 * Supports primary, secondary, outline, and ghost styles
 */
export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  disabled,
  isLoading = false,
  fullWidth = false,
  type = "button",
  asChild = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variantStyles = {
    primary:
      "bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)] focus-visible:ring-[var(--color-primary-600)]",
    secondary:
      "bg-[var(--color-neutral-200)] text-[var(--color-neutral-900)] hover:bg-[var(--color-neutral-300)] focus-visible:ring-[var(--color-neutral-600)]",
    outline:
      "border-2 border-[var(--color-border)] bg-transparent hover:bg-[var(--color-muted)] focus-visible:ring-[var(--color-primary-600)]",
    ghost:
      "bg-transparent hover:bg-[var(--color-muted)] focus-visible:ring-[var(--color-primary-600)]",
  };

  const sizeStyles = {
    sm: "h-9 px-3 text-sm rounded-[var(--radius-md)]",
    md: "h-11 px-6 text-base rounded-[var(--radius-md)]",
    lg: "h-14 px-8 text-lg rounded-[var(--radius-lg)]",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  const buttonClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    widthStyles,
    className
  );

  if (asChild) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      ...child.props,
      className: cn(child.props.className, buttonClasses),
    });
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
