import { Component, createSignal, onMount, onCleanup, Show } from 'solid-js';

const ExitIntentPopup: Component = () => {
  const [isVisible, setIsVisible] = createSignal(false);
  const [hasShown, setHasShown] = createSignal(false);

  onMount(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves from top of viewport
      if (e.clientY <= 0 && !hasShown()) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  });

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleGetPreview = () => {
    setIsVisible(false);
    if (typeof document !== 'undefined') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Show when={isVisible()}>
      {/* Backdrop */}
      <div class="fixed inset-0 z-50 bg-neutral-900/80 backdrop-blur-sm animate-fade-in" onClick={handleClose}>
        {/* Modal */}
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div
            class="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 lg:p-10 animate-scale-in pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              class="absolute top-4 right-4 w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
              aria-label="Close popup"
            >
              <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div class="text-center">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h2 class="text-3xl font-bold text-neutral-950 mb-4">
                Wait! Don't miss your free preview
              </h2>
              
              <p class="text-lg text-neutral-600 mb-6">
                See your homepage design within <span class="font-bold text-neutral-900">48 hours</span>. 
                No commitment. No payment required.
              </p>

              <ul class="text-left space-y-3 mb-8">
                <li class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                    <svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-neutral-700 font-medium">Free homepage mockup in 48 hours</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                    <svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-neutral-700 font-medium">No payment or commitment needed</span>
                </li>
                <li class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                    <svg class="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-neutral-700 font-medium">Professional design, mobile-optimized</span>
                </li>
              </ul>

              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleGetPreview}
                  class="group relative inline-flex items-center justify-center flex-1 px-8 py-4 bg-gradient-to-r from-[#2a5aa0] to-[#4380d1] text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] overflow-hidden"
                >
                  <span class="relative z-10">Get My Free Preview</span>
                  <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
                <button
                  onClick={handleClose}
                  class="px-6 py-4 text-neutral-600 hover:text-neutral-900 font-semibold transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default ExitIntentPopup;
