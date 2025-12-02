import { Component } from 'solid-js';

const TrustBadges: Component = () => {
  const badges = [
    {
      icon: 'shield',
      label: 'Bank-Level Security',
      description: 'AES-256 encryption',
    },
    {
      icon: 'zap',
      label: 'Lightning Fast',
      description: 'Sub-100ms response',
    },
    {
      icon: 'check-circle',
      label: 'GDPR Compliant',
      description: 'Data protection certified',
    },
    {
      icon: 'clock',
      label: '24/7 Support',
      description: 'Always available',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'shield':
        return (
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        );
      case 'zap':
        return (
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        );
      case 'check-circle':
        return (
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        );
      case 'clock':
        return (
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        );
      default:
        return null;
    }
  };

  return (
    <section class="py-16 bg-white border-t border-b border-neutral-200">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {badges.map((badge) => (
            <div class="flex flex-col items-center text-center group">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {getIcon(badge.icon)}
                </svg>
              </div>
              <h3 class="text-base font-bold text-neutral-900 mb-1">{badge.label}</h3>
              <p class="text-sm text-neutral-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
