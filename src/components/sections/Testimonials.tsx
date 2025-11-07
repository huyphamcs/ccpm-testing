const testimonials = [
  {
    body: 'This product has completely transformed how our team works. We ship faster and with more confidence than ever before.',
    author: {
      name: 'Sarah Chen',
      title: 'CEO at TechCorp',
      image: '/next.svg', // Placeholder
    },
  },
  {
    body: 'The best investment we made this year. The ROI was immediate and the support team is phenomenal.',
    author: {
      name: 'Michael Rodriguez',
      title: 'CTO at StartupXYZ',
      image: '/next.svg', // Placeholder
    },
  },
  {
    body: 'Finally, a product that actually delivers on its promises. Simple, powerful, and a joy to use every day.',
    author: {
      name: 'Emily Watson',
      title: 'Product Manager at BigCo',
      image: '/next.svg', // Placeholder
    },
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Loved by teams worldwide
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 dark:text-gray-100 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-cols-3">
          {testimonials.map((testimonial, testimonialIdx) => (
            <figure
              key={testimonialIdx}
              className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-700"
            >
              <blockquote className="text-gray-900 dark:text-gray-100">
                <p>{`"${testimonial.body}"`}</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div>
                  <div className="font-semibold">{testimonial.author.name}</div>
                  <div className="text-gray-600 dark:text-gray-400">{testimonial.author.title}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
