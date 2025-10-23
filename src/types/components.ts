/**
 * Component type definitions
 */

import { ReactNode } from "react";

/**
 * Button component variants
 */
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

/**
 * Button component sizes
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Button component props
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

/**
 * Input component variants
 */
export type InputVariant = "default" | "error" | "success";

/**
 * Input component props
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
  fullWidth?: boolean;
}

/**
 * Card component props
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

/**
 * Section component props
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  container?: boolean;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
}
