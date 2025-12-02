import { Component, For, createSignal } from 'solid-js';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: Component = () => {
  const [openIndex, setOpenIndex] = createSignal<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How is the free homepage preview truly free?',
      answer:
        "We design a custom homepage concept for every qualified inquiry at no cost and with no obligation. If you decide not to move forward, you keep the design mockup to use as reference or take to another developer. We do this because we're confident in our work—about 68% of preview recipients become clients.",
    },
    {
      question: 'What if I need changes after the site is live?',
      answer:
        'Every project includes two rounds of revisions during the build process and 30 days of technical support after launch. Need content updates or design tweaks after 30 days? We offer flexible retainer packages starting at $400/month, or one-off updates billed hourly at $125/hour.',
    },
    {
      question: 'Can you work with my existing brand guidelines?',
      answer:
        "Absolutely. If you have brand guidelines, logos, or a style guide, we'll match them precisely. If you don't, we'll create a mini brand system as part of the project (color palette, typography, button styles) at no extra cost.",
    },
    {
      question: 'Do I need to provide all the copy and images?',
      answer:
        "Not necessarily. We'll work with what you have—if you provide rough copy and iPhone photos, we'll refine and polish them. Need professional copywriting or product photography? We can coordinate that for an additional fee or recommend trusted partners.",
    },
    {
      question: 'What platforms do you build on?',
      answer:
        "We build with modern, performance-first frameworks (currently SolidStart and Rust backend for maximum speed). Your site is deployed to enterprise-grade hosting (Cloudflare/Vercel) with global CDN. You don't need to manage servers or worry about technical maintenance—we handle it all.",
    },
    {
      question: 'Can I see examples of your work?',
      answer:
        "Due to client NDAs, we can't publicly link to all projects, but we're happy to share relevant portfolio examples during our kickoff call. The free homepage preview is the best way to evaluate our work—you'll see our approach applied to your specific brand before committing.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex() === index ? null : index);
  };

  return (
    <section id="faq" class="section">
      <div class="container-custom">
        <div class="text-center mb-20">
          <h2 class="heading-section mb-6">Common questions</h2>
          <p class="body-large max-w-3xl mx-auto">
            Everything you need to know before getting started
          </p>
        </div>

        <div class="max-w-3xl mx-auto space-y-4">
          <For each={faqs}>
            {(faq, index) => (
              <div class="card">
                <button
                  onClick={() => toggleFAQ(index())}
                  class="w-full flex items-center justify-between text-left"
                  aria-expanded={openIndex() === index()}
                >
                  <h3 class="text-lg font-semibold text-text-primary pr-8">{faq.question}</h3>
                  <svg
                    class={`w-6 h-6 text-accent-primary flex-shrink-0 transition-transform duration-300 ${
                      openIndex() === index() ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openIndex() === index() && (
                  <div class="mt-4 pt-4 border-t border-border-light animate-fade-in">
                    <p class="text-text-secondary leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
