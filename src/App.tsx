import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { InternshipApplicationForm } from './components/InternshipApplicationForm';
import { OfferLetterForm } from './components/OfferLetterForm';

type Page = 'dashboard' | 'application' | 'offer-letter';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    setCurrentPage('dashboard');
  };

  switch (currentPage) {
    case 'application':
      return <InternshipApplicationForm onBack={handleBack} />;
    case 'offer-letter':
      return <OfferLetterForm onBack={handleBack} />;
    default:
      return <Dashboard onNavigate={handleNavigate} />;
  }
}

export default App;