import { useState } from 'react';
import { CheckCircle2, FileText } from 'lucide-react';
import { AdSlot } from '../components/ads/AdSlot';
import { SmartlinkButton } from '../components/ads/SmartlinkButton';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { ResilientImage } from '../components/common/ResilientImage';
import { PageShell, TocLink } from '../components/layout/PageShell';
import { HEALTH_FAQS, IMAGES } from '../data/insuranceContent';
import {
  calculateHealthPremiumEstimate,
  formatCurrency,
  HealthPlanType,
} from '../utils/insuranceCalculators';

const TOC_LINKS: TocLink[] = [
  { id: 'health-hero', label: 'Family Floater Quick Quote' },
  { id: 'health-comparison', label: 'Individual vs. Floater vs. Senior' },
  { id: 'claim-process', label: 'Cashless vs. Reimbursement' },
  { id: 'inclusions-exclusions', label: 'Inclusions, Waiting & Tax' },
  { id: 'health-checklist', label: 'Buying Checklist & FAQs' },
];

export function HealthInsurancePage() {
  const [planType, setPlanType] = useState<HealthPlanType>('family');
  const [eldestAge, setEldestAge] = useState(38);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [sumInsured, setSumInsured] = useState(500000);

  const quote = calculateHealthPremiumEstimate({
    planType,
    eldestAge,
    adults,
    children: planType === 'family' ? children : 0,
    sumInsured,
    cityTier: 'metro',
    deductible: 1000,
  });

  return (
    <PageShell pageSlug="health" tocLinks={TOC_LINKS}>
      {/* Hero + Quick Family Floater Quote Box */}
      <section
        id="health-hero"
        className="bg-white border border-[#DDE5F0] rounded-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-semibold text-[#0E9F6E]">
                Health Insurance Buying &amp; Claims Guide
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#0B1F3A] tracking-tight text-balance mt-2">
                Comprehensive Medical Protection Without Room-Rent Traps
              </h1>
              <p className="mt-3 text-[15px] text-[#4B5D75] leading-relaxed">
                Compare Individual, Family Floater, and Senior Citizen policies across 14,200+ cashless hospitals. Understand waiting periods, proportionate deductions, and annual tax benefits before locking in your Sum Insured.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <SmartlinkButton label="Compare Live Quotes" variant="primary" />
                <SmartlinkButton
                  label="Check Claim Eligibility"
                  variant="outline"
                />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#DDE5F0] h-52">
              <ResilientImage
                src={IMAGES.healthNetwork}
                alt="Modern hospital atrium representing cashless healthcare network access"
                className="w-full h-full object-cover"
                fallbackTitle="Cashless Hospital Network"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F4F7FB] p-6 border-t lg:border-t-0 lg:border-l border-[#DDE5F0] flex flex-col justify-center space-y-4">
            <h2 className="font-display text-lg font-bold text-[#0B1F3A]">
              Quick Family Floater Quote Box
            </h2>

            <div className="grid grid-cols-3 gap-1 p-1 bg-white border border-[#DDE5F0] rounded-lg">
              {(
                [
                  ['individual', 'Individual'],
                  ['family', 'Floater'],
                  ['senior', 'Senior 60+'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setPlanType(id);
                    if (id === 'senior' && eldestAge < 60) setEldestAge(64);
                    if (id === 'individual') setAdults(1);
                  }}
                  className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                    planType === id
                      ? 'bg-[#0B1F3A] text-white'
                      : 'text-[#4B5D75] hover:text-[#0B1F3A]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <label htmlFor="hl-age" className="font-medium text-[#0B1F3A]">
                  Eldest Member Age
                </label>
                <span className="font-mono-num font-semibold">{eldestAge} yrs</span>
              </div>
              <input
                id="hl-age"
                type="range"
                min={18}
                max={80}
                value={eldestAge}
                onChange={(e) => setEldestAge(Number(e.target.value))}
                className="w-full accent-[#0E9F6E]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <label htmlFor="hl-sum" className="font-medium text-[#0B1F3A]">
                  Annual Sum Insured
                </label>
                <span className="font-mono-num font-semibold">
                  {formatCurrency(sumInsured)}
                </span>
              </div>
              <input
                id="hl-sum"
                type="range"
                min={100000}
                max={1500000}
                step={50000}
                value={sumInsured}
                onChange={(e) => setSumInsured(Number(e.target.value))}
                className="w-full accent-[#0E9F6E]"
              />
            </div>

            {planType === 'family' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="hl-adults"
                    className="block text-xs text-[#4B5D75] mb-1"
                  >
                    Adults
                  </label>
                  <select
                    id="hl-adults"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-2.5 py-2 text-xs border border-[#DDE5F0] rounded-lg bg-white"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="hl-kids"
                    className="block text-xs text-[#4B5D75] mb-1"
                  >
                    Children
                  </label>
                  <select
                    id="hl-kids"
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-2.5 py-2 text-xs border border-[#DDE5F0] rounded-lg bg-white"
                  >
                    <option value={0}>0 Children</option>
                    <option value={1}>1 Child</option>
                    <option value={2}>2 Children</option>
                    <option value={3}>3 Children</option>
                  </select>
                </div>
              </div>
            )}

            <div className="bg-white border border-[#DDE5F0] rounded-lg p-4">
              <p className="text-xs text-[#4B5D75]">Benchmark Annual Rate</p>
              <p className="font-mono-num text-2xl font-bold text-[#0B1F3A] mt-0.5">
                {formatCurrency(quote.estimatedAnnualPremium)}/yr
              </p>
              <p className="text-xs text-[#0E9F6E] mt-1 tabular-nums">
                Est. tax deduction benefit: ~{formatCurrency(quote.taxDeductionEstimate)}/yr
              </p>
            </div>

            <SmartlinkButton
              label="Unlock Best Rates"
              variant="primary"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <AdSlot format="468x60" slotId="health-hero-468x60" />

      {/* Comparison Table: Individual vs Family Floater vs Senior Citizen */}
      <section id="health-comparison" className="space-y-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            Individual vs. Family Floater vs. Senior Citizen Plans
          </h2>
          <p className="text-sm text-[#4B5D75] mt-1">
            Choosing the wrong policy structure often doubles renewal premiums without increasing usable claim protection.
          </p>
        </div>

        <div className="bg-white border border-[#DDE5F0] rounded-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-[#F4F7FB] border-b border-[#DDE5F0] text-xs font-semibold text-[#0B1F3A]">
                <th className="py-3.5 px-4">Feature</th>
                <th className="py-3.5 px-4">Individual Health Plan</th>
                <th className="py-3.5 px-4">Family Floater Plan</th>
                <th className="py-3.5 px-4">Senior Citizen Plan (60+)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F7] text-sm text-[#4B5D75]">
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  How Sum Insured Applies
                </td>
                <td className="py-3.5 px-4">Dedicated limit per person</td>
                <td className="py-3.5 px-4">Shared pool across household</td>
                <td className="py-3.5 px-4">Dedicated per senior parent</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Premium Pricing Basis
                </td>
                <td className="py-3.5 px-4">Individual age &amp; health</td>
                <td className="py-3.5 px-4">Age of eldest member</td>
                <td className="py-3.5 px-4">Senior age slab + chronic loading</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Mandatory Co-Payment
                </td>
                <td className="py-3.5 px-4">0% on most standard plans</td>
                <td className="py-3.5 px-4">0% for adults under 60</td>
                <td className="py-3.5 px-4">10%–20% common; seek 0% options</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Best Ideal Use Case
                </td>
                <td className="py-3.5 px-4">Single adults or high-risk member</td>
                <td className="py-3.5 px-4">Couples &amp; families with kids</td>
                <td className="py-3.5 px-4">Parents aged 60+ kept separate</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Pre-Existing Waiting Period
                </td>
                <td className="py-3.5 px-4 font-mono-num">24–36 months</td>
                <td className="py-3.5 px-4 font-mono-num">24–36 months</td>
                <td className="py-3.5 px-4 font-mono-num">12–24 months (faster option)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <AdSlot format="300x250" slotId="health-table-300x250" />
      </section>

      {/* Cashless vs. Reimbursement Step-by-Step Guide */}
      <section
        id="claim-process"
        className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8 space-y-6"
      >
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            Cashless vs. Reimbursement Claim Process Step-by-Step
          </h2>
          <p className="text-sm text-[#4B5D75] mt-1">
            Follow the exact hospital desk workflow to prevent unexpected pre-authorization delays or billing shortfalls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F4F7FB] border border-[#DDE5F0] rounded-xl p-5 space-y-3">
            <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
              Route A: Cashless Hospitalization (Preferred)
            </h3>
            <ol className="space-y-2.5 text-sm text-[#334155] list-decimal list-inside leading-relaxed">
              <li>
                <strong>Confirm Network Status:</strong> Verify the hospital is active on your insurer’s TPA cashless roster before planned admission.
              </li>
              <li>
                <strong>Present Health Card &amp; Photo ID:</strong> Submit the cashless pre-authorization form at the hospital insurance desk (48h prior for planned; within 24h for emergency).
              </li>
              <li>
                <strong>Initial &amp; Final Approval:</strong> Insurer approves an initial deposit within 2–4 hours, then audits the final itemized bill upon discharge.
              </li>
              <li>
                <strong>Pay Only Non-Medical Items:</strong> Settle any policy deductible or uncovered consumables and sign the discharge voucher.
              </li>
            </ol>
          </div>

          <div className="bg-[#F4F7FB] border border-[#DDE5F0] rounded-xl p-5 space-y-3">
            <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
              Route B: Reimbursement Claims (Non-Network)
            </h3>
            <ol className="space-y-2.5 text-sm text-[#334155] list-decimal list-inside leading-relaxed">
              <li>
                <strong>Intimate Within 24 Hours:</strong> Notify the insurer’s helpline even at non-network hospitals so a claim reference number is logged.
              </li>
              <li>
                <strong>Collect Original Documents:</strong> Obtain the signed Discharge Summary, itemized final bill, payment receipts, lab films, and indoor case papers.
              </li>
              <li>
                <strong>Submit Claim Packet (Within 15–30 Days):</strong> Upload digital scans and mail originals if requested by the claims adjudicator.
              </li>
              <li>
                <strong>Direct Bank Settlement:</strong> Approved amount is wired within 7–14 business days minus any applicable co-pay or sub-limit.
              </li>
            </ol>
          </div>
        </div>

        <AdSlot format="728x90" slotId="health-mid-728x90" />
        <AdSlot format="320x50" slotId="health-mid-320x50" />
      </section>

      {/* Inclusions, Exclusions, Waiting Periods & Tax Benefits */}
      <section id="inclusions-exclusions" className="space-y-6">
        <div className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8 space-y-5">
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            Inclusions, Exclusions, Waiting Periods &amp; Tax Deductions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-display font-bold text-[#0E9F6E] mb-2">
                Core Policy Inclusions
              </h3>
              <ul className="space-y-2 text-[#334155]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E9F6E] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>In-patient hospitalization (24+ hours), ICU, surgeon, and OT charges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E9F6E] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Day-care procedures under 24 hours (chemotherapy, dialysis, cataract)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E9F6E] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Pre-hospitalization (30–60 days) and post-hospitalization (60–180 days)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E9F6E] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Emergency road/air ambulance and annual preventive health checkups</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold text-[#0B1F3A] mb-2">
                Standard Waiting Periods &amp; Exclusions
              </h3>
              <ul className="space-y-2 text-[#4B5D75]">
                <li className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-[#0B1F3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span><strong>30-Day Initial Wait:</strong> Non-accidental illness claims excluded in month 1</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-[#0B1F3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span><strong>24-Month Specific Illnesses:</strong> Hernia, joint replacement, ENT, stones</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-[#0B1F3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span><strong>24–36 Month Pre-Existing (PED):</strong> Prior diagnosed diabetes, cardiac, asthma</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-[#0B1F3A] shrink-0 mt-0.5" aria-hidden="true" />
                  <span><strong>Permanent Exclusions:</strong> Cosmetic surgery, self-inflicted injury, experimental trials</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-[#F4F7FB] border border-[#DDE5F0] rounded-lg p-4 text-sm text-[#334155]">
            <strong>Tax Deduction Breakdown:</strong> Premiums paid for yourself, spouse, dependent children, and senior parents via non-cash digital channels frequently qualify for income-tax deductions or pre-tax HSA/employer reimbursement schedules depending on local jurisdiction—retaining itemized premium certificates lowers your net effective cost by 15% to 30%.
          </div>

          <AdSlot format="468x60" slotId="health-exclusions-468x60" />
        </div>

        <AdSlot format="native" slotId="health-native" />
      </section>

      {/* Long-Form Buying Checklist & FAQs */}
      <section id="health-checklist" className="space-y-6">
        <div className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8 space-y-4">
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            8-Point Health Insurance Buying Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[#334155]">
            {[
              'Confirm zero room-rent caps (Single Private Room minimum or No Cap).',
              'Check 100%+ Unlimited Restoration applies even for the same illness.',
              'Ensure at least 5 network tertiary hospitals lie within 20 minutes of home.',
              'Verify 60-day pre and 90–180 day post-hospitalization expense windows.',
              'Add a Consumables Cover rider to prevent 15%–20% non-payable bill cuts.',
              'Keep senior parents (60+) on a dedicated policy separate from kids.',
              'Verify No Claim Bonus boosts Sum Insured by 25%–50% per claim-free year.',
              'Compare Claim Settlement Ratio (>98%) and incurred claim ratio (55%–85%).',
            ].map((point) => (
              <div
                key={point}
                className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F4F7FB]/70 border border-[#EEF2F7]"
              >
                <CheckCircle2
                  className="w-4 h-4 text-[#0E9F6E] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 flex flex-wrap gap-3">
            <SmartlinkButton label="Compare Live Quotes" variant="primary" />
            <SmartlinkButton
              label="Download Policy Checklist PDF"
              variant="outline"
            />
          </div>
        </div>

        <AdSlot format="300x250" slotId="health-pre-faq-300x250" />

        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            Health Insurance FAQs
          </h2>
          <FaqAccordion items={HEALTH_FAQS} idPrefix="health-faq" />
        </div>
      </section>
    </PageShell>
  );
}
