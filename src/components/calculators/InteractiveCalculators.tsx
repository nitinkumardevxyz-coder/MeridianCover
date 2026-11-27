import { useState } from 'react';
import {
  calculateHealthPremiumEstimate,
  calculateMotorIdvNcb,
  calculateTermLifeEstimate,
  CityTier,
  formatCurrency,
  HealthPlanType,
  NcbYears,
  VehicleType,
} from '../../utils/insuranceCalculators';
import { AdSlot } from '../ads/AdSlot';
import { SmartlinkButton } from '../ads/SmartlinkButton';

export function TermLifeCalculator() {
  const [age, setAge] = useState(33);
  const [annualIncome, setAnnualIncome] = useState(95000);
  const [liabilities, setLiabilities] = useState(240000);
  const [existingCover, setExistingCover] = useState(100000);
  const [dependents, setDependents] = useState(2);
  const [policyTermYears, setPolicyTermYears] = useState(30);
  const [smoker, setSmoker] = useState(false);

  const result = calculateTermLifeEstimate({
    age,
    annualIncome,
    liabilities,
    existingCover,
    dependents,
    policyTermYears,
    smoker,
  });

  return (
    <section
      id="term-life-calculator"
      className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8"
    >
      <div className="mb-6">
        <p className="text-xs font-medium text-[#0E9F6E]">
          Calculator 01 · Income Replacement Model
        </p>
        <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mt-1">
          Term Life Cover &amp; Premium Calculator
        </h2>
        <p className="text-sm text-[#4B5D75] mt-1.5 max-w-2xl">
          Applies the 10x–15x annual income rule plus outstanding liabilities minus existing cover to size your optimal level-term policy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <label htmlFor="tl-age" className="font-medium text-[#0B1F3A]">
                Applicant Age
              </label>
              <span className="font-mono-num font-semibold text-[#0B1F3A]">
                {age} years
              </span>
            </div>
            <input
              id="tl-age"
              type="range"
              min={20}
              max={62}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-[#0E9F6E]"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <label htmlFor="tl-income" className="font-medium text-[#0B1F3A]">
                Gross Annual Income
              </label>
              <span className="font-mono-num font-semibold text-[#0B1F3A]">
                {formatCurrency(annualIncome)}
              </span>
            </div>
            <input
              id="tl-income"
              type="range"
              min={25000}
              max={400000}
              step={5000}
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full accent-[#0E9F6E]"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <label htmlFor="tl-liabilities" className="font-medium text-[#0B1F3A]">
                Outstanding Loans &amp; Mortgage
              </label>
              <span className="font-mono-num font-semibold text-[#0B1F3A]">
                {formatCurrency(liabilities)}
              </span>
            </div>
            <input
              id="tl-liabilities"
              type="range"
              min={0}
              max={1200000}
              step={10000}
              value={liabilities}
              onChange={(e) => setLiabilities(Number(e.target.value))}
              className="w-full accent-[#0E9F6E]"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <label htmlFor="tl-existing" className="font-medium text-[#0B1F3A]">
                Existing Life Cover / Liquid Assets
              </label>
              <span className="font-mono-num font-semibold text-[#0B1F3A]">
                {formatCurrency(existingCover)}
              </span>
            </div>
            <input
              id="tl-existing"
              type="range"
              min={0}
              max={800000}
              step={10000}
              value={existingCover}
              onChange={(e) => setExistingCover(Number(e.target.value))}
              className="w-full accent-[#0E9F6E]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div>
              <label
                htmlFor="tl-dependents"
                className="block text-xs font-medium text-[#4B5D75] mb-1.5"
              >
                Dependents
              </label>
              <select
                id="tl-dependents"
                value={dependents}
                onChange={(e) => setDependents(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-[#DDE5F0] rounded-lg bg-white text-[#0B1F3A]"
              >
                {[0, 1, 2, 3, 4, 5].map((d) => (
                  <option key={d} value={d}>
                    {d} {d === 1 ? 'dependent' : 'dependents'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="tl-term"
                className="block text-xs font-medium text-[#4B5D75] mb-1.5"
              >
                Policy Term
              </label>
              <select
                id="tl-term"
                value={policyTermYears}
                onChange={(e) => setPolicyTermYears(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-[#DDE5F0] rounded-lg bg-white text-[#0B1F3A]"
              >
                {[15, 20, 25, 30, 35, 40].map((t) => (
                  <option key={t} value={t}>
                    {t} years
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-xs font-medium text-[#4B5D75] mb-1.5">
                Tobacco Use
              </span>
              <div className="grid grid-cols-2 gap-1 p-1 bg-[#F4F7FB] rounded-lg">
                <button
                  type="button"
                  onClick={() => setSmoker(false)}
                  className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                    !smoker
                      ? 'bg-white text-[#0B1F3A] shadow-xs font-semibold'
                      : 'text-[#4B5D75]'
                  }`}
                >
                  Non-Smoker
                </button>
                <button
                  type="button"
                  onClick={() => setSmoker(true)}
                  className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                    smoker
                      ? 'bg-white text-[#0B1F3A] shadow-xs font-semibold'
                      : 'text-[#4B5D75]'
                  }`}
                >
                  Smoker
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#0B1F3A] text-white rounded-xl p-6 space-y-4">
            <div>
              <p className="text-xs text-slate-300">
                Recommended Net Term Cover ({result.incomeMultiplier}x rule)
              </p>
              <p
                data-testid="term-recommended-cover"
                className="font-mono-num text-3xl font-bold text-white mt-1"
              >
                {formatCurrency(result.netCoverageGap)}
              </p>
              <p className="text-xs text-slate-300 mt-1 tabular-nums">
                Gross need {formatCurrency(result.recommendedCover)} minus {formatCurrency(existingCover)} existing cover
              </p>
            </div>

            <div className="pt-4 border-t border-[#1D3B63] flex items-baseline justify-between">
              <div>
                <p className="text-xs text-slate-300">Estimated Monthly Rate</p>
                <p
                  data-testid="term-monthly-premium"
                  className="font-mono-num text-2xl font-bold text-[#10B981] mt-0.5"
                >
                  {formatCurrency(result.estimatedMonthlyPremium)}/mo
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-300">Annualized</p>
                <p className="font-mono-num text-sm font-semibold text-white mt-0.5">
                  {formatCurrency(result.estimatedAnnualPremium)}/yr
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <SmartlinkButton
                label="View Partner Offers"
                variant="primary"
                className="w-full"
              />
              <SmartlinkButton
                label="Unlock Best Rates"
                variant="outline"
                className="w-full"
              />
            </div>
          </div>

          <AdSlot format="300x250" slotId="calc-term-300x250" className="my-0!" />
        </div>
      </div>

      <AdSlot format="468x60" slotId="calc-term-468x60" />

      <div className="mt-4 pt-5 border-t border-[#EEF2F7] grid grid-cols-1 md:grid-cols-3 gap-5 text-sm text-[#4B5D75]">
        <div>
          <h3 className="font-display font-semibold text-[#0B1F3A] mb-1">
            Why 10x–15x Income Matters
          </h3>
          <p className="leading-relaxed">
            Ten years of income covers baseline household bills, while 15x absorbs 5%–6% annual inflation and college tuition escalations for younger dependents.
          </p>
        </div>
        <div>
          <h3 className="font-display font-semibold text-[#0B1F3A] mb-1">
            Pure Level Term vs. Riders
          </h3>
          <p className="leading-relaxed">
            Keep base death benefit pure and add Waiver of Premium and Critical Illness only if you lack separate disability or health liquidity.
          </p>
        </div>
        <div>
          <h3 className="font-display font-semibold text-[#0B1F3A] mb-1">
            Timing Your Policy Lock
          </h3>
          <p className="leading-relaxed">
            Each year you delay buying a 30-year level term plan raises your locked annual rate by roughly 4% to 7% due to age-band underwriting tables.
          </p>
        </div>
      </div>
    </section>
  );
}

export function HealthPremiumCalculator() {
  const [planType, setPlanType] = useState<HealthPlanType>('family');
  const [eldestAge, setEldestAge] = useState(36);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [sumInsured, setSumInsured] = useState(500000);
  const [cityTier, setCityTier] = useState<CityTier>('metro');
  const [deductible, setDeductible] = useState(1000);

  const result = calculateHealthPremiumEstimate({
    planType,
    eldestAge,
    adults,
    children: planType === 'family' ? children : 0,
    sumInsured,
    cityTier,
    deductible,
  });

  return (
    <section
      id="health-premium-calculator"
      className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8"
    >
      <div className="mb-6">
        <p className="text-xs font-medium text-[#0E9F6E]">
          Calculator 02 · Medical Underwriting Estimator
        </p>
        <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mt-1">
          Health Insurance Premium Estimator
        </h2>
        <p className="text-sm text-[#4B5D75] mt-1.5 max-w-2xl">
          Benchmark annual medical premiums across Individual, Family Floater, and Senior Citizen plans with voluntary deductible savings and tax deduction estimates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-5">
          <div>
            <span className="block text-xs font-medium text-[#4B5D75] mb-1.5">
              Plan Structure
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F4F7FB] rounded-lg">
              {(
                [
                  ['individual', 'Individual'],
                  ['family', 'Family Floater'],
                  ['senior', 'Senior Citizen'],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setPlanType(value);
                    if (value === 'senior' && eldestAge < 60) setEldestAge(64);
                    if (value === 'individual') setAdults(1);
                  }}
                  className={`py-2 px-2 text-xs font-medium rounded-md transition-colors ${
                    planType === value
                      ? 'bg-white text-[#0B1F3A] shadow-xs font-semibold'
                      : 'text-[#4B5D75] hover:text-[#0B1F3A]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <label htmlFor="hp-age" className="font-medium text-[#0B1F3A]">
                Age of Eldest Insured Member
              </label>
              <span className="font-mono-num font-semibold text-[#0B1F3A]">
                {eldestAge} years
              </span>
            </div>
            <input
              id="hp-age"
              type="range"
              min={18}
              max={80}
              value={eldestAge}
              onChange={(e) => setEldestAge(Number(e.target.value))}
              className="w-full accent-[#0E9F6E]"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <label htmlFor="hp-sum" className="font-medium text-[#0B1F3A]">
                Annual Sum Insured
              </label>
              <span className="font-mono-num font-semibold text-[#0B1F3A]">
                {formatCurrency(sumInsured)}
              </span>
            </div>
            <input
              id="hp-sum"
              type="range"
              min={100000}
              max={2000000}
              step={50000}
              value={sumInsured}
              onChange={(e) => setSumInsured(Number(e.target.value))}
              className="w-full accent-[#0E9F6E]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="hp-adults"
                className="block text-xs font-medium text-[#4B5D75] mb-1.5"
              >
                Adults
              </label>
              <select
                id="hp-adults"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                disabled={planType === 'individual'}
                className="w-full px-3 py-2 text-sm border border-[#DDE5F0] rounded-lg bg-white text-[#0B1F3A] disabled:bg-[#F4F7FB]"
              >
                <option value={1}>1 Adult</option>
                <option value={2}>2 Adults</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="hp-tier"
                className="block text-xs font-medium text-[#4B5D75] mb-1.5"
              >
                Hospital Cost Zone
              </label>
              <select
                id="hp-tier"
                value={cityTier}
                onChange={(e) => setCityTier(e.target.value as CityTier)}
                className="w-full px-3 py-2 text-sm border border-[#DDE5F0] rounded-lg bg-white text-[#0B1F3A]"
              >
                <option value="metro">Metro / Tier-1</option>
                <option value="tier2">Tier-2 City</option>
                <option value="regional">Regional Town</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="hp-deductible"
                className="block text-xs font-medium text-[#4B5D75] mb-1.5"
              >
                Annual Deductible
              </label>
              <select
                id="hp-deductible"
                value={deductible}
                onChange={(e) => setDeductible(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-[#DDE5F0] rounded-lg bg-white text-[#0B1F3A]"
              >
                <option value={0}>$0 (Zero Deductible)</option>
                <option value={1000}>$1,000 (-7%)</option>
                <option value={2500}>$2,500 (-14%)</option>
                <option value={5000}>$5,000 (-22%)</option>
              </select>
            </div>
          </div>

          {planType === 'family' && (
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <label htmlFor="hp-children" className="font-medium text-[#0B1F3A]">
                  Dependent Children
                </label>
                <span className="font-mono-num font-semibold text-[#0B1F3A]">
                  {children}
                </span>
              </div>
              <input
                id="hp-children"
                type="range"
                min={0}
                max={4}
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full accent-[#0E9F6E]"
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-5 bg-[#F4F7FB] border border-[#DDE5F0] rounded-xl p-6 space-y-4">
          <div>
            <p className="text-xs text-[#4B5D75]">Estimated Annual Premium</p>
            <p
              data-testid="health-annual-premium"
              className="font-mono-num text-3xl font-bold text-[#0B1F3A] mt-1"
            >
              {formatCurrency(result.estimatedAnnualPremium)}
              <span className="text-sm font-normal text-[#4B5D75]">/yr</span>
            </p>
            <p className="text-xs text-[#4B5D75] mt-1 tabular-nums">
              Approx. {formatCurrency(result.estimatedMonthlyPremium)}/month · Deductible discount {result.effectiveDeductibleDiscountPct}%
            </p>
          </div>

          <div className="border-t border-[#DDE5F0] pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#4B5D75]">Est. Tax Deduction Value</span>
              <span className="font-mono-num font-semibold text-[#0E9F6E]">
                ~{formatCurrency(result.taxDeductionEstimate)}/yr
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4B5D75]">Net Effective Annual Cost</span>
              <span className="font-mono-num font-semibold text-[#0B1F3A]">
                {formatCurrency(
                  result.estimatedAnnualPremium - result.taxDeductionEstimate
                )}
              </span>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <SmartlinkButton
              label="View Partner Offers"
              variant="primary"
              className="w-full"
            />
            <SmartlinkButton
              label="Check Claim Eligibility"
              variant="outline"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function MotorIdvCalculator() {
  const [vehicleType, setVehicleType] = useState<VehicleType>('car');
  const [exShowroomPrice, setExShowroomPrice] = useState(36000);
  const [vehicleAgeYears, setVehicleAgeYears] = useState(2);
  const [ncbYears, setNcbYears] = useState<NcbYears>(3);
  const [zeroDepreciation, setZeroDepreciation] = useState(true);
  const [roadsideAssistance, setRoadsideAssistance] = useState(true);

  const result = calculateMotorIdvNcb({
    vehicleType,
    exShowroomPrice,
    vehicleAgeYears,
    ncbClaimFreeYears: ncbYears,
    zeroDepreciation,
    roadsideAssistance,
  });

  return (
    <section
      id="motor-idv-calculator"
      className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8"
    >
      <div className="mb-6">
        <p className="text-xs font-medium text-[#0E9F6E]">
          Calculator 03 · IDV Depreciation &amp; No Claim Bonus
        </p>
        <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mt-1">
          Motor Insurance IDV &amp; NCB Discount Calculator
        </h2>
        <p className="text-sm text-[#4B5D75] mt-1.5 max-w-2xl">
          Compute your Insured Declared Value using standard vehicle depreciation slabs and preview how NCB discounts reduce your Own-Damage premium.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-5">
          <div>
            <span className="block text-xs font-medium text-[#4B5D75] mb-1.5">
              Vehicle Category
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F4F7FB] rounded-lg">
              {(
                [
                  ['car', 'Sedan / SUV'],
                  ['ev', 'Electric Car'],
                  ['bike', 'Two-Wheeler'],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setVehicleType(value);
                    if (value === 'bike' && exShowroomPrice > 18000) {
                      setExShowroomPrice(6500);
                    } else if (value !== 'bike' && exShowroomPrice < 15000) {
                      setExShowroomPrice(36000);
                    }
                  }}
                  className={`py-2 px-2 text-xs font-medium rounded-md transition-colors ${
                    vehicleType === value
                      ? 'bg-white text-[#0B1F3A] shadow-xs font-semibold'
                      : 'text-[#4B5D75] hover:text-[#0B1F3A]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <label htmlFor="mc-price" className="font-medium text-[#0B1F3A]">
                Original Ex-Showroom / Invoice Price
              </label>
              <span className="font-mono-num font-semibold text-[#0B1F3A]">
                {formatCurrency(exShowroomPrice)}
              </span>
            </div>
            <input
              id="mc-price"
              type="range"
              min={vehicleType === 'bike' ? 2000 : 12000}
              max={vehicleType === 'bike' ? 25000 : 110000}
              step={500}
              value={exShowroomPrice}
              onChange={(e) => setExShowroomPrice(Number(e.target.value))}
              className="w-full accent-[#0E9F6E]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <label htmlFor="mc-age" className="font-medium text-[#0B1F3A]">
                  Vehicle Age
                </label>
                <span className="font-mono-num font-semibold text-[#0B1F3A]">
                  {vehicleAgeYears} {vehicleAgeYears === 1 ? 'year' : 'years'}
                </span>
              </div>
              <input
                id="mc-age"
                type="range"
                min={0}
                max={10}
                value={vehicleAgeYears}
                onChange={(e) => setVehicleAgeYears(Number(e.target.value))}
                className="w-full accent-[#0E9F6E]"
              />
            </div>

            <div>
              <label
                htmlFor="mc-ncb"
                className="block text-sm font-medium text-[#0B1F3A] mb-1.5"
              >
                Claim-Free Renewal Years (NCB)
              </label>
              <select
                id="mc-ncb"
                value={ncbYears}
                onChange={(e) => setNcbYears(Number(e.target.value) as NcbYears)}
                className="w-full px-3 py-2 text-sm border border-[#DDE5F0] rounded-lg bg-white text-[#0B1F3A]"
              >
                <option value={0}>0 Years (0% NCB)</option>
                <option value={1}>1 Year (20% NCB)</option>
                <option value={2}>2 Years (25% NCB)</option>
                <option value={3}>3 Years (35% NCB)</option>
                <option value={4}>4 Years (45% NCB)</option>
                <option value={5}>5+ Years (50% NCB Max)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
            <label className="inline-flex items-center gap-2 text-sm text-[#0B1F3A] cursor-pointer">
              <input
                type="checkbox"
                checked={zeroDepreciation}
                onChange={(e) => setZeroDepreciation(e.target.checked)}
                className="w-4 h-4 accent-[#0E9F6E] rounded"
              />
              <span>Zero Depreciation Cover</span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-[#0B1F3A] cursor-pointer">
              <input
                type="checkbox"
                checked={roadsideAssistance}
                onChange={(e) => setRoadsideAssistance(e.target.checked)}
                className="w-4 h-4 accent-[#0E9F6E] rounded"
              />
              <span>24/7 Roadside Assistance</span>
            </label>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#0B1F3A] text-white rounded-xl p-6 space-y-4">
          <div className="flex items-baseline justify-between border-b border-[#1D3B63] pb-4">
            <div>
              <p className="text-xs text-slate-300">
                Recommended IDV ({result.depreciationPct}% depreciation)
              </p>
              <p
                data-testid="motor-idv-value"
                className="font-mono-num text-2xl font-bold text-white mt-1"
              >
                {formatCurrency(result.recommendedIdv)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-300">NCB Discount</p>
              <p className="font-mono-num text-xl font-bold text-[#10B981] mt-1">
                {result.ncbDiscountPct}% OFF
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-200">
              <span>Base Own-Damage Premium</span>
              <span className="font-mono-num">
                {formatCurrency(result.baseOwnDamagePremium)}
              </span>
            </div>
            <div className="flex justify-between text-[#10B981]">
              <span>NCB Savings ({result.ncbDiscountPct}%)</span>
              <span className="font-mono-num">
                −{formatCurrency(result.ncbSavings)}
              </span>
            </div>
            <div className="flex justify-between text-slate-200">
              <span>Mandatory Third-Party Liability</span>
              <span className="font-mono-num">
                {formatCurrency(result.thirdPartyLiability)}
              </span>
            </div>
            <div className="flex justify-between text-slate-200">
              <span>Selected Add-Ons</span>
              <span className="font-mono-num">
                {formatCurrency(result.addonsTotal)}
              </span>
            </div>
            <div className="pt-2 border-t border-[#1D3B63] flex justify-between font-bold text-base">
              <span>Estimated Annual Total</span>
              <span
                data-testid="motor-total-premium"
                className="font-mono-num text-[#10B981]"
              >
                {formatCurrency(result.totalAnnualPremium)}
              </span>
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
  );
}
