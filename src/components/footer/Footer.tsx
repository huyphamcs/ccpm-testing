"use client";

import { useState, FormEvent } from "react";
import { Container } from "@/components/ui";
import { FooterNav } from "./FooterNav";
import { SocialLinks } from "./SocialLinks";
import { Input, Button } from "@/components/ui";

/**
 * Footer component with navigation, newsletter signup, and social links
 */
export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Simulate newsletter signup
    // In production, this would call an API endpoint
    setTimeout(() => {
      setMessage("Thanks for subscribing!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-background)]">
      <Container className="py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="text-xl font-bold text-[var(--color-foreground)] mb-4">
              YourBrand
            </div>
            <p className="text-sm text-[var(--color-muted-foreground)] mb-6">
              The all-in-one platform for modern teams to collaborate, automate,
              and deliver results faster.
            </p>
            <SocialLinks />
          </div>

          {/* Navigation Columns */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-4">
            <FooterNav />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 border-t border-[var(--color-border)] pt-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h3 className="text-sm font-semibold text-[var(--color-foreground)]">
                Subscribe to our newsletter
              </h3>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Get the latest news and updates delivered to your inbox
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex gap-2 sm:max-w-md"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" isLoading={isSubmitting}>
                Subscribe
              </Button>
            </form>
          </div>
          {message && (
            <p className="mt-2 text-sm text-[var(--color-success)]">{message}</p>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-[var(--color-border)] pt-8 text-center text-sm text-[var(--color-muted-foreground)]">
          <p>© 2025 YourBrand. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
