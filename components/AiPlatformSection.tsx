import React, { useState } from 'react';
import { 
  Car, 
  BarChart, 
  CalendarCheck, 
  DoorOpen, 
  Heart, 
  ArrowRight, 
  LineChart,
  Info
} from 'lucide-react';

const AiPlatformSection: React.FC = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  interface FeatureItem {
    image: string;
    icon: React.ReactNode;
    title: string;
    desc: string;
  }

  const features: FeatureItem[] = [
    { 
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800", 
      icon: <LineChart size={40} strokeWidth={1.5} />,
      title: "Smart Engine Pricing", 
      desc: "Set dynamic pricing based on demand, seasonality, and booking patterns to maximize revenue." 
    },
    { 
      image: "https://lh3.googleusercontent.com/d/1tEOU57q2onMycgGdhCnewZQNyfYSv_R4",
      icon: <Car size={40} strokeWidth={1.5} />, 
      title: "Vehicle Management", 
      desc: "Track vehicle types and apply automatic fees for oversized vehicles like SUVs and trucks." 
    },
    { 
      image: "https://lh3.googleusercontent.com/d/1C6-JTLFUyCiLiVUQtk_tFXr_toED2Zrh",
      icon: <BarChart size={40} strokeWidth={1.5} />, 
      title: "Instant Analytics Dashboard", 
      desc: "Monitor occupancy rates, revenue, and customer-centric metrics in real-time." 
    },
    { 
      image: "https://lh3.googleusercontent.com/d/1e7C1NghFnsLRwEa1jHyoZ-QpVUY5eATu",
      icon: <CalendarCheck size={40} strokeWidth={1.5} />, 
      title: "Booking Management", 
      desc: "Manage reservations, modifications, and cancellations within one seamless system." 
    },
    { 
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800",
      icon: <DoorOpen size={40} strokeWidth={1.5} />, 
      title: "Automated Check-In/Out", 
      desc: "Streamline arrivals and departures with digital check-in solutions that save time." 
    },
    { 
      image: "/images/customer-loyalty-bg.jpg",
      icon: <Heart size={40} strokeWidth={1.5} />, 
      title: "Customer Loyalty Tools", 
      desc: "Drive repeat business with targeted promotions, loyalty rewards, and personalized marketing." 
    }
  ];

  const handleToggleFlip = (idx: number) => {
    // Only toggle on mobile widths
    if (window.innerWidth < 1024) {
      setFlippedIndex(flippedIndex === idx ? null : idx);
    }
  };

  return (
    <section id="platform" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8 pb-4 border-b border-gray-100">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-koda-blue mb-4">
              <span className="uppercase tracking-widest text-sm font-bold">All-in-one platform</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-normal text-koda-black tracking-tight">The KodaCars <span className="font-bold">Ecosystem</span></h2>
            <p className="mt-4 text-gray-700 text-xl font-semibold leading-relaxed max-w-2xl">
              Our all-in-one intuitive platform is designed specifically for near-airport parking businesses with features that help you increase efficiency and profits
            </p>
          </div>
          <div className="hidden lg:block">
            <a href="#contact" className="inline-flex items-center gap-2 text-koda-blue font-bold hover:underline group transition-all">
              Request Platform Demo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Ecosystem Image Replacement */}
        <div className="w-full mb-24 animate-fade-in relative flex justify-center">
          <div className="w-full max-w-6xl p-4 lg:p-12 bg-gray-50/50 border border-gray-100 rounded-2xl shadow-inner">
            <img 
              src="https://lh3.googleusercontent.com/d/1Up3AMOR_xkUhzfdZqYgeAVAjWZ5eMq_U" 
              alt="KodaCars Core Ecosystem" 
              className="w-full h-auto object-contain mx-auto transition-transform duration-700 hover:scale-[1.01]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              onClick={() => handleToggleFlip(idx)}
              className="relative group h-[320px] [perspective:1000px] cursor-pointer lg:cursor-default"
            >
              {/* Inner container for 3D flip effect */}
              <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${flippedIndex === idx ? '[transform:rotateY(180deg)]' : ''}`}>
                
                {/* Front Face */}
                <div className="absolute inset-0 [backface-visibility:hidden] border border-gray-200 bg-white overflow-hidden flex flex-col transition-all duration-500 lg:group-hover:shadow-xl lg:group-hover:border-koda-blue">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-koda-blue transform scale-y-0 lg:group-hover:scale-y-100 transition-transform duration-500 origin-top z-30"></div>
                  
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-full object-cover transition-all duration-700 opacity-40 lg:group-hover:opacity-60 lg:group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/40 transition-colors duration-500 lg:group-hover:bg-white/95"></div>
                  </div>

                  <div className="relative z-20 h-full flex flex-col p-8 lg:p-10">
                    <div className="mb-8 text-white lg:group-hover:text-koda-blue transition-all duration-500 transform lg:group-hover:scale-110 origin-left">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 transition-colors duration-500 text-white lg:group-hover:text-koda-black leading-tight">
                      {feature.title}
                    </h3>
                    
                    {/* Desktop Hover Reveal */}
                    <p className="hidden lg:block leading-relaxed font-medium text-lg flex-grow transition-all duration-500 text-gray-700 opacity-0 translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
                      {feature.desc}
                    </p>

                    {/* Mobile Only visual hint */}
                    <div className="mt-auto lg:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70">
                      <Info size={14} /> Tap for details
                    </div>
                  </div>
                </div>

                {/* Back Face (Mobile) */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] border border-koda-blue bg-white overflow-hidden flex flex-col p-8 lg:hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-1.5 h-full bg-koda-blue z-30"></div>
                  
                  <div className="relative z-20 h-full flex flex-col">
                    <div className="mb-6 text-koda-blue">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-koda-black mb-4 uppercase tracking-widest">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-lg font-medium leading-relaxed flex-grow">
                      {feature.desc}
                    </p>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-koda-blue font-bold text-sm uppercase tracking-widest gap-2">
                      Close <ArrowRight size={16} className="rotate-180" />
                    </div>
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

export default AiPlatformSection;