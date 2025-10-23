import { Section, Button } from "@/components/ui";

/**
 * Final CTA section before footer with benefit bullets
 */
export function FinalCTA() {
  const benefits = [
    "14-day free trial",
    "No credit card required",
    "Cancel anytime",
    "Expert support included",
  ];

  return (
    <Section spacing="xl" className="bg-[var(--color-neutral-900)] text-white">
      <div className="text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Transform your workflow today
        </h2>
        <p className="mt-4 text-lg text-white/80">
          Get started in minutes, no training required
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button variant="primary" size="lg" asChild>
            <a href="/signup">Start Free Trial</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
            asChild>
            <a href="/contact">Contact Sales</a>
          </Button>
        </div>

        {/* Benefits List */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center justify-center gap-2">
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
              <span className="text-sm text-white/90">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
