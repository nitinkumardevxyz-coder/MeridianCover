import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { AdSlot } from '../components/ads/AdSlot';
import { SmartlinkButton } from '../components/ads/SmartlinkButton';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { PageShell, TocLink } from '../components/layout/PageShell';
import { LIFE_FAQS } from '../data/insuranceContent';
import {
  calculateTermLifeEstimate,
  formatCurrency,
} from '../utils/insuranceCalculators';

const TOC_LINKS: TocLink[] = [
  { id: 'life-hero', label: '10x–15x Coverage Estimator' },
  { id: 'life-plans-table', label: 'Term vs. Whole vs. ULIP vs. Endowment' },
  { id: 'life-riders', label: 'Essential Policy Riders' },
  { id: 'csr-guide', label: 'Claim Settlement Ratio Guide' },
  { id: 'life-faqs', label: 'Life Insurance FAQs' },
];

export function LifeInsurancePage() {
  const [age, setAge] = useState(31);
  const [annualIncome, setAnnualIncome] = useState(110000);
  const [liabilities, setLiabilities] = useState(280000);
  const [smoker, setSmoker] = useState(false);

  const estimate = calculateTermLifeEstimate({
    age,
    annualIncome,
    liabilities,
    existingCover: 100000,
    dependents: 2,
    policyTermYears: 30,
    smoker,
  });

  return (
    <PageShell pageSlug="life" tocLinks={TOC_LINKS}>
      {/* Hero + Coverage Needs Estimator */}
      <section
        id="life-hero"
        className="bg-white border border-[#DDE5F0] rounded-2xl p-6 md:p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-semibold text-[#0E9F6E]">
              Life &amp; Term Insurance Guide
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#0B1F3A] tracking-tight text-balance">
              Lock High-Cover Term Protection Using the 10x–15x Income Rule
            </h1>
            <p className="text-[15px] text-[#4B5D75] leading-relaxed">
              Pure term insurance separates protection from expensive savings bundles—letting households secure $1M+ in guaranteed family income replacement for a fraction of whole life or endowment premiums.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <SmartlinkButton label="Compare Live Quotes" variant="primary" />
              <SmartlinkButton label="Unlock Best Rates" variant="outline" />
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0B1F3A] text-white rounded-xl p-6 space-y-4">
            <h2 className="font-display text-lg font-bold">
              Coverage Needs Estimator (10x–15x Rule)
            </h2>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <label htmlFor="life-age" className="text-slate-200">
                  Applicant Age
                </label>
                <span className="font-mono-num font-semibold">{age} yrs</span>
              </div>
              <input
                id="life-age"
                type="range"
                min={21}
                max={60}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-[#10B981]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <label htmlFor="life-inc" className="text-slate-200">
                  Annual Income
                </label>
                <span className="font-mono-num font-semibold">
                  {formatCurrency(annualIncome)}
                </span>
              </div>
              <input
                id="life-inc"
                type="range"
                min={30000}
                max={350000}
                step={5000}
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full accent-[#10B981]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <label htmlFor="life-debt" className="text-slate-200">
                  Mortgage &amp; Debts
                </label>
                <span className="font-mono-num font-semibold">
                  {formatCurrency(liabilities)}
                </span>
              </div>
              <input
                id="life-debt"
                type="range"
                min={0}
                max={1000000}
                step={10000}
                value={liabilities}
                onChange={(e) => setLiabilities(Number(e.target.value))}
                className="w-full accent-[#10B981]"
              />
            </div>

            <label className="inline-flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={smoker}
                onChange={(e) => setSmoker(e.target.checked)}
                className="accent-[#10B981]"
              />
              <span>Smoker / Tobacco User</span>
            </label>

            <div className="border-t border-[#1D3B63] pt-3 flex items-baseline justify-between">
              <div>
                <p className="text-xs text-slate-300">
                  Recommended Cover ({estimate.incomeMultiplier}x)
                </p>
                <p className="font-mono-num text-2xl font-bold text-[#10B981]">
                  {formatCurrency(estimate.netCoverageGap)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-300">Est. Monthly</p>
                <p className="font-mono-num text-lg font-bold">
                  {formatCurrency(estimate.estimatedMonthlyPremium)}/mo
                </p>
              </div>
            </div>

            <SmartlinkButton
              label="View Partner Offers"
              variant="primary"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Term vs Whole Life vs ULIP vs Endowment Comparison Table */}
      <section id="life-plans-table" className="space-y-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            Term Plan vs. Whole Life vs. ULIP vs. Endowment Comparison
          </h2>
          <p className="text-sm text-[#4B5D75] mt-1">
            Compare pure risk protection against bundled savings and market-linked insurance contracts.
          </p>
        </div>

        <div className="bg-white border border-[#DDE5F0] rounded-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-[#F4F7FB] border-b border-[#DDE5F0] text-xs font-semibold text-[#0B1F3A]">
                <th className="py-3.5 px-4">Attribute</th>
                <th className="py-3.5 px-4">Pure Term Plan</th>
                <th className="py-3.5 px-4">Whole Life Cover</th>
                <th className="py-3.5 px-4">ULIP (Unit Linked)</th>
                <th className="py-3.5 px-4">Endowment Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F7] text-sm text-[#4B5D75]">
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Core Purpose
                </td>
                <td className="py-3.5 px-4">Maximum income replacement</td>
                <td className="py-3.5 px-4">Lifelong legacy / estate tax</td>
                <td className="py-3.5 px-4">Market investment + modest cover</td>
                <td className="py-3.5 px-4">Guaranteed savings + low cover</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Cost per $1M Cover
                </td>
                <td className="py-3.5 px-4 font-mono-num text-[#0E9F6E] font-semibold">
                  Lowest ($25–$65/mo)
                </td>
                <td className="py-3.5 px-4 font-mono-num">8x–12x higher</td>
                <td className="py-3.5 px-4 font-mono-num">6x–10x higher</td>
                <td className="py-3.5 px-4 font-mono-num">10x–15x higher</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Maturity Value
                </td>
                <td className="py-3.5 px-4">None (pure protection)</td>
                <td className="py-3.5 px-4">Cash value + death benefit</td>
                <td className="py-3.5 px-4">NAV-linked fund value</td>
                <td className="py-3.5 px-4">Sum Assured + bonuses</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Liquidity &amp; Lock-in
                </td>
                <td className="py-3.5 px-4">Cancel anytime without penalty</td>
                <td className="py-3.5 px-4">Heavy early surrender fees</td>
                <td className="py-3.5 px-4">5-year statutory lock-in</td>
                <td className="py-3.5 px-4">High loss on early exit</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Advisory Verdict
                </td>
                <td className="py-3.5 px-4 font-semibold text-[#0B1F3A]">
                  Best for 90% of earners
                </td>
                <td className="py-3.5 px-4">Estate-planning niche</td>
                <td className="py-3.5 px-4">Inferior to Term + Index Fund</td>
                <td className="py-3.5 px-4">Low 4%–5% IRR returns</td>
              </tr>
            </tbody>
          </table>
        </div>

        <AdSlot format="300x250" slotId="life-mid-300x250" />
      </section>

      {/* Riders Explained */}
      <section id="life-riders" className="space-y-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            Term Life Riders Explained: Which Add-Ons Are Worth Paying For?
          </h2>
          <p className="text-sm text-[#4B5D75] mt-1">
            Riders expand your base contract against non-fatal income shocks at a marginal incremental cost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Critical Illness (CI) Rider',
              tag: 'High Priority for Single Earners',
              body: 'Pays a lump sum immediately upon diagnosis of listed major illnesses (stroke, bypass surgery, invasive cancer, organ transplant). Helps fund experimental care and lost wages while recovering. Prefer Additional (non-accelerated) CI riders so base death cover stays 100% intact.',
            },
            {
              title: 'Waiver of Premium (WOP)',
              tag: 'Essential Protection Safeguard',
              body: 'Automatically waives all future base policy premiums if the insured suffers Permanent Total Disability or a covered Critical Illness. Guarantees your family’s life cover will never lapse due to lost earning capacity.',
            },
            {
              title: 'Accidental Death Benefit (ADB)',
              tag: 'Selective Value',
              body: 'Adds an extra lump-sum payout (typically up to 100% of base cover capped at $500k–$1M) if death occurs due to an external accident. Useful for frequent highway commuters, though a standalone personal accident policy covers permanent disability better.',
            },
          ].map((rider) => (
            <div
              key={rider.title}
              className="bg-white border border-[#DDE5F0] rounded-xl p-5 space-y-2.5"
            >
              <p className="text-xs font-medium text-[#0E9F6E]">{rider.tag}</p>
              <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
                {rider.title}
              </h3>
              <p className="text-sm text-[#4B5D75] leading-relaxed">
                {rider.body}
              </p>
            </div>
          ))}
        </div>

        <AdSlot format="728x90" slotId="life-mid-728x90" />
        <AdSlot format="320x50" slotId="life-mid-320x50" />
      </section>

      {/* Claim Settlement Ratio Guide & Long-Form Article */}
      <section
        id="csr-guide"
        className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8 space-y-5"
      >
        <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
          Claim Settlement Ratio (CSR) &amp; Solvency Audit Guide
        </h2>
        <div className="space-y-4 text-[15px] text-[#334155] leading-relaxed">
          <p>
            When comparing term insurers, never evaluate Claim Settlement Ratio (CSR) in isolation. An insurer that settles 99% of small $20,000 endowment claims while contesting several $1.5M term policies can still display a flattering headline CSR by policy count. Always cross-check three metrics together: <strong>Claim Amount Settlement Ratio</strong> (total dollars paid vs. claimed), <strong>Claims Pending Ratio</strong> (&lt; 0.5% ideal), and <strong>Solvency Margin</strong> (at least 1.6x regulatory minimum).
          </p>
          <p>
            Equally important is medical underwriting rigor at purchase. Carriers that mandate tele-medical or physical blood/ECG screenings before issuing $1M+ policies may take 5–7 days longer to underwrite, but they experience far fewer post-claim investigations later because health baselines are documented up front.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#334155] pt-2">
          {[
            'Insist on level premiums locked through retirement age (60–65).',
            'Choose Married Women’s Property / Trust endorsement if carrying business debt.',
            'Inform your primary nominee where policy PDFs and login credentials are stored.',
            'Complete physical medical tests honestly instead of opting for no-medical shortcuts.',
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 p-3 rounded-lg bg-[#F4F7FB]"
            >
              <CheckCircle2
                className="w-4 h-4 text-[#0E9F6E] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <AdSlot format="468x60" slotId="life-csr-468x60" />
        <AdSlot format="native" slotId="life-native" />
      </section>

      {/* Life FAQs */}
      <section id="life-faqs" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            Life &amp; Term Insurance FAQs
          </h2>
          <SmartlinkButton label="Check Claim Eligibility" variant="outline" />
        </div>
        <FaqAccordion items={LIFE_FAQS} idPrefix="life-faq" />
      </section>
    </PageShell>
  );
}
