import { ReactNode } from 'react';
import { AdSlot } from '../ads/AdSlot';
import { PageSlug } from '../../utils/insuranceCalculators';

export interface TocLink {
  id: string;
  label: string;
}

interface PageShellProps {
  pageSlug: PageSlug;
  tocLinks: TocLink[];
  children: ReactNode;
  onNavigate?: (page: PageSlug, sectionId?: string) => void;
}

export function PageShell({
  pageSlug,
  tocLinks,
  children,
}: PageShellProps) {
  return (
    <div className="max-w-[1380px] mx-auto px-4 md:px-6 py-4 md:py-6">
      <div className="grid grid-cols-1 xl:grid-cols-[160px_minmax(0,1fr)_160px] xl:gap-6 items-start">
        {/* Left Sidebar Rail (>= 1280px): Sticky TOC + 160x300 + Lower 160x600 */}
        <aside
          aria-label="Section quick links and left rail advertisements"
          className="hidden xl:block space-y-6"
        >
          <div className="sticky top-[88px] space-y-6">
            <nav
              aria-label="On this page"
              className="bg-white border border-[#DDE5F0] rounded-xl p-3.5"
            >
              <p className="font-display text-xs font-semibold text-[#0B1F3A] mb-2.5">
                On This Page
              </p>
              <ul className="space-y-1.5">
                {tocLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="block text-xs text-[#4B5D75] hover:text-[#0E9F6E] transition-colors leading-snug py-0.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <AdSlot
              format="160x300"
              slotId={`${pageSlug}-left-160x300`}
              className="my-0!"
            />
          </div>

          <AdSlot
            format="160x600"
            slotId={`${pageSlug}-left-160x600`}
            className="my-0!"
          />
        </aside>

        {/* Center Primary Content Column */}
        <main className="min-w-0 w-full">
          {/* Slot 1 Top Leaderboard (Desktop/Tablet) & Mobile Top Banner */}
          <AdSlot
            format="728x90"
            slotId={`${pageSlug}-top-728x90`}
            className="mt-0! mb-6!"
          />
          <AdSlot
            format="320x50"
            slotId={`${pageSlug}-top-320x50`}
            className="mt-0! mb-4!"
          />

          <div className="space-y-10 md:space-y-12">{children}</div>

          {/* Pre-Footer High-Viewability Ad Cluster across all devices */}
          <div className="mt-10 space-y-4">
            <AdSlot
              format="300x250"
              slotId={`${pageSlug}-prefooter-300x250`}
              className="my-0!"
            />
            <AdSlot
              format="728x90"
              slotId={`${pageSlug}-prefooter-728x90`}
              className="my-0!"
            />
            <AdSlot
              format="320x50"
              slotId={`${pageSlug}-prefooter-320x50`}
              className="my-0!"
            />
          </div>
        </main>

        {/* Right Sidebar Rail (>= 1280px): Sticky 160x600 + Lower 160x300 */}
        <aside
          aria-label="Right rail skyscraper advertisements"
          className="hidden xl:block space-y-6"
        >
          <div className="sticky top-[88px]">
            <AdSlot
              format="160x600"
              slotId={`${pageSlug}-right-160x600`}
              className="my-0!"
            />
          </div>

          <AdSlot
            format="160x300"
            slotId={`${pageSlug}-right-160x300`}
            className="my-0!"
          />
        </aside>
      </div>
    </div>
  );
}
