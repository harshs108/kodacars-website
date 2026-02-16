import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientsSection from './components/ClientsSection';
import SolutionsGrid from './components/SolutionsGrid';
import BenefitsSection from './components/BenefitsSection';
import AiPlatformSection from './components/AiPlatformSection';
import HowItWorks from './components/HowItWorks';
import NewsSection from './components/NewsSection';
import TeamSection from './components/TeamSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import CustomerLoyaltyPage from './components/CustomerLoyaltyPage';
import ReputationManagementPage from './components/ReputationManagementPage';
import LargeVehiclePage from './components/LargeVehiclePage';
import SelfCheckInPage from './components/SelfCheckInPage';
import ShuttleServicesPage from './components/ShuttleServicesPage';
import ContactPage from './components/ContactPage';
import NearAirportPage from './components/NearAirportPage';
import HotelParkingPage from './components/HotelParkingPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    console.log('Current path:', currentPath);
    
    // Handle anchor links on homepage (benefits, platform, etc.)
    if (currentPath === '#benefits' || currentPath === '#platform' || 
        currentPath === '#team' || currentPath === '#insights') {
      // Scroll to the section
      setTimeout(() => {
        const element = document.getElementById(currentPath.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      // Return homepage content
      return (
        <>
          <Hero />
          <ClientsSection />
          <SolutionsGrid />
          <BenefitsSection />
          <AiPlatformSection />
          <HowItWorks />
          <CtaSection />
        </>
      );
    }
    
    // Blog Pages
    if (currentPath.startsWith('#blog/')) {
      // Individual blog post: #blog/post-slug
      const slug = currentPath.replace('#blog/', '');
      console.log('Rendering blog post page with slug:', slug);
      return <BlogPostPage slug={slug} />;
    }
    
    if (currentPath === '#blog') {
      // Blog listing page
      console.log('Rendering blog listing page');
      return <BlogPage />;
    }

    // Solution Pages
    if (currentPath === '#near-airport') {
      return <NearAirportPage />;
    }
    
    if (currentPath === '#hotel-parking') {
      return <HotelParkingPage />;
    }

    // Dedicated Insight Pages
    if (currentPath === '#loyalty-insight') {
      return <CustomerLoyaltyPage />;
    }
    
    if (currentPath === '#reputation') {
      return <ReputationManagementPage />;
    }

    if (currentPath === '#large-vehicle') {
      return <LargeVehiclePage />;
    }

    if (currentPath === '#self-check-in') {
      return <SelfCheckInPage />;
    }

    if (currentPath === '#shuttle') {
      return <ShuttleServicesPage />;
    }

    // Contact Page
    if (currentPath === '#contact') {
      return <ContactPage />;
    }

    // Legal Pages
    if (currentPath === '#terms-of-service') {
      return <TermsOfServicePage />;
    }

    if (currentPath === '#privacy-policy') {
      return <PrivacyPolicyPage />;
    }

    // Dedicated Team Page
    if (currentPath === '#team-page') {
      return (
        <div className="pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-16 py-8">
            <a href="#" className="text-sm font-bold text-gray-500 hover:text-koda-blue flex items-center gap-2 mb-8">
              <span>Home</span> / <span>Team</span>
            </a>
          </div>
          <TeamSection />
        </div>
      );
    }

    // Dedicated General Insights Page
    if (currentPath === '#insights-page') {
      return (
        <div className="pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-16 py-8">
            <a href="#" className="text-sm font-bold text-gray-500 hover:text-koda-blue flex items-center gap-2 mb-8">
              <span>Home</span> / <span>Insights</span>
            </a>
          </div>
          <NewsSection />
        </div>
      );
    }

    // Homepage - Now lean and enterprise-focused
    return (
      <>
        <Hero />
        <ClientsSection />
        <SolutionsGrid />
        <BenefitsSection />
        <AiPlatformSection />
        <HowItWorks />
        <CtaSection />
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col w-full font-sans antialiased">
      <Navbar />
      <main className="flex-grow bg-white">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;