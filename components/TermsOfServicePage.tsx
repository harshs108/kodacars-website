import React from 'react';
import LegalPage from './LegalPage';
import content from '../content/terms-of-service.md?raw';

const TermsOfServicePage: React.FC = () => {
  return <LegalPage title="Terms of Service" content={content} />;
};

export default TermsOfServicePage;
