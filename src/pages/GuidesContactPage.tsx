import { FormEvent, useState } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { AdSlot } from '../components/ads/AdSlot';
import { SmartlinkButton } from '../components/ads/SmartlinkButton';
import { PageShell, TocLink } from '../components/layout/PageShell';
import { EDITORIAL_ARTICLES } from '../data/insuranceContent';
import {
  ConsultationFormInput,
  validateConsultationForm,
} from '../utils/insuranceCalculators';

const TOC_LINKS: TocLink[] = [
  { id: 'guides-hero', label: 'Editorial Claims Hub' },
  { id: 'article-claim-rejections', label: 'Top 10 Claim Rejections' },
  { id: 'article-port-health', label: 'Porting Health Insurance' },
  { id: 'article-expired-motor', label: 'Renewing Expired Motor' },
  { id: 'article-fine-print', label: 'Reading Policy Fine Print' },
  { id: 'contact-section', label: 'Advisor Consultation Form' },
  { id: 'compliance-privacy', label: 'Privacy, Disclaimer & Terms' },
];

export function GuidesContactPage() {
  const [expandedArticles, setExpandedArticles] = useState<
    Record<string, boolean>
  >({
    'article-claim-rejections': true,
    'article-port-health': true,
    'article-expired-motor': false,
    'article-fine-print': false,
  });

  const [formState, setFormState] = useState<ConsultationFormInput>({
    fullName: '',
    email: '',
    phone: '',
    topic: 'Health Insurance',
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ConsultationFormInput, string>>
  >({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const toggleArticle = (id: string) => {
    setExpandedArticles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateConsultationForm(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmittedRef(null);
      return;
    }
    setErrors({});
    setSubmittedRef('MC-2026-8419');
    setFormState({
      fullName: '',
      email: '',
      phone: '',
      topic: 'Health Insurance',
      message: '',
      consent: false,
    });
  };

  return (
    <PageShell pageSlug="guides" tocLinks={TOC_LINKS}>
      {/* Hero */}
      <section
        id="guides-hero"
        className="bg-white border border-[#DDE5F0] rounded-2xl p-6 md:p-8"
      >
        <p className="text-xs font-semibold text-[#0E9F6E]">
          Insurance Research, Claims &amp; Advisory Contact
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#0B1F3A] tracking-tight text-balance mt-2">
          In-Depth Insurance Playbooks, Claims Guides &amp; Compliance
        </h1>
        <p className="mt-3 text-[15px] text-[#4B5D75] leading-relaxed max-w-3xl">
          Actionable editorial guides covering claim rejection prevention, health policy portability, expired motor renewal rules, and fine-print clause audits—plus direct advisor consultation and full network compliance disclosures.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <SmartlinkButton label="Check Claim Eligibility" variant="primary" />
          <SmartlinkButton
            label="Download Policy Checklist PDF"
            variant="outline"
          />
        </div>
      </section>

      {/* 4 Detailed Expandable Editorial Articles */}
      <section className="space-y-6">
        {EDITORIAL_ARTICLES.map((article, idx) => {
          const isOpen = !!expandedArticles[article.id];
          return (
            <div key={article.id} className="space-y-6">
              <article
                id={article.id}
                className="bg-white border border-[#DDE5F0] rounded-xl overflow-hidden"
              >
                <div className="p-6 md:p-7">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                    <span className="font-semibold text-[#0E9F6E]">
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.updated}</span>
                  </div>

                  <h2 className="font-display text-xl md:text-2xl font-bold text-[#0B1F3A] mt-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-[#4B5D75] mt-2 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="mt-4">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleArticle(article.id)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:text-[#0E9F6E] transition-colors"
                    >
                      <span>
                        {isOpen ? 'Collapse Full Guide' : 'Expand Full Guide'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {isOpen && (
                    <div className="mt-6 pt-6 border-t border-[#EEF2F7] space-y-5">
                      {article.sections.map((sec) => (
                        <div key={sec.heading} className="space-y-1.5">
                          <h3 className="font-display text-base font-bold text-[#0B1F3A]">
                            {sec.heading}
                          </h3>
                          <p className="text-sm text-[#334155] leading-relaxed">
                            {sec.body}
                          </p>
                        </div>
                      ))}

                      <div className="bg-[#F4F7FB] border border-[#DDE5F0] rounded-lg p-4 space-y-2">
                        <p className="font-display text-xs font-bold text-[#0B1F3A]">
                          Actionable Verification Checklist
                        </p>
                        <ul className="space-y-1.5 text-sm text-[#334155]">
                          {article.checklist.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2
                                className="w-4 h-4 text-[#0E9F6E] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </article>

              {idx === 0 && (
                <>
                  <AdSlot format="300x250" slotId="guides-mid-300x250" />
                  <AdSlot format="468x60" slotId="guides-mid-468x60" />
                </>
              )}
              {idx === 1 && (
                <>
                  <AdSlot format="728x90" slotId="guides-mid-728x90" />
                  <AdSlot format="320x50" slotId="guides-mid-320x50" />
                </>
              )}
              {idx === 2 && <AdSlot format="native" slotId="guides-native" />}
            </div>
          );
        })}
      </section>

      {/* Contact & Consultation Form */}
      <section
        id="contact-section"
        className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-semibold text-[#0E9F6E]">
              Policy Review &amp; Claims Helpdesk
            </p>
            <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
              Request an Independent Policy Consultation
            </h2>
            <p className="text-sm text-[#4B5D75] leading-relaxed">
              Need help auditing a health policy portability window, sizing term life cover, or challenging an unfair claim deduction? Send your inquiry below for structured checklist guidance.
            </p>
            <div className="bg-[#F4F7FB] border border-[#DDE5F0] rounded-lg p-4 space-y-2 text-sm text-[#334155]">
              <p>
                <strong>Advisory Desk Hours:</strong> Mon–Sat, 8:00 AM – 8:00 PM
              </p>
              <p>
                <strong>Editorial &amp; Support:</strong> support@meridiancover.example
              </p>
              <p>
                <strong>Response SLA:</strong> Within 1 business day
              </p>
            </div>
            <SmartlinkButton label="Compare Live Quotes" variant="secondary" />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-7 space-y-4"
          >
            {submittedRef && (
              <div
                role="status"
                className="bg-[#0E9F6E]/10 border border-[#0E9F6E]/30 rounded-lg p-4 text-sm text-[#0B1F3A]"
              >
                <p className="font-semibold text-[#0E9F6E]">
                  Consultation Request Received (Ref: {submittedRef})
                </p>
                <p className="mt-1 text-[#334155]">
                  Thank you. Our policy review desk has logged your inquiry and will reply with an itemized comparison checklist.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="cf-name"
                  className="block text-xs font-medium text-[#0B1F3A] mb-1"
                >
                  Full Name
                </label>
                <input
                  id="cf-name"
                  type="text"
                  value={formState.fullName}
                  onChange={(e) =>
                    setFormState({ ...formState, fullName: e.target.value })
                  }
                  placeholder="Elena Vance"
                  className="w-full px-3 py-2.5 text-sm border border-[#DDE5F0] rounded-lg bg-white text-[#0B1F3A]"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-700 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cf-email"
                  className="block text-xs font-medium text-[#0B1F3A] mb-1"
                >
                  Email Address
                </label>
                <input
                  id="cf-email"
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  placeholder="elena@example.com"
                  className="w-full px-3 py-2.5 text-sm border border-[#DDE5F0] rounded-lg bg-white text-[#0B1F3A]"
                />
                {errors.email && (
                  <p className="text-xs text-red-700 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="cf-phone"
                  className="block text-xs font-medium text-[#0B1F3A] mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="cf-phone"
                  type="tel"
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState({ ...formState, phone: e.target.value })
                  }
                  placeholder="+1 (415) 555-0192"
                  className="w-full px-3 py-2.5 text-sm border border-[#DDE5F0] rounded-lg bg-white text-[#0B1F3A]"
                />
                {errors.phone && (
                  <p className="text-xs text-red-700 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cf-topic"
                  className="block text-xs font-medium text-[#0B1F3A] mb-1"
                >
                  Insurance Topic
                </label>
                <select
                  id="cf-topic"
                  value={formState.topic}
                  onChange={(e) =>
                    setFormState({ ...formState, topic: e.target.value })
                  }
                  className="w-full px-3 py-2.5 text-sm border border-[#DDE5F0] rounded-lg bg-white text-[#0B1F3A]"
                >
                  <option>Health Insurance</option>
                  <option>Term Life Cover</option>
                  <option>Car / Bike Insurance</option>
                  <option>Travel &amp; Home Cover</option>
                  <option>Claim Dispute Guidance</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="cf-message"
                className="block text-xs font-medium text-[#0B1F3A] mb-1"
              >
                Coverage Question or Current Policy Details
              </label>
              <textarea
                id="cf-message"
                rows={4}
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                placeholder="Share your household size, renewal month, or coverage goal..."
                className="w-full px-3 py-2.5 text-sm border border-[#DDE5F0] rounded-lg bg-white text-[#0B1F3A]"
              />
              {errors.message && (
                <p className="text-xs text-red-700 mt-1">{errors.message}</p>
              )}
            </div>

            <div>
              <label className="inline-flex items-start gap-2.5 text-xs text-[#4B5D75] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formState.consent}
                  onChange={(e) =>
                    setFormState({ ...formState, consent: e.target.checked })
                  }
                  className="mt-0.5 accent-[#0E9F6E]"
                />
                <span>
                  I acknowledge the editorial insurance disclaimer and privacy policy below.
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-red-700 mt-1">{errors.consent}</p>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-3 text-sm font-semibold bg-[#0E9F6E] hover:bg-[#0B875D] text-white rounded-lg transition-colors"
            >
              Submit Consultation Request
            </button>
          </form>
        </div>
      </section>

      {/* Compliance: Privacy Policy, Disclaimer & Terms */}
      <section
        id="compliance-privacy"
        className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8 space-y-6 text-sm text-[#4B5D75] leading-relaxed"
      >
        <div>
          <h2 className="font-display text-xl font-bold text-[#0B1F3A]">
            Privacy Policy, Advertising Disclosure &amp; Terms of Use
          </h2>
          <p className="mt-2">
            <strong>Privacy Policy:</strong> MeridianCover collects consultation details strictly to respond to user-submitted coverage questions. We do not sell personal contact records to third-party telemarketers. Standard browser cookies and third-party advertising partners (including Adsterra display, native, social bar, and smartlink placements) may use non-personally-identifiable session signals to serve relevant financial ads.
          </p>
        </div>

        <div id="compliance-disclaimer" className="pt-4 border-t border-[#EEF2F7]">
          <h3 className="font-display text-base font-bold text-[#0B1F3A]">
            Insurance Educational Disclaimer
          </h3>
          <p className="mt-1.5">
            All calculators, premium benchmarks, tax estimates, and claim comparisons published on MeridianCover are provided strictly for educational research. Final underwriting premiums, waiting periods, exclusions, and claim settlements are governed exclusively by the signed Policy Wordings issued by licensed insurance carriers.
          </p>
        </div>

        <div id="compliance-terms" className="pt-4 border-t border-[#EEF2F7]">
          <h3 className="font-display text-base font-bold text-[#0B1F3A]">
            Terms of Service
          </h3>
          <p className="mt-1.5">
            By using MeridianCover’s comparison tables and calculators, you agree that MeridianCover operates as an independent informational publisher and is not a direct underwriter or binding claims fiduciary. External quote links open partner comparison portals in a separate browser tab.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
