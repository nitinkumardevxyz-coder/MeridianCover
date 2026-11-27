export type PageSlug =
  | 'home'
  | 'health'
  | 'life'
  | 'motor'
  | 'travel-home'
  | 'calculators'
  | 'guides';

export interface PageMeta {
  slug: PageSlug;
  path: string;
  htmlPath: string;
  label: string;
  title: string;
  description: string;
}

export const PAGE_METADATA: Record<PageSlug, PageMeta> = {
  home: {
    slug: 'home',
    path: '/',
    htmlPath: '/index.html',
    label: 'Home',
    title: 'MeridianCover — Insurance Guides, Plan Comparison & Coverage Calculators',
    description:
      'Compare health, term life, motor, travel, and home insurance plans with transparent coverage tables, interactive premium calculators, and step-by-step claims guides.',
  },
  health: {
    slug: 'health',
    path: '/health-insurance',
    htmlPath: '/health-insurance.html',
    label: 'Health',
    title: 'Health Insurance Guide — Family Floater, Senior Plans & Cashless Claims | MeridianCover',
    description:
      'Detailed health insurance comparison across individual, family floater, and senior citizen plans. Learn cashless claim steps, waiting periods, and tax deductions.',
  },
  life: {
    slug: 'life',
    path: '/life-insurance',
    htmlPath: '/life-insurance.html',
    label: 'Life',
    title: 'Life & Term Insurance — Coverage Estimator, Riders & Settlement Ratios | MeridianCover',
    description:
      'Calculate ideal term life coverage using the 10x–15x income rule. Compare term plans, whole life, ULIPs, critical illness riders, and insurer claim settlement ratios.',
  },
  motor: {
    slug: 'motor',
    path: '/motor-insurance',
    htmlPath: '/motor-insurance.html',
    label: 'Motor',
    title: 'Car & Bike Motor Insurance — IDV, NCB Slabs & Zero Depreciation | MeridianCover',
    description:
      'Compare Third-Party, Comprehensive, and Zero Depreciation motor policies. Check NCB discount slabs, IDV depreciation schedules, and cashless garage claim checklists.',
  },
  'travel-home': {
    slug: 'travel-home',
    path: '/travel-home-insurance',
    htmlPath: '/travel-home-insurance.html',
    label: 'Travel & Home',
    title: 'Travel & Home Insurance — Medical Evacuation, Baggage & Property Cover | MeridianCover',
    description:
      'Split guide covering international travel insurance, medical evacuation, home structure & contents protection, peril tables, and pre-departure safety checklists.',
  },
  calculators: {
    slug: 'calculators',
    path: '/calculators',
    htmlPath: '/calculators.html',
    label: 'Calculators',
    title: 'Insurance Calculators — Term Cover, Health Premium & Motor IDV/NCB | MeridianCover',
    description:
      'Interactive Term Life coverage calculator, Health Insurance premium estimator, and Motor IDV & NCB discount calculator with instant personalized breakdowns.',
  },
  guides: {
    slug: 'guides',
    path: '/guides',
    htmlPath: '/guides.html',
    label: 'Guides',
    title: 'Insurance Guides, Claims & Contact — Editorial Hub & Compliance | MeridianCover',
    description:
      'Long-form editorial guides on avoiding claim rejections, policy portability, expired motor renewals, fine print reading, plus advisor consultation and legal disclosures.',
  },
};

export function resolvePageFromPath(pathname: string): {
  page: PageSlug;
  focusContact: boolean;
} {
  const normalized = pathname.trim().toLowerCase().replace(/\/+$/, '') || '/';
  if (normalized === '/' || normalized === '/index.html') {
    return { page: 'home', focusContact: false };
  }
  if (normalized === '/health-insurance' || normalized === '/health-insurance.html') {
    return { page: 'health', focusContact: false };
  }
  if (normalized === '/life-insurance' || normalized === '/life-insurance.html') {
    return { page: 'life', focusContact: false };
  }
  if (normalized === '/motor-insurance' || normalized === '/motor-insurance.html') {
    return { page: 'motor', focusContact: false };
  }
  if (
    normalized === '/travel-home-insurance' ||
    normalized === '/travel-home-insurance.html'
  ) {
    return { page: 'travel-home', focusContact: false };
  }
  if (normalized === '/calculators' || normalized === '/calculators.html') {
    return { page: 'calculators', focusContact: false };
  }
  if (normalized === '/guides' || normalized === '/guides.html') {
    return { page: 'guides', focusContact: false };
  }
  if (normalized === '/contact' || normalized === '/contact.html') {
    return { page: 'guides', focusContact: true };
  }
  return { page: 'home', focusContact: false };
}

