import React, { useState } from 'react';
import { MapPin, Phone, Mail, Apple, Play, ArrowRight, Check, Loader2, ArrowLeft, AlertCircle, Shield } from 'lucide-react';
import { sendContactForm, verifyRecaptcha } from '../services/emailService';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    spaces: '',
    comments: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step 1: Verify reCAPTCHA (protect against spam)
      const recaptchaToken = await verifyRecaptcha();
      
      if (!recaptchaToken) {
        throw new Error('reCAPTCHA verification failed. Please try again.');
      }

      // Step 2: Send the form data via email
      const emailSent = await sendContactForm({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        spaces: formData.spaces,
        comments: formData.comments
      });

      if (!emailSent) {
        throw new Error('Failed to send your message. Please try again.');
      }

      // Step 3: Show success message
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
      setSubmitted(true);
      
      // Track successful submission in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'contact_form_submit', {
          event_category: 'Contact',
          event_label: 'Main Contact Form',
        });
      }
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again or contact us directly at sales@kodacars.com');
      console.error('Contact form error:', err);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-white font-sans antialiased animate-fade-in">
      {/* Navigation / Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-16 py-6">
          <a 
            href="#" 
            className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-koda-blue transition-colors group"
          >
            <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Contact Info, Map & Apps */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="mb-12">
              <div className="flex items-center gap-3 text-koda-blue mb-8">
                <div className="p-2.5 bg-gray-50 border border-gray-100">
                  <Mail size={22} />
                </div>
                <span className="uppercase tracking-[0.25em] text-xs font-bold">Inquiry</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-normal text-koda-black leading-[1.05] mb-12 tracking-tight">
                How can we <br />
                <span className="font-bold">help you?</span>
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 text-koda-blue shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Headquarters</h3>
                    <p className="text-lg text-koda-black font-semibold leading-snug">
                      103 Carnegie Center Dr, <br />
                      Princeton, NJ 08540
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 text-koda-blue shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Support</h3>
                    <p className="text-lg text-koda-black font-semibold leading-snug">
                      +1 (609) 212-4110
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="w-full h-80 bg-gray-100 border border-gray-200 shadow-sm mb-12 overflow-hidden">
                <iframe 
                  title="KodaCars Princeton Office"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.2618844889657!2d-74.65435942345!3d40.32211996117564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3e2189d2d8805%3A0x6b777a988d87b1c1!2s103%20Carnegie%20Center%20Dr%2C%20Princeton%2C%20NJ%2008540!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  style={{ filter: 'grayscale(0.2) contrast(1.1)', border: 0 }}
                  allowFullScreen
                ></iframe>
              </div>
            </div>

{/* App Stores Section */}
<div className="pt-12 border-t border-gray-100 mt-auto">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Mobile Ecosystem</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Apple App Store Button */}
                <a
                  href="https://apps.apple.com/us/app/kodacars-park-rent-share/id6477275668"
                  className="flex items-center gap-4 bg-koda-black text-white px-6 py-4 hover:bg-gray-800 transition-all group"
                >
                  {/* Official Apple logo SVG */}
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 leading-none mb-1">Download on the</p>
                    <p className="text-xl font-bold leading-none">App Store</p>
                  </div>
                </a>

                {/* Google Play Button */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.bsfive.kodacars&hl=en_US&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-koda-black text-white px-6 py-4 hover:bg-gray-800 transition-all group"
                >
                  {/* Official Google Play logo SVG */}
                  <svg viewBox="0 0 24 24" className="w-8 h-8 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.18 23.76c.3.17.64.24.99.2l12.45-11.94L13.2 8.6 3.18 23.76z" fill="#EA4335"/>
                    <path d="M20.46 10.28l-3.03-1.75-3.67 3.52 3.67 3.52 3.06-1.77c.87-.5.87-1.76-.03-2.52z" fill="#FBBC04"/>
                    <path d="M3.18.24C2.83.2 2.49.27 2.19.44L13.2 11.4l3.42-3.42L3.18.24z" fill="#4285F4"/>
                    <path d="M2.19.44C1.67.74 1.33 1.3 1.33 2.06v19.88c0 .76.34 1.32.86 1.62l.99.2L13.2 12 2.19.44z" fill="#34A853"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 leading-none mb-1">Get it on</p>
                    <p className="text-xl font-bold leading-none">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>


          {/* Right Column: Submission Form with reCAPTCHA */}
          <div className="lg:col-span-6 flex flex-col justify-start items-center lg:items-end">
            {!submitted ? (
              <div className="bg-white border border-gray-200 p-8 lg:p-12 shadow-sm relative overflow-hidden w-full max-w-lg">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-koda-blue"></div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-koda-black mb-4">Submit the Form to Start</h3>
                <p className="text-gray-500 font-medium mb-8">Connect with an enterprise solutions architect to discuss your revenue goals.</p>
                
                {/* reCAPTCHA Badge Info */}
                <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 flex items-start gap-3">
                  <Shield size={20} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700">
                    This form is protected by reCAPTCHA and the Google{' '}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">Privacy Policy</a> and{' '}
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">Terms of Service</a> apply.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name *</label>
                    <input 
                      required 
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-koda-blue outline-none transition-colors font-semibold text-lg" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone Number *</label>
                      <input 
                        required 
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-koda-blue outline-none transition-colors font-semibold text-lg" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address *</label>
                      <input 
                        required 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-koda-blue outline-none transition-colors font-semibold text-lg" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Number of Parking Spaces</label>
                    <input 
                      name="spaces"
                      type="text" 
                      placeholder="e.g. 500+"
                      value={formData.spaces}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-koda-blue outline-none transition-colors font-semibold text-lg" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Comments</label>
                    <textarea 
                      name="comments"
                      rows={3}
                      value={formData.comments}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-koda-blue outline-none transition-colors font-semibold text-lg resize-none" 
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                      By submitting this form, you agree to our <a href="#" className="text-koda-blue underline font-bold">Privacy Policy</a>.
                    </p>
                    
                    <button 
                      disabled={loading}
                      type="submit" 
                      className="w-full bg-koda-blue text-white py-6 px-10 font-bold text-xl flex items-center justify-between group hover:bg-koda-darkblue transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span>Sending...</span>
                          <Loader2 className="animate-spin" size={24} />
                        </>
                      ) : (
                        <>
                          <span>Connect with Sales</span>
                          <ArrowRight className="transform group-hover:translate-x-1 transition-transform" size={24} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 p-12 lg:p-16 text-center shadow-xl animate-fade-in-up w-full max-w-lg">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 border border-green-100">
                  <Check size={40} />
                </div>
                <h3 className="text-3xl font-bold text-koda-black mb-6">Request Received</h3>
                <p className="text-gray-600 text-lg mb-12 leading-relaxed">
                  Thank you, {formData.fullName}! Our team will contact you shortly to discuss your request.
                </p>
                <div className="pt-8 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sent to</p>
                  <p className="text-lg font-bold text-koda-black mt-2">KodaCars Team!</p>
                </div>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      phone: '',
                      email: '',
                      spaces: '',
                      comments: ''
                    });
                  }}
                  className="mt-12 inline-flex items-center text-koda-blue font-bold text-lg hover:underline gap-2"
                >
                  <ArrowLeft size={20} />
                  Return to Form
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Trust Quote */}
      <div className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-2xl lg:text-3xl text-gray-700 italic font-medium leading-relaxed mb-8">
            "KodaCars transformed our manual valet process into a high-yield digital ecosystem. Their implementation team was exceptional."
          </p>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Executive" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-bold text-koda-black uppercase tracking-widest">Marcus Thorne</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">VP OF PRODUCT STRATEGY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
