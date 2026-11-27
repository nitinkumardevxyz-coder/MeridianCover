import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { AdSlot } from '../components/ads/AdSlot';
import { SmartlinkButton } from '../components/ads/SmartlinkButton';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { ResilientImage } from '../components/common/ResilientImage';
import { PageShell, TocLink } from '../components/layout/PageShell';
import { IMAGES, MOTOR_FAQS } from '../data/insuranceContent';
import {
  calculateMotorIdvNcb,
  formatCurrency,
  NcbYears,
  VehicleType,
} from '../utils/insuranceCalculators';

const TOC_LINKS: TocLink[] = [
  { id: 'motor-hero', label: 'Vehicle Quote Selector' },
  { id: 'motor-comparison', label: '3P vs. Comp vs. Zero Dep' },
  { id: 'ncb-idv-guide', label: 'NCB Slabs & IDV Guide' },
  { id: 'motor-claim-checklist', label: 'Accident & Cashless Checklist' },
  { id: 'motor-faqs', label: 'Motor Insurance FAQs' },
];

export function MotorInsurancePage() {
  const [vehicleType, setVehicleType] = useState<VehicleType>('car');
  const [regInput, setRegInput] = useState('CA-842-MNR');
  const [vehicleAge, setVehicleAge] = useState(2);
  const [ncbYears, setNcbYears] = useState<NcbYears>(3);

  const basePrice = vehicleType === 'bike' ? 6800 : vehicleType === 'ev' ? 44000 : 34000;
  const estimate = calculateMotorIdvNcb({
    vehicleType,
    exShowroomPrice: basePrice,
    vehicleAgeYears: vehicleAge,
    ncbClaimFreeYears: ncbYears,
    zeroDepreciation: true,
    roadsideAssistance: true,
  });

  return (
    <PageShell pageSlug="motor" tocLinks={TOC_LINKS}>
      {/* Hero + Vehicle Reg/Type Quote Selector */}
      <section
        id="motor-hero"
        className="bg-white border border-[#DDE5F0] rounded-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between gap-5">
            <div>
              <p className="text-xs font-semibold text-[#0E9F6E]">
                Car, EV &amp; Two-Wheeler Protection
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#0B1F3A] tracking-tight text-balance mt-2">
                Motor Insurance Built Around Fair IDV, 50% NCB &amp; Cashless Garages
              </h1>
              <p className="mt-3 text-[15px] text-[#4B5D75] leading-relaxed">
                Compare statutory Third-Party Liability, Comprehensive Own-Damage, and Zero Depreciation cover across 6,800+ authorized repair workshops without losing accumulated No Claim Bonus discounts.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <SmartlinkButton label="Compare Live Quotes" variant="primary" />
                <SmartlinkButton label="Unlock Best Rates" variant="outline" />
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#DDE5F0] h-52">
              <ResilientImage
                src={IMAGES.motorSedan}
                alt="Dark navy modern electric sedan parked at a coastal highway overlook"
                className="w-full h-full object-cover"
                fallbackTitle="Comprehensive Motor Protection"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F4F7FB] p-6 border-t lg:border-t-0 lg:border-l border-[#DDE5F0] flex flex-col justify-center space-y-4">
            <h2 className="font-display text-lg font-bold text-[#0B1F3A]">
              Vehicle Quote &amp; IDV Selector
            </h2>

            <div className="grid grid-cols-3 gap-1 p-1 bg-white border border-[#DDE5F0] rounded-lg">
              {(
                [
                  ['car', 'Car / SUV'],
                  ['ev', 'EV'],
                  ['bike', 'Bike'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setVehicleType(id)}
                  className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                    vehicleType === id
                      ? 'bg-[#0B1F3A] text-white'
                      : 'text-[#4B5D75] hover:text-[#0B1F3A]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div>
              <label
                htmlFor="motor-reg"
                className="block text-xs font-medium text-[#0B1F3A] mb-1"
              >
                Registration Plate / Model Reference
              </label>
              <input
                id="motor-reg"
                type="text"
                value={regInput}
                onChange={(e) => setRegInput(e.target.value.toUpperCase())}
                placeholder="e.g. CA-842-MNR"
                className="w-full px-3 py-2 text-sm font-mono-num border border-[#DDE5F0] rounded-lg bg-white text-[#0B1F3A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="motor-age"
                  className="block text-xs font-medium text-[#0B1F3A] mb-1"
                >
                  Vehicle Age
                </label>
                <select
                  id="motor-age"
                  value={vehicleAge}
                  onChange={(e) => setVehicleAge(Number(e.target.value))}
                  className="w-full px-2.5 py-2 text-xs border border-[#DDE5F0] rounded-lg bg-white"
                >
                  <option value={0}>Brand New (0 yrs)</option>
                  <option value={1}>1 Year</option>
                  <option value={2}>2 Years</option>
                  <option value={3}>3 Years</option>
                  <option value={4}>4 Years</option>
                  <option value={6}>5+ Years</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="motor-ncb"
                  className="block text-xs font-medium text-[#0B1F3A] mb-1"
                >
                  Existing NCB
                </label>
                <select
                  id="motor-ncb"
                  value={ncbYears}
                  onChange={(e) =>
                    setNcbYears(Number(e.target.value) as NcbYears)
                  }
                  className="w-full px-2.5 py-2 text-xs border border-[#DDE5F0] rounded-lg bg-white"
                >
                  <option value={0}>0% (New / Claimed)</option>
                  <option value={1}>20% (1 yr)</option>
                  <option value={2}>25% (2 yrs)</option>
                  <option value={3}>35% (3 yrs)</option>
                  <option value={4}>45% (4 yrs)</option>
                  <option value={5}>50% (5+ yrs)</option>
                </select>
              </div>
            </div>

            <div className="bg-white border border-[#DDE5F0] rounded-lg p-4 space-y-1.5">
              <div className="flex justify-between text-xs text-[#4B5D75]">
                <span>Ref: {regInput || 'STANDARD'}</span>
                <span>Recommended IDV</span>
              </div>
              <div className="flex items-baseline justify-between">
                <p className="font-mono-num text-xl font-bold text-[#0B1F3A]">
                  {formatCurrency(estimate.recommendedIdv)}
                </p>
                <p className="font-mono-num text-lg font-bold text-[#0E9F6E]">
                  {formatCurrency(estimate.totalAnnualPremium)}/yr
                </p>
              </div>
              <p className="text-[11px] text-[#64748B]">
                Includes Zero-Dep + Roadside Assistance · Saves {formatCurrency(estimate.ncbSavings)} via {estimate.ncbDiscountPct}% NCB
              </p>
            </div>

            <SmartlinkButton
              label="View Partner Offers"
              variant="primary"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Third-Party vs Comprehensive vs Zero Depreciation Table */}
      <section id="motor-comparison" className="space-y-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            Third-Party vs. Comprehensive vs. Zero Depreciation Cover
          </h2>
          <p className="text-sm text-[#4B5D75] mt-1">
            Why statutory third-party policies leave your own vehicle completely uninsured in collisions, floods, or theft.
          </p>
        </div>

        <div className="bg-white border border-[#DDE5F0] rounded-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-[#F4F7FB] border-b border-[#DDE5F0] text-xs font-semibold text-[#0B1F3A]">
                <th className="py-3.5 px-4">Coverage Scope</th>
                <th className="py-3.5 px-4">Third-Party Only</th>
                <th className="py-3.5 px-4">Standard Comprehensive</th>
                <th className="py-3.5 px-4">Comprehensive + Zero Dep</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F7] text-sm text-[#4B5D75]">
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Injury / Property Damage to Others
                </td>
                <td className="py-3.5 px-4">Covered (Mandatory)</td>
                <td className="py-3.5 px-4">Covered</td>
                <td className="py-3.5 px-4">Covered</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Own Vehicle Accident Repair
                </td>
                <td className="py-3.5 px-4 text-red-700">Not Covered</td>
                <td className="py-3.5 px-4">Covered minus depreciation</td>
                <td className="py-3.5 px-4 font-semibold text-[#0E9F6E]">
                  100% Parts Covered
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Plastic, Glass &amp; Rubber Deduction
                </td>
                <td className="py-3.5 px-4">N/A</td>
                <td className="py-3.5 px-4 font-mono-num">30%–50% deducted</td>
                <td className="py-3.5 px-4 font-mono-num text-[#0E9F6E]">0% deducted</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Theft, Fire &amp; Natural Calamities
                </td>
                <td className="py-3.5 px-4 text-red-700">Not Covered</td>
                <td className="py-3.5 px-4">Up to 100% IDV</td>
                <td className="py-3.5 px-4">Up to 100% IDV (or RTI)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <AdSlot format="300x250" slotId="motor-mid-300x250" />
      </section>

      {/* NCB Slab Chart & IDV Guide */}
      <section
        id="ncb-idv-guide"
        className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8 space-y-6"
      >
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            No Claim Bonus (NCB) Slab Chart &amp; IDV Valuation Guide
          </h2>
          <p className="text-sm text-[#4B5D75] mt-1">
            NCB rewards claim-free driving with steep Own-Damage discounts, while IDV sets your total-loss payout ceiling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-[#DDE5F0] rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F4F7FB] border-b border-[#DDE5F0] text-xs font-semibold text-[#0B1F3A]">
                  <th className="py-3 px-4">Claim-Free Renewal Streak</th>
                  <th className="py-3 px-4">NCB Discount on Own-Damage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF2F7] text-sm text-[#334155]">
                {[
                  ['Policy Year 1 (No prior streak)', '0%'],
                  ['1st Renewal (1 claim-free year)', '20%'],
                  ['2nd Renewal (2 claim-free years)', '25%'],
                  ['3rd Renewal (3 claim-free years)', '35%'],
                  ['4th Renewal (4 claim-free years)', '45%'],
                  ['5th+ Renewal (5+ claim-free years)', '50% Maximum'],
                ].map(([streak, pct]) => (
                  <tr key={streak}>
                    <td className="py-2.5 px-4">{streak}</td>
                    <td className="py-2.5 px-4 font-mono-num font-semibold text-[#0E9F6E]">
                      {pct}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 text-sm text-[#334155] leading-relaxed">
            <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
              How Insured Declared Value (IDV) Depreciation Works
            </h3>
            <p>
              Insured Declared Value equals the manufacturer’s current listed selling price minus standardized age depreciation (5% under 6 months, 15% up to 1 year, 20% at 2 years, 30% at 3 years, 40% at 4 years, and 50% at 5 years).
            </p>
            <p>
              If your vehicle is less than 3 years old, pairing Zero Depreciation with a <strong>Return to Invoice (RTI)</strong> rider bridges the gap between depreciated IDV and full on-road replacement price including registration taxes in the event of total theft or unrepairable flood damage.
            </p>
            <p>
              <strong>EV Battery Note:</strong> Electric vehicle owners should explicitly add a Battery Protect &amp; Charger Cover endorsement, as standard flood exclusions sometimes limit high-voltage pack water-ingress claims.
            </p>
          </div>
        </div>

        <AdSlot format="728x90" slotId="motor-mid-728x90" />
        <AdSlot format="320x50" slotId="motor-mid-320x50" />
      </section>

      {/* Step-by-Step Accident Claim & Cashless Garage Checklist */}
      <section id="motor-claim-checklist" className="space-y-6">
        <div className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8 space-y-4">
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            Step-by-Step Accident Claim &amp; Cashless Garage Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#334155]">
            {[
              'Capture clear scene photos showing license plate, impact angle, and road location before moving vehicles if safe.',
              'Call the insurer’s 24/7 claims helpline within 24 hours to generate a Claim Intimation Number.',
              'File a police report / FIR immediately if a third party is injured, public property is damaged, or theft occurred.',
              'Tow the vehicle strictly to an authorized cashless network workshop to avoid out-of-pocket reimbursement delays.',
              'Keep Driver’s License, Registration Certificate, and active Policy Schedule ready for the surveyor’s inspection.',
              'Never authorize workshop dismantling before surveyor sign-off unless emergency roadside stabilization is required.',
            ].map((step) => (
              <div
                key={step}
                className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#F4F7FB]"
              >
                <CheckCircle2
                  className="w-4 h-4 text-[#0E9F6E] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <SmartlinkButton label="Check Claim Eligibility" variant="primary" />
            <SmartlinkButton
              label="Download Policy Checklist PDF"
              variant="outline"
            />
          </div>

          <AdSlot format="468x60" slotId="motor-checklist-468x60" />
        </div>

        <AdSlot format="native" slotId="motor-native" />
      </section>

      {/* FAQs */}
      <section id="motor-faqs" className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
          Motor Insurance FAQs
        </h2>
        <FaqAccordion items={MOTOR_FAQS} idPrefix="motor-faq" />
      </section>
    </PageShell>
  );
}
