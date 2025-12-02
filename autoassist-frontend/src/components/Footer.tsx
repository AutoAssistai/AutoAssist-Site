import { Component } from 'solid-js';

const Footer: Component = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" class="section bg-gradient-to-b from-neutral-950 to-neutral-900 text-white relative overflow-hidden">
      {/* Ambient background */}
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-blue-500/10 to-transparent blur-3xl" />
        <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-blue-400/8 to-transparent blur-3xl" />
        <div class="absolute inset-0 opacity-[0.015]" style="background-image: radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0); background-size: 40px 40px;" />
      </div>
      
      <div class="container-custom">
        <div class="grid md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Company Info */}
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-6">
              <img 
                src="/assets/logo.jpg" 
                alt="AutoAssist Logo" 
                class="h-14 w-auto rounded-lg"
              />
              <div class="text-3xl font-serif font-bold">AutoAssist</div>
            </div>
            <p class="text-neutral-300 mb-8 max-w-md text-lg leading-relaxed">
              Enterprise-grade AI automation systems. Built for teams who demand excellence and measurable results.
            </p>
            
            {/* Contact info with premium styling */}
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-0.5">Email</p>
                  <a
                    href="mailto:autoassist.contact@yahoo.com"
                    class="text-white hover:text-blue-400 transition-colors font-medium"
                  >
                    autoassist.contact@yahoo.com
                  </a>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-0.5">Response Time</p>
                  <p class="text-neutral-300 font-medium">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 class="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-6">Quick Links</h4>
            <ul class="space-y-3">
              <li>
                <a
                  href="#services"
                  class="text-neutral-300 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span class="w-0 h-px bg-blue-500 transition-all group-hover:w-4 group-hover:mr-2" />
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  class="text-neutral-300 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span class="w-0 h-px bg-blue-500 transition-all group-hover:w-4 group-hover:mr-2" />
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#case-studies"
                  class="text-neutral-300 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span class="w-0 h-px bg-blue-500 transition-all group-hover:w-4 group-hover:mr-2" />
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  class="text-neutral-300 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span class="w-0 h-px bg-blue-500 transition-all group-hover:w-4 group-hover:mr-2" />
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 class="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-6">Connect</h4>
            <ul class="space-y-3 mb-8">
              <li>
                <a
                  href="https://instagram.com/autoassist.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-neutral-300 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span class="w-0 h-px bg-blue-500 transition-all group-hover:w-4 group-hover:mr-2" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1DMpeHeGcD/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-neutral-300 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span class="w-0 h-px bg-blue-500 transition-all group-hover:w-4 group-hover:mr-2" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/AutoAssist"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-neutral-300 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span class="w-0 h-px bg-blue-500 transition-all group-hover:w-4 group-hover:mr-2" />
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@AutoAssist"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-neutral-300 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span class="w-0 h-px bg-blue-500 transition-all group-hover:w-4 group-hover:mr-2" />
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/AutoAssistai/AutoAssist"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-neutral-300 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span class="w-0 h-px bg-blue-500 transition-all group-hover:w-4 group-hover:mr-2" />
                  GitHub
                </a>
              </li>
            </ul>

            <h4 class="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-6">Legal</h4>
            <ul class="space-y-3">
              <li>
                <a
                  href="/privacy"
                  class="text-neutral-300 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span class="w-0 h-px bg-blue-500 transition-all group-hover:w-4 group-hover:mr-2" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  class="text-neutral-300 hover:text-white transition-colors inline-flex items-center group"
                >
                  <span class="w-0 h-px bg-blue-500 transition-all group-hover:w-4 group-hover:mr-2" />
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div class="pt-10 border-t border-white/10">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-sm text-neutral-400">
              © {currentYear} AutoAssist. All rights reserved.
            </p>
            <div class="flex items-center gap-2 text-xs text-neutral-500">
              <span>Crafted with precision</span>
              <span class="w-1 h-1 rounded-full bg-blue-500" />
              <span>Built for excellence</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
