export type Route = {
  label: string;
  path: string;
  status: "built" | "planned";
};
export const routes = {
  about: {
    label: "About",
    path: "/about/",
    status: "built",
  },
  home: {
    label: "Home",
    path: "/",
    status: "built",
  },
  blogs: {
    label: "Blogs",
    path: "/blogs/",
    status: "built",
  },
  services: {
    label: "Services",
    path: "/services/",
    status: "built",
  },
  workplace: {
    label:
      "Why do performing and outstanding employees leave the system sooner than the others?",
    path: "/why-do-performing-and-outstanding-employees-leave-the-system-sooner-than-the-others/",
    status: "built",
  },
  contact: {
    label: "Contact",
    path: "/contact/",
    status: "built",
  },
  mentalHealth: {
    label: "Mental health of Entrepreneurs: Tips to hold on",
    path: "/mental-health-of-entrepreneurs/",
    status: "built",
  },
  "counselling-services": {
    label: "Counselling Services",
    path: "/counselling-services/",
    status: "built",
  },
  "anxiety-counselling": {
    label: "Anxiety Counselling",
    path: "/anxiety-counselling/",
    status: "built",
  },
  home1: {
    label: "Home1",
    path: "/home1/",
    status: "planned",
  },
  home2: {
    label: "Home2",
    path: "/home2/",
    status: "planned",
  },
  "house-of-bold": {
    label: "House of Bold",
    path: "/house-of-bold/",
    status: "built",
  },
  "depression-counselling": {
    label: "Depression Counselling",
    path: "/depression-counselling/",
    status: "built",
  },
  "child-counselling": {
    label: "Child Counselling",
    path: "/child-counselling/",
    status: "built",
  },
  "teen-counselling": {
    label: "Teen Counselling",
    path: "/teen-counselling/",
    status: "built",
  },
  "parenting-support": {
    label: "Parenting Support",
    path: "/parenting-support/",
    status: "built",
  },
  "trauma-counselling": {
    label: "Trauma Counselling",
    path: "/trauma-counselling/",
    status: "built",
  },
  "grief-and-loss-counselling": {
    label: "Grief and Loss Counselling",
    path: "/grief-and-loss-counselling/",
    status: "built",
  },
  "eating-disorder-counselling": {
    label: "Eating Disorder Counselling",
    path: "/eating-disorder-counselling/",
    status: "built",
  },
  "substance-abuse-counselling": {
    label: "Substance Abuse Counselling",
    path: "/substance-abuse-counselling/",
    status: "built",
  },
  "self-esteem-counselling": {
    label: "Self-Esteem Counselling",
    path: "/self-esteem-counselling/",
    status: "built",
  },
  "stress-management-counselling": {
    label: "Stress Management Counselling",
    path: "/stress-management-counselling/",
    status: "built",
  },
  "psychological-testing": {
    label: "Psychological Testing",
    path: "/psychological-testing/",
    status: "built",
  },
  "couples-counselling-for-specific-issues": {
    label: "Couples counselling (for specific issues)",
    path: "/couples-counselling-for-specific-issues/",
    status: "built",
  },
  "book-appointment": {
    label: "Book an Appointment",
    path: "/book-appointment/",
    status: "built",
  },
  "my-bookings": {
    label: "My Bookings",
    path: "/my-bookings/",
    status: "built",
  },
  "cancel-appointment": {
    label: "Cancel an Appointment",
    path: "/cancel-appointment/",
    status: "built",
  },
  "thank-you": {
    label: "Thank you",
    path: "/thank-you/",
    status: "built",
  },
  "appointment-cancellation-confirmation": {
    label: "Appointment cancellation confirmation",
    path: "/appointment-cancellation-confirmation/",
    status: "built",
  },
  "cancel-payment": {
    label: "Cancel Payment",
    path: "/cancel-payment/",
    status: "built",
  },
  "hello-marshmellowww": {
    label: "Hello @ Marshmellowww",
    path: "/hello-marshmellowww/",
    status: "built",
  },
  therapy: {
    label: "Therapy",
    path: "/therapy/",
    status: "built",
  },
  parenting: {
    label: "Parenting",
    path: "/parenting/",
    status: "built",
  },
  "de-addiction-services": {
    label: "De-addiction Services",
    path: "/de-addiction-services/",
    status: "built",
  },
  "psychosis-treatment": {
    label: "Psychosis Treatment",
    path: "/psychosis-treatment/",
    status: "built",
  },
  "elementor-hf_header": {
    label: "Boldfuse",
    path: "/elementor-hf/header/",
    status: "planned",
  },
  "category_mental-health": {
    label: "Mental Health",
    path: "/category/mental-health/",
    status: "planned",
  },
  "elementor-hf_footer": {
    label: "Boldfuse",
    path: "/elementor-hf/footer/",
    status: "planned",
  },
  "category_workplace-culture": {
    label: "Workplace culture",
    path: "/category/workplace-culture/",
    status: "planned",
  },
  author_admin: {
    label: "admin",
    path: "/author/admin/",
    status: "planned",
  },
  "category_exam-strees": {
    label: "Exam Strees",
    path: "/category/exam-strees/",
    status: "planned",
  },
  "category_language-science": {
    label: "Language Science",
    path: "/category/language-science/",
    status: "planned",
  },
  "category_student-guidance": {
    label: "Student Guidance",
    path: "/category/student-guidance/",
    status: "planned",
  },
  "category_school-psychology": {
    label: "School Psychology",
    path: "/category/school-psychology/",
    status: "planned",
  },
  "category_vocational-counseling": {
    label: "Vocational counseling",
    path: "/category/vocational-counseling/",
    status: "planned",
  },
  category_uncategorized: {
    label: "Uncategorized",
    path: "/category/uncategorized/",
    status: "planned",
  },
  "category_youth-science": {
    label: "Youth Science",
    path: "/category/youth-science/",
    status: "planned",
  },
  service0: {
    label: "Business Automation",
    path: "/services/#businessautomation",
    status: "built",
  },
  service1: {
    label: "Wellness and Mental Health",
    path: "/services/#healthwellness",
    status: "built",
  },
  service2: {
    label: "Finance and Advisory Services",
    path: "/services/#financialmanagement",
    status: "built",
  },
  service3: {
    label: "Digital Marketing / Creative Branding and PR",
    path: "/services/#branddigitalmanagement",
    status: "built",
  },
  service4: {
    label: "Business Process Excellence",
    path: "/services/#operationalexcellence",
    status: "built",
  },
  service5: {
    label: "Legal and Advisory Services",
    path: "/services/#legalservices",
    status: "built",
  },
  service6: {
    label: "People Management / HR",
    path: "/services/#peoplelearningmanagement",
    status: "built",
  },
  privacy: {
    label: "Privacy Policy",
    path: "/privacy-policy/",
    status: "built",
  },
  terms: {
    label: "Terms & Conditions",
    path: "/terms-and-conditions/",
    status: "built",
  },
} as const satisfies Record<string, Route>;
export type RouteKey = keyof typeof routes;
export const navigation: RouteKey[] = [
  "home",
  "about",
  "services",
  "blogs",
  "contact",
];
export const serviceNavigation: RouteKey[] = [
  "service6",
  "service1",
  "service3",
  "service0",
  "service2",
  "service4",
  "service5",
];

// Utility pages describe a handoff to the team, not an indexed service offering.
export const noIndexPaths: readonly string[] = [
  routes["my-bookings"].path,
  routes["thank-you"].path,
  routes["cancel-appointment"].path,
  routes["appointment-cancellation-confirmation"].path,
  routes["cancel-payment"].path,
];
export const indexablePaths = [
  ...new Set(
    Object.values(routes)
      .filter(
        (route) =>
          route.status === "built" && !noIndexPaths.includes(route.path),
      )
      .map((route) => route.path.split("#")[0]),
  ),
];
