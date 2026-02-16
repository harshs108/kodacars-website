import React, { useState } from 'react';
import { Ticket, Car, ShieldCheck, Sparkles, Info, ArrowRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const steps = [
    {
      number: "01",
      title: "Pre-Arrival: Effortless Booking",
      icon: <Ticket className="w-10 h-10 lg:w-12 lg:h-12" strokeWidth={1.5} />,
      items: [
        "White Label Reservation Site",
        "Forward Airline Itinerary to Book",
        "No Repeat Data Entry"
      ]
    },
    {
      number: "02",
      title: "Arrival & Parking: Streamlined Entry",
      icon: <Car className="w-10 h-10 lg:w-12 lg:h-12" strokeWidth={1.5} />,
      items: [
        "Express QR Code Check-in",
        "Parking Attendant App for Valet/Self-Park",
        "Damage Tracker & Key Location"
      ]
    },
    {
      number: "03",
      title: "During Stay: Smart Management",
      icon: <ShieldCheck className="w-10 h-10 lg:w-12 lg:h-12" strokeWidth={1.5} />,
      items: [
        "AI Dynamic Pricing Engine",
        "Real-time Occupancy Management",
        "Customer Track Shuttle App"
      ]
    },
    {
      number: "04",
      title: "Departure & Beyond: Automated Engagement",
      icon: <Sparkles className="w-10 h-10 lg:w-12 lg:h-12" strokeWidth={1.5} />,
      items: [
        "Express Self Check-out",
        "Automated Email & SMS Marketing",
        "Loyalty Program & Reputation Management"
      ]
    }
  ];

  const handleToggleFlip = (idx: number) => {
    // Only toggle on mobile widths
    if (window.innerWidth < 1024) {
      setFlippedIndex(flippedIndex === idx ? null : idx);
    }
  };

  return (
    <section id="how-it-works" className="py-24 bg-white scroll-mt-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-5xl font-normal text-koda-black mb-6">How It Works</h2>
          <p className="text-xl lg:text-2xl text-gray-700 font-semibold max-w-2xl">
            Purpose-built for near-airport parking businesses to maximize every space, capture every revenue opportunity, and run smoother operations—without adding overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              onClick={() => handleToggleFlip(idx)}
              className="relative group h-[340px] lg:h-[480px] [perspective:1000px] cursor-pointer lg:cursor-default"
            >
              {/* Inner container for 3D flip effect - Active only on mobile via state */}
              <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${flippedIndex === idx ? '[transform:rotateY(180deg)]' : ''}`}>
                
                {/* Front Face: Visible by default, handles hover logic on desktop */}
                <div className="absolute inset-0 [backface-visibility:hidden] p-6 lg:p-10 bg-white border border-gray-200 flex flex-col justify-center transition-all duration-500 lg:group-hover:border-koda-blue lg:group-hover:shadow-xl overflow-hidden">
                  {/* Vertical Expansion Bar (Desktop) */}
                  <div className="absolute top-0 left-0 w-1.5 h-0 bg-koda-blue lg:group-hover:h-full transition-all duration-300"></div>

                  {/* Step Number Backdrop */}
                  <div className="text-5xl lg:text-7xl font-bold text-gray-200 absolute top-4 right-6 lg:right-8 select-none lg:group-hover:text-koda-blue/5 transition-colors duration-500">
                    {step.number}
                  </div>
                  
                  {/* Content Wrapper */}
                  <div className="relative z-10 w-full">
                    {/* Icon */}
                    <div className="mb-6 lg:mb-8 text-koda-black lg:group-hover:text-koda-blue transition-colors duration-500">
                      {step.icon}
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg lg:text-2xl font-bold text-koda-black leading-tight transition-all duration-500 lg:group-hover:text-koda-blue">
                      {step.title}
                    </h3>

                    {/* Desktop Only Features List */}
                    <div className="hidden lg:block max-h-0 opacity-0 overflow-hidden lg:group-hover:max-h-60 lg:group-hover:opacity-100 lg:group-hover:mt-8 transition-all duration-500 ease-in-out">
                      <ul className="space-y-4">
                        {step.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start text-base text-gray-800 font-bold leading-snug">
                            <span className="w-2 h-2 bg-koda-blue rounded-full mt-1.5 mr-3 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile Only visual hint */}
                    <div className="mt-6 lg:hidden flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <Info size={12} /> Tap for details
                    </div>
                  </div>
                </div>

                {/* Back Face: Visible only on mobile flip */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-6 lg:p-10 bg-white border-2 border-koda-blue flex flex-col justify-center lg:hidden shadow-2xl overflow-hidden">
                  {/* Step Title on Back */}
                  <h3 className="text-base font-bold text-koda-blue mb-4 uppercase tracking-widest border-b border-gray-100 pb-2">
                    {step.title}
                  </h3>
                  
                  {/* List on Back */}
                  <ul className="space-y-3 lg:space-y-6 flex-grow">
                    {step.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start text-sm font-bold leading-snug text-gray-800">
                        <span className="w-2 h-2 bg-koda-blue rounded-full mt-1.5 mr-3 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center text-koda-blue font-bold text-[10px] uppercase tracking-widest gap-2">
                    Close <ArrowRight size={14} className="rotate-180" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;