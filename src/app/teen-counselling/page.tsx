import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import CounsellingDetail from "@/components/editorial/CounsellingDetail";
import {
  counsellingDetails,
  getCounsellingByRoute,
} from "@/content/counselling-details";
import { routes } from "@/config/routes";
import teenDetailImg from "@/assets/services/wellness-and-mental-health/teen-counselling-detail.jpeg";

const route = "teen-counselling";
const baseDetail = getCounsellingByRoute(route);
const detail = {
  ...baseDetail,
  image: teenDetailImg,
  imageAlt:
    "Male counsellor attentively listening to a teenage boy expressing himself during a teen counselling session",
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
