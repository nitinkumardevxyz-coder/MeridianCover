import { useEffect, useRef, useState } from 'react';
import {
  AD_FORMAT_META,
  AdFormat,
  buildBannerSrcDoc,
} from '../../config/adsConfig';

interface AdSlotProps {
  format: AdFormat;
  slotId?: string;
  className?: string;
}

const RESPONSIVE_VISIBILITY: Record<AdFormat, string> = {
  '728x90': 'hidden md:flex flex-col',
  '320x50': 'flex flex-col md:hidden',
  '468x60': 'hidden md:flex flex-col',
  '300x250': 'flex flex-col',
  '160x600': 'hidden xl:flex flex-col',
  '160x300': 'hidden xl:flex flex-col',
  native: 'flex flex-col w-full',
};

const BREAKPOINT_QUERIES: Record<AdFormat, string | null> = {
  '728x90': '(min-width: 768px)',
  '320x50': '(max-width: 767px)',
  '468x60': '(min-width: 768px)',
  '300x250': null,
  '160x600': '(min-width: 1280px)',
  '160x300': '(min-width: 1280px)',
  native: null,
};

function useMatchesBreakpoint(format: AdFormat): boolean {
  const query = BREAKPOINT_QUERIES[format];
  const [matches, setMatches] = useState<boolean>(() => {
    if (!query || typeof window === 'undefined') return true;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (!query || typeof window === 'undefined') {
      setMatches(true);
      return;
    }
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return matches;
}

export function AdSlot({ format, slotId, className = '' }: AdSlotProps) {
  const meta = AD_FORMAT_META[format];
  const isBreakpointActive = useMatchesBreakpoint(format);
  const nativeHostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (format !== 'native' || !isBreakpointActive) return;
    const host = nativeHostRef.current;
    if (!host) return;

    // Clear previous render on route change and inject Adsterra Native Banner script
    host.innerHTML = '';
    const container = document.createElement('div');
    container.id = meta.containerId || 'container-0d2b03e8e9abaebc5c413d0b1242dff5';
    host.appendChild(container);

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('fetchpriority', 'high');
    script.setAttribute('data-cfasync', 'false');
    script.src = meta.scriptSrc;
    host.appendChild(script);

    return () => {
      host.innerHTML = '';
    };
  }, [format, isBreakpointActive, meta.containerId, meta.scriptSrc, slotId]);

  const visibilityClass = RESPONSIVE_VISIBILITY[format];

  if (format === 'native') {
    return (
      <aside
        aria-label="Sponsored content"
        data-ad-format={format}
        data-ad-slot={slotId || format}
        className={`ad-wrapper w-full ${visibilityClass} ${className}`}
      >
        <span className="ad-caption">Advertisement</span>
        <div
          ref={nativeHostRef}
          className="w-full max-w-full rounded-xl border border-[#DDE5F0] bg-[#F8FAFD] p-3 overflow-hidden"
          style={{ minHeight: `${meta.minHeight}px` }}
        />
      </aside>
    );
  }

  const srcDoc = buildBannerSrcDoc(meta);

  return (
    <aside
      aria-label={`Advertisement ${format}`}
      data-ad-format={format}
      data-ad-slot={slotId || format}
      className={`ad-wrapper ${visibilityClass} ${className}`}
    >
      <span className="ad-caption">Advertisement</span>
      <div
        className="relative flex items-center justify-center rounded-md border border-[#E2E8F0] bg-[#F8FAFD] overflow-hidden"
        style={{
          minWidth: `${meta.minWidth}px`,
          width: `${meta.minWidth}px`,
          minHeight: `${meta.minHeight}px`,
          height: `${meta.minHeight}px`,
          maxWidth: '100%',
        }}
      >
        {isBreakpointActive && srcDoc ? (
          <iframe
            title={`Adsterra ${format} Advertisement`}
            srcDoc={srcDoc}
            width={meta.minWidth}
            height={meta.minHeight}
            scrolling="no"
            frameBorder="0"
            className="border-0 block"
            style={{
              width: `${meta.minWidth}px`,
              height: `${meta.minHeight}px`,
            }}
          />
        ) : (
          <span className="font-mono-num text-[11px] font-semibold tracking-wider text-[#64748B]">
            {meta.label}
          </span>
        )}
      </div>
    </aside>
  );
}
