import { Component, createSignal, onMount, onCleanup } from 'solid-js';

const StickyCTA: Component = () => {
  const [isVisible, setIsVisible] = createSignal(false);

  onMount(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 800px
      if (typeof window !== 'undefined') {
        setIsVisible(window.scrollY > 800);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  });

  const scrollToContact = () => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      class={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ${
        isVisible() ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div class="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border-t border-neutral-700 shadow-2xl backdrop-blur-xl">
        <div class="container-custom">
          <div class="flex items-center justify-between py-4 gap-4">
            <div class="flex-1">
              <p class="text-white font-bold text-lg mb-1">Ready to automate your business?</p>
              <p class="text-neutral-300 text-sm">Get your free homepage preview in 48 hours</p>
            </div>
            <button
              onClick={scrollToContact}
              class="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#2a5aa0] to-[#4380d1] text-white rounded-xl font-semibold text-base shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] overflow-hidden whitespace-nowrap"
            >
              <span class="relative z-10 flex items-center">
                Get Free Preview
                <svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
