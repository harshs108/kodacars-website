import React from 'react';
import { Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-koda-gray pt-20 pb-10 px-4 lg:px-16 text-base text-gray-700 border-t border-gray-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand & Mission Column */}
        <div className="md:col-span-2">
          <h4 className="font-bold text-3xl text-koda-black mb-6">KodaCars</h4>
          <p className="text-lg text-gray-700 font-bold max-w-sm leading-relaxed">
            AI Powered Solutions for parking business to maximize revenue and streamline operations.
          </p>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="font-bold text-koda-black mb-6 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-4">
            <li><a href="#privacy-policy" className="hover:text-koda-blue transition-colors font-bold">Privacy Policy</a></li>
            <li><a href="#terms-of-service" className="hover:text-koda-blue transition-colors font-bold">Terms of Service</a></li>
            <li><a href="#contact" className="hover:text-koda-blue transition-colors font-bold">Contact</a></li>
          </ul>
        </div>

        {/* Social Column */}
        <div>
          <h4 className="font-bold text-koda-black mb-6 uppercase tracking-wider text-sm">Connect</h4>
          <div className="flex gap-6">
            <a 
              href="https://www.linkedin.com/company/koda-cars" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-koda-blue cursor-pointer transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-300">
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          <span className="text-sm text-gray-600 font-bold">© 2026 KodaCars. All Rights Reserved. Built for high-performance parking assets.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;