import React from 'react';
import LegalPage from './LegalPage';
import content from '../content/privacy-policy.md?raw';

const PrivacyPolicyPage: React.FC = () => {
  return <LegalPage title="Privacy Policy" content={content} />;
};

export default PrivacyPolicyPage;
