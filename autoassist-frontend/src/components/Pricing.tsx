import { Component, For } from 'solid-js';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  timeline: string;
  bestFor: string;
  highlighted?: boolean;
}

const Pricing: Component = () => {
  const tiers: PricingTier[] = [
    {
      name: 'Landing Page',
      price: '$49',
      description:
        'Professional landing page that converts. Fast delivery, mobile-optimized, SEO-ready.',
      features: [
        'Single-page premium design',
        'Mobile-first responsive architecture',
        'Core conversion elements',
        'Performance optimization',
        'SEO foundation',
        '48-hour delivery',
        'Free homepage preview',
      ],
      timeline: '2 days',
      bestFor: 'Startups, solo founders, quick launches',
    },
    {
      name: 'Landing + Ecommerce',
      price: '$99',
      description:
        'Complete online store with landing page. Start selling fast with integrated payments.',
      features: [
        'Everything in Landing Page',
        'E-commerce store (up to 25 products)',
        'Payment processing (Stripe, PayPal)',
        'Product management dashboard',
        'Order tracking system',
        'Mobile wallet support',
        'Email notifications',
        'Priority support',
      ],
      timeline: '5 days',
      bestFor: 'Product sellers, online retailers',
      highlighted: true,
    },
    {
      name: 'Full AI Automation Package',
      price: '$139',
      description:
        'End-to-end AI automation suite. Email agent, chatbot, landing page, and store—all integrated.',
      features: [
        'Everything in Landing + Ecommerce',
        'AI Email Automation Agent',
        'Customer Service Chatbot',
        'Advanced analytics & insights',
        'Custom AI workflow automation',
        'API integration support',
        'Dedicated account manager',
        'Extended customization',
      ],
      timeline: '7 days',
      bestFor: 'Enterprises, scaling businesses',
    },
  ];

  return (
    <section id="pricing" class="section bg-gradient-to-b from-white via-neutral-50 to-white relative overflow-hidden">
      {/* Premium background with depth */}
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/5 via-blue-400/3 to-transparent" />
        <div class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-blue-400/5 to-transparent blur-3xl" />
      </div>
      
      <div class="container-custom">
        {/* Header section */}
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-full border border-blue-500/20 mb-8">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span class="text-sm font-semibold text-blue-700">Transparent Pricing</span>
          </div>
          <h2 class="text-5xl sm:text-6xl lg:text-7xl font-sans font-bold mb-6 text-neutral-950 tracking-tight">
            Transparent Pricing – Invest in Excellence
          </h2>
          <p class="text-xl sm:text-2xl text-neutral-600 max-w-2xl mx-auto">
            Clear pricing. No hidden fees. 
            <span class="text-neutral-900 font-semibold">Exceptional value for ambitious teams.</span>
          </p>
        </div>

        {/* Pricing cards - Apple-style grid */}
        <div class="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-20">
          <For each={tiers}>
            {(tier) => (
              <div
                class={`relative bg-white rounded-3xl p-8 lg:p-10 transition-all duration-500 ${
                  tier.highlighted 
                    ? 'ring-2 ring-blue-500 shadow-ultra border border-blue-500/20 md:scale-105' 
                    : 'border border-neutral-200 shadow-luxury hover:shadow-premium hover:border-neutral-300'
                } group`}
              >
                {/* Recommended badge */}
                {tier.highlighted && (
                  <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg shadow-blue-500/30">
                    MOST POPULAR
                  </div>
                )}

                {/* Header */}
                <div class="mb-8 text-center">
                  <h3 class="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">{tier.name}</h3>
                  <div class="flex items-baseline justify-center mb-4">
                    <span class="text-6xl lg:text-7xl font-serif font-bold text-neutral-950 tracking-tight">{tier.price}</span>
                  </div>
                  <p class="text-neutral-600 leading-relaxed">{tier.description}</p>
                </div>

                {/* Features list */}
                <div class="mb-8 py-8 border-t border-b border-neutral-200">
                  <p class="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-5">What's included</p>
                  <ul class="space-y-4">
                    <For each={tier.features}>
                      {(feature) => (
                        <li class="flex items-start gap-3">
                          <div class="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                            <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                          </div>
                          <span class="text-sm text-neutral-700 leading-relaxed">{feature}</span>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>

                {/* Meta info */}
                <div class="space-y-3 mb-8">
                  <div class="flex items-center justify-between text-sm">
                    <span class="font-semibold text-neutral-700">Delivery</span>
                    <span class="text-neutral-600">{tier.timeline}</span>
                  </div>
                  <div class="text-sm">
                    <span class="font-semibold text-neutral-700">Best for</span>
                    <p class="text-neutral-600 mt-1">{tier.bestFor}</p>
                  </div>
                </div>

                {/* CTA button */}
                <a
                  href="#contact"
                  class={`group/btn relative inline-flex items-center justify-center w-full px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 overflow-hidden ${
                    tier.highlighted
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02]'
                      : 'bg-neutral-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02]'
                  }`}
                >
                  <span class="relative z-10 flex items-center">
                    Choose {tier.name.split(' ')[2]}
                    <svg class="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  {tier.highlighted && (
                    <div class="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  )}
                </a>
              </div>
            )}
          </For>
        </div>

        {/* Custom solutions CTA */}
        <div class="text-center max-w-3xl mx-auto">
          <div class="bg-gradient-to-br from-neutral-50 to-blue-50/30 border border-neutral-200 rounded-3xl p-10 lg:p-12">
            <h3 class="text-2xl lg:text-3xl font-serif font-bold text-neutral-950 mb-4">
              Need a custom solution?
            </h3>
            <p class="text-lg text-neutral-600 mb-8">
              Enterprise packages, custom integrations, and ongoing support available. 
              Let's build something exceptional together.
            </p>
            <a 
              href="#contact" 
              class="inline-flex items-center justify-center px-8 py-4 bg-white text-neutral-900 rounded-2xl font-semibold border-2 border-neutral-200 transition-all duration-300 hover:bg-neutral-50 hover:border-blue-200 hover:shadow-soft hover:scale-[1.02]"
            >
              Get in touch
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
