import Button from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="bg-indigo-600 dark:bg-indigo-700">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
            Join thousands of teams already building better products. Start your free trial today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" variant="secondary">
              Start free trial
            </Button>
            <Button size="lg" variant="outline" className="text-white hover:text-white hover:bg-indigo-500">
              Contact sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
