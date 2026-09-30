import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PolicyPage, { PolicySection, PolicyList } from "../components/PolicyPage";
import { COMPANY, orPlaceholder } from "@/lib/company";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | RemDi",
  description: `When you can cancel a ${COMPANY.brandName} programme, what refund applies and how long it takes.`,
};

const RefundPolicy = () => (
  <PolicyPage title="Refund & Cancellation Policy" lastUpdated="28 September 2026">
    <p>
      This policy explains when you can cancel a programme with {COMPANY.legalName}, what refund
      applies and how long a refund takes to reach you. It forms part of our{" "}
      <Link href="/terms" className="underline">
        Terms &amp; Conditions
      </Link>
      .
    </p>

    <PolicySection heading="1. Cancelling before your programme starts">
      <PolicyList
        items={[
          <>
            Cancel <strong>{COMPANY.cancellationWindowDays} or more days</strong> before your
            programme start date and you receive a <strong>full refund</strong> of the amount paid.
          </>,
          <>
            Cancel <strong>less than {COMPANY.cancellationWindowDays} days</strong> before the start
            date and you receive a refund of the amount paid, less any consultation already
            delivered and any meal kit already dispatched.
          </>,
        ]}
      />
    </PolicySection>

    <PolicySection heading="2. Cancelling after your programme starts">
      <p>
        Our programmes are personalised: once your assessment has been reviewed and your plan
        prepared, that work has been carried out specifically for you.
      </p>
      <PolicyList
        items={[
          "Within the first 7 days of the start date, and before your first consultation has taken place, you may cancel for a refund of the amount paid less a deduction for the assessment and plan already prepared for you.",
          "After your first consultation has taken place, fees for the current programme cycle are non-refundable.",
          "Where a programme is paid in instalments, cancelling stops future instalments from the date we receive your request. Instalments already paid are treated as above.",
        ]}
      />
    </PolicySection>

    <PolicySection heading="3. When we will always refund you in full">
      <PolicyList
        items={[
          "We cancel or are unable to deliver your programme.",
          "We decline your enrolment because the programme is not clinically suitable for you.",
          "You were charged in error, or charged more than once for the same enrolment.",
          "A meal delivery arrives damaged, spoiled or materially incorrect and we cannot replace it.",
        ]}
      />
    </PolicySection>

    <PolicySection heading="4. What is not refundable">
      <PolicyList
        items={[
          "Consultations that have already taken place, and sessions missed without notice.",
          "Perishable meal items that have already been dispatched or delivered, except where they arrive damaged, spoiled or materially incorrect.",
          "Programmes where the stated duration has already been completed.",
        ]}
      />
    </PolicySection>

    <PolicySection heading="5. How to request a cancellation or refund">
      <p>
        Email{" "}
        <a href={`mailto:${COMPANY.supportEmail}`} className="underline">
          {COMPANY.supportEmail}
        </a>{" "}
        from the address used at enrolment, or call{" "}
        <a href={`tel:${COMPANY.phoneHref}`} className="underline">
          {COMPANY.phoneDisplay}
        </a>
        . Please include your name, the programme, the date of purchase and the reason for
        cancelling.
      </p>
      <p>
        We acknowledge every request within 2 working days and tell you the outcome, including how
        any refund has been calculated.
      </p>
    </PolicySection>

    <PolicySection heading="6. How refunds are paid">
      <PolicyList
        items={[
          <>
            Approved refunds are returned to the <strong>original payment method</strong> used at
            enrolment. We cannot refund to a different account.
          </>,
          <>
            Refunds are processed within <strong>{COMPANY.refundProcessingDays} working days</strong>{" "}
            of approval.
          </>,
          "Once processed, your bank or card issuer may take a further few working days to show the credit on your statement.",
          "Refunds are made in Indian Rupees. Any bank or currency conversion charge levied by your own bank is not within our control.",
        ]}
      />
    </PolicySection>

    <PolicySection heading="7. Questions or complaints">
      <p>
        If you are unhappy with a refund decision, write to{" "}
        <a href={`mailto:${COMPANY.supportEmail}`} className="underline">
          {COMPANY.supportEmail}
        </a>{" "}
        and we will review it. Our contact details are:
      </p>
      <p>
        {COMPANY.legalName}
        <br />
        {orPlaceholder(COMPANY.registeredAddress, "Registered address")}
        <br />
        Email:{" "}
        <a href={`mailto:${COMPANY.supportEmail}`} className="underline">
          {COMPANY.supportEmail}
        </a>
        <br />
        Phone:{" "}
        <a href={`tel:${COMPANY.phoneHref}`} className="underline">
          {COMPANY.phoneDisplay}
        </a>
      </p>
    </PolicySection>
  </PolicyPage>
);

export default RefundPolicy;
