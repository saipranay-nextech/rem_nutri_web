import React from "react";
import Link from "next/link";
import BookConsultationButton from "./BookConsultationButton";
import { PROGRAM_PRICES, formatInr, type ProgramPricing } from "@/lib/company";

/** Price table for a single programme. */
export const PricingTable = ({ program }: { program: ProgramPricing }) => {
  // Consultation-led programmes are not sold as meal plans, so there is no price
  // table. Say so plainly and offer the consultation instead.
  if (program.consultationLed || !program.tiers.length) {
    return (
      <div className="rounded-2xl border border-[var(--text-color-dark)]/15 bg-[var(--background-color-plain3)] p-6 font-['DM_Sans',sans-serif]">
        <p className="text-[16px] text-[var(--text-color-dark)] mb-2">
          <span className="font-semibold">This is a consultation-led programme.</span> It is
          guidance-based rather than a meal plan, so it is not sold at a fixed price.
        </p>
        <p className="text-[15px] text-[var(--text-color-dark)]/75 mb-5">
          Your plan and fees are agreed with you after an initial consultation, once we understand
          your health goals. Meal plans from our other programmes can be added at the published
          rates if you want them.
        </p>
        <BookConsultationButton className="inline-flex items-center justify-center rounded-xl bg-[var(--background-color-dark)] px-6 py-3 text-[15px] font-semibold text-[var(--text-color-plain)] transition-opacity hover:opacity-90" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[460px] border-collapse font-['DM_Sans',sans-serif] text-[15px]">
        <thead>
          <tr className="border-b border-[var(--text-color-dark)]/20 text-left">
            <th className="py-3 pr-4 font-semibold text-[var(--text-color-dark)]">Meal plan</th>
            <th className="py-3 px-4 text-right font-semibold text-[var(--text-color-dark)]">Weekly</th>
            <th className="py-3 pl-4 text-right font-semibold text-[var(--text-color-dark)]">Monthly</th>
          </tr>
        </thead>
        <tbody>
          {program.tiers.map((tier) => (
            <tr key={tier.name} className="border-b border-[var(--text-color-dark)]/10">
              <td className="py-3 pr-4 text-[var(--text-color-dark)]">{tier.name}</td>
              <td className="py-3 px-4 text-right tabular-nums text-[var(--text-color-dark)]">
                {formatInr(tier.weeklyInr)}
              </td>
              <td className="py-3 pl-4 text-right tabular-nums font-semibold text-[var(--text-color-dark)]">
                {formatInr(tier.monthlyInr)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 font-['DM_Sans',sans-serif] text-[13px] text-[var(--text-color-dark)]/60">
        All prices in Indian Rupees (INR) and inclusive of applicable taxes.
      </p>
    </div>
  );
};

/**
 * Heading + intro + table for one programme, as used on its programme page.
 * The copy changes for consultation-led programmes, which have no meal plan.
 */
export const ProgramPricingBlock = ({ program }: { program: ProgramPricing }) => (
  <>
    <h2 className="text-[32px] sm:text-[40px] font-['Libre_Baskerville',serif] text-[var(--text-color-dark)] mb-3">
      {program.consultationLed ? "Pricing & consultation" : "Pricing"}
    </h2>
    <p className="font-['DM_Sans',sans-serif] text-[16px] text-[var(--text-color-dark)]/80 mb-8">
      {program.consultationLed
        ? "This programme is built around guidance from our team rather than a set meal plan, so we agree your plan and fees together after an initial consultation."
        : "Choose the meal plan that fits your routine. Every plan includes your health assessment, a personalised plan and ongoing support from our team."}
    </p>
    <PricingTable program={program} />
  </>
);

/**
 * Full pricing section listing every programme. Used on the Services page so
 * customers can see what they pay for before enrolling.
 */
const ProgramPricingSection = () => (
  <section id="pricing" className="bg-[var(--background-color-plain2)] px-6 py-16 md:px-10 md:py-24">
    <div className="mx-auto max-w-5xl">
      <h2 className="font-['Libre_Baskerville',serif] text-[32px] md:text-[40px] text-[var(--text-color-dark)] mb-3">
        Programme pricing
      </h2>
      <p className="font-['DM_Sans',sans-serif] text-[16px] md:text-[18px] text-[var(--text-color-dark)]/80 mb-12 max-w-2xl">
        Choose the meal plan that fits your routine. Every programme includes your health
        assessment, a personalised plan and ongoing support from our team. RemFit and RemBalance
        are consultation-led — we agree your plan and fees together after an initial consultation.
      </p>

      <div className="space-y-12">
        {PROGRAM_PRICES.map((program) => (
          <div key={program.id}>
            <div className="mb-4">
              <h3 className="font-['Libre_Baskerville',serif] text-[22px] md:text-[24px] text-[var(--text-color-dark)]">
                <Link href={`/programs/${program.id}`} className="hover:underline">
                  {program.name}
                </Link>
              </h3>
              <p className="font-['DM_Sans',sans-serif] text-[15px] text-[var(--text-color-dark)]/70">
                {program.summary}
              </p>
            </div>
            <PricingTable program={program} />
          </div>
        ))}
      </div>

      <p className="mt-12 font-['DM_Sans',sans-serif] text-[14px] text-[var(--text-color-dark)]/70">
        Meal deliveries are available in Hyderabad and Secunderabad. See our{" "}
        <Link href="/shipping-policy" className="underline">
          Shipping &amp; Delivery Policy
        </Link>{" "}
        and{" "}
        <Link href="/refund-policy" className="underline">
          Refund &amp; Cancellation Policy
        </Link>
        .
      </p>
    </div>
  </section>
);

export default ProgramPricingSection;
