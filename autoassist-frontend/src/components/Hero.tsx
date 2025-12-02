import { Component, onMount } from 'solid-js';

const Hero: Component = () => {
  const stats = [
    'Trusted by 50+ businesses worldwide',
    '4.9/5 client satisfaction rating',
    'Average 5-day delivery timeline',
  ];

  onMount(() => {
    // Parallax effect for hero
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.5');
        (el as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  });

  return (
    <section class="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden bg-gradient-to-br from-white via-neutral-50 to-blue-50/30">
      {/* Cinematic background with depth */}
      <div class="absolute inset-0 -z-10 overflow-hidden">
        {/* Ambient light orbs - Apple-style */}
        <div class="parallax-element absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-gradient-radial from-blue-500/8 via-blue-400/4 to-transparent rounded-full blur-3xl animate-pulse-soft" data-speed="0.3" />
        <div class="parallax-element absolute bottom-[15%] right-[8%] w-[500px] h-[500px] bg-gradient-radial from-blue-400/10 via-blue-300/5 to-transparent rounded-full blur-3xl animate-pulse-soft" data-speed="0.4" style="animation-delay: 2s" />
        <div class="parallax-element absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-gradient-radial from-neutral-400/5 to-transparent rounded-full blur-3xl animate-pulse-soft" data-speed="0.2" style="animation-delay: 4s" />
        
        {/* Geometric grid - subtle depth */}
        <div class="absolute inset-0 opacity-[0.015]" style="background-image: radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0); background-size: 40px 40px;" />
      </div>

      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content - Left Column */}
          <div class="space-y-10 animate-slide-up">
            {/* Premium badge with magnetic hover */}
            <div class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-full border border-blue-500/20 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/40 hover:shadow-glow group">
              <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse-glow" />
              <span class="text-sm font-semibold text-blue-700 tracking-wide">Professional Web Solutions</span>
            </div>
            
            {/* Hero headline - Cinematic scale */}
            <h1 class="relative">
              <span class="block text-[3.5rem] sm:text-7xl lg:text-8xl font-sans font-bold leading-[0.95] tracking-tight text-neutral-950 mb-4">
                Premium Websites
              </span>
              <span class="block text-[3rem] sm:text-6xl lg:text-7xl font-sans font-bold leading-[0.95] tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                That Convert & Deliver Results
              </span>
              {/* Subtle glow effect behind text */}
              <div class="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-blue-400/10 blur-3xl -z-10 opacity-50" />
            </h1>
            
            {/* Subheadline - Maximum clarity */}
            <p class="text-xl sm:text-2xl lg:text-[26px] leading-relaxed text-neutral-600 max-w-xl">
              Professional landing pages and e-commerce stores. Lightning-fast delivery. 
              <span class="text-neutral-900 font-semibold">Starting at $49 with free homepage preview.</span>
            </p>

            {/* CTA Buttons - Magnetic hover */}
            <div class="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#contact" 
                class="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#2a5aa0] to-[#4380d1] text-white rounded-2xl font-semibold text-lg shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                <span class="relative z-10 flex items-center">
                  Get Free Preview
                  <svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                {/* Shine effect */}
                <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </a>
              <a 
                href="#pricing" 
                class="group inline-flex items-center justify-center px-10 py-5 bg-white text-neutral-900 rounded-2xl font-semibold text-lg border-2 border-neutral-200 transition-all duration-300 hover:bg-neutral-50 hover:border-blue-200 hover:shadow-soft hover:scale-[1.02] active:scale-[0.98]"
              >
                See Pricing
                <svg class="w-5 h-5 ml-2 text-neutral-400 transition-colors group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            {/* Stats Ticker - Continuous scroll */}
            <div class="relative overflow-hidden bg-gradient-to-r from-neutral-100/80 via-white/80 to-neutral-100/80 border border-neutral-200/60 rounded-2xl p-5 backdrop-blur-sm">
              <div class="flex animate-ticker space-x-12">
                {[...stats, ...stats].map((stat) => (
                  <div class="flex items-center space-x-3 whitespace-nowrap">
                    <div class="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-sm font-medium text-neutral-700">{stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Visual - Right Column */}
          <div class="relative animate-fade-in-slow lg:animate-slide-left">
            {/* Main image container with premium shadows */}
            <div class="relative group">
              <div class="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-ultra border border-neutral-200/50 bg-gradient-to-br from-blue-50 via-white to-neutral-50">
                {/* Logo showcase with premium treatment */}
                <div class="absolute inset-0 flex items-center justify-center p-12">
                  <img 
                    src="/assets/logo.jpg" 
                    alt="AutoAssist Logo" 
                    class="w-full max-w-md h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Overlay gradient for depth */}
                <div class="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating accent elements - depth layers */}
              <div class="absolute -top-8 -right-8 w-48 h-48 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-2xl animate-float -z-10" />
              <div class="absolute -bottom-8 -left-8 w-56 h-56 bg-gradient-radial from-blue-400/15 to-transparent rounded-full blur-2xl animate-float-slow -z-10" style="animation-delay: 1.5s" />
              
              {/* Premium border glow on hover */}
              <div class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" style="box-shadow: 0 0 60px rgba(49, 100, 181, 0.3)" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
