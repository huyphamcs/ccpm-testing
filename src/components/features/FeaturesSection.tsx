import { Section } from "@/components/ui";
import { FeatureCard } from "./FeatureCard";
import { features } from "@/data/features";

/**
 * Features section with responsive grid layout
 * Server Component for optimal performance
 */
export function FeaturesSection() {
  return (
    <Section spacing="xl" id="features">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
          Everything you need to succeed
        </h2>
        <p className="mt-4 text-lg text-[var(--color-muted-foreground)]">
          Powerful features that help teams collaborate, automate, and deliver results
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </Section>
  );
}
