import { Meta, Title } from '@solidjs/meta';
import { Component } from 'solid-js';
import Hero from '~/components/Hero';
import Features from '~/components/Features';
import Process from '~/components/Process';
import Pricing from '~/components/Pricing';
import Testimonials from '~/components/Testimonials';
import TechnicalGuarantees from '~/components/TechnicalGuarantees';
import FAQ from '~/components/FAQ';
import FinalCTA from '~/components/FinalCTA';
import Navigation from '~/components/Navigation';
import Footer from '~/components/Footer';
import TrustBadges from '~/components/TrustBadges';
import StickyCTA from '~/components/StickyCTA';
import ExitIntentPopup from '~/components/ExitIntentPopup';

const Home: Component = () => {
  return (
    <>
      <Title>AutoAssist - Professional Landing Pages & E-commerce Solutions | Fast Delivery</Title>
      <Meta
        name="description"
        content="Professional landing pages and e-commerce stores starting at $49. Fast delivery, high-converting designs. Get a free homepage preview. Trusted by 50+ businesses."
      />
      <Meta property="og:title" content="AutoAssist - Professional Landing Pages & E-commerce Solutions" />
      <Meta
        property="og:description"
        content="Premium websites. Delivered fast. Starting at $49. Free homepage preview included."
      />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://autoassist.ai" />
      <Meta property="og:image" content="https://autoassist.ai/assets/logo.jpg" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content="AutoAssist - Professional Websites from $49" />
      <Meta
        name="twitter:description"
        content="Landing pages & e-commerce stores. Fast delivery. Free homepage preview."
      />
      <Meta name="twitter:image" content="https://autoassist.ai/assets/logo.jpg" />
      <Meta name="robots" content="index, follow" />
      <Meta name="theme-color" content="#3164b5" />
      <link rel="canonical" href="https://autoassist.ai" />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'AutoAssist',
          description: 'Professional landing pages and e-commerce solutions for entrepreneurs and businesses worldwide',
          url: 'https://autoassist.ai',
          logo: 'https://autoassist.ai/assets/logo.jpg',
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'autoassist.contact@yahoo.com',
            contactType: 'Customer Service',
          },
          sameAs: [
            'https://instagram.com/autoassist.ai',
            'https://www.facebook.com/share/1DMpeHeGcD/?mibextid=wwXIfr',
            'https://twitter.com/AutoAssist',
            'https://www.tiktok.com/@AutoAssist',
            'https://github.com/AutoAssistai/AutoAssist',
          ],
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Web Design and Development',
          provider: {
            '@type': 'Organization',
            name: 'AutoAssist',
          },
          areaServed: 'Worldwide',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Web Design Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Starter Landing Page',
                  description: 'Professional landing page starting at $49',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Professional Landing Page',
                  description: 'Premium landing page with advanced features at $99',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Premium Store + Landing Bundle',
                  description: 'Complete e-commerce solution at $139',
                },
              },
            ],
          },
        })}
      </script>

      <Navigation />
      <main>
        <Hero />
        <TrustBadges />
        <Features />
        <Process />
        <Pricing />
        <Testimonials />
        <TechnicalGuarantees />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <ExitIntentPopup />
    </>
  );
};

export default Home;
