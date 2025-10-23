import { Card, CardContent } from "@/components/ui";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/**
 * Testimonial card component with quote, author info, and rating
 */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card padding="lg" className="h-full">
      <CardContent className="flex flex-col gap-6">
        {/* Rating Stars */}
        <div className="flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`h-5 w-5 ${
                i < testimonial.rating
                  ? "text-[var(--color-warning)]"
                  : "text-[var(--color-neutral-300)]"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-base text-[var(--color-foreground)] leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {/* Avatar Placeholder */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-600)] font-semibold text-lg">
            {testimonial.author.name.charAt(0)}
          </div>

          {/* Author Details */}
          <div className="flex flex-col">
            <cite className="not-italic font-semibold text-[var(--color-foreground)]">
              {testimonial.author.name}
            </cite>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {testimonial.author.title} at {testimonial.author.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
