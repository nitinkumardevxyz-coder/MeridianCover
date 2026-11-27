import { Menu } from 'lucide-react';
import { getAdsterraSmartlinkUrl } from '../../config/adsConfig';
import { PAGE_METADATA, PageSlug } from '../../utils/insuranceCalculators';

interface NavbarProps {
  currentPage: PageSlug;
  onNavigate: (page: PageSlug, sectionId?: string) => void;
  onOpenDrawer: () => void;
}

const NAV_ITEMS: PageSlug[] = [
  'health',
  'life',
  'motor',
  'travel-home',
  'calculators',
  'guides',
];

export function Navbar({ currentPage, onNavigate, onOpenDrawer }: NavbarProps) {
  const smartlinkUrl = getAdsterraSmartlinkUrl();

  return (
    <header className="sticky top-0 z-40 h-14 md:h-16 bg-white/95 backdrop-blur border-b border-[#DDE5F0]">
      <div className="max-w-[1380px] mx-auto h-full px-4 md:px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="font-display text-lg md:text-xl font-bold tracking-tight text-[#0B1F3A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E9F6E]"
        >
          MeridianCover
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4B5D75]"
        >
          {NAV_ITEMS.map((slug) => {
            const meta = PAGE_METADATA[slug];
            const isActive = currentPage === slug;
            return (
              <a
                key={slug}
                href={meta.htmlPath}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(slug);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                  isActive
                    ? 'text-[#0B1F3A] font-semibold border-[#0E9F6E]'
                    : 'border-transparent hover:text-[#0B1F3A] hover:border-[#CBD8E8]'
                }`}
              >
                {meta.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary CTA on desktop, drawer toggle on mobile/tablet */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={smartlinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs md:text-sm font-semibold text-white bg-[#0E9F6E] hover:bg-[#0B875D] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E9F6E]"
          >
            Compare Live Quotes
          </a>
          <button
            type="button"
            onClick={onOpenDrawer}
            aria-label="Open navigation menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#DDE5F0] text-[#0B1F3A] hover:bg-[#F4F7FB] transition-colors"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
