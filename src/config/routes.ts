export type Route = {
  label: string;
  path: string;
  status: "built" | "planned";
};
export const routes = {
  about: {
    label: "About",
    path: "/about/",
    status: "planned",
  },
  home: {
    label: "Home",
    path: "/",
    status: "built",
  },
  blogs: {
    label: "Blogs",
    path: "/blogs/",
    status: "planned",
  },
  services: {
    label: "Services",
    path: "/services/",
    status: "planned",
  },
  workplace: {
    label:
      "Why do performing and outstanding employees leave the system sooner than the others?",
    path: "/why-do-performing-and-outstanding-employees-leave-the-system-sooner-than-the-others/",
    status: "planned",
  },
  contact: {
    label: "Contact",
    path: "/contact/",
    status: "planned",
  },
  mentalHealth: {
    label: "Mental health of Entrepreneurs: Tips to hold on",
    path: "/mental-health-of-entrepreneurs/",
    status: "planned",
  },
  "counselling-services": {
    label: "Counselling Services",
    path: "/counselling-services/",
    status: "planned",
  },
  "anxiety-counselling": {
    label: "Anxiety Counselling",
    path: "/anxiety-counselling/",
    status: "planned",
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
    status: "planned",
  },
  "depression-counselling": {
    label: "Depression Counselling",
    path: "/depression-counselling/",
    status: "planned",
  },
  "child-counselling": {
    label: "Child Counselling",
    path: "/child-counselling/",
    status: "planned",
  },
  "teen-counselling": {
    label: "Teen Counselling",
    path: "/teen-counselling/",
    status: "planned",
  },
  "parenting-support": {
    label: "Parenting Support",
    path: "/parenting-support/",
    status: "planned",
  },
  "trauma-counselling": {
    label: "Trauma Counselling",
    path: "/trauma-counselling/",
    status: "planned",
  },
  "grief-and-loss-counselling": {
    label: "Grief and Loss Counselling",
    path: "/grief-and-loss-counselling/",
    status: "planned",
  },
  "eating-disorder-counselling": {
    label: "Eating Disorder Counselling",
    path: "/eating-disorder-counselling/",
    status: "planned",
  },
  "substance-abuse-counselling": {
    label: "Substance Abuse Counselling",
    path: "/substance-abuse-counselling/",
    status: "planned",
  },
  "self-esteem-counselling": {
    label: "Self-Esteem Counselling",
    path: "/self-esteem-counselling/",
    status: "planned",
  },
  "stress-management-counselling": {
    label: "Stress Management Counselling",
    path: "/stress-management-counselling/",
    status: "planned",
  },
  "psychological-testing": {
    label: "Psychological Testing",
    path: "/psychological-testing/",
    status: "planned",
  },
  "couples-counselling-for-specific-issues": {
    label: "Couples counselling (for specific issues)",
    path: "/couples-counselling-for-specific-issues/",
    status: "planned",
  },
  "book-appointment": {
    label: "Book an Appointment",
    path: "/book-appointment/",
    status: "planned",
  },
  "my-bookings": {
    label: "My Bookings",
    path: "/my-bookings/",
    status: "planned",
  },
  "cancel-appointment": {
    label: "Appointment canceled",
    path: "/cancel-appointment/",
    status: "planned",
  },
  "thank-you": {
    label: "Thank you",
    path: "/thank-you/",
    status: "planned",
  },
  "appointment-cancellation-confirmation": {
    label: "Appointment cancellation confirmation",
    path: "/appointment-cancellation-confirmation/",
    status: "planned",
  },
  "cancel-payment": {
    label: "Cancel Payment",
    path: "/cancel-payment/",
    status: "planned",
  },
  "hello-marshmellowww": {
    label: "Hello @ Marshmellowww",
    path: "/hello-marshmellowww/",
    status: "planned",
  },
  therapy: {
    label: "Therapy",
    path: "/therapy/",
    status: "planned",
  },
  parenting: {
    label: "Parenting",
    path: "/parenting/",
    status: "planned",
  },
  "de-addiction-services": {
    label: "De-addiction Services",
    path: "/de-addiction-services/",
    status: "planned",
  },
  "psychosis-treatment": {
    label: "Psychosis Treatment",
    path: "/psychosis-treatment/",
    status: "planned",
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
    status: "planned",
  },
  service1: {
    label: "Wellness and Mental Health",
    path: "/services/#healthwellness",
    status: "planned",
  },
  service2: {
    label: "Finance and Advisory Services",
    path: "/services/#financialmanagement",
    status: "planned",
  },
  service3: {
    label: "Brand/Digital Management",
    path: "/services/#branddigitalmanagement",
    status: "planned",
  },
  service4: {
    label: "Operational Excellence",
    path: "/services/#operationalexcellence",
    status: "planned",
  },
  service5: {
    label: "Legal and Advisory Services",
    path: "/services/#legalservices",
    status: "planned",
  },
  service6: {
    label: "People/Learning Management",
    path: "/services/#peoplelearningmanagement",
    status: "planned",
  },
  privacy: {
    label: "Privacy Policy",
    path: "/privacy-policy/",
    status: "planned",
  },
  terms: {
    label: "Terms & Conditions",
    path: "/terms-and-conditions/",
    status: "planned",
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
  "service0",
  "service1",
  "service2",
  "service3",
  "service4",
  "service5",
  "service6",
];
