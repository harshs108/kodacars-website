import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Plane, 
  Building2, 
  Heart, 
  Truck, 
  ShieldCheck, 
  Smartphone, 
  Bus,
  Menu,
  X,
  LogIn
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  const solutions = [
    { name: 'Near-Airport Parking', href: '#near-airport', icon: <Plane size={20} /> },
    { name: 'Hotel Near-Airport Parking', href: '#hotel-parking', icon: <Building2 size={20} /> },
  ];

  const insights = [
    { name: 'Customer Loyalty', href: '#loyalty-insight', icon: <Heart size={20} /> },
    { name: 'Large Vehicle', href: '#large-vehicle', icon: <Truck size={20} /> },
    { name: 'Reputation Management', href: '#reputation', icon: <ShieldCheck size={20} /> },
    { name: 'Self Check In', href: '#self-check-in', icon: <Smartphone size={20} /> },
    { name: 'Shuttle Services', href: '#shuttle', icon: <Bus size={20} /> },
  ];

  const handleMouseEnter = (menu: string) => setActiveDropdown(menu);
  const handleMouseLeave = () => setActiveDropdown(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileDropdown = (menu: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === menu ? null : menu);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-koda-black h-16 border-b border-gray-200 font-sans shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 h-full flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0 mr-8">
          <a href="#" className="flex items-center" onClick={closeMobileMenu}>
            <img 
              src="https://lh3.googleusercontent.com/d/18SLJjdlOxsuWVbWCE7lgtg0VvXh-LsVm" 
              alt="KodaCars Logo" 
              className="h-8 lg:h-10 w-auto object-contain"
            />
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center h-full gap-2 flex-grow justify-start">
          
          {/* Solutions Dropdown */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => handleMouseEnter('solutions')}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className={`h-full flex items-center px-4 text-base font-semibold border-b-2 transition-all duration-200 gap-1 whitespace-nowrap ${activeDropdown === 'solutions' ? 'border-koda-blue text-koda-blue bg-gray-50' : 'border-transparent text-gray-700 hover:text-koda-blue hover:bg-gray-50'}`}
            >
              Solutions
              <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'solutions' && (
               <div className="absolute top-full left-0 w-80 bg-white border border-gray-200 shadow-2xl py-2 z-50">
                 {solutions.map((item) => (
                   <a 
                     key={item.name} 
                     href={item.href}
                     className="flex items-center px-6 py-5 text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-koda-blue transition-colors group"
                   >
                     <span className="mr-4 text-koda-blue">
                       {item.icon}
                     </span>
                     {item.name}
                   </a>
                 ))}
               </div>
            )}
          </div>

          <a href="#benefits" className="h-full flex items-center px-4 text-base font-semibold text-gray-700 hover:text-koda-blue hover:bg-gray-50 border-b-2 border-transparent hover:border-koda-blue transition-all whitespace-nowrap">
            Benefits
          </a>

          <a href="#platform" className="h-full flex items-center px-4 text-base font-semibold text-gray-700 hover:text-koda-blue hover:bg-gray-50 border-b-2 border-transparent hover:border-koda-blue transition-all whitespace-nowrap">
            Features
          </a>

          <a href="#team-page" className="h-full flex items-center px-4 text-base font-semibold text-gray-700 hover:text-koda-blue hover:bg-gray-50 border-b-2 border-transparent hover:border-koda-blue transition-all whitespace-nowrap">
            Team
          </a>

          {/* Insights Dropdown */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => handleMouseEnter('insights')}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className={`h-full flex items-center px-4 text-base font-semibold border-b-2 transition-all duration-200 gap-1 whitespace-nowrap ${activeDropdown === 'insights' ? 'border-koda-blue text-koda-blue bg-gray-50' : 'border-transparent text-gray-700 hover:text-koda-blue hover:bg-gray-50'}`}
            >
              Insights
              <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'insights' ? 'rotate-180' : ''}`} />
            </button>
            {activeDropdown === 'insights' && (
               <div className="absolute top-full left-0 w-80 bg-white border border-gray-200 shadow-2xl py-2 z-50">
                 <a 
                   href="#insights-page"
                   className="flex items-center px-6 py-5 text-sm font-bold text-gray-400 border-b border-gray-100 hover:bg-gray-50 uppercase tracking-widest"
                 >
                   View All Insights
                 </a>
                 {insights.map((item) => (
                   <a 
                     key={item.name} 
                     href={item.href}
                     className="flex items-center px-6 py-5 text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-koda-blue transition-colors group"
                   >
                     <span className="mr-4 text-koda-blue">
                       {item.icon}
                     </span>
                     {item.name}
                   </a>
                 ))}
               </div>
            )}
          </div>
        </div>

        {/* Right: Utilities */}
        <div className="flex items-center gap-2 h-full flex-shrink-0">
          <a 
            href="#contact"
            className="hidden sm:flex ml-2 items-center justify-center h-10 px-6 bg-koda-blue text-white hover:bg-koda-darkblue text-base font-bold transition-colors whitespace-nowrap"
          >
            Contact Sales
          </a>
          <a 
            href="https://providers.kodacars.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center h-10 px-6 border border-gray-200 text-koda-black hover:bg-gray-50 text-base font-bold transition-colors whitespace-nowrap gap-2"
          >
            <LogIn size={18} />
            Login
          </a>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center hover:bg-gray-100 text-koda-black transition-colors rounded"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden fixed inset-0 top-16 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">
          <div className="px-4 py-6 space-y-1">
            
            {/* Solutions Dropdown Mobile */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleMobileDropdown('solutions')}
                className="w-full flex items-center justify-between px-4 py-4 text-lg font-bold text-gray-700 hover:text-koda-blue hover:bg-gray-50 transition-colors"
              >
                <span>Solutions</span>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform duration-200 ${mobileDropdownOpen === 'solutions' ? 'rotate-180' : ''}`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  mobileDropdownOpen === 'solutions' ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="pb-2">
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center px-8 py-4 text-base font-semibold text-gray-600 hover:text-koda-blue hover:bg-gray-50 transition-colors"
                    >
                      <span className="mr-3 text-koda-blue">{item.icon}</span>
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Regular Links */}
            <a
              href="#benefits"
              onClick={closeMobileMenu}
              className="block px-4 py-4 text-lg font-bold text-gray-700 hover:text-koda-blue hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              Benefits
            </a>

            <a
              href="#platform"
              onClick={closeMobileMenu}
              className="block px-4 py-4 text-lg font-bold text-gray-700 hover:text-koda-blue hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              Features
            </a>

            <a
              href="#team-page"
              onClick={closeMobileMenu}
              className="block px-4 py-4 text-lg font-bold text-gray-700 hover:text-koda-blue hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              Team
            </a>

            {/* Insights Dropdown Mobile */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleMobileDropdown('insights')}
                className="w-full flex items-center justify-between px-4 py-4 text-lg font-bold text-gray-700 hover:text-koda-blue hover:bg-gray-50 transition-colors"
              >
                <span>Insights</span>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform duration-200 ${mobileDropdownOpen === 'insights' ? 'rotate-180' : ''}`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  mobileDropdownOpen === 'insights' ? 'max-h-[600px]' : 'max-h-0'
                }`}
              >
                <div className="pb-2">
                  <a
                    href="#insights-page"
                    onClick={closeMobileMenu}
                    className="block px-8 py-3 text-sm font-bold text-gray-400 uppercase tracking-widest hover:bg-gray-50"
                  >
                    View All Insights
                  </a>
                  {insights.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center px-8 py-4 text-base font-semibold text-gray-600 hover:text-koda-blue hover:bg-gray-50 transition-colors"
                    >
                      <span className="mr-3 text-koda-blue">{item.icon}</span>
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile CTA Buttons */}
            <div className="pt-6 space-y-3 px-4">
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="block w-full text-center px-6 py-4 bg-koda-blue text-white font-bold text-lg hover:bg-koda-darkblue transition-colors"
              >
                Contact Sales
              </a>
              <a
                href="https://providers.kodacars.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-6 py-4 border-2 border-gray-200 text-koda-black font-bold text-lg hover:bg-gray-50 transition-colors gap-2"
              >
                <LogIn size={20} />
                Login
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 top-16 bg-black/50 z-30"
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;