export interface Testimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    title: string;
    company: string;
  };
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "This platform transformed how our team collaborates. We've cut meeting time by 50% and shipped features 3x faster. Couldn't imagine going back to our old workflow.",
    author: {
      name: "Sarah Chen",
      title: "Product Manager",
      company: "TechCorp",
    },
    rating: 5,
  },
  {
    id: "testimonial-2",
    quote:
      "The integration capabilities are unmatched. We connected our entire stack in an afternoon and now have complete visibility across all our tools.",
    author: {
      name: "Michael Rodriguez",
      title: "CTO",
      company: "StartupXYZ",
    },
    rating: 5,
  },
  {
    id: "testimonial-3",
    quote:
      "The ROI was clear within 30 days. We automated manual processes that were costing us $50K/month in productivity loss. Best investment we've made.",
    author: {
      name: "Jessica Williams",
      title: "VP Operations",
      company: "BigCo",
    },
    rating: 5,
  },
];
