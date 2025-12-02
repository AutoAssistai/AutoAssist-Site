import { Component, For } from 'solid-js';

interface Step {
  number: string;
  title: string;
  timeline: string;
  description: string;
  deliverables: string[];
}

const Process: Component = () => {
  const steps: Step[] = [
    {
      number: '01',
      title: 'Free Homepage Preview',
      timeline: '24–48 hours',
      description:
        "After you fill out our brief (takes 3 minutes), we design a custom homepage concept for your brand—completely free. No meetings, no sales calls, no strings attached. If you love it, we move forward. If not, you've lost nothing but gained a professional design you can use as reference.",
      deliverables: [
        'Full-width homepage mockup (desktop + mobile views)',
        'Suggested copy structure and headline options',
        'Honest assessment of your current site (if applicable)',
      ],
    },
    {
      number: '02',
      title: 'Finalize & Build',
      timeline: '7 calendar days',
      description:
        "Once you approve the preview and select a package, we build the complete site. You'll have a dedicated project link to watch progress in real-time. We check in at day 3 (structure review) and day 6 (pre-launch walkthrough).",
      deliverables: [
        'Fully functional website or store',
        'Custom domain setup and SSL configuration',
        'Content management training (if applicable)',
        'Two revision rounds included',
      ],
    },
    {
      number: '03',
      title: 'Launch & Optimize',
      timeline: 'Ongoing (optional)',
      description:
        "We don't disappear after launch. Every client gets 30 days of technical support included. Need analytics setup, A/B testing, or ongoing conversion optimization? We offer retainer packages starting at $400/month.",
      deliverables: [
        '30-day bug fix guarantee',
        'Performance monitoring (uptime + load times)',
        'Optional: monthly optimization reports with actionable improvements',
      ],
    },
  ];

  return (
    <section class="section bg-background-secondary">
      <div class="container-custom">
        <div class="text-center mb-20">
          <h2 class="heading-section mb-6">How we work</h2>
          <p class="body-large max-w-3xl mx-auto">
            A refined process that delivers quality without the typical agency overhead
          </p>
        </div>

        <div class="max-w-5xl mx-auto space-y-12">
          <For each={steps}>
            {(step, index) => (
              <div class="relative">
                {/* Connecting line for non-last items */}
                {index() < steps.length - 1 && (
                  <div class="hidden md:block absolute left-16 top-24 w-0.5 h-24 bg-border-light" />
                )}

                <div class="flex flex-col md:flex-row gap-8">
                  {/* Step number */}
                  <div class="flex-shrink-0">
                    <div class="w-32 h-32 rounded-2xl bg-accent-light flex items-center justify-center">
                      <span class="text-5xl font-serif font-bold text-accent-primary">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div class="flex-grow">
                    <div class="mb-4">
                      <div class="flex flex-wrap items-baseline gap-4 mb-2">
                        <h3 class="heading-subsection">{step.title}</h3>
                        <span class="text-sm font-semibold text-accent-primary">
                          Timeline: {step.timeline}
                        </span>
                      </div>
                    </div>

                    <p class="body-base mb-6">{step.description}</p>

                    <div class="bg-background-tertiary rounded-2xl p-6">
                      <p class="text-sm font-semibold text-text-primary mb-4">
                        You receive:
                      </p>
                      <ul class="space-y-3">
                        <For each={step.deliverables}>
                          {(deliverable) => (
                            <li class="flex items-start space-x-3">
                              <svg
                                class="w-5 h-5 text-accent-primary flex-shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span class="text-sm text-text-secondary">{deliverable}</span>
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
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

export default Process;
