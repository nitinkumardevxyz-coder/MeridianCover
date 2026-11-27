import { getAdsterraSmartlinkUrl } from '../../config/adsConfig';
import { PAGE_METADATA, PageSlug } from '../../utils/insuranceCalculators';

interface FooterProps {
  onNavigate: (page: PageSlug, sectionId?: string) => void;
  hasStickyMobileBar: boolean;
}

export function Footer({ onNavigate, hasStickyMobileBar }: FooterProps) {
  const smartlinkUrl = getAdsterraSmartlinkUrl();

  const linkClass =
    'text-sm text-slate-300 hover:text-white transition-colors block py-1';

  return (
    <footer
      className={`bg-[#0B1F3A] text-white border-t border-[#163257] mt-12 ${
        hasStickyMobileBar ? 'pb-20 md:pb-10' : 'pb-10'
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-4 md:px-6 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#1A3860]">
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-white">
              MeridianCover
            </p>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Independent insurance research, policy comparison tables, and coverage calculators built for transparent decision-making across health, life, motor, travel, and home protection.
            </p>
            <div className="mt-4">
              <a
                href={smartlinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold bg-[#0E9F6E] hover:bg-[#0B875D] text-white rounded-lg transition-colors"
              >
                Unlock Best Rates
              </a>
            </div>
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-white mb-3">
              Insurance Lines
            </p>
            <ul className="space-y-1">
              {(['health', 'life', 'motor', 'travel-home'] as PageSlug[]).map(
                (slug) => (
                  <li key={slug}>
                    <a
                      href={PAGE_METADATA[slug].htmlPath}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(slug);
                      }}
                      className={linkClass}
                    >
                      {PAGE_METADATA[slug].label} Insurance
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-white mb-3">
              Tools &amp; Editorial Guides
            </p>
            <ul className="space-y-1">
              <li>
                <a
                  href="/calculators.html"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('calculators');
                  }}
                  className={linkClass}
                >
                  Interactive Calculators
                </a>
              </li>
              <li>
                <a
                  href="/guides.html"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('guides');
                  }}
                  className={linkClass}
                >
                  Claims &amp; Buyer Guides
                </a>
              </li>
              <li>
                <a
                  href="/contact.html"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('guides', 'contact-section');
                  }}
                  className={linkClass}
                >
                  Advisor Consultation
                </a>
              </li>
              <li>
                <a
                  href={smartlinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Check Claim Eligibility
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-white mb-3">
              Compliance &amp; Disclosures
            </p>
            <ul className="space-y-1">
              <li>
                <a
                  href="/guides.html#compliance-privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('guides', 'compliance-privacy');
                  }}
                  className={linkClass}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/guides.html#compliance-disclaimer"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('guides', 'compliance-disclaimer');
                  }}
                  className={linkClass}
                >
                  Insurance Disclaimer
                </a>
              </li>
              <li>
                <a
                  href="/guides.html#compliance-terms"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('guides', 'compliance-terms');
                  }}
                  className={linkClass}
                >
                  Terms of Service
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              Advisory Desk: Mon–Sat 8:00 AM – 8:00 PM · support@meridiancover.example
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} MeridianCover Advisory Media. Educational comparison platform — verify final policy wordings with licensed underwriters.
          </p>
          <p className="shrink-0">
            Information updated for 2026 policy standards
          </p>
        </div>
      </div>
    </footer>
  );
}
