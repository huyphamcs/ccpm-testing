import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/sections/Hero";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <TestimonialsSection />
        {/* Additional sections will be added here */}
      </main>
    </>
  );
}
