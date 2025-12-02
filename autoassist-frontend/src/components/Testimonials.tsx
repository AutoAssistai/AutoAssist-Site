import { Component, For, onMount, createSignal } from 'solid-js';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  rating: number;
}

const Testimonials: Component = () => {
  const [isVisible, setIsVisible] = createSignal(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('testimonials');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  });

  const testimonials: Testimonial[] = [
    {
      quote:
        "AutoAssist delivered our landing page in 3 days. Conversion rate jumped 40% within the first week. The quality exceeded our expectations.",
      author: 'Sarah Mitchell',
      title: 'CEO',
      company: 'TechFlow Solutions',
      rating: 5,
    },
    {
      quote:
        "We needed a quick solution for our product launch. AutoAssist's turnaround time was incredible, and the result looked like we spent months on it.",
      author: 'Marcus Chen',
      title: 'Founder',
      company: 'CloudSync',
      rating: 5,
    },
    {
      quote:
        "The e-commerce store they built handles thousands of orders seamlessly. Customer checkout experience is smooth, and our sales are up 60%.",
      author: 'Jessica Martinez',
      title: 'VP of Operations',
      company: 'Urban Lifestyle Co.',
      rating: 5,
    },
  ];

  // Trusted by companies (animated logos)
  const companies = [
    'TechFlow', 'CloudSync', 'UrbanLife', 'DataCore', 'Nexus', 'Velocity'
  ];

  return (
    <section id="testimonials" class="section bg-gradient-to-b from-white via-neutral-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 to-transparent blur-3xl" />
      </div>

      <div class="container-custom">
        {/* Trusted by companies - Animated logo scroll */}
        <div class="mb-20">
          <p class="text-center text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-8">
            Trusted by forward-thinking companies
          </p>
          <div class="relative overflow-hidden">
            <div class="flex animate-ticker space-x-12">
              {[...companies, ...companies].map((company) => (
                <div class="flex-shrink-0 px-6 py-3 bg-white rounded-xl border border-neutral-200 shadow-sm">
                  <span class="text-lg font-bold text-neutral-800">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-full border border-blue-500/20 mb-8">
            <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="text-sm font-semibold text-blue-700">Client Success Stories</span>
          </div>
          <h2 class="text-5xl sm:text-6xl lg:text-7xl font-sans font-bold mb-6 text-neutral-950 tracking-tight">
            Loved by ambitious founders
          </h2>
          <p class="text-xl sm:text-2xl text-neutral-600 max-w-2xl mx-auto">
            Real feedback from businesses who chose 
            <span class="text-neutral-900 font-semibold"> speed and quality.</span>
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <For each={testimonials}>
            {(testimonial, index) => (
              <div 
                class={`bg-white rounded-3xl p-8 lg:p-10 shadow-luxury hover:shadow-ultra border border-neutral-200 transition-all duration-700 ${
                  isVisible() ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={`animation-delay: ${index() * 150}ms`}
              >
                {/* Stars */}
                <div class="flex gap-1 mb-6">
                  <For each={Array(testimonial.rating)}>
                    {() => (
                      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </For>
                </div>

                {/* Quote */}
                <blockquote class="text-neutral-700 mb-8 leading-relaxed text-lg">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div class="flex items-center gap-4 pt-6 border-t border-neutral-200">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span class="text-white font-bold text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p class="font-bold text-neutral-950">{testimonial.author}</p>
                    <p class="text-sm text-neutral-600">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
