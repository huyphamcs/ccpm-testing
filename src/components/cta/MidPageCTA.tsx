import { Section, Button } from "@/components/ui";

/**
 * Mid-page CTA section to encourage sign-ups
 */
export function MidPageCTA() {
  return (
    <Section spacing="lg">
      <div className="rounded-[var(--radius-xl)] bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-700)] px-8 py-12 text-center shadow-[var(--shadow-xl)] sm:px-12 sm:py-16">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mt-4 text-lg text-white/90">
          Join 10,000+ teams already using our platform
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button variant="secondary" size="lg" asChild>
            <a href="/signup">Start Free Trial</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
            asChild
          >
            <a href="/demo">Book a Demo</a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-white/80">
          No credit card required • Cancel anytime
        </p>
      </div>
    </Section>
  );
}
