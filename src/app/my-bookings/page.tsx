import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { CalendarClock } from "lucide-react";
import UtilityPage from "@/components/booking/UtilityPage";
import { site } from "@/content/site";
import { routes } from "@/config/routes";

export const metadata: Metadata = pageMetadata({
  title: "My Bookings",
  description:
    "View or manage your Boldfuse appointments via WhatsApp, email or phone.",
  alternates: { canonical: routes["my-bookings"].path },
});

export default function Page() {
  return (
    <UtilityPage
      eyebrow="Appointments"
      title="My Bookings"
      heading="My Bookings"
      icon={CalendarClock}
      message={[
        "Your appointments are managed directly with our team — no app or account needed.",
        "Message us on WhatsApp with your name and we will share your upcoming appointment details, reschedule it or answer any question.",
      ]}
      actions={[
        {
          label: "Chat on WhatsApp",
          href: `https://wa.me/${site.telephone.replace("+", "")}`,
          external: true,
        },
        {
          label: "Call us",
          href: `tel:${site.telephone}`,
          external: true,
          variant: "outline",
        },
        {
          label: "Book a new appointment",
          href: "/book-appointment/",
        },
      ]}
    />
  );
}
