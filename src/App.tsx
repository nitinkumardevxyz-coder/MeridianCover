import { useCallback, useEffect, useState } from 'react';
import { StickyMobileAdBar } from './components/ads/StickyMobileAdBar';
import { Footer } from './components/layout/Footer';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { Navbar } from './components/layout/Navbar';
import { TrustBar } from './components/layout/TrustBar';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { GuidesContactPage } from './pages/GuidesContactPage';
import { HealthInsurancePage } from './pages/HealthInsurancePage';
import { HomePage } from './pages/HomePage';
import { LifeInsurancePage } from './pages/LifeInsurancePage';
import { MotorInsurancePage } from './pages/MotorInsurancePage';
import { TravelHomeInsurancePage } from './pages/TravelHomeInsurancePage';
import {
  PAGE_METADATA,
  PageSlug,
  resolvePageFromPath,
} from './utils/insuranceCalculators';

export default function App() {
  const initialRoute = resolvePageFromPath(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  const [currentPage, setCurrentPage] = useState<PageSlug>(initialRoute.page);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [stickyMobileVisible, setStickyMobileVisible] = useState(true);

  const syncDocumentHead = useCallback((page: PageSlug) => {
    const meta = PAGE_METADATA[page];
    document.title = meta.title;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', meta.description);
    }
  }, []);

  useEffect(() => {
    syncDocumentHead(currentPage);
  }, [currentPage, syncDocumentHead]);

  useEffect(() => {
    if (initialRoute.focusContact) {
      setTimeout(() => {
        document
          .getElementById('contact-section')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [initialRoute.focusContact]);

  useEffect(() => {
    const onPopState = () => {
      const resolved = resolvePageFromPath(window.location.pathname);
      setCurrentPage(resolved.page);
      if (resolved.focusContact) {
        setTimeout(() => {
          document
            .getElementById('contact-section')
            ?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = useCallback(
    (page: PageSlug, sectionId?: string) => {
      const targetUrl =
        sectionId === 'contact-section'
          ? '/contact.html'
          : PAGE_METADATA[page].htmlPath;
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({ page }, '', targetUrl);
      }
      setCurrentPage(page);
      setDrawerOpen(false);

      if (sectionId) {
        setTimeout(() => {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    []
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'health':
        return <HealthInsurancePage />;
      case 'life':
        return <LifeInsurancePage />;
      case 'motor':
        return <MotorInsurancePage />;
      case 'travel-home':
        return <TravelHomeInsurancePage />;
      case 'calculators':
        return <CalculatorsPage />;
      case 'guides':
        return <GuidesContactPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-[#0B1F3A] overflow-x-hidden">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenDrawer={() => setDrawerOpen(true)}
      />
      <TrustBar />
      <MobileDrawer
        open={drawerOpen}
        currentPage={currentPage}
        onClose={() => setDrawerOpen(false)}
        onNavigate={handleNavigate}
      />

      <div className="flex-1">{renderPage()}</div>

      <Footer
        onNavigate={handleNavigate}
        hasStickyMobileBar={stickyMobileVisible}
      />

      <StickyMobileAdBar
        visible={stickyMobileVisible}
        onDismiss={() => setStickyMobileVisible(false)}
      />
    </div>
  );
}
