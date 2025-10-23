import { InputProps } from "@/types/components";
import { cn } from "@/lib/utils";

/**
 * Input component with label, error states, and helper text
 * Accessible with proper ARIA attributes
 */
export function Input({
  label,
  error,
  helperText,
  variant = "default",
  fullWidth = false,
  className,
  id,
  required,
  disabled,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  const baseStyles =
    "block rounded-[var(--radius-md)] border px-4 py-2 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50";

  const variantStyles = {
    default:
      "border-[var(--color-border)] bg-[var(--color-background)] focus-visible:ring-[var(--color-primary-600)] focus-visible:border-[var(--color-primary-600)]",
    error:
      "border-[var(--color-error)] bg-[var(--color-background)] focus-visible:ring-[var(--color-error)] focus-visible:border-[var(--color-error)]",
    success:
      "border-[var(--color-success)] bg-[var(--color-background)] focus-visible:ring-[var(--color-success)] focus-visible:border-[var(--color-success)]",
  };

  const widthStyles = fullWidth ? "w-full" : "";
  const actualVariant = error ? "error" : variant;

  return (
    <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--color-foreground)]"
        >
          {label}
          {required && <span className="ml-1 text-[var(--color-error)]">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          baseStyles,
          variantStyles[actualVariant],
          widthStyles,
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={cn(errorId, helperId).trim() || undefined}
        aria-required={required}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          className="text-sm text-[var(--color-error)]"
          role="alert"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={helperId}
          className="text-sm text-[var(--color-muted-foreground)]"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
