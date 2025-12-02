import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/AutoAssist\.ai/);
  });

  test('should display hero section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Websites that convert/i })).toBeVisible();
    await expect(page.getByText(/Built in 7 days/i)).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Services/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Pricing/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Case Studies/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /FAQ/i })).toBeVisible();
  });

  test('should scroll to sections on navigation click', async ({ page }) => {
    await page.getByRole('button', { name: /Pricing/i }).click();
    await page.waitForTimeout(1000); // Wait for smooth scroll
    
    const pricingSection = page.locator('#pricing');
    await expect(pricingSection).toBeInViewport();
  });

  test('should display all main sections', async ({ page }) => {
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('#pricing')).toBeVisible();
    await expect(page.locator('#case-studies')).toBeVisible();
    await expect(page.locator('#faq')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });
});

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
  });

  test('should display form fields', async ({ page }) => {
    await expect(page.getByLabel(/Full Name/i)).toBeVisible();
    await expect(page.getByLabel(/Company Name/i)).toBeVisible();
    await expect(page.getByLabel(/Website or Instagram/i)).toBeVisible();
    await expect(page.getByLabel(/primary goal/i)).toBeVisible();
    await expect(page.getByLabel(/Budget Range/i)).toBeVisible();
    await expect(page.getByLabel(/Email Address/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.getByRole('button', { name: /Get My Free Preview/i }).click();
    
    await expect(page.getByText(/Full name is required/i)).toBeVisible();
    await expect(page.getByText(/Company name is required/i)).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.getByLabel(/Email Address/i).fill('invalid-email');
    await page.getByRole('button', { name: /Get My Free Preview/i }).click();
    
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test('should require consent checkbox', async ({ page }) => {
    await page.getByLabel(/Full Name/i).fill('John Doe');
    await page.getByLabel(/Company Name/i).fill('Acme Inc');
    await page.getByLabel(/Website or Instagram/i).fill('acme.com');
    await page.getByLabel(/primary goal/i).fill('Generate more leads');
    await page.getByLabel(/Budget Range/i).selectOption('1500-3000');
    await page.getByLabel(/Email Address/i).fill('john@acme.com');
    
    // Don't check consent
    await page.getByRole('button', { name: /Get My Free Preview/i }).click();
    
    await expect(page.getByText(/must agree/i)).toBeVisible();
  });

  test('should submit form successfully with valid data', async ({ page }) => {
    // Mock API response
    await page.route('**/api/lead', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: "Thank you! We'll send your free homepage preview within 24-48 hours.",
          lead_id: '123e4567-e89b-12d3-a456-426614174000',
        }),
      });
    });

    await page.getByLabel(/Full Name/i).fill('John Doe');
    await page.getByLabel(/Company Name/i).fill('Acme Inc');
    await page.getByLabel(/Website or Instagram/i).fill('acme.com');
    await page.getByLabel(/primary goal/i).fill('Generate more leads');
    await page.getByLabel(/Budget Range/i).selectOption('1500-3000');
    await page.getByLabel(/Email Address/i).fill('john@acme.com');
    await page.getByRole('checkbox', { name: /agree to receive/i }).check();
    
    await page.getByRole('button', { name: /Get My Free Preview/i }).click();
    
    // Wait for success message
    await expect(page.getByText(/Thank you! We're on it/i)).toBeVisible({ timeout: 10000 });
  });

  test('should be mobile responsive', async ({ page, viewport }) => {
    if (viewport && viewport.width < 768) {
      await expect(page.getByLabel(/Full Name/i)).toBeVisible();
      
      const input = page.getByLabel(/Full Name/i);
      const box = await input.boundingBox();
      
      expect(box).not.toBeNull();
      if (box) {
        expect(box.width).toBeGreaterThan(200); // Ensure input is wide enough
      }
    }
  });
});

test.describe('Performance', () => {
  test('should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000); // Should load in under 3 seconds
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    expect(errors).toHaveLength(0);
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);
    
    // Check that h1 exists and is visible
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');
    
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    let focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Press Tab a few more times
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      focusedElement = await page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
  });
});
