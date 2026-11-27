import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import {
  calculateQuickQuote,
  formatCurrency,
  InsuranceCategory,
} from '../../utils/insuranceCalculators';
import { SmartlinkButton } from '../ads/SmartlinkButton';

const CATEGORY_OPTIONS: {
  id: InsuranceCategory;
  label: string;
  defaultCover: number;
  coverOptions: number[];
}[] = [
  {
    id: 'health',
    label: 'Health',
    defaultCover: 500000,
    coverOptions: [250000, 500000, 1000000],
  },
  {
    id: 'life',
    label: 'Term Life',
    defaultCover: 1000000,
    coverOptions: [500000, 1000000, 2000000],
  },
  {
    id: 'car',
    label: 'Car',
    defaultCover: 32000,
    coverOptions: [18000, 32000, 55000],
  },
  {
    id: 'bike',
    label: 'Bike',
    defaultCover: 6000,
    coverOptions: [3500, 6000, 12000],
  },
  {
    id: 'home',
    label: 'Home',
    defaultCover: 450000,
    coverOptions: [250000, 450000, 750000],
  },
  {
    id: 'travel',
    label: 'Travel',
    defaultCover: 100000,
    coverOptions: [50000, 100000, 250000],
  },
];

export function QuickQuoteWidget() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<InsuranceCategory>('health');
  const [age, setAge] = useState<number>(34);
  const [familyMembers, setFamilyMembers] = useState<number>(2);
  const [coverageAmount, setCoverageAmount] = useState<number>(500000);

  const selectedCat =
    CATEGORY_OPTIONS.find((c) => c.id === category) || CATEGORY_OPTIONS[0];

  const handleCategoryChange = (next: InsuranceCategory) => {
    setCategory(next);
    const found = CATEGORY_OPTIONS.find((c) => c.id === next);
    if (found) setCoverageAmount(found.defaultCover);
  };

  const result = calculateQuickQuote({
    category,
    age,
    coverageAmount,
    familyMembers,
  });

  return (
    <div
      id="quick-quote-widget"
      className="bg-white border border-[#DDE5F0] rounded-xl p-5 md:p-6 shadow-sm"
    >
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#EEF2F7]">
        <div>
          <h2 className="font-display text-base md:text-lg font-bold text-[#0B1F3A]">
            Quick Multi-Step Quote Estimator
          </h2>
          <p className="text-xs text-[#4B5D75] mt-0.5">
            Step {step} of 3 · Instant indicative rates
          </p>
        </div>
        <div className="flex items-center gap-1.5" aria-label="Quote progress">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setStep(n as 1 | 2 | 3)}
              aria-label={`Go to step ${n}`}
              className={`h-2 rounded-full transition-all ${
                step === n
                  ? 'w-6 bg-[#0E9F6E]'
                  : step > n
                  ? 'w-3 bg-[#0B1F3A]'
                  : 'w-3 bg-[#DDE5F0]'
              }`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="pt-4 space-y-4">
          <p className="text-xs font-medium text-[#4B5D75]">
            1. Select the insurance coverage you want to estimate
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {CATEGORY_OPTIONS.map((item) => {
              const active = category === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleCategoryChange(item.id)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium border text-left transition-colors ${
                    active
                      ? 'border-[#0E9F6E] bg-[#0E9F6E]/10 text-[#0B1F3A] font-semibold'
                      : 'border-[#DDE5F0] bg-[#F4F7FB]/50 text-[#4B5D75] hover:border-[#0B1F3A]/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#0B1F3A] hover:bg-[#132E54] text-white rounded-lg transition-colors"
          >
            <span>Continue to Coverage Details</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="pt-4 space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <label htmlFor="qq-age" className="font-medium text-[#0B1F3A]">
                Primary Applicant Age
              </label>
              <span className="font-mono-num font-semibold text-[#0B1F3A]">
                {age} yrs
              </span>
            </div>
            <input
              id="qq-age"
              type="range"
              min={18}
              max={75}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-[#0E9F6E]"
            />
          </div>

          <div>
            <p className="text-xs font-medium text-[#0B1F3A] mb-1.5">
              Target Coverage / Insured Value
            </p>
            <div className="grid grid-cols-3 gap-2">
              {selectedCat.coverOptions.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setCoverageAmount(amt)}
                  className={`px-2 py-2 rounded-lg text-xs font-mono-num font-semibold border transition-colors ${
                    coverageAmount === amt
                      ? 'border-[#0E9F6E] bg-[#0E9F6E]/10 text-[#0B1F3A]'
                      : 'border-[#DDE5F0] text-[#4B5D75] hover:border-[#0B1F3A]/40'
                  }`}
                >
                  {formatCurrency(amt)}
                </button>
              ))}
            </div>
          </div>

          {(category === 'health' || category === 'travel') && (
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <label htmlFor="qq-members" className="font-medium text-[#0B1F3A]">
                  Members Covered
                </label>
                <span className="font-mono-num font-semibold text-[#0B1F3A]">
                  {familyMembers} {familyMembers === 1 ? 'person' : 'people'}
                </span>
              </div>
              <input
                id="qq-members"
                type="range"
                min={1}
                max={6}
                value={familyMembers}
                onChange={(e) => setFamilyMembers(Number(e.target.value))}
                className="w-full accent-[#0E9F6E]"
              />
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 text-sm font-medium text-[#4B5D75] border border-[#DDE5F0] rounded-lg hover:bg-[#F4F7FB]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#0E9F6E] hover:bg-[#0B875D] text-white rounded-lg transition-colors"
            >
              <span>Calculate Estimate</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="pt-4 space-y-4">
          <div className="bg-[#F4F7FB] border border-[#DDE5F0] rounded-lg p-4">
            <p className="text-xs text-[#4B5D75] font-medium">
              {selectedCat.label} · {result.recommendedTier}
            </p>
            <div className="mt-2 flex items-baseline justify-between gap-4">
              <div>
                <p className="font-mono-num text-2xl font-bold text-[#0B1F3A]">
                  {formatCurrency(result.monthlyPremium)}
                  <span className="text-xs font-normal text-[#4B5D75]">/mo</span>
                </p>
                <p className="text-xs text-[#4B5D75] mt-0.5 tabular-nums">
                  {formatCurrency(result.annualPremium)}/year · {formatCurrency(coverageAmount)} cover
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#0E9F6E] font-semibold flex items-center gap-1 justify-end">
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  Save ~{formatCurrency(result.estimatedSavings)}/yr
                </p>
                <p className="text-[11px] text-[#64748B]">via direct online rates</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <SmartlinkButton
              label="Compare Live Quotes"
              variant="primary"
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 text-sm font-medium text-[#0B1F3A] border border-[#CBD8E8] rounded-lg hover:bg-[#F4F7FB]"
            >
              Recalculate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
