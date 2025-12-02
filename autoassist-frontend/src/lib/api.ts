// API client for backend communication

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface ContactFormData {
  fullName: string;
  company: string;
  website: string;
  goal: string;
  budget: string;
  email: string;
  phone?: string;
  newsletter: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Submit contact form to backend
 */
export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: data.fullName,
        company: data.company,
        website: data.website,
        goal: data.goal,
        budget: data.budget,
        email: data.email,
        phone: data.phone || '',
        newsletter: data.newsletter,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit form');
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Form submitted successfully! We\'ll contact you within 24 hours.',
      data: result,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit form. Please try again.',
    };
  }
}

/**
 * Subscribe to newsletter
 */
export async function subscribeNewsletter(email: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to subscribe');
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: result,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.',
    };
  }
}
