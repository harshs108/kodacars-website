import React, { useState } from 'react';
import { ArrowLeft, Shield, Check, Download, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { sendWhitepaperRequest, verifyRecaptcha } from '../services/emailService';
import { downloadWhitepaper, getWhitepaperInfo } from '../utils/pdfUtils';

const ReputationManagementPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: ''
  });

  const whitepaperInfo = getWhitepaperInfo('reputation-management');

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
        whitepaperType: 'Reputation Management'
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
      downloadWhitepaper('reputation-management');
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
                <Shield size={22} />
              </div>
              <span className="uppercase tracking-[0.25em] text-xs font-bold">White Paper</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-normal text-koda-black leading-[1.05] mb-10 tracking-tight">
              <span className="font-bold">Reputation Management:</span> Leveraging Digital Excellence in Off-Airport Parking
            </h1>

            <div className="space-y-8 text-gray-700 font-medium leading-relaxed">
              <p className="text-xl lg:text-2xl text-koda-black">
                In the competitive off-airport parking sector, the parking experience is immediately converted into an online reputation that directly affects bookings and revenue.
              </p>
              
              <p className="text-xl lg:text-2xl">
                Since <strong>93%</strong> of people read online reviews before making a purchase, and a negative online reputation causes <strong>94%</strong> of consumers to avoid a brand, managing this experience is essential.
              </p>

              <p className="text-xl lg:text-2xl font-semibold text-koda-blue border-l-4 border-koda-blue pl-6 py-2">
                The solution is using technology as the most effective reputation defense to eliminate the operational friction that damages your brand.
              </p>

              <div className="mt-16">
                <h2 className="text-2xl font-bold text-koda-black mb-10 border-b border-gray-100 pb-4">In this white paper, you can find:</h2>
                
                <div className="space-y-10">
                  {[
                    "The direct revenue correlation showing how operational quality is tied to a hotel's brand and reinforces its reputation.",
                    "Insights into why operational friction (long waits, staff errors) is the primary trigger for the most damaging negative reviews.",
                    "A blueprint for how Digital Self-Check-in eliminates negative review sources like long queues and staff inconsistency, ensuring travelers proceed directly to the shuttle.",
                    "Guidance on leveraging digitally signed waivers and time-stamped digital records to mitigate legal and reputational fallout from incidents.",
                    "Best practices for engagement, including responding to all reviews (as 45% of consumers are more likely to frequent a business that responds), and the importance of a 24-hour response time."
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
                  Access the full report by filling out the form below.
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
                  <h3 className="text-3xl font-bold text-koda-black mb-4">Verification Successful</h3>
                  <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                    Thank you, {formData.firstName}! Your reputation management framework is now available for download.
                  </p>
                  <button 
                    onClick={handlePDFDownload}
                    className="inline-flex items-center justify-center w-full bg-koda-blue text-white py-6 px-8 font-bold text-xl gap-3 hover:bg-koda-darkblue transition-all shadow-lg"
                  >
                    <Download size={24} />
                    Download PDF Here
                  </button>
                </div>
              )}

              {/* IBM Style Quote / Social Proof */}
              <div className="mt-12 p-8 border border-gray-100 bg-gray-50/40 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200" alt="Executive" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-gray-600 italic font-medium leading-relaxed text-sm">
                    "Managing friction through technology is the single most effective way to protect our airport parking brand."
                  </p>
                  <p className="text-xs font-bold text-koda-black mt-2 uppercase tracking-widest">— Ops Director, National Parking Group</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReputationManagementPage;