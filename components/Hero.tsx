import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const stats = [
    { value: "30-40%", label: "INCREASE IN REVENUE" },
    { value: "6%", label: "INCREASE IN SPOT UTILIZATION" },
  ];

  return (
    <section className="w-full bg-white border-b border-gray-200 pt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20 grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Text & Stats */}
        <div className="flex flex-col items-start text-left animate-fade-in-up overflow-hidden">
          <p className="text-[0.75rem] font-bold text-koda-purple tracking-widest uppercase mb-4 lg:mb-6">
            Trusted by near-AIRPORT parking businesses across the nation
          </p>
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-normal text-koda-black leading-[1.1] mb-5 lg:mb-8 tracking-tight">
            Boost Parking Revenue with our <br />
            <span className="font-semibold">AI-Powered Solutions</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 mb-8 lg:mb-12 leading-relaxed font-semibold max-w-lg">
            Turn every parking space into a profit powerhouse — with smart management, dynamic pricing, and lucrative add-ons.
          </p>

          {/* Stats section */}
          <div className="w-full border-t border-gray-100 pt-8 lg:pt-10">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Real Results from Real Businesses</h3>
            <div className="flex gap-12 lg:gap-16">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-5xl lg:text-6xl font-normal text-koda-purple mb-2">{stat.value}</span>
                  <span className="text-xs font-bold text-gray-600 max-w-[120px] leading-tight uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Video & Buttons */}
        <div className="w-full animate-fade-in-up delay-100 flex flex-col items-center lg:items-end">
          <div className="w-full max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-normal text-koda-black mb-6 tracking-tight text-center">
              Same Spaces, <span className="font-bold">Higher Profits.</span>
            </h2>
            <div className="w-full rounded-lg overflow-hidden shadow-2xl bg-black border border-gray-100 mb-10 aspect-video relative">
              <video 
                src="/videos/hero-video.mp4" 
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                controls
                playsInline
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <a 
                href="#contact"
                className="flex-1 inline-flex items-center justify-between px-6 py-5 bg-koda-purple text-white hover:bg-koda-darkblue transition-colors text-base font-bold"
              >
                <span>Get a Fee Waived Trial</span>
                <ArrowRight size={20} />
              </a>
               <a 
                href="#contact"
                className="flex-1 inline-flex items-center justify-between px-6 py-5 bg-transparent border border-gray-200 text-koda-black hover:bg-gray-50 transition-colors text-base font-bold"
              >
                <span>Book Demo</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;