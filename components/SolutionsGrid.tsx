import React from 'react';
import { ArrowRight, Plane, Building2, CheckCircle2 } from 'lucide-react';

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  id: string;
  image: string;
  bullets?: string[];
  href?: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ icon, title, description, id, image, bullets, href }) => (
  <div id={id} onClick={href ? () => { window.location.hash = href; } : undefined} className="group flex flex-col p-12 border border-gray-200 bg-white hover:border-koda-blue transition-all duration-500 min-h-[520px] relative overflow-hidden cursor-pointer shadow-sm hover:shadow-xl">
    <div className="absolute inset-0 z-0 transition-all duration-700">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-white/95"></div>
    </div>

    <div className="relative z-10 flex flex-col h-full">
      <div className="absolute top-0 left-0 w-1.5 h-0 bg-koda-blue group-hover:h-full transition-all duration-300 -ml-12 -mt-12"></div>
      
      <div className="mb-10 text-white group-hover:text-koda-blue transition-colors duration-500">
        {icon}
      </div>
      
      <h3 className="text-4xl lg:text-5xl font-normal text-white mb-6 group-hover:text-koda-blue transition-colors duration-500 tracking-tight">
        {title}
      </h3>
      
      <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 mb-8 flex-grow">
        <p className="text-gray-100 text-xl leading-relaxed font-semibold group-hover:text-gray-700 mb-6">
          {description}
        </p>
        
        {bullets && bullets.length > 0 && (
          <ul className="space-y-3 mt-4">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700 font-medium">
                <CheckCircle2 size={18} className="text-koda-blue shrink-0 mt-1" />
                <span className="text-base lg:text-lg leading-snug">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className={`flex items-center font-bold text-lg mt-auto transition-all duration-300 ${href ? 'text-white group-hover:text-koda-blue' : 'text-white group-hover:opacity-0 group-hover:pointer-events-none'}`}>
        Learn more <ArrowRight size={22} className="ml-3" />
      </div>
    </div>

    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 group-hover:bg-koda-blue transition-colors duration-500"></div>
  </div>
);

const SolutionsGrid: React.FC = () => {
  return (
    <section id="solutions" className="py-24 bg-gray-50/50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 pb-8 border-b border-gray-100">
          <div className="max-w-4xl">
            <h2 className="text-4xl lg:text-5xl font-normal text-koda-black tracking-tight">Our <span className="font-bold">Solutions</span></h2>
            <p className="mt-6 text-2xl text-gray-700 font-semibold leading-relaxed max-w-3xl">
              AI driven platform improving efficient check-in & check-out services. Revenue growth through customer loyalty.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <SolutionCard
             id="near-airport"
             icon={<Plane size={56} strokeWidth={1.5} />}
             image="https://lh3.googleusercontent.com/d/1n7yPUUhUeDrTSV-BmBrx36IZIzeBAe8f"
             title="Near-Airport Parking"
             description="Optimize real-time parking capacity with smart booking tracking technology."
             href="#near-airport"
             bullets={[
               "Dynamic pricing that automatically adjusts rates based on real-time demand",
               "Automated check-in/out to eliminate bottlenecks and reduce labor costs",
               "Smart capacity tracking to fill more spaces and prevent overbooking"
             ]}
           />
           
           <SolutionCard 
             id="hotel-parking"
             icon={<Building2 size={56} strokeWidth={1.5} />}
             image="https://lh3.googleusercontent.com/d/1jV4DhQGeclXO-xJ5sQoZ5-vYsVxt__RK"
             title="Hotel Near-Airport Parking"
             description="Generate fees from oversized vehicles, early check-ins, late check-outs, and more."
             bullets={[
               "Monetize empty spaces and start generating passive income immediately",
               "Zero operational burden – we handle bookings, payments, and customer service",
               "Guest priority protection ensures your hotel guests always have parking available"
             ]}
           />
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;