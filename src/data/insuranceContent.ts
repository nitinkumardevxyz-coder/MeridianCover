import { FaqItem } from '../components/common/FaqAccordion';

export const IMAGES = {
  heroFamily: '/src/assets/images/hero_family_protection_1795763230239.jpg',
  healthNetwork: '/src/assets/images/health_care_network_1795763231151.jpg',
  motorSedan: '/src/assets/images/motor_highway_sedan_1795763231086.jpg',
  travelHome: '/src/assets/images/travel_home_sanctuary_1795763231256.jpg',
};

export const HOME_FAQS: FaqItem[] = [
  {
    question: 'How do I verify an insurer’s real claim settlement reliability before buying?',
    answer:
      'Look beyond headline settlement counts and examine two numbers together: the Claim Settlement Ratio (CSR) by policy count and the Claim Amount Settlement Ratio over at least three consecutive fiscal years. A reliable carrier maintains 98%+ on both ratios, publishes turnaround times under 15 days for death claims and under 4 hours for cashless pre-authorization, and keeps grievance ratios below 5 per 10,000 claims.',
  },
  {
    question: 'Should I buy insurance directly online or bundle multiple policies with one provider?',
    answer:
      'Buying directly online removes intermediary commission loading on term life and motor policies, often lowering annual premiums by 8% to 14%. Bundling home and motor policies with one carrier can yield a 10% multi-policy discount, whereas health and term life should always be selected independently based on hospital network density and underwriting stability rather than bundle convenience.',
  },
  {
    question: 'What happens if I miss a health or motor renewal deadline?',
    answer:
      'Health policies include a 30-day grace period where continuity benefits remain intact, though claims incurred during the unpaid gap are not covered. Motor policies have no grace period once expired: driving uninsured violates statutory rules, and letting a policy lapse beyond 90 days forfeits your accumulated No Claim Bonus (NCB) entirely.',
  },
  {
    question: 'Can I port my existing health insurance without restarting waiting periods?',
    answer:
      'Yes. Policy portability regulations allow you to transfer your existing health plan to a new insurer at renewal while carrying over waiting period credits served for pre-existing conditions. Submit your portability request at least 45 days before renewal with prior policy schedules and claim history.',
  },
  {
    question: 'How much term life cover is genuinely sufficient for a dual-income household?',
    answer:
      'Calculate cover separately for each earner using 12x to 15x gross annual income, add outstanding mortgage and education liabilities, and subtract liquid investable assets and existing employer group cover. Do not rely solely on employer life cover because it terminates immediately when you change jobs.',
  },
];

export const HOME_TESTIMONIALS = [
  {
    name: 'Hannah Lindqvist',
    role: 'Operations Director · Lindqvist Logistics, Seattle',
    before: 'Previously carried an under-insured $150k individual health cap with a 20% room-rent sub-limit.',
    outcome: 'Switched to a $500k no-sub-limit family floater and settled a $38,400 orthopedic surgery cashlessly in 3 hours.',
  },
  {
    name: 'David & Priya Nair',
    role: 'Principal Architect & Pediatrician · Austin',
    before: 'Relied on employer term cover while carrying a $420k residential mortgage and two young dependents.',
    outcome: 'Structured a $1.8M 30-year level term policy with a Critical Illness rider for $118/month combined.',
  },
  {
    name: 'Marcus Delgado',
    role: 'Fleet Coordinator · Delgado Builders, Denver',
    before: 'Paid out-of-pocket for plastic and fiberglass parts after a highway collision on a standard policy.',
    outcome: 'Upgraded to Zero Depreciation with 50% NCB protection, recovering 100% of $6,920 in repair parts.',
  },
];

export const HEALTH_FAQS: FaqItem[] = [
  {
    question: 'What is the difference between a room-rent cap and no room-rent restriction?',
    answer:
      'A policy with a 1% room-rent cap limits daily hospital room charges to 1% of your Sum Insured. If you choose a higher room category, insurers apply proportionate deductions across surgeon fees, diagnostics, and OT charges—often cutting your payout by 30% to 45%. Always select plans with Single Private Room or No Room-Rent Restriction.',
  },
  {
    question: 'How do Restoration / Recharge benefits work during a single policy year?',
    answer:
      'If your base Sum Insured is exhausted by one hospitalization, an Unlimited or 100% Restoration benefit replenishes the cover for subsequent claims in the same year. Verify whether restoration triggers for the same illness on the same person or only for unrelated illnesses and other family members.',
  },
  {
    question: 'Are pre-existing conditions covered from Day 1?',
    answer:
      'Standard retail health policies impose a 24- to 36-month waiting period for pre-existing diseases (PED) diagnosed within 48 months prior to application. Some modern plans offer a Day-1 Chronic Care Rider for hypertension, diabetes, or asthma in exchange for a 10%–18% premium loading.',
  },
  {
    question: 'When should parents have a separate Senior Citizen plan instead of joining my Family Floater?',
    answer:
      'Because Family Floater premiums are priced on the age of the eldest insured member, adding parents aged 60+ inside your household floater inflates the entire family’s annual premium sharply. Keeping parents on a dedicated senior policy also prevents a single parental hospitalization from depleting coverage for your spouse and children.',
  },
];

export const LIFE_FAQS: FaqItem[] = [
  {
    question: 'Is Return of Premium (TROP) term insurance worth the extra cost?',
    answer:
      'Usually no. TROP plans charge 1.8x to 2.4x the premium of pure term insurance simply to return nominal premiums at age 65 or 70 without inflation adjustment. Investing the premium difference in a diversified index fund typically outperforms TROP maturity proceeds by a wide margin.',
  },
  {
    question: 'Does a Critical Illness rider reduce my base Life Cover payout?',
    answer:
      'It depends on whether the rider is Accelerated or Additional. An Accelerated Critical Illness rider pays a lump sum on diagnosis and reduces your death benefit by that payout, while an Additional (Standalone) Critical Illness rider leaves your full death benefit intact. Read Section 4 of the policy schedule before selecting.',
  },
  {
    question: 'What happens under the 3-year non-contestability rule?',
    answer:
      'In most regulated jurisdictions, once a life policy has been continuously in force for 3 years without lapse, the insurer cannot repudiate a death claim on grounds of non-fraudulent misstatement. However, complete honesty on smoking, alcohol, BMI, and family medical history during underwriting remains essential to guarantee smooth early claims.',
  },
  {
    question: 'Should nominees choose a lump-sum payout or monthly income stagger?',
    answer:
      'A hybrid payout—for example 50% lump sum to immediately retire mortgages and debts plus 50% paid as inflation-indexed monthly income over 10–15 years—prevents premature capital depletion and shields grieving families from aggressive investment pitches.',
  },
];

export const MOTOR_FAQS: FaqItem[] = [
  {
    question: 'Why should I never artificially under-declare IDV to lower my car insurance premium?',
    answer:
      'Insured Declared Value (IDV) is the maximum settlement you receive if your car is stolen or declared a total loss. Lowering IDV by 20% only trims your annual premium by a few dozen dollars while exposing you to thousands of dollars in unrecoverable loss during total theft or flood damage.',
  },
  {
    question: 'How does No Claim Bonus (NCB) transfer when I buy a new car or switch insurers?',
    answer:
      'NCB belongs to the vehicle owner, not the vehicle. When you sell your old car or switch insurance carriers at renewal, request an NCB Retention Certificate so your 20% to 50% Own-Damage discount transfers directly to your new policy or new vehicle.',
  },
  {
    question: 'What does Zero Depreciation cover that standard Comprehensive insurance deducts?',
    answer:
      'Standard comprehensive policies deduct 50% on rubber, nylon, and plastic parts, 30% on fiberglass, and age-based percentages on metal parts during repairs. A Zero Depreciation (Bumper-to-Bumper) add-on eliminates these deductions for vehicles up to 5–7 years old.',
  },
  {
    question: 'Does filing a windshield glass claim reset my 50% No Claim Bonus?',
    answer:
      'Yes—any Own-Damage claim resets your NCB to 0% at the next renewal unless you have purchased an NCB Protector add-on. Always compare the repair invoice against your next-year NCB discount value before deciding whether to pay small repairs out of pocket.',
  },
];

export const TRAVEL_HOME_FAQS: FaqItem[] = [
  {
    question: 'Does my domestic health insurance cover emergency hospitalization abroad?',
    answer:
      'With rare ultra-high-net-worth exceptions, domestic health policies exclude medical treatment outside your home country. An international travel policy covering emergency hospitalization, medical evacuation ($100,000+ minimum), and repatriation is mandatory for stress-free cross-border travel.',
  },
  {
    question: 'What is the difference between Home Structure Cover and Contents Cover?',
    answer:
      'Structure (Building) Cover insures the physical walls, roof, foundation, and permanent fixtures against fire, storms, burst pipes, and subsidence on a reinstatement cost basis—not market land value. Contents Cover protects furniture, electronics, appliances, jewelry, and personal belongings inside the home, and tenants can purchase Contents Cover independently.',
  },
  {
    question: 'When is Cancel For Any Reason (CFAR) travel coverage worth adding?',
    answer:
      'Standard trip cancellation only reimburses documented emergencies such as sudden illness, bereavement, or severe weather grounding. CFAR typically reimburses 50%–75% of non-refundable prepaid trip costs if you cancel for personal or work reasons up to 48 hours before departure.',
  },
  {
    question: 'Are flood and earthquake damages automatically included in standard Home Insurance?',
    answer:
      'Fire, lightning, storm, and burst pipes are standard perils, but flood and earthquake coverage frequently require an explicit endorsement or deductible schedule in high-risk zones. Inspect your policy’s Named Perils vs. All-Risk section carefully before closing.',
  },
];

export interface EditorialArticle {
  id: string;
  category: string;
  readTime: string;
  updated: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
  checklist: string[];
}

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'article-claim-rejections',
    category: 'Claims Strategy',
    readTime: '7 min read',
    updated: 'Updated Oct 2026',
    title: 'Top 10 Reasons Insurance Claims Get Rejected — And How to Prevent Every One',
    summary:
      'Most claim denials stem from preventable application omissions, late intimation, and misunderstood sub-limits rather than bad faith. Here is the exact audit insurers run when a claim arrives.',
    sections: [
      {
        heading: '1. Non-Disclosure of Lifestyle & Pre-Existing Conditions',
        body: 'Insurers routinely cross-check pharmacy records, diagnostic lab portals, and prior physician notes during high-value hospitalization or early life claims. Omitting borderline hypertension, social tobacco use, or a 3-year-old diagnostic scan gives underwriters legal grounds to void the contract. Always declare conditions explicitly—paying a transparent loading upfront beats a rejected claim later.',
      },
      {
        heading: '2. Late Intimation & Missing Pre-Authorization Windows',
        body: 'Planned hospitalizations typically require 48 to 72 hours of advance notice, while emergency admissions must be intimated within 24 hours. Similarly, motor theft claims require immediate police FIR filing and insurer notification within 24–48 hours. Delayed intimation weakens physical verification and triggers technical deductions.',
      },
      {
        heading: '3. Lapsed Policies, Sub-Limits & Non-Medical Consumables',
        body: 'Claims filed during an unpaid lapse cannot be honored retroactively. Even on active health policies, room-rent sub-limits, disease-specific caps (such as cataract or joint replacement ceilings), and non-payable consumables (gloves, admission kits, PPE) account for nearly 22% of unexpected out-of-pocket deductions.',
      },
    ],
    checklist: [
      'Disclose all medications, surgeries, and tobacco/alcohol usage truthfully at proposal stage.',
      'Save your insurer’s 24/7 TPA cashless desk number and policy PDF offline on family phones.',
      'Notify the claims desk within 24 hours for emergency hospital admissions or road accidents.',
      'Collect itemized hospital bills, discharge summaries, and diagnostic films before leaving.',
    ],
  },
  {
    id: 'article-port-health',
    category: 'Health Portability',
    readTime: '6 min read',
    updated: 'Updated Oct 2026',
    title: 'How to Port Your Health Insurance Policy Without Losing Waiting Period Credits',
    summary:
      'Dissatisfied with rising renewal premiums or narrow hospital networks? Follow this 45-day statutory portability timeline to switch carriers cleanly.',
    sections: [
      {
        heading: 'When Portability Makes Financial Sense',
        body: 'Consider porting if your current insurer enforces steep age-band premium hikes, introduces mandatory co-payments after age 60, or drops major local hospitals from its cashless network. Portability preserves accrued 2–3 year pre-existing disease waiting periods up to your existing Sum Insured.',
      },
      {
        heading: 'The Mandatory 45-to-60 Day Window',
        body: 'Submit the portability application to your target insurer at least 45 days (ideally 60 days) before your current renewal date. Keep copies of the last three years of policy schedules, renewal notices, and any claim settlement letters ready for underwriting verification.',
      },
      {
        heading: 'Handling Sum Insured Upgrades During Portability',
        body: 'If you increase your cover from $300,000 to $600,000 while porting, your carried-over waiting period credit applies strictly to the original $300,000 base. The incremental $300,000 top-up serves a fresh waiting period under the new insurer’s terms.',
      },
    ],
    checklist: [
      'Initiate portability 45–60 days ahead of your renewal due date.',
      'Verify that target network hospitals include your preferred tertiary care centers.',
      'Never cancel your old policy until the new insurer issues written acceptance.',
    ],
  },
  {
    id: 'article-expired-motor',
    category: 'Motor Renewal',
    readTime: '5 min read',
    updated: 'Updated Nov 2026',
    title: 'Renewing Expired Motor Insurance: Inspection Rules, NCB Traps & Grace Windows',
    summary:
      'A single day past your motor policy expiry removes statutory coverage and triggers a vehicle inspection requirement. Here is how to restore full protection fast.',
    sections: [
      {
        heading: 'The First 24 Hours vs. The 90-Day NCB Cliff',
        body: 'Unlike health policies, motor insurance has zero grace period for coverage. Driving even one hour after expiry leaves you personally exposed to third-party liability. However, your earned No Claim Bonus remains salvageable for up to 90 days after expiry—after day 90, your NCB drops permanently to 0%.',
      },
      {
        heading: 'Self-Video Vehicle Inspection Process',
        body: 'When renewing an expired Own-Damage policy, insurers require a live 360-degree smartphone video walkaround showing the VIN/chassis number, odometer, windshield, and all four body panels. Any pre-existing dents captured during inspection are excluded until repaired.',
      },
    ],
    checklist: [
      'Park the vehicle off public roads immediately if the policy has lapsed.',
      'Renew within 90 days of expiry to rescue accumulated 20%–50% NCB.',
      'Record your inspection walkaround in bright daylight with clear VIN visibility.',
    ],
  },
  {
    id: 'article-fine-print',
    category: 'Policy Literacy',
    readTime: '8 min read',
    updated: 'Updated Nov 2026',
    title: 'Reading Policy Fine Print: 7 Clauses Every Buyer Must Audit Before Paying',
    summary:
      'Marketing brochures highlight maximum benefits, while the Policy Wordings PDF governs actual claim payouts. Use this 7-point audit before your free-look period expires.',
    sections: [
      {
        heading: 'Room-Rent Proportionate Deduction & Disease Sub-Limits',
        body: 'Locate the Schedule of Benefits and confirm zero proportionate deduction clauses. Check whether high-frequency procedures—cataracts, knee replacements, hernia, and modern robotic surgeries—carry capped dollar limits.',
      },
      {
        heading: 'Co-Payment Triggers & Voluntary Deductibles',
        body: 'Some low-premium plans quietly embed a 10% or 20% mandatory co-payment for out-of-network hospitals or once the insured crosses age 61. Always distinguish between a voluntary deductible (chosen by you to cut premiums) and a compulsory co-pay (imposed on every claim).',
      },
      {
        heading: 'Free-Look Period Cancellation Rights',
        body: 'Every new life and long-term health policy includes a 15- to 30-day free-look review window from policy document receipt. If any promised feature is missing in the signed schedule, you may cancel in writing for a full refund minus proportionate risk/medical test costs.',
      },
    ],
    checklist: [
      'Confirm zero room-rent caps and zero compulsory age-based co-payments.',
      'Verify exact definitions of Permanent Total Disability and Critical Illness.',
      'Review exclusions and waiting periods within the 15–30 day free-look window.',
    ],
  },
];
