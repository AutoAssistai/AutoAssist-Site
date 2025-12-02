import { Component, For } from 'solid-js';

interface Feature {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  icon: string;
}

const Features: Component = () => {
  const features: Feature[] = [
    {
      title: 'Conversion-First Design',
      subtitle: 'Every pixel earns its place.',
      description:
        "We don't chase trends—we build interfaces proven to convert visitors into customers. Our designs are tested against real user behavior, optimized for your specific audience, and focused on one goal: measurable results.",
      points: [
        'Funnel-optimized layouts backed by 40+ successful launches',
        'Heat-map validated CTAs and form placements',
        'Mobile-first responsive design (60% of traffic converts on mobile)',
      ],
      icon: 'chart',
    },
    {
      title: 'Fast Delivery',
      subtitle: 'From concept to live in 7 days.',
      description:
        "We've refined our process to eliminate back-and-forth without sacrificing quality. You'll see a working homepage preview within 48 hours, full delivery in one week, and we'll stay with you through launch day.",
      points: [
        'Free homepage mockup in 24–48 hours (no commitment required)',
        'Complete build in 7 calendar days from approval',
        'Two rounds of revisions included in every package',
      ],
      icon: 'lightning',
    },
    {
      title: 'Commerce That Converts',
      subtitle: 'Sell more with less friction.',
      description:
        "Our mini e-commerce stores are built for brands that need to start selling fast—without the complexity of Shopify or WooCommerce. Clean checkout flows, instant payment processing, and everything you need to take orders from day one.",
      points: [
        'Stripe + PayPal integration (goes live same day)',
        'Inventory management for up to 50 products',
        'Mobile wallet support (Apple Pay, Google Pay)',
      ],
      icon: 'cart',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'chart':
        return (
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        );
      case 'lightning':
        return (
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        );
      case 'cart':
        return (
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        );
      default:
        return null;
    }
  };

  return (
    <section id="services" class="section bg-[#f0f0f0] relative overflow-hidden">
      {/* Ambient background */}
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-blue-500/5 to-transparent blur-3xl" />
      </div>
      
      <div class="container-custom">
        {/* Header */}
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-full border border-blue-500/20 mb-8">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span class="text-sm font-semibold text-blue-700">Core AI Services</span>
          </div>
          <h2 class="text-5xl sm:text-6xl lg:text-7xl font-sans font-bold mb-6 text-neutral-950 tracking-tight">
            Intelligence at Your Fingertips
          </h2>
          <p class="text-xl sm:text-2xl text-neutral-600 max-w-2xl mx-auto">
            AI Solutions 24/7. Automate repetitive tasks, increase efficiency, 
            <span class="text-neutral-900 font-semibold">and free your time for strategic growth.</span>
          </p>
        </div>

        {/* AI Services Showcase - 2 Column Grid */}
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* AI Email Automation */}
          <div class="group bg-white rounded-3xl overflow-hidden shadow-luxury hover:shadow-ultra transition-all duration-700 border border-neutral-200 hover:border-blue-200">
            <div class="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-50 to-neutral-50">
              <img
                src="/assets/email_ai.png"
                alt="AI Email Automation Agent Dashboard"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            <div class="p-8 lg:p-10">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 class="text-2xl lg:text-3xl font-sans font-bold text-neutral-950">AI Email Automation Agent</h3>
              </div>
              
              <p class="text-neutral-600 leading-relaxed mb-6">
                Intelligent email processing with context understanding, automatic prioritization, and workflow triggers. 
                Never miss an important message again.
              </p>
              
              <ul class="space-y-3 mb-8">
                <li class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                    <svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-neutral-700 font-medium">87% faster response times</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                    <svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-neutral-700 font-medium">90% of routine tasks automated</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                    <svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-neutral-700 font-medium">99.9% uptime reliability</span>
                </li>
              </ul>
              
              <a
                href="https://github.com/AutoAssistai/AI-Automation-Agent"
                target="_blank"
                rel="noopener noreferrer"
                class="group/btn inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                <span>Learn more</span>
                <svg class="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Customer Service Chatbot */}
          <div class="group bg-white rounded-3xl overflow-hidden shadow-luxury hover:shadow-ultra transition-all duration-700 border border-neutral-200 hover:border-blue-200">
            <div class="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-50 to-neutral-50">
              <img
                src="/assets/demo_chat1.png"
                alt="Customer Service Chatbot Interface"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            <div class="p-8 lg:p-10">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 class="text-2xl lg:text-3xl font-sans font-bold text-neutral-950">Customer Service Chatbot API</h3>
              </div>
              
              <p class="text-neutral-600 leading-relaxed mb-6">
                Scalable AI chatbot that handles thousands of queries simultaneously. Context-aware responses with 
                lightning-fast performance and seamless integration.
              </p>
              
              <ul class="space-y-3 mb-8">
                <li class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                    <svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-neutral-700 font-medium">10,000+ queries handled daily</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                    <svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-neutral-700 font-medium">60% reduction in support tickets</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                    <svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-neutral-700 font-medium">Sub-100ms response times</span>
                </li>
              </ul>
              
              <a
                href="https://github.com/AutoAssistai/customer-service-chatbot"
                target="_blank"
                rel="noopener noreferrer"
                class="group/btn inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                <span>Learn more</span>
                <svg class="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
