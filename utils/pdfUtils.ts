export interface WhitepaperPDF {
  id: string;
  title: string;
  filename: string;
  url: string;
}

// This is where you define all your whitepapers
// Replace the URLs with your actual PDF file URLs
export const WHITEPAPERS: Record<string, WhitepaperPDF> = {
  'customer-loyalty': {
    id: 'customer-loyalty',
    title: 'Customer Loyalty: Building Customer Loyalty in Off-Airport Parking',
    filename: 'customer-loyalty.pdf',
    url: 'public/whitepapers/customer-loyalty.pdf', // Replace with actual URL
  },
  'large-vehicle': {
    id: 'large-vehicle',
    title: 'Large Vehicle: Capturing Lost Revenue from Large Vehicles',
    filename: 'Large-Vehicles.pdf',
    url: 'public/whitepapers/large-vehicle.pdf', // Replace with actual URL
  },
  'reputation-management': {
    id: 'reputation-management',
    title: 'Reputation Management: Leveraging Digital Excellence',
    filename: 'Reputation.pdf',
    url: 'public/whitepapers/reputation-management.pdf', // Replace with actual URL
  },
  'self-check-in': {
    id: 'self-check-in',
    title: 'Self Check In: Transforming Hotel Off-Airport Parking',
    filename: 'Self-Check-In.pdf',
    url: 'public/whitepapers/self-check-in.pdf', // Replace with actual URL
  },
  'shuttle-services': {
    id: 'shuttle-services',
    title: 'Shuttle Services: Reduce Friction and Drive Satisfaction',
    filename: 'Shuttle-Service.pdf',
    url: 'public/whitepapers/shuttle-services.pdf', // Replace with actual URL
  }
};

/**
 * Download a whitepaper PDF
 * This function triggers the browser's download dialog
 */
export const downloadWhitepaper = (whitepaperType: string): void => {
  const whitepaper = WHITEPAPERS[whitepaperType];
  
  if (!whitepaper) {
    console.error(`Whitepaper not found: ${whitepaperType}`);
    alert('Sorry, this whitepaper is not available at the moment.');
    return;
  }

  // Check if URL is still a placeholder
  if (whitepaper.url.includes('YOUR_') || whitepaper.url.includes('PLACEHOLDER')) {
    console.warn('PDF URL is still a placeholder. Please update with actual URL.');
    alert('The whitepaper is being prepared. Please check your email for the download link.');
    return;
  }

  // Create a temporary link element
  const link = document.createElement('a');
  link.href = whitepaper.url;
  link.download = whitepaper.filename;
  link.target = '_blank'; // Open in new tab if direct download doesn't work
  
  // Append to body, click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Track download in Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_download', {
      event_category: 'Whitepaper',
      event_label: whitepaper.title,
      file_name: whitepaper.filename,
    });
  }
};

/**
 * Get whitepaper info by type
 */
export const getWhitepaperInfo = (whitepaperType: string): WhitepaperPDF | null => {
  return WHITEPAPERS[whitepaperType] || null;
};

/**
 * Open PDF in new tab (alternative to downloading)
 */
export const openWhitepaperInNewTab = (whitepaperType: string): void => {
  const whitepaper = WHITEPAPERS[whitepaperType];
  
  if (!whitepaper) {
    console.error(`Whitepaper not found: ${whitepaperType}`);
    return;
  }

  if (whitepaper.url.includes('YOUR_') || whitepaper.url.includes('PLACEHOLDER')) {
    alert('The whitepaper is being prepared. Please check your email for the download link.');
    return;
  }

  window.open(whitepaper.url, '_blank');
};
