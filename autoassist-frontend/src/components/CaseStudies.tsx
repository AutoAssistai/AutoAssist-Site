import { Component, For } from 'solid-js';

interface CaseStudy {
  client: string;
  challenge: string;
  solution: string;
  results: string[];
  pdfLink: string;
}

const CaseStudies: Component = () => {
  const studies: CaseStudy[] = [
    {
      client: 'AI Email Automation Agent',
      challenge:
        'Enterprise clients needed intelligent email processing and automation that could understand context, prioritize messages, and trigger workflows without manual intervention.',
      solution:
        'Built a Python-based AI system with advanced NLP processing, real-time automation engine, and an intuitive Streamlit dashboard. Implemented API-first architecture for seamless integration with existing tools.',
      results: [
        'Reduced email response time by 87%',
        'Automated 90% of routine email tasks',
        'Enterprise-grade reliability with 99.9% uptime',
      ],
      pdfLink: 'https://github.com/AutoAssistai/AI-Automation-Agent',
    },
    {
      client: 'Customer Service Chatbot API',
      challenge:
        'Support teams overwhelmed with repetitive customer inquiries. Needed an intelligent, scalable solution that could handle common questions while maintaining context across conversations.',
      solution:
        'Developed a FastAPI-based chatbot with OpenAI GPT integration, async architecture for high performance, rate limiting, and comprehensive logging. Included auto-generated API documentation and context retention.',
      results: [
        'Handled 10,000+ customer queries per day',
        '60% reduction in support ticket volume',
        'Sub-100ms response times with scalable REST API',
      ],
      pdfLink: 'https://github.com/AutoAssistai/customer-service-chatbot',
    },
  ];

  return (
    <section id="case-studies" class="section bg-gradient-to-b from-white via-blue-50/20 to-white relative overflow-hidden">
      {/* Cinematic background */}
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-blue-500/8 to-transparent blur-3xl" />
        <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-blue-400/6 to-transparent blur-3xl" />
      </div>
      
      <div class="container-custom">
        {/* Header */}
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-full border border-blue-500/20 mb-8">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span class="text-sm font-semibold text-blue-700">Featured Work</span>
          </div>
          <h2 class="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6 text-neutral-950 tracking-tight">
            Enterprise solutions in action
          </h2>
          <p class="text-xl sm:text-2xl text-neutral-600 max-w-2xl mx-auto font-light">
            Advanced AI automation systems built for scale, precision, 
            <span class="text-neutral-700 font-medium">and measurable impact.</span>
          </p>
        </div>

        {/* Case study cards */}
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          <For each={studies}>
            {(study) => (
              <div class="group bg-white rounded-3xl overflow-hidden shadow-luxury hover:shadow-ultra transition-all duration-700 border border-neutral-200 hover:border-neutral-300">
                {/* Screenshot with overlay */}
                <div class="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-50 to-neutral-50">
                  <img
                    src={study.client.includes('Email') ? '/assets/email_ai.png' : '/assets/demo_chat1.png'}
                    alt={`${study.client} project showcase`}
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient overlay on hover */}
                  <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Floating label on hover */}
                  <div class="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                    <div class="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-xl">
                      <p class="text-xs font-bold text-blue-600 uppercase tracking-wider">Live Project</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div class="p-8 lg:p-10">
                  <h3 class="text-2xl lg:text-3xl font-serif font-bold mb-6 text-neutral-950">{study.client}</h3>

                  <div class="space-y-6 mb-8">
                    {/* Challenge */}
                    <div>
                      <p class="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span class="w-4 h-px bg-blue-600" />
                        Challenge
                      </p>
                      <p class="text-neutral-600 leading-relaxed">{study.challenge}</p>
                    </div>

                    {/* Solution */}
                    <div>
                      <p class="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span class="w-4 h-px bg-blue-600" />
                        Solution
                      </p>
                      <p class="text-neutral-600 leading-relaxed">{study.solution}</p>
                    </div>

                    {/* Results */}
                    <div>
                      <p class="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span class="w-4 h-px bg-blue-600" />
                        Impact
                      </p>
                      <ul class="space-y-3">
                        <For each={study.results}>
                          {(result) => (
                            <li class="flex items-start gap-3">
                              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                                <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span class="text-neutral-900 font-medium leading-relaxed">{result}</span>
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={study.pdfLink}
                    class="group/btn inline-flex items-center gap-3 px-6 py-3.5 bg-neutral-900 rounded-2xl text-white font-semibold hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>View on GitHub</span>
                    <svg class="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
