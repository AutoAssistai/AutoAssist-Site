import { Component, createSignal, onMount, onCleanup } from 'solid-js';

const Navigation: Component = () => {
  const [isScrolled, setIsScrolled] = createSignal(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(false);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 20);
    }
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
  });

  onCleanup(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  const scrollToSection = (id: string) => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <nav
      class={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled()
          ? 'bg-white/95 backdrop-blur-xl shadow-soft border-b border-neutral-200/60'
          : 'bg-transparent'
      }`}
    >
      <div class="container-custom">
        <div class="flex items-center justify-between py-5">
          {/* Logo */}
          <a href="/" class="flex items-center gap-3 group" aria-label="AutoAssist Home">
            <img 
              src="/assets/logo.jpg" 
              alt="AutoAssist Logo" 
              class="h-11 w-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
              width="120"
              height="44"
            />
            <div class="text-2xl font-serif font-bold tracking-tight text-neutral-950">AutoAssist</div>
          </a>

          {/* Desktop Navigation */}
          <div class="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('services')}
              class="text-neutral-600 hover:text-neutral-950 font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              class="text-neutral-600 hover:text-neutral-950 font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              class="text-neutral-600 hover:text-neutral-950 font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              class="relative inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] overflow-hidden group"
            >
              <span class="relative z-10">Get Started</span>
              <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen())}
            class="md:hidden p-2 text-neutral-900 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen()}
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen() ? (
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen() && (
          <div class="md:hidden pb-6 animate-slide-down">
            <div class="flex flex-col gap-2 bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-neutral-200 shadow-xl mt-4">
              <button
                onClick={() => scrollToSection('services')}
                class="text-left text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-all duration-200 py-3 px-4 rounded-xl font-medium"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                class="text-left text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-all duration-200 py-3 px-4 rounded-xl font-medium"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                class="text-left text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-all duration-200 py-3 px-4 rounded-xl font-medium"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                class="text-left text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 transition-all duration-200 py-3 px-4 rounded-xl font-medium"
              >
                FAQ
              </button>
              <div class="h-px bg-neutral-200 my-2" />
              <button
                onClick={() => scrollToSection('contact')}
                class="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
