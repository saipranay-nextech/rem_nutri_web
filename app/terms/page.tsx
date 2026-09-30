import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PolicyPage, { PolicySection, PolicyList } from "../components/PolicyPage";
import { COMPANY, orPlaceholder } from "@/lib/company";

export const metadata: Metadata = {
  title: "Terms & Conditions | RemDi",
  description: `The terms governing use of ${COMPANY.domain} and the ${COMPANY.brandName} programmes.`,
};

const Terms = () => (
  <PolicyPage title="Terms & Conditions" lastUpdated="28 September 2026">
    <p>
      These Terms &amp; Conditions govern your use of {COMPANY.domain} (the &quot;Website&quot;) and
      the health and nutrition programmes offered by {COMPANY.legalName} (&quot;we&quot;,
      &quot;our&quot; or &quot;us&quot;) under the {COMPANY.brandName} brand. By using the Website
      or enrolling in a programme, you agree to these Terms. If you do not agree, please do not use
      the Website.
    </p>

    <PolicySection heading="1. Medical disclaimer">
      <p className="rounded-xl border border-[var(--text-color-dark)]/15 bg-[var(--background-color-plain2)] p-4">
        <strong>Our programmes are not a substitute for professional medical advice, diagnosis or
        treatment.</strong> The information provided on this Website, in the Health Assessment and
        through our programmes is for general nutrition and wellness guidance only. Always seek the
        advice of your physician or another qualified health provider with any question about a
        medical condition, and never disregard or delay professional medical advice because of
        something you have read or received from us. Do not stop, start or change any prescribed
        medication without consulting your treating doctor.
      </p>
      <p>
        Results vary from person to person and depend on individual circumstances, adherence and
        medical history. We make no guarantee of any specific health outcome, including weight loss
        or the reversal or remission of any condition. Any outcomes described on this Website
        reflect individual experiences and are not a promise of results.
      </p>
      <p>
        If you are pregnant or breastfeeding, under 18, or being treated for a serious medical
        condition, consult your doctor before enrolling.
      </p>
    </PolicySection>

    <PolicySection heading="2. Eligibility">
      <p>
        You must be at least 18 years old and able to enter into a binding contract to use the
        Website or enrol in a programme. By enrolling, you confirm that the health information you
        provide is accurate and complete to the best of your knowledge.
      </p>
    </PolicySection>

    <PolicySection heading="3. Services">
      <p>
        We offer structured nutrition programmes that may include an initial health assessment,
        consultations with our team, personalised meal plans, progress tracking and ongoing support.
        The exact inclusions and duration of each programme are described on its programme page and
        confirmed to you at enrolment.
      </p>
      <p>
        We may modify, suspend or discontinue any part of a programme. Where a change materially
        affects a programme you have already paid for, we will offer you a suitable alternative or a
        refund in line with our{" "}
        <Link href="/refund-policy" className="underline">
          Refund &amp; Cancellation Policy
        </Link>
        .
      </p>
    </PolicySection>

    <PolicySection heading="4. Enrolment and payment">
      <PolicyList
        items={[
          "Programme fees are listed in Indian Rupees (INR) and are payable in full at enrolment unless a different arrangement is confirmed to you in writing.",
          "Payments are processed by our third-party payment gateway. We do not store your card or banking details.",
          "Your enrolment is confirmed once payment is received and we have sent you a confirmation email.",
          "We reserve the right to decline or cancel an enrolment where the programme is not clinically suitable for you, in which case any amount paid is refunded in full.",
        ]}
      />
    </PolicySection>

    <PolicySection heading="5. Cancellations and refunds">
      <p>
        Cancellations and refunds are governed by our{" "}
        <Link href="/refund-policy" className="underline">
          Refund &amp; Cancellation Policy
        </Link>
        , which forms part of these Terms.
      </p>
    </PolicySection>

    <PolicySection heading="6. Delivery of services and meals">
      <p>
        How consultations, programme access and any physical meal deliveries are provided is set out
        in our{" "}
        <Link href="/shipping-policy" className="underline">
          Shipping &amp; Delivery Policy
        </Link>
        .
      </p>
    </PolicySection>

    <PolicySection heading="7. Your responsibilities">
      <PolicyList
        items={[
          "Provide accurate health information and tell us promptly of any change, including new diagnoses or medication.",
          "Follow the guidance given as part of your programme, and raise any concern with us or your doctor.",
          "Use the Website lawfully, and not attempt to disrupt it or gain unauthorised access to it.",
          "Keep any account credentials or programme materials provided to you confidential.",
        ]}
      />
    </PolicySection>

    <PolicySection heading="8. Intellectual property">
      <p>
        All content on the Website and within our programmes — including meal plans, text, graphics,
        logos and the {COMPANY.brandName} name — belongs to {COMPANY.legalName} or its licensors.
        You may use it for your own personal, non-commercial purposes as part of your programme. You
        may not copy, redistribute, resell or publish it without our written permission.
      </p>
    </PolicySection>

    <PolicySection heading="9. Limitation of liability">
      <p>
        To the fullest extent permitted by law, {COMPANY.legalName} is not liable for any indirect,
        incidental or consequential loss arising from your use of the Website or participation in a
        programme. Our total liability in connection with a programme will not exceed the amount you
        paid for that programme.
      </p>
      <p>Nothing in these Terms excludes liability that cannot be excluded under Indian law.</p>
    </PolicySection>

    <PolicySection heading="10. Privacy">
      <p>
        We handle your personal and health information as described in our{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </PolicySection>

    <PolicySection heading="11. Governing law and disputes">
      <p>
        These Terms are governed by the laws of India. Any dispute arising from them is subject to
        the exclusive jurisdiction of the courts at the location of our registered office. We ask
        that you contact us first at {COMPANY.supportEmail} so we can try to resolve the matter
        directly.
      </p>
    </PolicySection>

    <PolicySection heading="12. Changes to these Terms">
      <p>
        We may update these Terms from time to time. Changes take effect when posted on this page.
        Continuing to use the Website after a change means you accept the revised Terms.
      </p>
    </PolicySection>

    <PolicySection heading="13. Contact us">
      <p>
        {COMPANY.legalName}
        <br />
        {orPlaceholder(COMPANY.registeredAddress, "Registered address")}
        {COMPANY.gstin ? (
          <>
            <br />
            GSTIN: {COMPANY.gstin}
          </>
        ) : null}
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

export default Terms;
