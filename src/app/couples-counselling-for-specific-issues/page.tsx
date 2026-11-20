import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import CounsellingDetail from "@/components/editorial/CounsellingDetail";
import {
  counsellingDetails,
  getCounsellingByRoute,
} from "@/content/counselling-details";
import { routes } from "@/config/routes";
import couplesDetailImg from "@/assets/services/wellness-and-mental-health/couples-counselling-detail.jpeg";

const route = "couples-counselling-for-specific-issues";
const baseDetail = getCounsellingByRoute(route);
const detail = {
  ...baseDetail,
  image: couplesDetailImg,
  imageAlt:
    "Group of young adults sitting around a round table engaged in an open counselling and relationship discussion with a heart and mind diagram",
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
