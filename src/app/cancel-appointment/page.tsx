import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { CalendarX } from "lucide-react";
import UtilityPage from "@/components/booking/UtilityPage";
import { site } from "@/content/site";
import { routes } from "@/config/routes";

export const metadata: Metadata = pageMetadata({
  title: "Cancel an Appointment",
  description: "Cancel an existing Boldfuse appointment via WhatsApp or phone.",
  alternates: { canonical: routes["cancel-appointment"].path },
});

export default function Page() {
  return (
    <UtilityPage
      eyebrow="Appointments"
      title="Cancel an Appointment"
      heading="Cancel an appointment"
      icon={CalendarX}
      message={[
        "To cancel an existing appointment, contact our team with your booking details.",
        "Use WhatsApp or call us to request a cancellation. Visiting this page does not cancel an appointment.",
      ]}
      actions={[
        {
          label: "Confirm on WhatsApp",
          href: `https://wa.me/${site.telephone.replace("+", "")}?text=${encodeURIComponent(
            "Hello Boldfuse, I would like to confirm my appointment cancellation.",
          )}`,
          external: true,
        },
        {
          label: "Call us",
          href: `tel:${site.telephone}`,
          external: true,
          variant: "outline",
        },
      ]}
    />
  );
}
