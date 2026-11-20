import { pageMetadata } from "@/lib/metadata";
import InformationPage from "@/components/InformationPage";
export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Information about using the Boldfuse website and arranging services with our team.",
  alternates: { canonical: "/terms-and-conditions/" },
});
export default function Page() {
  return (
    <InformationPage
      title="Terms & Conditions"
      sections={[
        {
          heading: "Using this website",
          text: "This website introduces Boldfuse and provides information about our business and counselling services. Contact our team to discuss the service appropriate to your needs.",
        },
        {
          heading: "Appointment enquiries",
          text: "Preparing or sending a WhatsApp message or email is an enquiry. It does not reserve an appointment. Dates, availability and any service arrangements must be confirmed directly with our team.",
        },
        {
          heading: "Payments, changes and cancellations",
          text: "This website does not collect online payments or automatically manage bookings. Ask our team about fees, payment arrangements, rescheduling and cancellation terms before confirming a service. Visiting a status or cancellation page does not change an appointment or establish a payment status.",
        },
        {
          heading: "Information and articles",
          text: "Website content is general information and does not establish a professional relationship or provide an individual assessment. Discuss your circumstances directly with a qualified professional before relying on general content for a personal decision.",
        },
        {
          heading: "Third-party services",
          text: "Email, WhatsApp and social media links open external services. Their own terms apply when you use them.",
        },
      ]}
    />
  );
}
