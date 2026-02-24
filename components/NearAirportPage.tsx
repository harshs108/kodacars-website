import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, ArrowRight, Plane,
  DollarSign, Repeat, Gift, Star, Wrench,
  Link2, TrendingUp, Users, Zap,
  CheckCircle2, Car, Award, Info
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

const NearAirportPage: React.FC = () => {
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
      icon: <DollarSign size={32} />,
      title: "Direct Reservations",
      desc: "Transition customers from third-party channels to your own direct booking system. Same rates, zero commissions, more money in your pocket on every reservation."
    },
    {
      icon: <Repeat size={32} />,
      title: "Repeat Customer Capture",
      desc: "Our integrated email and SMS marketing reaches customers who've already parked with you — bringing them back directly, without paying an acquisition cost a second time."
    },
    {
      icon: <Gift size={32} />,
      title: "Loyalty Program",
      desc: "Give your customers a reason to choose you every trip. They earn points for every day parked and redeem them for free parking. No third-party platform offers this — only you can."
    },
    {
      icon: <Star size={32} />,
      title: "Reputation Management",
      desc: "Higher ratings mean higher prices. Our system automatically requests reviews after every visit. Positive experiences get pushed to public platforms. Negative feedback gets handled privately — before it ever becomes a bad review."
    },
    {
      icon: <Wrench size={32} />,
      title: "Vehicle Services & Upsells",
      desc: "Turn idle time into income. Offer oil changes, tire rotations, detailing, and more through the platform. Customers accept services on their own time, pay in-app, and providers get notified automatically."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Connect",
      desc: "Onboard your lot onto the KodaCars platform in days, not months.",
      icon: <Link2 size={28} />
    },
    {
      number: "02",
      title: "Transition",
      desc: "Start shifting existing customers from OTA bookings to direct reservations through targeted email and SMS campaigns.",
      icon: <TrendingUp size={28} />
    },
    {
      number: "03",
      title: "Retain",
      desc: "Activate loyalty rewards and reputation management to keep customers coming back — directly to you.",
      icon: <Users size={28} />
    },
    {
      number: "04",
      title: "Grow",
      desc: "Unlock new revenue with vehicle upsell services and peer-to-peer car sharing.",
      icon: <Zap size={28} />
    }
  ];

  const benefits = [
    "Eliminate commission fees by moving customers to direct reservations",
    "Own your repeat customers with built-in email, SMS, and loyalty tools",
    "Command higher rates through automated reputation management",
    "Unlock new revenue streams with vehicle services and P2P car sharing"
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
          <div className="max-w-4xl">
            <div
              className="flex items-center gap-3 text-koda-blue mb-8"
              style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out forwards' }}
            >
              <Plane size={24} />
              <span className="uppercase tracking-[0.25em] text-xs font-bold">Near-Airport Parking</span>
            </div>

            <h1
              className="text-4xl lg:text-6xl xl:text-7xl font-normal text-koda-black leading-tight mb-8 tracking-tight"
              style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: '0.1s' }}
            >
              Stop Losing Revenue to <span className="font-bold">Third-Party Channels</span>
            </h1>

            <p
              className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium mb-12 max-w-3xl"
              style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: '0.2s' }}
            >
              Independent parking operators are giving up 25–30% of every reservation to OTAs. KodaCars shifts your customers from third-party bookings to direct reservations — so every dollar stays where it belongs.
            </p>

            <div style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: '0.3s' }}>
              <button
                onClick={() => scrollToSection('nap-how-it-works')}
                className="px-8 py-5 bg-koda-blue text-white font-bold text-lg hover:bg-koda-darkblue transition-all inline-flex items-center group shadow-lg"
              >
                See How It Works <ArrowRight className="ml-4 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── THE PROBLEM ───────────────────────── */}
      <section className="py-24 bg-gray-50/50 border-b border-gray-100" ref={problemReveal.ref}>
        <div className={`max-w-7xl mx-auto px-4 lg:px-16 transition-all duration-700 ${problemReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-3xl">
            <div className="w-12 h-1.5 bg-koda-blue mb-8"></div>
            <h2 className="text-3xl lg:text-5xl font-normal text-koda-black mb-10 tracking-tight">
              The Margin Squeeze <span className="font-bold">Is Real</span>
            </h2>
            <div className="space-y-6 text-lg lg:text-xl text-gray-700 leading-relaxed font-medium">
              <p>
                Every time a traveler books through a third-party channel, you lose. You lower your rates to stay competitive. You pay commissions just to fill your lot. Your cost of service keeps climbing while your revenue keeps shrinking.
              </p>
              <p>
                And the worst part? The repeat customer who parks with you every month — you're still paying a commission every single time they book, because they're not really <em className="not-italic font-bold text-koda-black">your</em> customer. They belong to the platform.
              </p>
              <p className="text-koda-black font-bold text-xl lg:text-2xl pt-6 border-t border-gray-200">
                That changes today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── THE SOLUTION ───────────────────────── */}
      <section className="py-24 bg-white" ref={solutionReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <div className={`mb-20 transition-all duration-700 ${solutionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-12 h-1.5 bg-koda-green mb-8"></div>
            <h2 className="text-3xl lg:text-5xl font-normal text-koda-black mb-6 tracking-tight">
              Your Lot. Your Customers. <span className="font-bold">Your Revenue.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed max-w-3xl">
              KodaCars gives you the tools to take back control of your business — from how customers find you to how they keep coming back.
            </p>
          </div>

          {/* Top row: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.slice(0, 3).map((sol, idx) => (
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

          {/* Bottom row: 2 cards, centered on large screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 lg:max-w-[66.666%] lg:mx-auto">
            {solutions.slice(3).map((sol, idx) => {
              const cardIdx = idx + 3;
              return (
                <div
                  key={cardIdx}
                  onClick={() => handleCardFlip(cardIdx)}
                  className={`relative group h-[300px] lg:h-[400px] [perspective:1000px] cursor-pointer lg:cursor-default transition-all duration-700 ${
                    solutionReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: solutionReveal.isVisible ? `${cardIdx * 120 + 200}ms` : '0ms' }}
                >
                  <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${flippedCard === cardIdx ? '[transform:rotateY(180deg)]' : ''}`}>
                    {/* Front Face */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-white p-8 lg:p-10 border border-gray-200 flex flex-col transition-all duration-500 lg:group-hover:border-koda-blue lg:group-hover:shadow-xl overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-koda-green transform scale-y-0 lg:group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                      <div className="text-koda-green mb-6 transition-transform duration-500 lg:group-hover:scale-110 flex-shrink-0">
                        {sol.icon}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-koda-black mb-4 leading-tight flex-shrink-0 lg:group-hover:text-koda-green transition-colors duration-500">
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
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white p-8 flex flex-col lg:hidden border-2 border-koda-green overflow-hidden">
                      <div className="text-koda-green mb-4 flex-shrink-0">
                        {sol.icon}
                      </div>
                      <h3 className="text-base font-bold text-koda-black mb-3 uppercase tracking-widest flex-shrink-0">
                        {sol.title}
                      </h3>
                      <p className="text-gray-700 text-base font-medium leading-relaxed flex-grow overflow-y-auto">
                        {sol.desc}
                      </p>
                      <div className="mt-4 flex items-center text-koda-green font-bold text-sm uppercase tracking-widest gap-2 flex-shrink-0">
                        Close <ArrowRight size={16} className="rotate-180" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────── HOW IT WORKS ───────────────────────── */}
      <section id="nap-how-it-works" className="py-24 bg-koda-purple text-white scroll-mt-16 overflow-hidden relative" ref={howItWorksReveal.ref}>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-koda-blue/5 blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 lg:px-16 relative z-10">
          <div className={`mb-20 transition-all duration-700 ${howItWorksReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-12 h-1.5 bg-koda-green mb-8"></div>
            <h2 className="text-3xl lg:text-5xl font-normal leading-tight tracking-tight">
              From Commission Drain to <span className="font-bold">Revenue Engine</span>
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
                <div className="p-8 lg:p-10 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-koda-blue/50 transition-all duration-500 h-full flex flex-col">
                  <div className="text-5xl font-bold text-white/10 mb-6 group-hover:text-koda-blue/20 transition-colors duration-500">
                    {step.number}
                  </div>
                  <div className="text-koda-green mb-4 group-hover:scale-110 transition-transform duration-500 origin-left">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-koda-green transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed font-medium flex-grow">
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
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-koda-black mb-4 tracking-tight">Key Benefits</h2>
            <div className="w-12 h-1.5 bg-koda-blue mx-auto"></div>
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
                Unlock Even More with <span className="font-bold">Peer-to-Peer Car Sharing</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-medium mb-10">
                <p>
                  Your lot is already full of cars. Why not put them to work?
                </p>
                <p>
                  With KodaCars P2P, vehicles parked at your facility can be rented out to travelers — generating a completely new revenue stream for your business. During peak season, rented-out vehicles free up space, giving you virtual capacity expansion without adding a single parking spot.
                </p>
                <p>
                  And here's the real advantage: travelers who want P2P access have to park at a lot that offers it. You become the only option — and that kind of exclusivity builds loyalty money can't buy.
                </p>
              </div>
              <a
                href="#contact"
                className="px-8 py-5 border-2 border-koda-black text-koda-black font-bold text-lg hover:bg-koda-black hover:text-white transition-all inline-flex items-center group"
              >
                Explore P2P Car Sharing <ArrowRight className="ml-4 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-koda-green/5 rounded-full blur-3xl -z-10"></div>
              <div className="bg-koda-purple/5 p-10 lg:p-14 border border-gray-100">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Car size={28} className="text-koda-blue shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-koda-black text-lg mb-1">New Revenue Stream</h4>
                      <p className="text-gray-600 font-medium">Earn from vehicles already sitting in your lot</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <TrendingUp size={28} className="text-koda-green shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-koda-black text-lg mb-1">Virtual Capacity Expansion</h4>
                      <p className="text-gray-600 font-medium">Free up spaces during peak season without adding spots</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Award size={28} className="text-koda-blue shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-koda-black text-lg mb-1">Exclusive Positioning</h4>
                      <p className="text-gray-600 font-medium">Become the go-to lot for P2P-enabled travelers</p>
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

export default NearAirportPage;
