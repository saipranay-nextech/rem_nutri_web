import React from "react";
import type { Metadata } from "next";
import PolicyPage, { PolicySection, PolicyList } from "../components/PolicyPage";
import { COMPANY, orPlaceholder } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy | RemDi",
  description: `How ${COMPANY.legalName} collects, uses and protects your personal information.`,
};

const PrivacyPolicy = () => (
  <PolicyPage title="Privacy Policy" lastUpdated="28 September 2026">
    <p>
      This Privacy Policy explains how {COMPANY.legalName} (&quot;we&quot;, &quot;our&quot; or
      &quot;us&quot;), which operates the {COMPANY.brandName} programmes, collects, uses, protects
      and discloses the personal information of visitors (&quot;you&quot; or &quot;your&quot;) to{" "}
      {COMPANY.domain} (the &quot;Website&quot;). By accessing or using the Website you agree to
      this Policy.
    </p>

    <PolicySection heading="1. Information we collect">
      <p>
        We collect both personally identifiable information and non-personal information through
        your interactions with the Website.
      </p>
      <p className="font-semibold">a. Personal information</p>
      <PolicyList
        items={[
          "Name, email address and phone number",
          "Health information you choose to share through the Health Assessment — including age, gender, height, weight, health conditions, dietary habits, lifestyle factors, allergies and medications",
          "Billing details required to process a payment (payments are handled by our payment gateway; we do not store card details)",
          "Any other information you voluntarily provide, such as messages sent through our contact form or job applications",
        ]}
      />
      <p className="font-semibold">b. Non-personal information</p>
      <PolicyList
        items={["Browser type", "Operating system", "IP address", "Usage data such as pages visited and actions taken on the Website"]}
      />
    </PolicySection>

    <PolicySection heading="2. How we use your information">
      <PolicyList
        items={[
          "To assess your health inputs and recommend a suitable programme",
          "To deliver the programme you have enrolled in, including consultations and meal guidance",
          "To contact you about your enquiry, assessment or enrolment",
          "To process payments, issue invoices and handle refunds",
          "To send you newsletters and updates where you have opted in (you can unsubscribe at any time)",
          "To improve the Website and our services",
          "To meet our legal and regulatory obligations",
        ]}
      />
    </PolicySection>

    <PolicySection heading="3. Health information">
      <p>
        Health information you submit through the Health Assessment is used solely to recommend and
        deliver a suitable programme. It is shared only with the qualified members of our team
        involved in your care, and is never sold or rented to third parties. You may ask us to
        delete it at any time by writing to {COMPANY.supportEmail}.
      </p>
    </PolicySection>

    <PolicySection heading="4. Cookies and tracking technologies">
      <p>
        We may use cookies and similar technologies to improve your experience and understand how
        the Website is used. Cookies are small files stored on your device that allow the Website to
        recognise your browser. You can disable cookies in your browser settings, though parts of
        the Website may then not function as intended.
      </p>
    </PolicySection>

    <PolicySection heading="5. Sharing your information">
      <p>We do not sell your personal information. We share it only with:</p>
      <PolicyList
        items={[
          "Service providers who help us operate the Website and deliver our programmes, such as our payment gateway, email provider and cloud hosting, each bound to handle your data confidentially",
          "Authorities, where we are required to do so by law",
        ]}
      />
    </PolicySection>

    <PolicySection heading="6. Data security">
      <p>
        We apply industry-standard measures to protect your personal information against
        unauthorised access, alteration, disclosure or destruction. No transmission over the
        internet or method of electronic storage is entirely secure, however, and we cannot
        guarantee absolute security.
      </p>
    </PolicySection>

    <PolicySection heading="7. Data retention">
      <p>
        We keep your personal information only for as long as needed to provide our services and to
        meet our legal, accounting and reporting obligations. When it is no longer required we
        delete it or anonymise it.
      </p>
    </PolicySection>

    <PolicySection heading="8. Third-party links">
      <p>
        The Website may link to third-party websites, products or services. Those sites have their
        own privacy policies, which we do not control, and we are not responsible for their content
        or practices.
      </p>
    </PolicySection>

    <PolicySection heading="9. Children's privacy">
      <p>
        The Website is not intended for individuals under the age of 18, and we do not knowingly
        collect their personal information. If you believe we have collected information from a
        minor, please contact us and we will delete it.
      </p>
    </PolicySection>

    <PolicySection heading="10. Your rights">
      <p>
        You may access, correct or delete the personal information we hold about you, withdraw
        consent, or unsubscribe from our emails using the link in any message. To exercise any of
        these rights, write to us at{" "}
        <a href={`mailto:${COMPANY.supportEmail}`} className="underline">
          {COMPANY.supportEmail}
        </a>
        .
      </p>
    </PolicySection>

    <PolicySection heading="11. Changes to this Policy">
      <p>
        We may update this Policy from time to time. Changes take effect when posted on this page,
        and the &quot;last updated&quot; date above will reflect the revision.
      </p>
    </PolicySection>

    <PolicySection heading="12. Contact us">
      <p>
        For any question about this Policy or your personal information, contact us at:
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

export default PrivacyPolicy;