export function formatCurrency(amount: number): string {
  if (!Number.isFinite(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export type InsuranceCategory = 'health' | 'life' | 'car' | 'bike' | 'home' | 'travel';

export interface QuickQuoteInput {
  category: InsuranceCategory;
  age: number;
  coverageAmount: number;
  familyMembers: number;
}

export interface QuickQuoteResult {
  monthlyPremium: number;
  annualPremium: number;
  estimatedSavings: number;
  recommendedTier: string;
}

export function calculateQuickQuote(input: QuickQuoteInput): QuickQuoteResult {
  const age = Math.max(18, Math.min(80, input.age));
  const members = Math.max(1, Math.min(8, input.familyMembers));
  const coverage = Math.max(10000, input.coverageAmount);

  let annual = 0;
  let tier = 'Comprehensive Standard';

  switch (input.category) {
    case 'health': {
      const ageFactor = age < 30 ? 1.0 : age < 45 ? 1.35 : age < 60 ? 1.95 : 2.8;
      const memberFactor = 1 + (members - 1) * 0.42;
      annual = (coverage / 100000) * 320 * ageFactor * memberFactor;
      tier = members > 1 ? 'Family Floater Gold' : 'Individual Comprehensive';
      break;
    }
    case 'life': {
      const ageFactor = age < 30 ? 0.85 : age < 40 ? 1.15 : age < 50 ? 1.85 : 3.1;
      annual = (coverage / 100000) * 110 * ageFactor;
      tier = 'Level Term 30-Year';
      break;
    }
    case 'car': {
      const baseRate = 0.031;
      const ageDiscount = age >= 28 ? 0.92 : 1.18;
      annual = Math.max(420, coverage * baseRate * ageDiscount);
      tier = 'Zero-Dep Comprehensive';
      break;
    }
    case 'bike': {
      const baseRate = 0.024;
      annual = Math.max(110, coverage * baseRate);
      tier = 'Two-Wheeler Comprehensive';
      break;
    }
    case 'home': {
      annual = Math.max(360, coverage * 0.0038);
      tier = 'Structure + Contents All-Risk';
      break;
    }
    case 'travel': {
      const memberFactor = 1 + (members - 1) * 0.72;
      const ageFactor = age > 60 ? 1.65 : 1.0;
      annual = Math.max(65, (coverage / 50000) * 48 * memberFactor * ageFactor);
      tier = 'International Multi-Trip';
      break;
    }
  }

  const roundedAnnual = Math.round(annual);
  const monthly = Math.round(roundedAnnual / 12);
  const savings = Math.round(roundedAnnual * 0.16);

  return {
    monthlyPremium: monthly,
    annualPremium: roundedAnnual,
    estimatedSavings: savings,
    recommendedTier: tier,
  };
}

export interface TermLifeInput {
  age: number;
  annualIncome: number;
  liabilities: number;
  existingCover: number;
  dependents: number;
  policyTermYears: number;
  smoker: boolean;
}

export interface TermLifeResult {
  recommendedCover: number;
  netCoverageGap: number;
  incomeMultiplier: number;
  estimatedMonthlyPremium: number;
  estimatedAnnualPremium: number;
}

export function calculateTermLifeEstimate(input: TermLifeInput): TermLifeResult {
  const age = Math.max(18, Math.min(65, input.age));
  const income = Math.max(15000, input.annualIncome);
  const liabilities = Math.max(0, input.liabilities);
  const existingCover = Math.max(0, input.existingCover);
  const dependents = Math.max(0, Math.min(6, input.dependents));
  const term = Math.max(10, Math.min(40, input.policyTermYears));

  // Income multiplier between 10x and 15x based on age and dependents
  const baseMultiplier = age < 35 ? 14 : age < 45 ? 12 : 10;
  const incomeMultiplier = Math.min(15, baseMultiplier + (dependents >= 2 ? 1 : 0));

  const grossNeeded = income * incomeMultiplier + liabilities;
  const netCoverageGap = Math.max(100000, grossNeeded - existingCover);

  // Actuarial-inspired benchmark monthly cost per $100k
  const ageMultiplier =
    age < 30 ? 0.72 : age < 40 ? 1.0 : age < 50 ? 1.78 : age < 60 ? 3.25 : 4.8;
  const smokerFactor = input.smoker ? 1.68 : 1.0;
  const termFactor = 0.85 + (term / 40) * 0.35;

  const annualPremium = Math.round(
    (netCoverageGap / 100000) * 118 * ageMultiplier * smokerFactor * termFactor
  );
  const monthlyPremium = Math.max(12, Math.round(annualPremium / 12));

  return {
    recommendedCover: Math.round(grossNeeded),
    netCoverageGap: Math.round(netCoverageGap),
    incomeMultiplier,
    estimatedMonthlyPremium: monthlyPremium,
    estimatedAnnualPremium: annualPremium,
  };
}

export type HealthPlanType = 'individual' | 'family' | 'senior';
export type CityTier = 'metro' | 'tier2' | 'regional';

export interface HealthEstimatorInput {
  planType: HealthPlanType;
  eldestAge: number;
  adults: number;
  children: number;
  sumInsured: number;
  cityTier: CityTier;
  deductible: number;
}

export interface HealthEstimatorResult {
  estimatedAnnualPremium: number;
  estimatedMonthlyPremium: number;
  taxDeductionEstimate: number;
  effectiveDeductibleDiscountPct: number;
}

export function calculateHealthPremiumEstimate(
  input: HealthEstimatorInput
): HealthEstimatorResult {
  const age = Math.max(18, Math.min(85, input.eldestAge));
  const adults = Math.max(1, Math.min(4, input.adults));
  const children = Math.max(0, Math.min(4, input.children));
  const sumInsured = Math.max(50000, input.sumInsured);

  const ageFactor =
    age < 30 ? 0.95 : age < 40 ? 1.2 : age < 50 ? 1.6 : age < 60 ? 2.25 : 3.2;

  const planBaseFactor =
    input.planType === 'individual'
      ? 1.0
      : input.planType === 'family'
      ? 1 + (adults - 1) * 0.48 + children * 0.24
      : 1.38 + (adults - 1) * 0.55;

  const tierFactor =
    input.cityTier === 'metro' ? 1.18 : input.cityTier === 'tier2' ? 1.0 : 0.9;

  const deductibleDiscountPct =
    input.deductible >= 5000 ? 22 : input.deductible >= 2500 ? 14 : input.deductible >= 1000 ? 7 : 0;

  const rawAnnual =
    (sumInsured / 100000) * 340 * ageFactor * planBaseFactor * tierFactor;
  const discountedAnnual = Math.round(rawAnnual * (1 - deductibleDiscountPct / 100));
  const monthly = Math.round(discountedAnnual / 12);

  // Representative 25% marginal tax deduction estimate on eligible health premiums
  const taxDeductionEstimate = Math.round(discountedAnnual * 0.25);

  return {
    estimatedAnnualPremium: discountedAnnual,
    estimatedMonthlyPremium: monthly,
    taxDeductionEstimate,
    effectiveDeductibleDiscountPct: deductibleDiscountPct,
  };
}

export type VehicleType = 'car' | 'bike' | 'ev';
export type NcbYears = 0 | 1 | 2 | 3 | 4 | 5;

export interface MotorCalcInput {
  vehicleType: VehicleType;
  exShowroomPrice: number;
  vehicleAgeYears: number;
  ncbClaimFreeYears: NcbYears;
  zeroDepreciation: boolean;
  roadsideAssistance: boolean;
}

export interface MotorCalcResult {
  depreciationPct: number;
  recommendedIdv: number;
  ncbDiscountPct: number;
  baseOwnDamagePremium: number;
  ncbSavings: number;
  thirdPartyLiability: number;
  addonsTotal: number;
  totalAnnualPremium: number;
}

export function getNcbPercentage(claimFreeYears: NcbYears): number {
  const map: Record<NcbYears, number> = {
    0: 0,
    1: 20,
    2: 25,
    3: 35,
    4: 45,
    5: 50,
  };
  return map[claimFreeYears];
}

export function getIdvDepreciationPercentage(vehicleAgeYears: number): number {
  if (vehicleAgeYears <= 0.5) return 5;
  if (vehicleAgeYears <= 1) return 15;
  if (vehicleAgeYears <= 2) return 20;
  if (vehicleAgeYears <= 3) return 30;
  if (vehicleAgeYears <= 4) return 40;
  return 50;
}

export function calculateMotorIdvNcb(input: MotorCalcInput): MotorCalcResult {
  const price = Math.max(1500, input.exShowroomPrice);
  const age = Math.max(0, Math.min(15, input.vehicleAgeYears));

  const depreciationPct = getIdvDepreciationPercentage(age);
  const recommendedIdv = Math.round(price * (1 - depreciationPct / 100));
  const ncbDiscountPct = getNcbPercentage(input.ncbClaimFreeYears);

  const odRate =
    input.vehicleType === 'bike' ? 0.019 : input.vehicleType === 'ev' ? 0.029 : 0.027;
  const baseOwnDamagePremium = Math.round(recommendedIdv * odRate);
  const ncbSavings = Math.round(baseOwnDamagePremium * (ncbDiscountPct / 100));
  const netOwnDamage = baseOwnDamagePremium - ncbSavings;

  const thirdPartyLiability =
    input.vehicleType === 'bike' ? 75 : input.vehicleType === 'ev' ? 210 : 240;

  let addonsTotal = 0;
  if (input.zeroDepreciation) {
    addonsTotal += Math.round(recommendedIdv * 0.0045);
  }
  if (input.roadsideAssistance) {
    addonsTotal += input.vehicleType === 'bike' ? 18 : 35;
  }

  const totalAnnualPremium = Math.round(netOwnDamage + thirdPartyLiability + addonsTotal);

  return {
    depreciationPct,
    recommendedIdv,
    ncbDiscountPct,
    baseOwnDamagePremium,
    ncbSavings,
    thirdPartyLiability,
    addonsTotal,
    totalAnnualPremium,
  };
}

export interface ConsultationFormInput {
  fullName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  consent: boolean;
}

export interface FormValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ConsultationFormInput, string>>;
}

export function validateConsultationForm(
  input: ConsultationFormInput
): FormValidationResult {
  const errors: Partial<Record<keyof ConsultationFormInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  const digits = input.phone.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) {
    errors.phone = 'Please enter a valid phone number (7–15 digits).';
  }
  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'Please describe your coverage question (at least 10 characters).';
  }
  if (!input.consent) {
    errors.consent = 'Please accept the advisory disclaimer and privacy policy to continue.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
