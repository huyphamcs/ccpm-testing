"use client";

import { useState } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Button } from "@/components/ui";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

/**
 * Sticky navigation header with mobile hamburger menu
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolled = useScrollPosition(20);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
          scrolled
            ? "bg-[var(--color-background)]/95 backdrop-blur-md shadow-[var(--shadow-sm)]"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="text-xl font-bold text-[var(--color-foreground)]"
              aria-label="Home"
            >
              YourBrand
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary-600)]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <a
                href="/signin"
                className="text-sm font-medium text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary-600)]"
              >
                Sign In
              </a>
              <Button variant="primary" size="sm" asChild>
                <a href="/signup">Get Started</a>
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[var(--color-foreground)] hover:bg-[var(--color-muted)] rounded-[var(--radius-md)]"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
