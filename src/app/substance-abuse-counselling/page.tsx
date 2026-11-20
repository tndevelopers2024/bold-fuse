import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import CounsellingDetail from "@/components/editorial/CounsellingDetail";
import {
  counsellingDetails,
  getCounsellingByRoute,
} from "@/content/counselling-details";
import { routes } from "@/config/routes";
import substanceDetailImg from "@/assets/services/wellness-and-mental-health/substance-abuse-counselling-detail.jpeg";

const route = "substance-abuse-counselling";
const baseDetail = getCounsellingByRoute(route);
const detail = {
  ...baseDetail,
  image: substanceDetailImg,
  imageAlt:
    "Doctor with stethoscope compassionately consulting with a young man during a substance abuse recovery session",
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
