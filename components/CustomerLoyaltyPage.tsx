import React, { useState } from 'react';
import { ArrowLeft, FileText, Check, Download, ArrowRight, Loader2, AlertCircle, Shield } from 'lucide-react';
import { sendWhitepaperRequest, verifyRecaptcha } from '../services/emailService';
import { downloadWhitepaper, getWhitepaperInfo } from '../utils/pdfUtils';

const CustomerLoyaltyPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: ''
  });

  const whitepaperInfo = getWhitepaperInfo('customer-loyalty');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step 1: Verify reCAPTCHA (protect against spam)
      const recaptchaToken = await verifyRecaptcha();
      
      if (!recaptchaToken) {
        throw new Error('reCAPTCHA verification failed. Please try again.');
      }

      // Step 2: Send email notification to sales@kodacars.com
      const emailSent = await sendWhitepaperRequest({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        whitepaperType: 'Customer Loyalty'
      });

      if (!emailSent) {
        throw new Error('Failed to send email notification');
      }

      // Wait a moment for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'There was an error processing your request. Please try again or contact us directly.');
      console.error('Form submission error:', err);
    }
  };

  const handlePDFDownload = () => {
    if (whitepaperInfo) {
      downloadWhitepaper('customer-loyalty');
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-white font-sans antialiased animate-fade-in">
      {/* IBM-style Breadcrumb / Navigation Bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-16 py-6">
          <a 
            href="#insights-page" 
            className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-koda-blue transition-colors group"
          >
            <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Whitepaper Overview (Content) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-koda-blue mb-8">
              <div className="p-2.5 bg-gray-50 border border-gray-100">
                <FileText size={22} />
              </div>
              <span className="uppercase tracking-[0.25em] text-xs font-bold">White Paper</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-normal text-koda-black leading-[1.05] mb-10 tracking-tight">
              <span className="font-bold">Customer Loyalty:</span> Building Customer Loyalty in Off-Airport Parking
            </h1>

            <div className="space-y-8 text-gray-700 font-medium leading-relaxed">
              <p className="text-xl lg:text-2xl text-koda-black">
                In the highly competitive off-airport parking industry, customer loyalty is the essential engine for predictable revenue and sustainable growth. Retaining existing customers is significantly more cost-effective than acquiring new ones.
              </p>
              
              <p className="text-xl lg:text-2xl">
                The solution lies in transforming the parking experience from a stressful transaction to a seamless, personalized service.
              </p>

              <div className="mt-16">
                <h2 className="text-2xl font-bold text-koda-black mb-10 border-b border-gray-100 pb-4">In this white paper, you can find:</h2>
                
                <div className="space-y-10">
                  {[
                    "A detailed framework for achieving a frictionless digital experience that wins loyalty.",
                    "Insights into why friction is fatal, as 88% of customers are likely to make repeat purchases only with companies offering good customer service.",
                    "Strategies for leveraging customer data to personalize offerings and maximize Customer Lifetime Value (CLV).",
                    "The blueprint for implementing tiered loyalty programs that use gamification to create an aspirational path to premium perks like priority service or guaranteed space.",
                    "Guidance on adopting technology for eliminating wait times via mobile self-check-in and implementing contactless payments (preferred by 85% of consumers)."
                  ].map((point, idx) => (
                    <div key={idx} className="flex gap-6 items-start group">
                      <div className="mt-2 w-2 h-2 rounded-full bg-koda-blue shrink-0 group-hover:scale-125 transition-transform duration-300" />
                      <p className="text-lg lg:text-xl text-gray-800 leading-snug">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-20 py-8 px-10 bg-gray-50 border-l-4 border-koda-blue">
                <p className="text-xl font-bold text-koda-black italic">
                  Access the full report by filling out the form.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: PDF Download Lead Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              {!submitted ? (
                <div className="bg-white border border-gray-200 p-8 lg:p-12 shadow-sm relative overflow-hidden">
                  {/* IBM Visual Accent Stripe */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-koda-blue"></div>
                  
                  <h3 className="text-2xl font-bold text-koda-black mb-10">Download Whitepaper</h3>
                  
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
                  
                  <form onSubmit={handleDownload} className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">First Name</label>
                        <input 
                          required 
                          type="text" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-koda-blue outline-none transition-colors font-semibold text-lg" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Last Name</label>
                        <input 
                          required 
                          type="text" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-koda-blue outline-none transition-colors font-semibold text-lg" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Business Email</label>
                      <input 
                        required 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-koda-blue outline-none transition-colors font-semibold text-lg" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Company Name</label>
                      <input 
                        required 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-koda-blue outline-none transition-colors font-semibold text-lg" 
                      />
                    </div>

                    <div className="pt-4">
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <div className="relative mt-1">
                          <input required type="checkbox" className="peer h-5 w-5 appearance-none border-2 border-gray-200 checked:bg-koda-blue checked:border-koda-blue transition-all cursor-pointer" />
                          <Check className="absolute top-0.5 left-0.5 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" size={16} strokeWidth={4} />
                        </div>
                        <span className="text-sm text-gray-600 font-medium leading-relaxed">
                          By supplying your contact details, you agree to receive occasional emails related to services and industry trends from KodaCars. To know more, please refer to our <a href="#" className="text-koda-blue underline underline-offset-4 hover:text-koda-darkblue font-bold">privacy policy</a>.
                        </span>
                      </label>
                    </div>

                    <button 
                      disabled={loading}
                      type="submit" 
                      className="w-full bg-koda-blue text-white py-6 px-8 font-bold text-xl flex items-center justify-between group hover:bg-koda-darkblue transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span>Processing...</span>
                          <Loader2 className="animate-spin" size={24} />
                        </>
                      ) : (
                        <>
                          <span>Download Whitepaper</span>
                          <ArrowRight className="transform group-hover:translate-x-1 transition-transform" size={24} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 p-12 text-center shadow-xl animate-fade-in-up">
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
                    <Check size={48} />
                  </div>
                  <h3 className="text-3xl font-bold text-koda-black mb-4">Access Granted</h3>
                  <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                    Thank you, {formData.firstName}! Your whitepaper has been prepared and is ready for immediate download.
                  </p>
                  <button 
                    onClick={handlePDFDownload}
                    className="inline-flex items-center justify-center w-full bg-koda-blue text-white py-6 px-8 font-bold text-xl gap-3 hover:bg-koda-darkblue transition-all shadow-lg"
                  >
                    <Download size={24} />
                    Download PDF Here
                  </button>
                  <p className="mt-8 text-sm text-gray-400 font-bold uppercase tracking-widest">A copy has been sent to {formData.email}</p>
                </div>
              )}

              {/* IBM Style Quote / Social Proof */}
              <div className="mt-12 p-8 border border-gray-100 bg-gray-50/40 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" alt="Executive" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-gray-600 italic font-medium leading-relaxed text-sm">
                    "This framework helped us quantify the value of every repeat customer at our SEA facility."
                  </p>
                  <p className="text-xs font-bold text-koda-black mt-2 uppercase tracking-widest">— Revenue Director, Seattle Airport Parking</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerLoyaltyPage;