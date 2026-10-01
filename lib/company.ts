/**
 * Single source of truth for company and legal details.
 *
 * Every policy page and contact block reads from here, so there is one place to
 * update and no way to leave template placeholders behind (the Privacy Policy
 * previously shipped with "Business Name" and "www.website.com" in it).
 *
 * Values marked TO CONFIRM are required for Razorpay merchant onboarding and
 * must be filled in before going live. `missingCompanyDetails()` below lists
 * whatever is still blank.
 */

export const COMPANY = {
  /** Registered legal entity name. Must match the Razorpay account exactly. */
  legalName: "RemNutri Health Private Limited",
  /** Public-facing brand. */
  brandName: "RemDi",
  /** Primary domain, without protocol. */
  domain: "remdi.in",
  /** Full site origin used in policy text. */
  siteUrl: "https://remdi.in",

  supportEmail: "Support@remdi.in",
  /** Display form of the support number. */
  phoneDisplay: "+91 72076 46868",
  /** tel: form - digits and leading + only. */
  phoneHref: "+917207646868",

  // ---------------------------------------------------------------------------
  // TO CONFIRM - required before submitting to Razorpay
  // ---------------------------------------------------------------------------

  /**
   * Full registered business address, exactly as it appears on the company's
   * KYC documents. Shown on the Contact page, in the footer and in the policies.
   */
  registeredAddress:
    "# 3-550, Street No. 8, Chandanayak Nagar, Ayyappa Society, Madhapur, Hyderabad 500 081, Telangana",

  /** The same address broken into lines, for blocks that display it stacked. */
  registeredAddressLines: [
    "# 3-550, Street No. 8,",
    "Chandanayak Nagar, Ayyappa Society,",
    "Madhapur, Hyderabad",
    "500 081, Telangana",
  ] as readonly string[],

  /** GSTIN, if the company is registered. Leave blank if not applicable. */
  gstin: "36AANCR1929H2Z2",

  /** Cities where physical meal deliveries are available. */
  mealDeliveryArea: "Hyderabad and Secunderabad",

  /** Days before a programme starts during which a customer may cancel. */
  cancellationWindowDays: 7,

  /** Working days taken to process an approved refund back to source. */
  refundProcessingDays: "5-7",

  /** Working days to dispatch physical meal deliveries after an order. */
  mealDispatchDays: "2-3",
} as const;

/** Convenience: a value that is still blank renders as a visible placeholder. */
export const orPlaceholder = (value: string, label: string) =>
  value.trim() ? value : `[${label} — to be added]`;

/**
 * Names the company details that are still blank. Useful as a pre-launch check:
 * every entry returned here is something Razorpay onboarding will ask for.
 */
export function missingCompanyDetails(): string[] {
  const missing: string[] = [];
  if (!COMPANY.registeredAddress.trim()) missing.push("registeredAddress");
  if (!COMPANY.gstin.trim()) missing.push("gstin (omit if not GST-registered)");
  return missing;
}

/** One purchasable meal-plan tier within a programme. Prices are in INR. */
export interface MealPlanTier {
  name: string;
  weeklyInr: number;
  monthlyInr: number;
}

export interface ProgramPricing {
  /** Route segment under /programs. */
  id: string;
  name: string;
  summary: string;
  /** Meal-plan tiers. Empty for consultation-led programmes. */
  tiers: MealPlanTier[];
  /**
   * True when the programme is delivered through consultation rather than sold
   * as a meal plan, so it has no published price. The UI explains this and
   * offers a consultation instead of showing an empty price table.
   */
  consultationLed?: boolean;
}

// Standard tiers shared by RemDia, RemMeta and RemBliss.
const STANDARD_TIERS: MealPlanTier[] = [
  { name: "One Protein Meal + Snack", weeklyInr: 3500, monthlyInr: 14000 },
  { name: "High Protein Meal + Snack", weeklyInr: 4000, monthlyInr: 15500 },
  { name: "Full Day Meal Plan", weeklyInr: 7000, monthlyInr: 28000 },
  { name: "Full Day High Protein Meal Plan", weeklyInr: 7500, monthlyInr: 29000 },
];

export const PROGRAM_PRICES: ProgramPricing[] = [
  {
    id: "remdia",
    name: "RemDia",
    summary: "Type 2 and Pre-Diabetes reversal programme",
    tiers: STANDARD_TIERS,
  },
  {
    id: "remmeta",
    name: "RemMeta",
    summary: "Metabolic health, including high blood pressure",
    tiers: STANDARD_TIERS,
  },
  {
    id: "remprotein",
    name: "RemProtein",
    summary: "Protein-led nutrition for healthy weight gain",
    // RemProtein offers two tiers, and its full-day plan is priced at the
    // high-protein rate.
    tiers: [
      { name: "High Protein Meal + Snack", weeklyInr: 4000, monthlyInr: 15500 },
      { name: "Full Day Meal Plan", weeklyInr: 7500, monthlyInr: 29000 },
    ],
  },
  {
    id: "rembliss",
    name: "RemBliss",
    summary: "Women's health programme for PCOS/PCOD and menopause",
    tiers: STANDARD_TIERS,
  },
  // These two are consultation-led rather than meal-plan products: the plan and
  // fee are agreed after an initial consultation, so there is no listed price.
  {
    id: "remfit",
    name: "RemFit",
    summary: "Weight loss education programme — intensive weight loss or simply staying fit",
    tiers: [],
    consultationLed: true,
  },
  {
    id: "rembalance",
    name: "RemBalance",
    summary: "Gut health and weight maintenance through balanced nutrition",
    tiers: [],
    consultationLed: true,
  },
];

/** Lowest weekly price across a programme's tiers, for "from X" summaries. */
export const startingWeeklyPrice = (p: ProgramPricing): number | null =>
  p.tiers.length ? Math.min(...p.tiers.map((t) => t.weeklyInr)) : null;

/**
 * Programmes that should have a price but do not. Consultation-led programmes are
 * excluded: they are priced after an initial consultation by design.
 */
export const programsMissingPrices = (): string[] =>
  PROGRAM_PRICES.filter((p) => !p.consultationLed && p.tiers.length === 0).map((p) => p.name);

export const formatInr = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
