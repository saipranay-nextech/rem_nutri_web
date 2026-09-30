import React from "react";
import NavbarWrapper from "./NavbarWrapper";

interface PolicyPageProps {
  title: string;
  /** Shown under the title, e.g. "Last updated: 28 September 2026". */
  lastUpdated: string;
  children: React.ReactNode;
}

/**
 * Shared shell for the legal pages (Privacy, Terms, Refund, Shipping) so they
 * stay visually consistent and only the copy differs.
 */
const PolicyPage = ({ title, lastUpdated, children }: PolicyPageProps) => (
  <div>
    <NavbarWrapper />
    <div className="bg-[var(--background-color-plain)] px-[8%] pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="mx-auto max-w-4xl text-[var(--text-color-dark)]">
        <h1 className="font-['Libre_Baskerville',serif] text-[32px] md:text-[40px] mb-3">
          {title}
        </h1>
        <p className="font-['DM_Sans',sans-serif] text-[14px] text-[var(--text-color-dark)]/60 mb-10 md:mb-14">
          Last updated: {lastUpdated}
        </p>
        <div className="policy-body font-['DM_Sans',sans-serif] text-[16px] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  </div>
);

/** Section heading used inside a PolicyPage. */
export const PolicySection = ({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) => (
  <section className="mb-8">
    <h2 className="font-['Libre_Baskerville',serif] text-[20px] md:text-[22px] mt-10 mb-3">
      {heading}
    </h2>
    <div className="space-y-3">{children}</div>
  </section>
);

/** Bulleted list used inside a PolicySection. */
export const PolicyList = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="list-disc space-y-2 pl-6">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export default PolicyPage;
