/**
 * Email Service for KodaCars
 * 
 * This file handles all form submissions and sends emails using Web3Forms.
 * Web3Forms is a free service that doesn't require a backend server.
 * 
 * How it works:
 * 1. User fills out a form
 * 2. Form data is sent to Web3Forms API
 * 3. Web3Forms forwards the email to sales@kodacars.com
 * 4. User receives confirmation
 */

// Web3Forms API endpoint
const WEB3FORMS_API = "https://api.web3forms.com/submit";

// Your Web3Forms Access Key
// You'll need to get this from https://web3forms.com (it's free)
// For now, using a demo key - REPLACE THIS with your actual key
const ACCESS_KEY = "79d3024b-f632-4cb4-b364-f8d467e8d586";

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  spaces?: string;
  comments?: string;
}

export interface WhitepaperFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  whitepaperType: string;
}

/**
 * Send contact form submission
 * This is used for the main contact page
 */
export const sendContactForm = async (data: ContactFormData): Promise<boolean> => {
  try {
    const formData = {
      access_key: ACCESS_KEY,
      subject: "New Contact Form Submission - KodaCars",
      from_name: data.fullName,
      email: data.email,
      phone: data.phone,
      parking_spaces: data.spaces || "Not provided",
      message: data.comments || "No additional comments",
      to_email: "sales@kodacars.com",
    };

    const response = await fetch(WEB3FORMS_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    
    if (result.success) {
      // Track successful form submission in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submission', {
          event_category: 'Contact',
          event_label: 'Contact Form',
        });
      }
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error sending contact form:", error);
    return false;
  }
};

/**
 * Send whitepaper download request
 * This is used for all whitepaper landing pages
 */
export const sendWhitepaperRequest = async (data: WhitepaperFormData): Promise<boolean> => {
  try {
    const formData = {
      access_key: ACCESS_KEY,
      subject: `Whitepaper Download Request - ${data.whitepaperType}`,
      from_name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      company: data.company,
      whitepaper: data.whitepaperType,
      to_email: "sales@kodacars.com",
    };

    const response = await fetch(WEB3FORMS_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    
    if (result.success) {
      // Track successful whitepaper download in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'whitepaper_download', {
          event_category: 'Lead Generation',
          event_label: data.whitepaperType,
        });
      }
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error sending whitepaper request:", error);
    return false;
  }
};

/**
 * Verify reCAPTCHA token
 * This is used to prevent spam on the contact form
 */
export const verifyRecaptcha = async (): Promise<string | null> => {
  try {
    // Check if grecaptcha is loaded
    if (typeof window === 'undefined' || !window.grecaptcha) {
      console.error("reCAPTCHA not loaded");
      return null;
    }

    // Execute reCAPTCHA and get token
    // Replace with your actual reCAPTCHA site key
    const token = await window.grecaptcha.execute('6LeyhWksAAAAABqP_qr0a6wVG9gUuKwqfgNHrKOF', {
      action: 'submit'
    });
    
    return token;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return null;
  }
};

// TypeScript declarations for global grecaptcha
declare global {
  interface Window {
    grecaptcha: any;
    gtag: (...args: any[]) => void;
  }
}
