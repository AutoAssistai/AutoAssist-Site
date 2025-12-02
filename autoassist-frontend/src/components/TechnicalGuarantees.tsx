import { Component, For } from 'solid-js';

interface Guarantee {
  category: string;
  items: string[];
}

const TechnicalGuarantees: Component = () => {
  const guarantees: Guarantee[] = [
    {
      category: 'Performance',
      items: [
        'Lighthouse Performance Score: 95+ (Mobile & Desktop)',
        'Page load time under 1.2 seconds (global average)',
        '99.9% uptime SLA (monitored 24/7)',
      ],
    },
    {
      category: 'Security',
      items: [
        'SSL encryption (HTTPS) on all pages',
        'PCI-compliant payment processing (we never store card data)',
        'Daily automated backups',
        'GDPR and CCPA privacy controls included',
      ],
    },
    {
      category: 'Ownership',
      items: [
        'You own all design assets and code',
        'No vendor lock-in—full source code provided on request',
        'Free migration assistance if you ever want to move hosting',
      ],
    },
  ];

  return (
    <section class="section bg-background-secondary">
      <div class="container-custom">
        <div class="text-center mb-20">
          <h2 class="heading-section mb-6">Built to last</h2>
          <p class="body-large max-w-3xl mx-auto">
            Enterprise-grade infrastructure and guarantees you can count on
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <For each={guarantees}>
            {(guarantee) => (
              <div class="card">
                <h3 class="text-xl font-semibold text-text-primary mb-4">
                  {guarantee.category}
                </h3>
                <ul class="space-y-3">
                  <For each={guarantee.items}>
                    {(item) => (
                      <li class="flex items-start space-x-2">
                        <svg
                          class="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="text-sm text-text-secondary">{item}</span>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
};

export default TechnicalGuarantees;
