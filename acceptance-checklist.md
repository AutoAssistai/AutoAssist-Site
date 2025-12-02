# AutoAssist.ai Acceptance Checklist

## Performance & Web Vitals
- [ ] Lighthouse Performance Score >= 95 (Mobile)
- [ ] Lighthouse Performance Score >= 95 (Desktop)
- [ ] Largest Contentful Paint (LCP) < 1.2s
- [ ] First Input Delay (FID) < 50ms (or Interaction to Next Paint)
- [ ] Cumulative Layout Shift (CLS) < 0.01
- [ ] First Contentful Paint (FCP) optimized
- [ ] Time to First Byte (TTFB) < 200ms (edge deployment)
- [ ] Total page weight < 1MB (initial load)
- [ ] Images in AVIF/WebP format with responsive srcset
- [ ] Critical CSS inlined
- [ ] Non-critical JS deferred
- [ ] Fonts preloaded (variable fonts)

## SEO & Metadata
- [ ] All pages have unique meta titles and descriptions
- [ ] Open Graph tags present and correct
- [ ] Twitter Card tags present and correct
- [ ] Canonical URLs set correctly
- [ ] JSON-LD Schema for Organization present
- [ ] JSON-LD Schema for Service present
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] All images have descriptive alt text
- [ ] robots.txt present and configured
- [ ] sitemap.xml generated and submitted

## Accessibility (WCAG AA)
- [ ] Semantic HTML5 elements used throughout
- [ ] All interactive elements keyboard accessible
- [ ] Focus states visible and styled consistently
- [ ] ARIA labels where necessary (forms, buttons, nav)
- [ ] Color contrast ratio >= 4.5:1 for body text
- [ ] Color contrast ratio >= 3:1 for large text and UI elements
- [ ] Forms have proper labels and error messages
- [ ] Skip to main content link present
- [ ] Screen reader tested (NVDA/VoiceOver)
- [ ] No keyboard traps

## Backend API (/api/lead)
- [ ] POST endpoint accepts all required fields
- [ ] Input validation working (email format, required fields)
- [ ] Input sanitization prevents injection attacks
- [ ] Rate limiting configured (max 5 requests per IP per hour)
- [ ] UTM parameters captured and stored
- [ ] Returns proper HTTP status codes (200, 400, 429, 500)
- [ ] Returns JSON response in standard format
- [ ] Lead stored in Postgres database with timestamp
- [ ] Email sent to admin within 2 minutes
- [ ] Welcome email sent to user within 2 minutes
- [ ] Sample lead visible in database
- [ ] Database migrations run successfully
- [ ] Connection pooling configured
- [ ] Proper error logging with request IDs

## Database
- [ ] Postgres connection successful
- [ ] leads table created with proper schema
- [ ] Indexes on email, created_at, and phone fields
- [ ] GDPR consent fields present (consent_ip, consent_timestamp)
- [ ] UTM tracking fields present
- [ ] Database credentials stored in environment variables
- [ ] Migrations documented and reversible

## Security
- [ ] CSP headers configured (Content-Security-Policy)
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] HSTS enabled (Strict-Transport-Security)
- [ ] HTTPS enforced on all pages
- [ ] All secrets in environment variables
- [ ] No hardcoded API keys or passwords in code
- [ ] SQL parameterized queries (no raw SQL concatenation)
- [ ] hCaptcha or reCAPTCHA integrated on form
- [ ] CORS configured properly
- [ ] cargo audit passes (Rust dependencies)
- [ ] npm audit passes (no high/critical vulnerabilities)

## Forms & UX
- [ ] "Get Free Homepage Preview" form all fields present
- [ ] Form validation works (client-side)
- [ ] Form validation works (server-side)
- [ ] Required fields marked with asterisk
- [ ] Helper text visible where needed
- [ ] Error messages clear and actionable
- [ ] Success page displays after submission
- [ ] GDPR consent checkbox present
- [ ] Privacy policy link works
- [ ] Form accessible via keyboard only
- [ ] Form works on mobile (touch targets >= 44px)
- [ ] Submit button disabled during submission
- [ ] Loading state shown during submission

## Content & Copy
- [ ] All sections match content-final.md
- [ ] No AI-generated language indicators present
- [ ] Copy sounds natural and human-written
- [ ] All placeholder tokens clearly marked (e.g., {{CONTACT_EMAIL}})
- [ ] Metrics labeled as placeholders where applicable
- [ ] CTAs use active verbs
- [ ] No marketing fluff or hollow claims
- [ ] Tone is confident, clear, and benefit-first
- [ ] Contractions used naturally ("We'll", "You'll")

