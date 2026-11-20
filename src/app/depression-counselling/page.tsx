import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import CounsellingDetail from "@/components/editorial/CounsellingDetail";
import {
  counsellingDetails,
  getCounsellingByRoute,
} from "@/content/counselling-details";
import { routes } from "@/config/routes";
import depressionDetailImg from "@/assets/services/wellness-and-mental-health/depression-counselling-detail.jpeg";

const route = "depression-counselling";
const baseDetail = getCounsellingByRoute(route);
const detail = {
  ...baseDetail,
  image: depressionDetailImg,
  imageAlt:
    "Client wearing headphones speaking openly and gesturing to her therapist during a depression counselling session",
};

export const metadata: Metadata = pageMetadata({
  title: detail.title,
  description: detail.metaDescription,
  alternates: { canonical: routes[route].path },
});

export default function Page() {
  const related = counsellingDetails.filter((item) => item.route !== route);
  return <CounsellingDetail detail={detail} related={related} />;
}
