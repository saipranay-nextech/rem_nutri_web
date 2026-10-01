import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PolicyPage, { PolicySection, PolicyList } from "../components/PolicyPage";
import { COMPANY, orPlaceholder } from "@/lib/company";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | RemDi",
  description: `How ${COMPANY.brandName} programmes, consultations and meal deliveries are provided.`,
};

const ShippingPolicy = () => (
  <PolicyPage title="Shipping & Delivery Policy" lastUpdated="28 September 2026">
    <p>
      This policy explains how {COMPANY.legalName} delivers what you have paid for — both our
      online programmes and consultations, and any physical meal deliveries that form part of a
      programme.
    </p>

    <PolicySection heading="1. Online programmes and consultations">
      <PolicyList
        items={[
          <>
            <strong>When access starts.</strong> Your programme begins on the start date confirmed
            in your enrolment email. We send that confirmation within 24 hours of receiving payment.
          </>,
          <>
            <strong>Onboarding.</strong> A member of our team contacts you within 2 working days of
            enrolment to schedule your first consultation and collect any further health details.
          </>,
          <>
            <strong>Consultations.</strong> Sessions are delivered online by video or telephone at a
            time agreed with you. Joining details are sent by email ahead of each session.
          </>,
          <>
            <strong>Plans and materials.</strong> Your personalised meal plan and programme
            materials are delivered by email, normally within 3 working days of your first
            consultation.
          </>,
          <>
            <strong>Ongoing support.</strong> Support continues for the full duration of the
            programme as described on its programme page.
          </>,
        ]}
      />
      <p>
        There is no physical shipment for online programmes, so no shipping charge applies to them.
      </p>
    </PolicySection>

    <PolicySection heading="2. Meal deliveries">
      <p>
        Where your programme includes physical meals or meal kits, the following applies.
      </p>
      <PolicyList
        items={[
          <>
            <strong>Dispatch.</strong> Orders are dispatched within{" "}
            <strong>{COMPANY.mealDispatchDays} working days</strong> of the order being confirmed,
            or on the schedule agreed for a recurring plan.
          </>,
          <>
            <strong>Delivery area.</strong> We currently deliver meals within{" "}
            <strong>{COMPANY.mealDeliveryArea}</strong>. If your location is outside our delivery
            area we will tell you before you pay, and the programme will be provided in its online
            form instead.
          </>,
          <>
            <strong>Delivery charges.</strong> Any delivery charge is shown at checkout before you
            pay. Where a programme includes delivery, no separate charge applies.
          </>,
          <>
            <strong>Tracking.</strong> We confirm each dispatch by email or SMS, with tracking
            details where our delivery partner provides them.
          </>,
          <>
            <strong>Receiving your delivery.</strong> Because meals are perishable, please ensure
            someone is available at the delivery address at the agreed time. If a delivery cannot be
            completed because no one is available, we may not be able to replace it.
          </>,
        ]}
      />
    </PolicySection>

    <PolicySection heading="3. Delays">
      <p>
        We aim to meet every timeline above. Delays can occasionally occur due to weather, transport
        disruption, public holidays or other circumstances beyond our control. If your delivery or
        consultation is delayed we will contact you with a revised time.
      </p>
    </PolicySection>

    <PolicySection heading="4. Problems with a delivery">
      <p>
        If a meal delivery arrives damaged, spoiled or materially incorrect, contact us within 24
        hours of delivery at{" "}
        <a href={`mailto:${COMPANY.supportEmail}`} className="underline">
          {COMPANY.supportEmail}
        </a>{" "}
        or{" "}
        <a href={`tel:${COMPANY.phoneHref}`} className="underline">
          {COMPANY.phoneDisplay}
        </a>
        , with photographs where possible. We will replace it or, where that is not possible, refund
        it in line with our{" "}
        <Link href="/refund-policy" className="underline">
          Refund &amp; Cancellation Policy
        </Link>
        .
      </p>
    </PolicySection>

    <PolicySection heading="5. Changing your delivery address or schedule">
      <p>
        Tell us at least 2 working days before a scheduled delivery if your address or preferred
        time changes, so we can update it before dispatch.
      </p>
    </PolicySection>

    <PolicySection heading="6. Contact us">
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

export default ShippingPolicy;
