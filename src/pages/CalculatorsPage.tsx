import { AdSlot } from '../components/ads/AdSlot';
import { SmartlinkButton } from '../components/ads/SmartlinkButton';
import {
  HealthPremiumCalculator,
  MotorIdvCalculator,
  TermLifeCalculator,
} from '../components/calculators/InteractiveCalculators';
import { PageShell, TocLink } from '../components/layout/PageShell';

const TOC_LINKS: TocLink[] = [
  { id: 'calc-overview', label: 'Calculators Overview' },
  { id: 'term-life-calculator', label: '01. Term Life Calculator' },
  { id: 'health-premium-calculator', label: '02. Health Estimator' },
  { id: 'motor-idv-calculator', label: '03. Motor IDV & NCB' },
  { id: 'plan-compare-matrix', label: 'Benchmark Rate Matrix' },
];

export function CalculatorsPage() {
  return (
    <PageShell pageSlug="calculators" tocLinks={TOC_LINKS}>
      {/* Intro Banner */}
      <section
        id="calc-overview"
        className="bg-white border border-[#DDE5F0] rounded-2xl p-6 md:p-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#0E9F6E]">
              Interactive Planning Tools
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#0B1F3A] tracking-tight text-balance mt-2">
              Insurance Coverage &amp; Premium Calculators
            </h1>
            <p className="mt-3 text-[15px] text-[#4B5D75] leading-relaxed">
              Test coverage scenarios in real time across Term Life, Health Insurance, and Motor IDV/NCB protection. Adjust sliders to compare deductible trade-offs before requesting carrier quotes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <SmartlinkButton label="Compare Live Quotes" variant="primary" />
            <SmartlinkButton label="Unlock Best Rates" variant="outline" />
          </div>
        </div>
      </section>

      {/* Calculator 1: Term Life */}
      <TermLifeCalculator />

      {/* Mid-page Adsterra Leaderboard + Mobile Banner */}
      <AdSlot format="728x90" slotId="calc-mid-728x90" />
      <AdSlot format="320x50" slotId="calc-mid-320x50" />

      {/* Calculator 2: Health */}
      <HealthPremiumCalculator />

      <AdSlot format="native" slotId="calc-native" />

      {/* Calculator 3: Motor */}
      <MotorIdvCalculator />

      {/* Side-by-side Plan Comparison Matrix */}
      <section
        id="plan-compare-matrix"
        className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8 space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
              Carrier Benchmark &amp; Feature Comparison Matrix
            </h2>
            <p className="text-sm text-[#4B5D75] mt-1">
              Use these underwriting thresholds when reviewing live partner proposals.
            </p>
          </div>
          <SmartlinkButton label="View Partner Offers" variant="secondary" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-[#F4F7FB] border-b border-[#DDE5F0] text-xs font-semibold text-[#0B1F3A]">
                <th className="py-3.5 px-4">Policy Line</th>
                <th className="py-3.5 px-4">Minimum Quality Floor</th>
                <th className="py-3.5 px-4">Target Claim Ratio</th>
                <th className="py-3.5 px-4">Smart Cost Lever</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F7] text-sm text-[#4B5D75]">
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Term Life Cover
                </td>
                <td className="py-3.5 px-4">12x Income + Debts, Level Term to Age 65</td>
                <td className="py-3.5 px-4 font-mono-num">98.5%+ CSR</td>
                <td className="py-3.5 px-4">Skip Return-of-Premium bundles</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Family Health Floater
                </td>
                <td className="py-3.5 px-4">No room-rent cap + 100% Restoration</td>
                <td className="py-3.5 px-4 font-mono-num">97%+ &amp; &lt;4h Cashless</td>
                <td className="py-3.5 px-4">Pair $2,500 deductible with top-up</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">
                  Comprehensive Motor
                </td>
                <td className="py-3.5 px-4">Full IDV + Zero Dep (Years 1–5)</td>
                <td className="py-3.5 px-4 font-mono-num">96%+ Cashless Garage</td>
                <td className="py-3.5 px-4">Protect 50% NCB; pay minor scuffs</td>
              </tr>
            </tbody>
          </table>
        </div>

        <AdSlot format="300x250" slotId="calc-bottom-300x250" />
      </section>
    </PageShell>
  );
}
