import { X } from 'lucide-react';
import { getAdsterraSmartlinkUrl } from '../../config/adsConfig';
import { PAGE_METADATA, PageSlug } from '../../utils/insuranceCalculators';

interface MobileDrawerProps {
  open: boolean;
  currentPage: PageSlug;
  onClose: () => void;
  onNavigate: (page: PageSlug, sectionId?: string) => void;
}

const ALL_PAGES: PageSlug[] = [
  'home',
  'health',
  'life',
  'motor',
  'travel-home',
  'calculators',
  'guides',
];

export function MobileDrawer({
  open,
  currentPage,
  onClose,
  onNavigate,
}: MobileDrawerProps) {
  if (!open) return null;

  const smartlinkUrl = getAdsterraSmartlinkUrl();

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation drawer"
    >
      <div
        className="fixed inset-0 bg-[#0B1F3A]/50 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl flex flex-col border-l border-[#DDE5F0]">
        <div className="h-14 px-5 flex items-center justify-between border-b border-[#DDE5F0]">
          <span className="font-display font-bold text-lg text-[#0B1F3A]">
            MeridianCover
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#4B5D75] hover:text-[#0B1F3A] hover:bg-[#F4F7FB]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          {ALL_PAGES.map((slug) => {
            const meta = PAGE_METADATA[slug];
            const isActive = currentPage === slug;
            return (
              <a
                key={slug}
                href={meta.htmlPath}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(slug);
                  onClose();
                }}
                className={`block px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F4F7FB] text-[#0B1F3A] font-semibold'
                    : 'text-[#4B5D75] hover:bg-[#F4F7FB] hover:text-[#0B1F3A]'
                }`}
              >
                {meta.label === 'Home' ? 'Home & Overview' : `${meta.label} Insurance`}
              </a>
            );
          })}
          <a
            href="/contact.html"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('guides', 'contact-section');
              onClose();
            }}
            className="block px-3 py-3 rounded-lg text-sm font-medium text-[#4B5D75] hover:bg-[#F4F7FB] hover:text-[#0B1F3A]"
          >
            Contact &amp; Advisory
          </a>
        </nav>

        <div className="p-4 border-t border-[#DDE5F0] space-y-2">
          <a
            href={smartlinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-[#0E9F6E] hover:bg-[#0B875D] rounded-lg transition-colors"
          >
            Compare Live Quotes
          </a>
          <p className="text-xs text-center text-[#64748B]">
            24/7 Claims Desk · Independent Comparisons
          </p>
        </div>
      </div>
    </div>
  );
}
