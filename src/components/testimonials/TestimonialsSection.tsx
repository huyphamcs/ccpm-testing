import { Section } from "@/components/ui";
import { TestimonialCard } from "./TestimonialCard";
import { testimonials } from "@/data/testimonials";

/**
 * Testimonials section with customer reviews
 * Server Component for optimal performance
 */
export function TestimonialsSection() {
  return (
    <Section spacing="xl" id="testimonials" className="bg-[var(--color-muted)]">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
          Loved by teams worldwide
        </h2>
        <p className="mt-4 text-lg text-[var(--color-muted-foreground)]">
          See what our customers have to say about their experience
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {/* Stats Row */}
      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        <div className="text-center">
          <div className="text-4xl font-bold text-[var(--color-primary-600)]">
            10,000+
          </div>
          <div className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            Active Teams
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-[var(--color-primary-600)]">
            50M+
          </div>
          <div className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            Tasks Completed
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-[var(--color-primary-600)]">
            99.9%
          </div>
          <div className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            Uptime
          </div>
        </div>
      </div>
    </Section>
  );
}
