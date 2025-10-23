"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

/**
 * Mobile menu component with slide-out drawer
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <nav
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-64 bg-[var(--color-background)] shadow-xl transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Mobile navigation"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-[var(--color-foreground)] hover:bg-[var(--color-muted)] rounded-[var(--radius-md)]"
          aria-label="Close menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Menu Items */}
        <div className="mt-16 flex flex-col gap-1 px-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="rounded-[var(--radius-md)] px-4 py-3 text-base font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/signin"
            onClick={handleLinkClick}
            className="mt-4 rounded-[var(--radius-md)] px-4 py-3 text-base font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)]"
          >
            Sign In
          </a>
          <a
            href="/signup"
            onClick={handleLinkClick}
            className="rounded-[var(--radius-md)] bg-[var(--color-primary-600)] px-4 py-3 text-center text-base font-medium text-white transition-colors hover:bg-[var(--color-primary-700)]"
          >
            Get Started
          </a>
        </div>
      </nav>
    </>
  );
}
