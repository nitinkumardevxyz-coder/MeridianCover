import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateHealthPremiumEstimate,
  calculateMotorIdvNcb,
  calculateQuickQuote,
  calculateTermLifeEstimate,
  getIdvDepreciationPercentage,
  getNcbPercentage,
  resolvePageFromPath,
  validateConsultationForm,
} from './insuranceCalculators';

test('resolvePageFromPath maps both clean routes and .html routes', () => {
  assert.deepEqual(resolvePageFromPath('/'), { page: 'home', focusContact: false });
  assert.deepEqual(resolvePageFromPath('/index.html'), { page: 'home', focusContact: false });
  assert.deepEqual(resolvePageFromPath('/health-insurance.html'), {
    page: 'health',
    focusContact: false,
  });
  assert.deepEqual(resolvePageFromPath('/life-insurance'), {
    page: 'life',
    focusContact: false,
  });
  assert.deepEqual(resolvePageFromPath('/motor-insurance.html'), {
    page: 'motor',
    focusContact: false,
  });
  assert.deepEqual(resolvePageFromPath('/travel-home-insurance'), {
    page: 'travel-home',
    focusContact: false,
  });
  assert.deepEqual(resolvePageFromPath('/calculators.html'), {
    page: 'calculators',
    focusContact: false,
  });
  assert.deepEqual(resolvePageFromPath('/guides'), {
    page: 'guides',
    focusContact: false,
  });
  assert.deepEqual(resolvePageFromPath('/contact.html'), {
    page: 'guides',
    focusContact: true,
  });
});

test('calculateTermLifeEstimate applies 10x-15x income rule and subtracts existing cover', () => {
  const result = calculateTermLifeEstimate({
    age: 32,
    annualIncome: 100000,
    liabilities: 250000,
    existingCover: 150000,
    dependents: 2,
    policyTermYears: 30,
    smoker: false,
  });

  assert.equal(result.incomeMultiplier, 15);
  assert.equal(result.recommendedCover, 1750000);
  assert.equal(result.netCoverageGap, 1600000);
  assert.ok(result.estimatedMonthlyPremium > 0);
  assert.ok(result.estimatedAnnualPremium >= result.estimatedMonthlyPremium * 11);

  const smokerResult = calculateTermLifeEstimate({
    age: 32,
    annualIncome: 100000,
    liabilities: 250000,
    existingCover: 150000,
    dependents: 2,
    policyTermYears: 30,
    smoker: true,
  });
  assert.ok(smokerResult.estimatedAnnualPremium > result.estimatedAnnualPremium);
});

test('calculateHealthPremiumEstimate scales by family size, tier, and deductible', () => {
  const noDeductible = calculateHealthPremiumEstimate({
    planType: 'family',
    eldestAge: 38,
    adults: 2,
    children: 1,
    sumInsured: 500000,
    cityTier: 'metro',
    deductible: 0,
  });
  const withDeductible = calculateHealthPremiumEstimate({
    planType: 'family',
    eldestAge: 38,
    adults: 2,
    children: 1,
    sumInsured: 500000,
    cityTier: 'metro',
    deductible: 5000,
  });

  assert.equal(noDeductible.effectiveDeductibleDiscountPct, 0);
  assert.equal(withDeductible.effectiveDeductibleDiscountPct, 22);
  assert.ok(withDeductible.estimatedAnnualPremium < noDeductible.estimatedAnnualPremium);
  assert.ok(withDeductible.taxDeductionEstimate > 0);
});

test('calculateMotorIdvNcb computes IDV depreciation and NCB discount slabs accurately', () => {
  assert.equal(getNcbPercentage(0), 0);
  assert.equal(getNcbPercentage(3), 35);
  assert.equal(getNcbPercentage(5), 50);
  assert.equal(getIdvDepreciationPercentage(2), 20);
  assert.equal(getIdvDepreciationPercentage(5), 50);

  const motor = calculateMotorIdvNcb({
    vehicleType: 'car',
    exShowroomPrice: 40000,
    vehicleAgeYears: 2,
    ncbClaimFreeYears: 5,
    zeroDepreciation: true,
    roadsideAssistance: true,
  });

  assert.equal(motor.depreciationPct, 20);
  assert.equal(motor.recommendedIdv, 32000);
  assert.equal(motor.ncbDiscountPct, 50);
  assert.equal(motor.ncbSavings, Math.round(motor.baseOwnDamagePremium * 0.5));
  assert.ok(motor.totalAnnualPremium > motor.thirdPartyLiability);
});

test('calculateQuickQuote returns positive estimates for all 6 categories', () => {
  const categories = ['health', 'life', 'car', 'bike', 'home', 'travel'] as const;
  for (const category of categories) {
    const q = calculateQuickQuote({
      category,
      age: 34,
      coverageAmount: 250000,
      familyMembers: 2,
    });
    assert.ok(q.annualPremium > 0);
    assert.ok(q.monthlyPremium > 0);
    assert.ok(q.estimatedSavings > 0);
    assert.ok(q.recommendedTier.length > 0);
  }
});

test('validateConsultationForm rejects invalid inputs and accepts valid submissions', () => {
  const invalid = validateConsultationForm({
    fullName: 'A',
    email: 'invalid-email',
    phone: '123',
    topic: 'health',
    message: 'short',
    consent: false,
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.message);
  assert.ok(invalid.errors.consent);

  const valid = validateConsultationForm({
    fullName: 'Elena Vance',
    email: 'elena.vance@example.com',
    phone: '4155550192',
    topic: 'Health Insurance',
    message: 'Looking to port an existing family floater plan without losing waiting period credits.',
    consent: true,
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
