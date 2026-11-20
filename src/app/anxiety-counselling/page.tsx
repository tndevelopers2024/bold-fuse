import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import CounsellingDetail from "@/components/editorial/CounsellingDetail";
import {
  counsellingDetails,
  getCounsellingByRoute,
} from "@/content/counselling-details";
import { routes } from "@/config/routes";
import anxietyDetailImg from "@/assets/services/wellness-and-mental-health/anxiety-counselling-detail.jpeg";

const route = "anxiety-counselling";
const baseDetail = getCounsellingByRoute(route);
const detail = {
  ...baseDetail,
  image: anxietyDetailImg,
  imageAlt:
    "Therapist speaking with compassionate understanding to a client seeking relief from anxiety",
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
