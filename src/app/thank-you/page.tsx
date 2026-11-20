import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import UtilityPage from "@/components/booking/UtilityPage";
import { routes } from "@/config/routes";

export const metadata: Metadata = pageMetadata({
  title: "Thank you",
  description: "Contact our team to confirm your Boldfuse appointment request.",
  alternates: { canonical: routes["thank-you"].path },
});

export default function Page() {
  return (
    <UtilityPage
      eyebrow="Appointments"
      title="Thank you"
      heading="Thank you"
      icon={CircleCheck}
      message={[
        "Please confirm your appointment with our team.",
        "Sending a WhatsApp message or email starts an appointment enquiry. Your date and time are confirmed only when our team replies.",
      ]}
      actions={[
        {
          label: "Book another appointment",
          href: "/book-appointment/",
        },
        {
          label: "Back to home",
          href: "/",
          variant: "outline",
        },
      ]}
    />
  );
}
