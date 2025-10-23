import { Button, Section } from "@/components/ui";
import Image from "next/image";

/**
 * Hero section with headline, subheadline, CTAs, hero image, and trust indicators
 */
export function Hero() {
  return (
    <Section spacing="xl" className="pt-24 lg:pt-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Left Column: Content */}
        <div className="flex flex-col gap-8">
          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-5xl lg:text-6xl">
            Streamline Your Workflow,{" "}
            <span className="text-[var(--color-primary-600)]">
              10x Your Productivity
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-[var(--color-muted-foreground)] sm:text-xl">
            The all-in-one platform for modern teams to collaborate, automate,
            and deliver results faster than ever before.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button variant="primary" size="lg" asChild>
              <a href="/signup">Start Free Trial</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/demo">Book a Demo</a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[var(--color-muted-foreground)]">
              Trusted by 10,000+ teams at
            </p>
            <div className="flex flex-wrap items-center gap-8">
              {/* Company Logos - Placeholder */}
              {["Google", "Spotify", "Airbnb", "GitHub"].map((company) => (
                <div
                  key={company}
                  className="flex items-center justify-center h-8 px-4 text-sm font-semibold text-[var(--color-neutral-400)] bg-[var(--color-muted)] rounded-[var(--radius-md)]"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Trust Elements */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--color-muted-foreground)]">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-[var(--color-success)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-[var(--color-success)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-[var(--color-success)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image */}
        <div className="relative aspect-square lg:aspect-auto lg:h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)]">
            {/* Placeholder for hero image */}
            <div className="flex h-full items-center justify-center text-[var(--color-primary-600)] text-lg font-medium">
              Hero Image
              <br />
              (Dashboard Screenshot)
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
