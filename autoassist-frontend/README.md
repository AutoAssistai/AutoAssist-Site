# AutoAssist.ai Frontend

Ultra-premium landing page built with SolidStart, TypeScript, and Tailwind CSS.

## Why SolidStart?

We chose SolidStart for this project for several key reasons:

1. **Performance**: SolidJS offers fine-grained reactivity with minimal runtime overhead, achieving Lighthouse scores of 95+ consistently
2. **Modern DX**: TypeScript support, JSX syntax, and excellent developer tooling
3. **SSR/SSG**: Built-in server-side rendering and static site generation for optimal SEO
4. **Small Bundle Size**: Typically 30-40% smaller bundles compared to React-based frameworks
5. **Edge-Ready**: Native support for Cloudflare Pages/Workers deployment

## Tech Stack

- **Framework**: SolidStart 1.0+
- **Language**: TypeScript 5.4+
- **Styling**: Tailwind CSS 3.4+ with JIT mode
- **Fonts**: Inter Variable (UI), Playfair Display Variable (headings)
- **Image Formats**: AVIF/WebP with responsive srcset
- **Build Tool**: Vite 5+
- **Deployment**: Cloudflare Pages (recommended) or Vercel

## Prerequisites

- Node.js 18+ (v20.19.5 recommended)
- npm or pnpm

## Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update with your values:

```env
VITE_API_URL=http://localhost:3001
VITE_API_ENDPOINT=/api/lead
VITE_PLAUSIBLE_DOMAIN=autoassist.ai
VITE_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm start
```

## Project Structure

```
autoassist-frontend/
├── src/
│   ├── app.css              # Global styles and Tailwind directives
│   ├── app.tsx              # Root app component
│   ├── entry-client.tsx     # Client entry point
│   ├── entry-server.tsx     # Server entry point
│   ├── routes/
│   │   └── index.tsx        # Homepage route
│   └── components/
│       ├── Navigation.tsx   # Sticky navigation bar
│       ├── Hero.tsx         # Hero section
│       ├── Features.tsx     # Features section
│       ├── Process.tsx      # How We Work section
│       ├── Pricing.tsx      # Pricing tiers
│       ├── CaseStudies.tsx  # Case studies showcase
│       ├── Testimonials.tsx # Client testimonials
│       ├── TechnicalGuarantees.tsx
│       ├── FAQ.tsx          # Expandable FAQ
│       ├── FinalCTA.tsx     # Final call-to-action
│       ├── ContactForm.tsx  # Lead capture form
│       └── Footer.tsx       # Site footer
├── public/
│   └── assets/              # Images, fonts, static files
├── app.config.ts            # SolidStart configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── package.json
└── README.md
```

## Linting & Formatting

```bash
# Lint TypeScript
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## Testing

### E2E Tests (Playwright)

```bash
npm run test:e2e
```

### Lighthouse CI

```bash
npm run lighthouse
```

## Deployment

### Cloudflare Pages (Recommended)

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `.output/public`
4. Add environment variables in Cloudflare dashboard
5. Deploy

**Or use the CLI:**

```bash
npm install -g wrangler
wrangler pages publish .output/public
```

See `deploy/cloudflare/` for detailed deployment scripts.

### Vercel

```bash
npm install -g vercel
vercel --prod
```

## Performance Targets

All targets must be met for production deployment:

- **Lighthouse Performance**: >= 95 (Mobile & Desktop)
- **LCP**: < 1.2s
- **FID**: < 50ms
- **CLS**: < 0.01
- **TTFB**: < 200ms

## Accessibility

- WCAG AA compliant
- Keyboard navigation throughout
- ARIA labels on all interactive elements
- Focus states clearly visible
- Screen reader tested with NVDA/VoiceOver

## Content Management

All copy is sourced from `content-final.md` at the project root. To update content:

1. Edit `content-final.md`
2. Update component copy to match
3. Replace placeholder tokens (e.g., `{{CONTACT_EMAIL}}`)

## Image Assets

Premium images should be placed in `public/assets/`:

- `hero-mockup.avif` - Hero device composite (1280x960)
- `hero-mockup-640.avif` - Hero mobile (640x480)
- `case-luxe-candle-co.avif` - Case study 1 screenshot
- `case-summit-fitness-coaching.avif` - Case study 2 screenshot

**Image Optimization:**

```bash
# Convert to AVIF (recommended)
npx @squoosh/cli --avif auto input.png -d public/assets/

# Or WebP
npx @squoosh/cli --webp auto input.png -d public/assets/
```

## Design Tokens

Design tokens are defined in `design-tokens.json` and imported into Tailwind config. To update:

1. Edit `design-tokens.json`
2. Sync with `tailwind.config.js`
3. Rebuild

## Security

- All forms have CSRF protection
- Rate limiting via backend API
- Input sanitization on both client and server
- CSP headers configured
- HTTPS enforced

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## Troubleshooting

### Build fails with "module not found"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Styles not updating

```bash
# Clear Tailwind cache
rm -rf .solid node_modules/.cache
npm run dev
```

### Images not loading

Ensure images are in `public/assets/` and referenced with leading slash: `/assets/image.avif`

## Support

For technical issues:
- Email: hello@autoassist.ai
- GitHub Issues: https://github.com/autoassist-ai/frontend/issues

## License

Proprietary - All rights reserved by AutoAssist.ai

## Contributors

- Development: AutoAssist.ai Team
- Design: AutoAssist.ai Team
- Content: AutoAssist.ai Team
