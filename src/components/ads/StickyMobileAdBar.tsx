import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { AD_FORMAT_META, buildBannerSrcDoc } from '../../config/adsConfig';

interface StickyMobileAdBarProps {
  visible: boolean;
  onDismiss: () => void;
}

export function StickyMobileAdBar({ visible, onDismiss }: StickyMobileAdBarProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  if (!visible) return null;

  const meta = AD_FORMAT_META['320x50'];
  const srcDoc = buildBannerSrcDoc(meta);

  return (
    <div
      role="region"
      aria-label="Mobile sticky advertisement"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur border-t border-[#DDE5F0] px-2.5 py-1 flex items-center justify-center gap-1.5 shadow-sm"
    >
      <div
        className="flex items-center justify-center rounded border border-[#E2E8F0] bg-[#F8FAFD] overflow-hidden shrink-0"
        style={{
          minWidth: '320px',
          width: '320px',
          minHeight: '50px',
          height: '50px',
        }}
      >
        {isMobile && srcDoc ? (
          <iframe
            title="Adsterra Sticky Mobile 320x50 Advertisement"
            srcDoc={srcDoc}
            width={320}
            height={50}
            scrolling="no"
            frameBorder="0"
            className="border-0 block"
            style={{ width: '320px', height: '50px' }}
          />
        ) : (
          <span className="font-mono-num text-[11px] font-semibold text-[#0B1F3A]">
            ADSTERRA 320x50 SLOT
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close mobile advertisement banner"
        className="inline-flex items-center justify-center w-8 h-8 rounded text-[#4B5D75] hover:text-[#0B1F3A] hover:bg-[#F4F7FB] transition-colors shrink-0"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
