export interface WhitepaperPDF {
  id: string;
  title: string;
  filename: string;
}

// Base path for PDF files hosted in public/insights-pdfs/
// To add or replace a PDF: place your file in public/insights-pdfs/ and name it
// to match the filename listed below (e.g. "customer-loyalty.pdf").
const PDF_BASE_PATH = `${import.meta.env.BASE_URL}insights-pdfs/`;

export const WHITEPAPERS: Record<string, WhitepaperPDF> = {
  'customer-loyalty': {
    id: 'customer-loyalty',
    title: 'Customer Loyalty: Building Customer Loyalty in Off-Airport Parking',
    filename: 'customer-loyalty.pdf',
  },
  'large-vehicle': {
    id: 'large-vehicle',
    title: 'Large Vehicle: Capturing Lost Revenue from Large Vehicles',
    filename: 'large-vehicle.pdf',
  },
  'reputation-management': {
    id: 'reputation-management',
    title: 'Reputation Management: Leveraging Digital Excellence',
    filename: 'reputation-management.pdf',
  },
  'self-check-in': {
    id: 'self-check-in',
    title: 'Self Check In: Transforming Hotel Off-Airport Parking',
    filename: 'self-check-in.pdf',
  },
  'shuttle-services': {
    id: 'shuttle-services',
    title: 'Shuttle Services: Reduce Friction and Drive Satisfaction',
    filename: 'shuttle-services.pdf',
  }
};

/**
 * Build the full URL for a whitepaper PDF.
 */
const getPdfUrl = (filename: string): string => `${PDF_BASE_PATH}${filename}`;

/**
 * Download a whitepaper PDF.
 * This function triggers the browser's download dialog.
 */
export const downloadWhitepaper = (whitepaperType: string): void => {
  const whitepaper = WHITEPAPERS[whitepaperType];

  if (!whitepaper) {
    console.error(`Whitepaper not found: ${whitepaperType}`);
    alert('Sorry, this whitepaper is not available at the moment.');
    return;
  }

  const url = getPdfUrl(whitepaper.filename);

  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;
  link.download = whitepaper.filename;
  link.target = '_blank';

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

  window.open(getPdfUrl(whitepaper.filename), '_blank');
};
