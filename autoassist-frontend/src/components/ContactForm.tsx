import { Component, createSignal, Show } from 'solid-js';
import { submitContactForm, type ContactFormData } from '~/lib/api';

interface FormData {
  fullName: string;
  company: string;
  website: string;
  goal: string;
  budget: string;
  email: string;
  phone: string;
  consent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm: Component = () => {
  const [formData, setFormData] = createSignal<FormData>({
    fullName: '',
    company: '',
    website: '',
    goal: '',
    budget: '',
    email: '',
    phone: '',
    consent: false,
  });

  const [errors, setErrors] = createSignal<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [isSuccess, setIsSuccess] = createSignal(false);
  const [serverError, setServerError] = createSignal('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const data = formData();

    if (!data.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!data.company.trim()) newErrors.company = 'Company name is required';
    if (!data.website.trim()) newErrors.website = 'Website or Instagram is required';
    if (!data.goal.trim()) newErrors.goal = 'Please tell us your goal';
    if (!data.budget) newErrors.budget = 'Please select a budget range';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!data.consent) newErrors.consent = 'You must agree to receive the preview';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Capture UTM parameters
      const utmData = typeof window !== 'undefined' ? (() => {
        const urlParams = new URLSearchParams(window.location.search);
        return {
          utm_source: urlParams.get('utm_source') || '',
          utm_medium: urlParams.get('utm_medium') || '',
          utm_campaign: urlParams.get('utm_campaign') || '',
          utm_content: urlParams.get('utm_content') || '',
          utm_term: urlParams.get('utm_term') || '',
        };
      })() : {
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_content: '',
        utm_term: '',
      };

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData(),
          ...utmData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      setIsSuccess(true);
    } catch (error: any) {
      console.error('Form submission error:', error);
      setServerError(
        error.message || 'Something went wrong. Please try again or email us at autoassist.contact@yahoo.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData({ ...formData(), [field]: value });
    // Clear error when user starts typing
    if (errors()[field]) {
      const newErrors = { ...errors() };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
    <Show
      when={!isSuccess()}
      fallback={
        <div class="card text-center animate-fade-in">
          <div class="w-16 h-16 bg-status-success rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="heading-subsection mb-4">Thank you! We're on it.</h3>
          <p class="body-base mb-6">
            You'll receive your free homepage preview within 24–48 hours at{' '}
            <strong>{formData().email}</strong>. We've also sent a confirmation email—check your
            inbox (and spam folder, just in case).
          </p>
          <p class="text-sm text-text-tertiary">
            In the meantime, feel free to browse our case studies or read our FAQ.
          </p>
        </div>
      }
    >
      <form onSubmit={handleSubmit} class="card">
        <div class="mb-8">
          <h3 class="text-2xl font-serif font-semibold mb-2">Get Your Free Homepage Preview</h3>
          <p class="text-text-secondary">
            Tell us about your project. We'll send a custom homepage design concept within 24–48
            hours—no commitment required.
          </p>
        </div>

        <div class="space-y-6">
          {/* Full Name */}
          <div>
            <label for="fullName" class="block text-sm font-semibold text-text-primary mb-2">
              Full Name <span class="text-status-error">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              value={formData().fullName}
              onInput={(e) => updateField('fullName', e.currentTarget.value)}
              placeholder="Your full name"
              class={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all ${
                errors().fullName ? 'border-status-error' : 'border-border-medium'
              }`}
              aria-invalid={!!errors().fullName}
              aria-describedby={errors().fullName ? 'fullName-error' : undefined}
            />
            {errors().fullName && (
              <p id="fullName-error" class="mt-1 text-sm text-status-error">
                {errors().fullName}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label for="company" class="block text-sm font-semibold text-text-primary mb-2">
              Company Name <span class="text-status-error">*</span>
            </label>
            <input
              type="text"
              id="company"
              value={formData().company}
              onInput={(e) => updateField('company', e.currentTarget.value)}
              placeholder="Your business or brand name"
              class={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all ${
                errors().company ? 'border-status-error' : 'border-border-medium'
              }`}
              aria-invalid={!!errors().company}
            />
            {errors().company && (
              <p class="mt-1 text-sm text-status-error">{errors().company}</p>
            )}
          </div>

          {/* Website/Instagram */}
          <div>
            <label for="website" class="block text-sm font-semibold text-text-primary mb-2">
              Website or Instagram <span class="text-status-error">*</span>
            </label>
            <input
              type="text"
              id="website"
              value={formData().website}
              onInput={(e) => updateField('website', e.currentTarget.value)}
              placeholder="yoursite.com or @yourhandle"
              class={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all ${
                errors().website ? 'border-status-error' : 'border-border-medium'
              }`}
              aria-invalid={!!errors().website}
            />
            <p class="mt-1 text-xs text-text-tertiary">We'll review your current online presence</p>
            {errors().website && (
              <p class="mt-1 text-sm text-status-error">{errors().website}</p>
            )}
          </div>

          {/* Goal */}
          <div>
            <label for="goal" class="block text-sm font-semibold text-text-primary mb-2">
              What's your primary goal? <span class="text-status-error">*</span>
            </label>
            <input
              type="text"
              id="goal"
              value={formData().goal}
              onInput={(e) => updateField('goal', e.currentTarget.value)}
              placeholder="e.g., Generate more leads, sell products online, launch new service"
              class={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all ${
                errors().goal ? 'border-status-error' : 'border-border-medium'
              }`}
              aria-invalid={!!errors().goal}
            />
            <p class="mt-1 text-xs text-text-tertiary">One sentence is perfect</p>
            {errors().goal && <p class="mt-1 text-sm text-status-error">{errors().goal}</p>}
          </div>

          {/* Budget */}
          <div>
            <label for="budget" class="block text-sm font-semibold text-text-primary mb-2">
              Budget Range <span class="text-status-error">*</span>
            </label>
            <select
              id="budget"
              value={formData().budget}
              onChange={(e) => updateField('budget', e.currentTarget.value)}
              class={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all ${
                errors().budget ? 'border-status-error' : 'border-border-medium'
              }`}
              aria-invalid={!!errors().budget}
            >
              <option value="">Select a range</option>
              <option value="under-1500">Under $1,500</option>
              <option value="1500-3000">$1,500 – $3,000</option>
              <option value="3000-5000">$3,000 – $5,000</option>
              <option value="above-5000">Above $5,000</option>
              <option value="not-sure">Not sure yet</option>
            </select>
            {errors().budget && <p class="mt-1 text-sm text-status-error">{errors().budget}</p>}
          </div>

          {/* Email */}
          <div>
            <label for="email" class="block text-sm font-semibold text-text-primary mb-2">
              Email Address <span class="text-status-error">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData().email}
              onInput={(e) => updateField('email', e.currentTarget.value)}
              placeholder="you@company.com"
              class={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all ${
                errors().email ? 'border-status-error' : 'border-border-medium'
              }`}
              aria-invalid={!!errors().email}
            />
            {errors().email && <p class="mt-1 text-sm text-status-error">{errors().email}</p>}
          </div>

          {/* Phone (optional) */}
          <div>
            <label for="phone" class="block text-sm font-semibold text-text-primary mb-2">
              Phone Number <span class="text-text-tertiary">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={formData().phone}
              onInput={(e) => updateField('phone', e.currentTarget.value)}
              placeholder="+1 (555) 000-0000"
              class="w-full px-4 py-3 border border-border-medium rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
            />
            <p class="mt-1 text-xs text-text-tertiary">Only if you'd like us to call you</p>
          </div>

          {/* Consent Checkbox */}
          <div>
            <label class="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData().consent}
                onChange={(e) => updateField('consent', e.currentTarget.checked)}
                class="mt-1 w-5 h-5 text-accent-primary border-border-medium rounded focus:ring-2 focus:ring-accent-primary"
                aria-invalid={!!errors().consent}
              />
              <span class="text-sm text-text-secondary">
                I agree to receive my free homepage preview and occasional updates from
                AutoAssist.ai. You can unsubscribe anytime.{' '}
                <a href="/privacy" class="text-accent-primary hover:text-accent-hover">
                  Privacy Policy
                </a>
                <span class="text-status-error"> *</span>
              </span>
            </label>
            {errors().consent && <p class="mt-1 text-sm text-status-error">{errors().consent}</p>}
          </div>

          {/* Server Error */}
          {serverError() && (
            <div class="p-4 bg-status-error/10 border border-status-error rounded-xl">
              <p class="text-sm text-status-error">{serverError()}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting()}
            class="btn-accent w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting() ? (
              <span class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : 'Get My Free Preview'}
          </button>
        </div>
      </form>
    </Show>
  );
};

export default ContactForm;
