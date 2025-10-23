import { SectionProps } from "@/types/components";
import { cn } from "@/lib/utils";

/**
 * Section component for page layout structure
 * Provides consistent spacing and optional container width
 */
export function Section({
  children,
  className,
  container = true,
  spacing = "lg",
  ...props
}: SectionProps) {
  const baseStyles = "w-full";

  const spacingStyles = {
    none: "py-0",
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
    xl: "py-24",
  };

  const containerStyles = container
    ? "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    : "";

  return (
    <section
      className={cn(baseStyles, spacingStyles[spacing], className)}
      {...props}
    >
      {container ? (
        <div className={containerStyles}>{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

/**
 * Container component for consistent max-width
 */
export function Container({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
