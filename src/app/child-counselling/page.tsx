import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import CounsellingDetail from "@/components/editorial/CounsellingDetail";
import {
  counsellingDetails,
  getCounsellingByRoute,
} from "@/content/counselling-details";
import { routes } from "@/config/routes";
import childDetailImg from "@/assets/services/wellness-and-mental-health/child-and-adolescent-counselling-detail.jpeg";

const route = "child-counselling";
const baseDetail = getCounsellingByRoute(route);
const detail = {
  ...baseDetail,
  image: childDetailImg,
  imageAlt:
    "Therapist engaging a young boy with an interactive puzzle activity on a tablet during a child counselling session",
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
