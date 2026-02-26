import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, ArrowRight, Building2,
  QrCode, Bus, DollarSign, Settings,
  Download, Zap, TrendingUp, Maximize2,
  CheckCircle2, Car, Info
} from 'lucide-react';

// Custom hook for scroll-triggered reveal animations
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const HotelParkingPage: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  // Scroll reveal for each section
  const problemReveal = useScrollReveal();
  const solutionReveal = useScrollReveal();
  const howItWorksReveal = useScrollReveal();
  const benefitsReveal = useScrollReveal();
  const p2pReveal = useScrollReveal();

  const handleCardFlip = (idx: number) => {
    if (window.innerWidth < 1024) {
      setFlippedCard(flippedCard === idx ? null : idx);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const solutions = [
    {
      icon: <QrCode size={32} />,
      title: "QR Code Self-Check-In",
      desc: "Parking customers scan, check in, and go. No front desk interaction. No wait time. No impact on your hotel guests. The entire arrival process happens on their phone."
    },
    {
      icon: <Bus size={32} />,
      title: "Automated Shuttle Management",
      desc: "No more phone calls. No more staff dispatching drivers manually. When a customer needs a shuttle, the system handles it — notifying drivers automatically and keeping your team focused on what matters."
    },
    {
      icon: <DollarSign size={32} />,
      title: "Revenue You're Currently Missing",
      desc: "Most hotels don't charge for early check-ins, late checkouts, or oversized vehicles taking up extra space. KodaCars captures all of it — automatically. These aren't new fees to invent. They're revenue that's been sitting on your table, uncollected."
    },
    {
      icon: <Settings size={32} />,
      title: "Hands-Off Operations",
      desc: "From the moment a customer arrives to the moment they leave, KodaCars runs the parking operation. Your hotel staff stays focused on hotel guests. Parking takes care of itself."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Install",
      desc: "Deploy QR code check-in and shuttle automation at your property — no hardware, no construction, no disruption.",
      icon: <Download size={28} />
    },
    {
      number: "02",
      title: "Automate",
      desc: "Parking guests self-check-in, shuttles dispatch automatically, and fees for early arrivals, late departures, and oversized vehicles are captured without staff involvement.",
      icon: <Zap size={28} />
    },
    {
      number: "03",
      title: "Earn",
      desc: "Revenue flows in while your front desk stays focused entirely on hotel guests.",
      icon: <TrendingUp size={28} />
    },
    {
      number: "04",
      title: "Expand",
      desc: "Add P2P car sharing to turn parked vehicles into rental income for your guests — at zero additional investment.",
      icon: <Maximize2 size={28} />
    }
  ];

  const benefits = [
    "Free your front desk with QR code self-check-in for all parking guests",
    "Eliminate shuttle calls through fully automated dispatch",
    "Capture missed revenue from early check-ins, late checkouts, and oversized vehicles",
    "Zero operational burden — parking runs itself while your team focuses on hotel guests"
  ];

  return (
    <div className="pt-16 min-h-screen bg-white font-sans antialiased animate-fade-in">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-16 py-6">
          <a href="#" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-koda-blue transition-colors group">
            <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </a>
        </div>
      </div>

      {/* ───────────────────────── HERO SECTION ───────────────────────── */}
      <section className="py-20 lg:py-28 border-b border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-koda-blue/5 blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="flex items-center gap-3 text-koda-blue mb-8"
                style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out forwards' }}
              >
                <Building2 size={24} />
                <span className="uppercase tracking-[0.25em] text-xs font-bold">Hotel Near-Airport Parking</span>
              </div>

              <h1
                className="text-4xl lg:text-6xl xl:text-7xl font-normal text-koda-black leading-tight mb-8 tracking-tight"
                style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: '0.1s' }}
              >
                Parking Revenue Without the <span className="font-bold">Operational Headache</span>
              </h1>

              <p
                className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium mb-12"
                style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: '0.2s' }}
              >
                Your hotel guests are your priority. KodaCars makes sure parking customers never get in the way — while quietly generating revenue you're currently leaving on the table.
              </p>

              <div style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: '0.3s' }}>
                <button
                  onClick={() => scrollToSection('hp-how-it-works')}
                  className="px-8 py-5 bg-koda-blue text-white font-bold text-lg hover:bg-koda-darkblue transition-all inline-flex items-center group shadow-lg"
                >
                  See How It Works <ArrowRight className="ml-4 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            </div>

            <div
              className="relative"
              style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: '0.4s' }}
            >
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-koda-blue/5 rounded-full blur-3xl -z-10"></div>
              <img
                src="https://lh3.googleusercontent.com/d/1jV4DhQGeclXO-xJ5sQoZ5-vYsVxt__RK"
                alt="Hotel near-airport parking facility"
                className="w-full h-auto object-cover shadow-2xl rounded-sm border border-gray-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── THE PROBLEM ───────────────────────── */}
      <section className="py-24 bg-gray-50/50 border-b border-gray-100" ref={problemReveal.ref}>
        <div className={`max-w-7xl mx-auto px-4 lg:px-16 transition-all duration-700 ${problemReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-12 h-1.5 bg-koda-blue mb-8"></div>
              <h2 className="text-3xl lg:text-5xl font-normal text-koda-black mb-10 tracking-tight">
                Parking Shouldn't Slow Down Your <span className="font-bold">Best Guests</span>
              </h2>
              <div className="space-y-6 text-lg lg:text-xl text-gray-700 leading-relaxed font-medium">
                <p>
                  You have guests paying premium rates for rooms. And then you have parking customers paying a fraction of that — but both are waiting at the same front desk. Every minute a parking guest takes from your front desk staff is a minute your hotel guest isn't getting the experience they're paying for.
                </p>
                <p>
                  On top of that, your team is fielding calls — "Where's my shuttle?" — managing check-ins, tracking late checkouts, and absorbing the operational cost of a service that barely moves the needle on your bottom line.
                </p>
                <p className="text-koda-black font-bold text-xl lg:text-2xl pt-6 border-t border-gray-200">
                  So the real question isn't <em className="not-italic">how much more can parking earn?</em> It's <em className="not-italic">how do I stop parking from costing me?</em>
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-koda-blue/5 rounded-full blur-3xl -z-10"></div>
              <img
                src="/images/hotel-checkin.jpg"
                alt="Hotel lobby check-in area"
                className="w-full h-auto object-cover shadow-2xl rounded-sm border border-gray-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── THE SOLUTION ───────────────────────── */}
      <section className="py-24 bg-white" ref={solutionReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <div className={`mb-20 transition-all duration-700 ${solutionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-12 h-1.5 bg-koda-blue mb-8"></div>
            <h2 className="text-3xl lg:text-5xl font-normal text-koda-black mb-6 tracking-tight">
              Zero Friction. Zero Front Desk Disruption. <span className="font-bold">Pure Upside.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed max-w-3xl">
              KodaCars removes parking from your front desk entirely — and turns it into a self-running revenue stream.
            </p>
          </div>

          {/* 2x2 grid of solution cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((sol, idx) => (
              <div
                key={idx}
                onClick={() => handleCardFlip(idx)}
                className={`relative group h-[300px] lg:h-[400px] [perspective:1000px] cursor-pointer lg:cursor-default transition-all duration-700 ${
                  solutionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: solutionReveal.isVisible ? `${idx * 120 + 200}ms` : '0ms' }}
              >
                <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${flippedCard === idx ? '[transform:rotateY(180deg)]' : ''}`}>
                  {/* Front Face */}
                  <div className="absolute inset-0 [backface-visibility:hidden] bg-white p-8 lg:p-10 border border-gray-200 flex flex-col transition-all duration-500 lg:group-hover:border-koda-blue lg:group-hover:shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-koda-blue transform scale-y-0 lg:group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                    <div className="text-koda-blue mb-6 transition-transform duration-500 lg:group-hover:scale-110 flex-shrink-0">
                      {sol.icon}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-koda-black mb-4 leading-tight flex-shrink-0 lg:group-hover:text-koda-blue transition-colors duration-500">
                      {sol.title}
                    </h3>
                    <div className="hidden lg:block flex-grow overflow-y-auto">
                      <p className="text-gray-600 text-base leading-relaxed font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        {sol.desc}
                      </p>
                    </div>
                    <div className="mt-auto lg:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-koda-purple/50 flex-shrink-0">
                      <Info size={14} /> Tap for details
                    </div>
                  </div>

                  {/* Back Face (mobile only) */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white p-8 flex flex-col lg:hidden border-2 border-koda-blue overflow-hidden">
                    <div className="text-koda-blue mb-4 flex-shrink-0">
                      {sol.icon}
                    </div>
                    <h3 className="text-base font-bold text-koda-black mb-3 uppercase tracking-widest flex-shrink-0">
                      {sol.title}
                    </h3>
                    <p className="text-gray-700 text-base font-medium leading-relaxed flex-grow overflow-y-auto">
                      {sol.desc}
                    </p>
                    <div className="mt-4 flex items-center text-koda-blue font-bold text-sm uppercase tracking-widest gap-2 flex-shrink-0">
                      Close <ArrowRight size={16} className="rotate-180" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── HOW IT WORKS ───────────────────────── */}
      <section id="hp-how-it-works" className="py-24 bg-koda-purple text-white scroll-mt-16 overflow-hidden relative" ref={howItWorksReveal.ref}>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-koda-blue/5 blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 lg:px-16 relative z-10">
          <div className={`mb-20 transition-all duration-700 ${howItWorksReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-12 h-1.5 bg-koda-green mb-8"></div>
            <h2 className="text-3xl lg:text-5xl font-normal leading-tight tracking-tight">
              Set It Up Once. <span className="font-bold">Let It Run.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`relative group transition-all duration-700 ${
                  howItWorksReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: howItWorksReveal.isVisible ? `${idx * 150 + 200}ms` : '0ms' }}
              >
                <div className="relative p-8 lg:p-10 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-koda-blue/50 transition-all duration-500 h-full flex flex-col">
                  <div className="text-5xl lg:text-7xl font-bold text-white/10 absolute top-4 right-6 lg:right-8 select-none group-hover:text-white transition-colors duration-500">
                    {step.number}
                  </div>
                  <div className="relative text-white/70 mb-4 group-hover:text-white group-hover:scale-110 transition-all duration-500 origin-left">
                    {step.icon}
                  </div>
                  <h3 className="relative text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="relative text-white/70 text-base leading-relaxed font-medium flex-grow">
                    {step.desc}
                  </p>
                </div>
                {/* Connector line between steps (desktop only) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-white/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── KEY BENEFITS ───────────────────────── */}
      <section className="py-24 bg-gray-50/50 border-b border-gray-100" ref={benefitsReveal.ref}>
        <div className={`max-w-7xl mx-auto px-4 lg:px-16 transition-all duration-700 ${benefitsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-koda-black mb-4 tracking-tight">Key Benefits</h2>
            <div className="w-12 h-1.5 bg-koda-green mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-4 p-6 bg-white border border-gray-200 hover:border-koda-blue hover:shadow-lg transition-all duration-500 ${
                  benefitsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: benefitsReveal.isVisible ? `${idx * 100 + 200}ms` : '0ms' }}
              >
                <CheckCircle2 size={24} className="text-koda-green shrink-0 mt-0.5" />
                <span className="text-lg font-bold text-koda-black leading-snug">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── P2P CROSS-SELL ───────────────────────── */}
      <section className="py-24 bg-white" ref={p2pReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${p2pReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <div className="w-12 h-1.5 bg-koda-green mb-8"></div>
              <h2 className="text-3xl lg:text-5xl font-normal text-koda-black mb-8 leading-tight tracking-tight">
                Turn Parked Cars into a <span className="font-bold">Guest Amenity</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-medium mb-10">
                <p>
                  Your hotel guests sometimes need a car for a few hours. The parking lot already has vehicles sitting idle, with owner permission to rent.
                </p>
                <p>
                  KodaCars P2P connects the two — giving your guests access to affordable, on-site rental vehicles without your hotel investing a cent in a car rental fleet. It's a premium amenity that costs you nothing to offer and generates revenue every time a car leaves the lot.
                </p>
              </div>
              <a
                href="#contact"
                className="px-8 py-5 border-2 border-koda-green text-koda-green font-bold text-lg hover:bg-koda-green hover:border-koda-green hover:text-white transition-all inline-flex items-center group"
              >
                Explore P2P Car Sharing <ArrowRight className="ml-4 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </div>

            <div className="relative space-y-8">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-koda-green/5 rounded-full blur-3xl -z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200"
                alt="Hotel with parking facilities"
                className="w-full h-56 lg:h-64 object-cover rounded-sm shadow-lg border border-gray-100"
              />
              <div className="bg-koda-purple/5 p-10 lg:p-14 border border-gray-100">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Car size={28} className="text-koda-green shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-koda-black text-lg mb-1">On-Site Rental Access</h4>
                      <p className="text-gray-600 font-medium">Give guests affordable vehicle access without owning a fleet</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <TrendingUp size={28} className="text-koda-green shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-koda-black text-lg mb-1">Revenue Per Departure</h4>
                      <p className="text-gray-600 font-medium">Generate income every time a parked car gets rented out</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <DollarSign size={28} className="text-koda-green shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-koda-black text-lg mb-1">Zero Investment Required</h4>
                      <p className="text-gray-600 font-medium">A premium amenity that costs you nothing to offer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelParkingPage;
