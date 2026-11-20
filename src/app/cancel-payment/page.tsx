import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { CircleX } from "lucide-react";
import UtilityPage from "@/components/booking/UtilityPage";
import { site } from "@/content/site";
import { routes } from "@/config/routes";

export const metadata: Metadata = pageMetadata({
  title: "Cancel Payment",
  description: "Contact Boldfuse for help with appointment payment questions.",
  alternates: { canonical: routes["cancel-payment"].path },
});

export default function Page() {
  return (
    <UtilityPage
      eyebrow="Appointments"
      title="Cancel Payment"
      heading="Payment support"
      icon={CircleX}
      message={[
        "This website does not process online payments.",
        "If you have a payment question about an appointment arranged with our team, contact us to check its status.",
      ]}
      actions={[
        {
          label: "Try booking again",
          href: "/book-appointment/",
        },
        {
          label: "WhatsApp us",
          href: `https://wa.me/${site.telephone.replace("+", "")}`,
          external: true,
          variant: "outline",
        },
      ]}
    />
  );
}
