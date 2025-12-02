import { Component } from 'solid-js';
import ContactForm from './ContactForm';

const FinalCTA: Component = () => {
  return (
    <section id="contact" class="section bg-gradient-to-b from-background-primary to-background-tertiary">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="heading-section mb-6">Ready to build a website that converts?</h2>
          <p class="body-large max-w-3xl mx-auto">
            Start with a free homepage preview. No commitment, no sales call required. Just fill
            out our 3-minute brief and we'll send you a custom design concept within 48 hours.
          </p>
        </div>

        <div class="max-w-2xl mx-auto">
          <ContactForm />
        </div>

        <div class="text-center mt-12">
          <p class="text-text-secondary">
            Have questions first?{' '}
            <a
              href="mailto:autoassist.contact@yahoo.com"
              class="text-accent-primary font-semibold hover:text-accent-hover"
            >
              Contact us directly
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
