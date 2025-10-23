import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Additional sections will be added here */}
      </main>
    </>
  );
}
