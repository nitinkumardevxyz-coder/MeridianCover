import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  Bike,
  Car,
  HeartPulse,
  Home as HomeIcon,
  Plane,
  Shield,
} from 'lucide-react';
import { AdSlot } from '../components/ads/AdSlot';
import { SmartlinkButton } from '../components/ads/SmartlinkButton';
import { QuickQuoteWidget } from '../components/calculators/QuickQuoteWidget';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { ResilientImage } from '../components/common/ResilientImage';
import { PageShell, TocLink } from '../components/layout/PageShell';
import {
  HOME_FAQS,
  HOME_TESTIMONIALS,
  IMAGES,
} from '../data/insuranceContent';
import {
  calculateQuickQuote,
  formatCurrency,
  InsuranceCategory,
  PageSlug,
} from '../utils/insuranceCalculators';

interface HomePageProps {
  onNavigate: (page: PageSlug, sectionId?: string) => void;
}

const TOC_LINKS: TocLink[] = [
  { id: 'hero-overview', label: 'Instant Quote & Overview' },
  { id: 'coverage-lines', label: '6 Insurance Categories' },
  { id: 'quick-estimator', label: 'Premium Estimator' },
  { id: 'plan-comparison', label: 'Plan Comparison Table' },
  { id: 'how-it-works', label: 'How Insurance Works' },
  { id: 'buyers-guide', label: 'Long-Form Buyer Guide' },
  { id: 'testimonials', label: 'Policyholder Outcomes' },
  { id: 'home-faqs', label: 'Frequently Asked Questions' },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const [estCategory, setEstCategory] = useState<InsuranceCategory>('life');
  const [estAge, setEstAge] = useState(32);
  const [estCover, setEstCover] = useState(1000000);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'error' | 'success'
  >('idle');

  const estResult = calculateQuickQuote({
    category: estCategory,
    age: estAge,
    coverageAmount: estCover,
    familyMembers: 2,
  });

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim());
    if (!valid) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  const categories: {
    title: string;
    targetPage: PageSlug;
    icon: typeof HeartPulse;
    rateHint: string;
    summary: string;
  }[] = [
    {
      title: 'Health Insurance',
      targetPage: 'health',
      icon: HeartPulse,
      rateHint: 'From $42/mo · Cashless network',
      summary:
        'Individual, Family Floater, and Senior plans with zero room-rent caps, annual restoration, and maternity or critical care riders.',
    },
    {
      title: 'Life & Term Insurance',
      targetPage: 'life',
      icon: Shield,
      rateHint: 'From $18/mo · 10x–15x income',
      summary:
        'Pure level-term protection, whole life legacy cover, and critical illness riders backed by 99%+ settlement ratios.',
    },
    {
      title: 'Car Insurance',
      targetPage: 'motor',
      icon: Car,
      rateHint: 'From $35/mo · Up to 50% NCB',
      summary:
        'Third-Party statutory cover, Comprehensive own-damage, and Zero Depreciation bumper-to-bumper add-ons with cashless garages.',
    },
    {
      title: 'Bike & Two-Wheeler',
      targetPage: 'motor',
      icon: Bike,
      rateHint: 'From $9/mo · Instant renewal',
      summary:
        'Multi-year third-party liability, theft protection, and roadside assistance for daily commuters and touring motorcycles.',
    },
    {
      title: 'Home Insurance',
      targetPage: 'travel-home',
      icon: HomeIcon,
      rateHint: 'From $30/mo · Reinstatement basis',
      summary:
        'Structure and household contents coverage protecting against fire, storm surge, theft, burst pipes, and liability claims.',
    },
    {
      title: 'Travel Insurance',
      targetPage: 'travel-home',
      icon: Plane,
      rateHint: 'From $14/trip · Global evacuation',
      summary:
        'Schengen-compliant emergency medical cover, lost passport assistance, trip delay reimbursement, and baggage loss protection.',
    },
  ];

  return (
    <PageShell pageSlug="home" tocLinks={TOC_LINKS} onNavigate={onNavigate}>
      {/* Hero Section */}
      <section
        id="hero-overview"
        className="bg-white border border-[#DDE5F0] rounded-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 md:p-7 flex flex-col justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#0E9F6E] tracking-wide">
                Independent Insurance Comparison &amp; Claims Research
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#0B1F3A] tracking-tight leading-[1.18] text-balance mt-1.5">
                Compare Protection Plans Built to Pay Claims Without Surprises
              </h1>
              <p className="mt-3 text-[15px] text-[#4B5D75] leading-relaxed max-w-xl">
                Audit real claim settlement ratios, hospital networks, waiting periods, and deductibles across health, term life, motor, travel, and home coverage before committing to a multi-year contract.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-4 py-3 border-y border-[#EEF2F7]">
                <div>
                  <p className="font-mono-num text-lg md:text-xl font-bold text-[#0B1F3A]">
                    99.4%
                  </p>
                  <p className="text-xs text-[#4B5D75]">Claim Settlement Ratio</p>
                </div>
                <div>
                  <p className="font-mono-num text-lg md:text-xl font-bold text-[#0B1F3A]">
                    14,200+
                  </p>
                  <p className="text-xs text-[#4B5D75]">Cashless Hospitals</p>
                </div>
                <div>
                  <p className="font-mono-num text-lg md:text-xl font-bold text-[#0B1F3A]">
                    24/7
                  </p>
                  <p className="text-xs text-[#4B5D75]">Claims Desk Support</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <SmartlinkButton label="Compare Live Quotes" variant="primary" />
                <SmartlinkButton
                  label="Download Policy Checklist PDF"
                  variant="outline"
                />
              </div>
            </div>

            <div className="hidden lg:block rounded-xl overflow-hidden border border-[#DDE5F0] h-44">
              <ResilientImage
                src={IMAGES.heroFamily}
                alt="Couple reviewing household insurance coverage options at a sunlit oak table"
                className="w-full h-full object-cover"
                fallbackTitle="Household Insurance Planning"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F4F7FB] p-5 md:p-6 lg:p-7 border-t lg:border-t-0 lg:border-l border-[#DDE5F0] flex flex-col justify-center">
            <QuickQuoteWidget />
          </div>
        </div>
      </section>

      {/* 6 Insurance Category Cards */}
      <section id="coverage-lines" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0B1F3A]">
              Explore Coverage by Insurance Category
            </h2>
            <p className="text-sm text-[#4B5D75] mt-1">
              Every line opens a full-length policy guide, exclusions breakdown, and claim checklist.
            </p>
          </div>
          <SmartlinkButton label="Unlock Best Rates" variant="secondary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="bg-white border border-[#DDE5F0] rounded-xl p-5 flex flex-col justify-between hover:border-[#0B1F3A]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F4F7FB] border border-[#DDE5F0] flex items-center justify-center text-[#0B1F3A]">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-medium text-[#4B5D75] tabular-nums">
                      {cat.rateHint}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-[#4B5D75] mt-2 leading-relaxed">
                    {cat.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#EEF2F7] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onNavigate(cat.targetPage)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0E9F6E] hover:text-[#0B875D] transition-colors"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('calculators')}
                    className="text-xs font-medium text-[#4B5D75] hover:text-[#0B1F3A]"
                  >
                    Estimate Rate
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* In-Content Ad Break: 300x250 + 468x60 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white border border-[#DDE5F0] rounded-xl p-5">
        <div className="space-y-3">
          <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
            Check Claim Eligibility Before Renewal
          </h3>
          <p className="text-sm text-[#4B5D75] leading-relaxed">
            Most policyholders overpay 12%–22% by renewing legacy policies automatically without auditing NCB slabs, room-rent sub-limits, or updated term mortality rates.
          </p>
          <SmartlinkButton label="Check Claim Eligibility" variant="primary" />
        </div>
        <AdSlot format="300x250" slotId="home-mid-300x250" className="my-0!" />
      </div>

      {/* Interactive Quick Premium Estimator */}
      <section
        id="quick-estimator"
        className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#EEF2F7]">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
              Interactive Quick Premium Estimator
            </h2>
            <p className="text-sm text-[#4B5D75] mt-1">
              Slide age and coverage amount to preview monthly benchmark rates before opening full calculators.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('calculators')}
            className="text-sm font-semibold text-[#0E9F6E] hover:text-[#0B875D] whitespace-nowrap shrink-0"
          >
            Open All 3 Full Calculators →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#F4F7FB] rounded-lg">
              {(
                [
                  ['life', 'Term Life'],
                  ['health', 'Health'],
                  ['car', 'Car'],
                  ['home', 'Home'],
                  ['travel', 'Travel'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setEstCategory(id);
                    if (id === 'car') setEstCover(34000);
                    else if (id === 'travel') setEstCover(100000);
                    else if (id === 'home') setEstCover(450000);
                    else if (id === 'health') setEstCover(500000);
                    else setEstCover(1000000);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    estCategory === id
                      ? 'bg-white text-[#0B1F3A] font-semibold shadow-xs'
                      : 'text-[#4B5D75] hover:text-[#0B1F3A]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <label htmlFor="home-est-age" className="font-medium text-[#0B1F3A]">
                  Insured Age
                </label>
                <span className="font-mono-num font-semibold text-[#0B1F3A]">
                  {estAge} years
                </span>
              </div>
              <input
                id="home-est-age"
                type="range"
                min={20}
                max={70}
                value={estAge}
                onChange={(e) => setEstAge(Number(e.target.value))}
                className="w-full accent-[#0E9F6E]"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <label htmlFor="home-est-cover" className="font-medium text-[#0B1F3A]">
                  Coverage / Insured Sum
                </label>
                <span className="font-mono-num font-semibold text-[#0B1F3A]">
                  {formatCurrency(estCover)}
                </span>
              </div>
              <input
                id="home-est-cover"
                type="range"
                min={estCategory === 'car' ? 12000 : 50000}
                max={estCategory === 'car' ? 95000 : 2000000}
                step={estCategory === 'car' ? 2000 : 25000}
                value={estCover}
                onChange={(e) => setEstCover(Number(e.target.value))}
                className="w-full accent-[#0E9F6E]"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0B1F3A] text-white rounded-xl p-6 space-y-4">
            <p className="text-xs text-slate-300">{estResult.recommendedTier}</p>
            <div className="flex items-baseline justify-between">
              <p className="font-mono-num text-3xl font-bold text-[#10B981]">
                {formatCurrency(estResult.monthlyPremium)}
                <span className="text-sm font-normal text-slate-300">/mo</span>
              </p>
              <p className="font-mono-num text-sm text-slate-200">
                {formatCurrency(estResult.annualPremium)}/yr
              </p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Includes estimated direct-channel savings of {formatCurrency(estResult.estimatedSavings)}/year compared to offline renewal rates.
            </p>
            <SmartlinkButton
              label="View Partner Offers"
              variant="primary"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <AdSlot format="468x60" slotId="home-est-468x60" />

      {/* Slot 2 Mid-Page Leaderboard & Mobile Banner */}
      <AdSlot format="728x90" slotId="home-mid-728x90" />
      <AdSlot format="320x50" slotId="home-mid-320x50" />

      {/* Side-by-Side Plan Comparison Table */}
      <section id="plan-comparison" className="space-y-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            Side-by-Side Insurance Plan Comparison
          </h2>
          <p className="text-sm text-[#4B5D75] mt-1">
            Core protection benchmarks across the four essential household insurance pillars.
          </p>
        </div>

        <div className="bg-white border border-[#DDE5F0] rounded-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-[#F4F7FB] border-b border-[#DDE5F0] text-xs font-semibold text-[#0B1F3A]">
                <th className="py-3.5 px-4">Comparison Dimension</th>
                <th className="py-3.5 px-4">Health Floater</th>
                <th className="py-3.5 px-4">Term Life</th>
                <th className="py-3.5 px-4">Comprehensive Motor</th>
                <th className="py-3.5 px-4">Travel &amp; Home</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F7] text-sm text-[#4B5D75]">
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Primary Financial Risk Covered
                </td>
                <td className="py-3.5 px-4">Hospitalization, ICU, surgery</td>
                <td className="py-3.5 px-4">Income loss &amp; debt payoff</td>
                <td className="py-3.5 px-4">Accident repair, theft, 3P</td>
                <td className="py-3.5 px-4">Evacuation, fire, property loss</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Recommended Benchmark Cover
                </td>
                <td className="py-3.5 px-4 font-mono-num">$500k–$1M+</td>
                <td className="py-3.5 px-4 font-mono-num">12x–15x annual income</td>
                <td className="py-3.5 px-4 font-mono-num">100% IDV + Zero Dep</td>
                <td className="py-3.5 px-4 font-mono-num">$250k+ medical / Rebuild cost</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Waiting Period / Deductible
                </td>
                <td className="py-3.5 px-4">30d initial · 24–36m PED</td>
                <td className="py-3.5 px-4">Immediate (non-suicide)</td>
                <td className="py-3.5 px-4">Zero wait · Standard excess</td>
                <td className="py-3.5 px-4">Zero wait · Per-claim excess</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Cashless Network Advantage
                </td>
                <td className="py-3.5 px-4">14,200+ partner hospitals</td>
                <td className="py-3.5 px-4">Direct bank wire to nominee</td>
                <td className="py-3.5 px-4">6,800+ authorized garages</td>
                <td className="py-3.5 px-4">24/7 global assistance desk</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Critical Exclusion to Audit
                </td>
                <td className="py-3.5 px-4">Room-rent caps &amp; consumables</td>
                <td className="py-3.5 px-4">Undisclosed smoking/medical</td>
                <td className="py-3.5 px-4">Expired license / DUI / NCB lapse</td>
                <td className="py-3.5 px-4">Pre-existing travel &amp; flood zones</td>
              </tr>
            </tbody>
          </table>
        </div>

        <AdSlot format="native" slotId="home-comparison-native" />
      </section>

      {/* How Insurance Works 4-Step Visual Breakdown */}
      <section id="how-it-works" className="space-y-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            How Insurance Works: 4-Step Lifecycle
          </h2>
          <p className="text-sm text-[#4B5D75] mt-1">
            Understanding underwriting, policy issuance, and claim settlement before you sign.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: '01. Risk Profiling',
              body: 'Insurers evaluate age, health disclosures, vehicle IDV, and geographic zone to assign a transparent base premium.',
            },
            {
              step: '02. Policy & Free-Look',
              body: 'Upon payment, you receive the Policy Schedule PDF and a 15–30 day free-look window to verify every rider and sub-limit.',
            },
            {
              step: '03. Claim Intimation',
              body: 'During hospitalization, collision, or property loss, notify the 24/7 claims desk with policy ID and diagnostic or police reports.',
            },
            {
              step: '04. Cashless or Payout',
              body: 'Pre-authorized hospitals and garages settle bills directly with the insurer, or verified receipts are reimbursed via wire.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white border border-[#DDE5F0] rounded-xl p-5"
            >
              <p className="font-display text-sm font-bold text-[#0E9F6E]">
                {item.step}
              </p>
              <p className="text-sm text-[#4B5D75] mt-2 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Long-Form Buyer's Guide */}
      <section
        id="buyers-guide"
        className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8 space-y-6"
      >
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            Buyer’s Guide: How to Choose Coverage &amp; Avoid Claim Mistakes
          </h2>
          <p className="text-sm text-[#4B5D75] mt-1">
            Practical underwriting principles distilled from thousands of settled and contested claims.
          </p>
        </div>

        <div className="space-y-4 text-[15px] text-[#334155] leading-relaxed">
          <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
            1. Size Coverage for Catastrophic Tail Risk, Not Minor Expenses
          </h3>
          <p>
            The fundamental purpose of insurance is transferring catastrophic financial risk that would otherwise derail multi-year savings—not prepaying predictable outpatient visits or minor scratches. In health insurance, opting for a higher Sum Insured paired with a modest voluntary deductible frequently delivers far stronger protection against ICU or oncology bills than a low-cap zero-deductible plan.
          </p>
          <p>
            Similarly, in term life insurance, cutting your policy duration from age 65 down to age 50 simply to shave $8 off the monthly premium leaves a dangerous gap during peak college tuition and late-career mortgage payoff years. Lock the full term early while health underwriting scores are favorable.
          </p>

          <AdSlot format="468x60" slotId="home-guide-468x60" />

          <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
            2. Audit Sub-Limits, Co-Pays, and Proportionate Deductions
          </h3>
          <p>
            Two policies with identical $500,000 headline limits can behave completely differently inside a hospital billing office. If Policy A imposes a 1% daily room-rent cap ($5,000/day ceiling on a $500k plan, or $500/day on a $50k plan) and your admitted private room exceeds that threshold, the insurer applies proportionate deductions across surgeon fees, anesthesia, and diagnostics—shrinking reimbursement substantially.
          </p>
          <p>
            Before finalizing any medical policy, verify four clauses in the Schedule of Benefits: (a) No Room-Rent Restrictions, (b) Zero Compulsory Co-Pay across all age bands, (c) Consumables / Non-Medical Expense Waiver, and (d) 100% Annual Restoration for unrelated or same-illness hospitalizations.
          </p>

          <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
            3. Eliminate Non-Disclosure &amp; Lapsed Renewal Traps
          </h3>
          <p>
            Nearly four out of ten disputed life and health claims trace back to incomplete medical history on the proposal form. Never let an agent check "No" on blood pressure, elevated HbA1c, childhood asthma, or tobacco consumption to speed up issuance. Full disclosure ensures your contract becomes incontestable on solid legal footing.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <SmartlinkButton label="Compare Live Quotes" variant="primary" />
          <button
            type="button"
            onClick={() => onNavigate('guides')}
            className="px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] border border-[#CBD8E8] rounded-lg hover:bg-[#F4F7FB] transition-colors"
          >
            Read All 4 Editorial Deep-Dives
          </button>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section id="testimonials" className="space-y-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            Verified Policyholder Outcomes
          </h2>
          <p className="text-sm text-[#4B5D75] mt-1">
            Real coverage switches comparing prior gaps against settled claim performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {HOME_TESTIMONIALS.map((t) => (
            <article
              key={t.name}
              className="bg-white border border-[#DDE5F0] rounded-xl p-5 flex flex-col justify-between"
            >
              <div className="space-y-3 text-sm">
                <p className="text-[#4B5D75] leading-relaxed">
                  <span className="font-semibold text-[#0B1F3A]">Before: </span>
                  {t.before}
                </p>
                <p className="text-[#334155] leading-relaxed">
                  <span className="font-semibold text-[#0E9F6E]">Outcome: </span>
                  {t.outcome}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EEF2F7]">
                <p className="font-display text-sm font-bold text-[#0B1F3A]">
                  {t.name}
                </p>
                <p className="text-xs text-[#64748B]">{t.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AdSlot format="300x250" slotId="home-testimonials-300x250" />

      {/* FAQ Accordion */}
      <section id="home-faqs" className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
          Frequently Asked Insurance Questions
        </h2>
        <FaqAccordion items={HOME_FAQS} idPrefix="home-faq" />
      </section>

      {/* Newsletter & Quote Checklist CTA */}
      <section className="bg-[#0B1F3A] text-white rounded-xl p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="font-display text-xl md:text-2xl font-bold">
            Get Renewal Rate Alerts &amp; Policy Audit Checklists
          </h2>
          <p className="text-sm text-slate-300 mt-1.5">
            Receive quarterly insurer Claim Settlement Ratio updates and pre-renewal negotiation scripts directly in your inbox.
          </p>
        </div>

        <form
          onSubmit={handleNewsletterSubmit}
          className="w-full lg:w-auto flex flex-col sm:flex-row gap-2.5"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={newsletterEmail}
            onChange={(e) => {
              setNewsletterEmail(e.target.value);
              if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
            }}
            placeholder="you@example.com"
            className="px-4 py-2.5 text-sm rounded-lg bg-white text-[#0B1F3A] placeholder:text-[#64748B] min-w-[240px]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 text-sm font-semibold bg-[#0E9F6E] hover:bg-[#0B875D] text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Subscribe Free
          </button>
        </form>
      </section>

      {newsletterStatus === 'error' && (
        <p className="text-xs font-medium text-red-700 -mt-6">
          Please enter a valid email address to subscribe.
        </p>
      )}
      {newsletterStatus === 'success' && (
        <p className="text-xs font-medium text-[#0E9F6E] -mt-6">
          Subscribed. Your Policy Audit Checklist is ready for your next renewal cycle.
        </p>
      )}
    </PageShell>
  );
}