## Design & Visual Quality
- [ ] Design matches luxury brand quality (Apple/Balenciaga level)
- [ ] Whitespace generous and consistent
- [ ] Typography scale correct (64-80px hero, 16px body)
- [ ] Variable fonts loaded and rendering correctly
- [ ] Color palette applied consistently (near-white bg, #0B0B0C text, #D6B56F accent)
- [ ] Border radius consistent (2xl on cards/CTAs)
- [ ] Shadows subtle and consistent
- [ ] No generic stock photos or AI-generated imagery
- [ ] Hero mockup high-quality (3D device composite)
- [ ] Product screenshots crisp and premium
- [ ] All images optimized and lazy-loaded (except hero)
- [ ] Micro-interactions on hover/focus smooth
- [ ] Animations use hardware-accelerated CSS
- [ ] No layout shift on page load

## Navigation & Sections
- [ ] Sticky nav implemented correctly
- [ ] Logo present and linked to home
- [ ] Services, Pricing, Case Studies, FAQ, Contact links work
- [ ] Smooth scroll to anchor links
- [ ] Hero section with headline, subhead, CTA
- [ ] Rotating stats ticker implemented
- [ ] 3 feature cards present
- [ ] How We Work (3-step process) section
- [ ] Pricing snapshot (2 tiers)
- [ ] 2 case studies with metrics
- [ ] 3 testimonials with names and titles
- [ ] Technical guarantees section
- [ ] FAQ (6 items) with expand/collapse
- [ ] Final CTA section
- [ ] Footer with contact, social, legal links

## Deployment & CI/CD
- [ ] Frontend builds successfully
- [ ] Backend builds successfully
- [ ] Dockerfile for API builds and runs
- [ ] GitHub Actions workflow for frontend exists
- [ ] GitHub Actions workflow for backend exists
- [ ] CI runs tests on every commit
- [ ] CI runs linting on every commit
- [ ] CI runs security scan (cargo audit, npm audit)
- [ ] Staging URL accessible and working
- [ ] Production URL accessible and working
- [ ] Environment variables documented in README
- [ ] Deployment guide complete and tested

## Testing
- [ ] Unit tests for backend input validation pass
- [ ] Integration test for /api/lead endpoint passes
- [ ] E2E test (Playwright) covering primary funnel passes
- [ ] E2E test loads hero correctly
- [ ] E2E test completes form successfully
- [ ] E2E test verifies lead in database
- [ ] Performance regression test in CI (optional Lighthouse CI)
- [ ] All tests documented in README

## Documentation
- [ ] Frontend README.md complete with setup instructions
- [ ] Backend README.md complete with setup instructions
- [ ] design-tokens.json present
- [ ] Deployment guides present (Cloudflare/Vercel + Fly.io)
- [ ] Environment variables documented
- [ ] Secrets management guide present
- [ ] Architecture diagram (optional but recommended)
- [ ] API documentation present
- [ ] Database schema documented

## Monitoring & Observability
- [ ] Structured logging (JSON) with request IDs
- [ ] Error tracking configured (Sentry or equivalent)
- [ ] Uptime monitoring configured (UptimeRobot)
- [ ] Analytics integrated (Plausible/Fathom)
- [ ] Analytics respects user privacy (no PII)
- [ ] Health check endpoint (/health or /api/health)

## Legal & Privacy
- [ ] Privacy policy page exists and renders
- [ ] Terms of service page exists and renders
- [ ] Cookie policy page exists and renders
- [ ] GDPR consent timestamp stored in database
- [ ] GDPR consent IP address stored in database
- [ ] Privacy-first analytics configured
- [ ] No third-party tracking scripts (except approved analytics)

## Deliverables
- [ ] autoassist-frontend repository complete
- [ ] autoassist-api repository complete
- [ ] content-final.md delivered
- [ ] design-tokens.json delivered
- [ ] assets/ folder with hero mockup and screenshots
- [ ] case-studies/ folder with 2 PDF placeholders
- [ ] legal/ folder with privacy.md and terms.md
- [ ] deploy/ folder with scripts and guides
- [ ] ci/ folder with GitHub Actions workflows
- [ ] acceptance-checklist.md delivered

## Final Quality Checks
- [ ] Code reviewed for AI-generated comments or strings
- [ ] Copy reviewed by product owner (sounds natural)
- [ ] No "TODO" or "FIXME" comments in production code
- [ ] Git history clean (no sensitive data committed)
- [ ] No console.log or debug statements in production
- [ ] All dependencies up to date
- [ ] License file present (if applicable)
- [ ] Contributing guidelines present (if open-source)

## Optional/Recommended Features
- [ ] Admin page for viewing leads (protected by basic auth)
- [ ] Leads marked with status (new, contacted, closed)
- [ ] A/B test variants for hero headlines implemented
- [ ] Experiment flag system stub in place
- [ ] SEO blog index page with 3-5 starter articles
- [ ] CSV export for leads
- [ ] Webhook support for CRM integration
- [ ] Automated backup system configured

---

## Sign-Off

**Developer:**  
Name: _________________________  
Date: _________________________  
Signature: _________________________

**Product Owner:**  
Name: _________________________  
Date: _________________________  
Signature: _________________________

**Deployment Verification:**
- [ ] Staging URL: _________________________
- [ ] Production URL: _________________________
- [ ] Lighthouse score verified: _________ (Mobile) / _________ (Desktop)
- [ ] Sample lead ID in database: _________________________

