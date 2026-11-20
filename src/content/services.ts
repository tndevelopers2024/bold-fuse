import type { StaticImageData } from "next/image";
import heroImage from "@/assets/services/hero-2.jpg";
import serviceImg0 from "@/assets/services/business-automation-1.jpg";
import serviceImg1 from "@/assets/services/wellness-mental-health.jpg";
import serviceImg2 from "@/assets/services/finance-advisory.jpg";
import serviceImg3 from "@/assets/services/creative-branding.jpg";
import serviceImg4 from "@/assets/services/business-transformation.jpg";
import serviceImg5 from "@/assets/services/legal-advisory.jpg";
import serviceImg6 from "@/assets/services/people-mgmt-hr.jpg";

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  previewDescription?: string;
  previewParagraphs?: string[];
  modalParagraphs?: string[];
  image: StaticImageData;
  imageAlt: string;
  offerings?: string[];
  pillars?: { title: string; text: string }[];
  subBrand?: string;
}

export const servicesContent = {
  hero: {
    eyebrow: "What we do",
    title: "Our Services",
    tagline: "Making businesses immune to the economic effects of the crisis.",
    image: heroImage,
    imageAlt: "Chess piece and strategic roadmap representing business strategy and long-term vision",
    stats: [
      {
        value: "5+",
        label: "Years of experience",
      },
      {
        value: "50+",
        label: "Top Brand Clients",
      },
    ],
  },

  services: [
    {
      id: "peoplelearningmanagement",
      number: "01",
      title: "People Management / HR",
      tagline: "Let us shape the employee's experience from recruitment to reskilling to retirement and make them your most valuable asset.",
      description:
        "When people behind your business climb the ladder of growth and success, they carry your business with them to those heights. Accelerating the potential of your employees makes your company strong and prepared for anything that comes next. We help to make your employees as invested in your company as you are. Sitting at the core of every business, the people need to feel valued in their organizations now more than ever to support a healthy remote work culture. We drive people-centric programs to understand your employees better and identify their trigger points. We help you to create a workforce that is self-inspired and purpose-driven. We work alongside you to continuously develop learning programs to address skill gaps. We empower your HR team with the latest analytic tools and cloud technology to monitor the employee journey & take effective decisions for your organization.",
      offerings: [
        "Recruitment and Staffing",
        "Learning Programs",
        "Payroll and Statutory",
        "HR Audit and Compliance",
        "HR Due Deligence",
        "HR Technology Implementation",
        "Employee Engagement Surveys",
        "HR Outsourcing",
        "Remote Work Optimisation",
        "DEI Consulting",
        "Mental Health & Wellbeing Programs",
        "Employer Branding & Employee Experience",
        "Change Management",
        "Leadership Development",
        "Gig Workforce Management",
        "HR Analytics & Data Driven Insights",
      ],
      image: serviceImg6,
      imageAlt: "Human resources team welcoming, onboarding, and collaborating with employees in an open office",
    },
    {
      id: "healthwellness",
      number: "02",
      title: "Wellness and Mental Health",
      tagline: "From stress to smile, there is just one station and it's boldfuse.",
      previewDescription:
        "We believe that mental well-being is the cornerstone of a fulfilling life, impacting both individuals and organizations alike. Our experienced team of therapists provides individualized counselling services tailored to your unique needs. Whether you're dealing with anxiety, depression, relationship issues, or other mental health concerns, we're here to support you on your journey to healing and self- discovery. Our therapists are licensed professionals with extensive training in evidence-based therapeutic modalities, including cognitive-behavioural therapy (CBT), mindfulness-based approaches, and more. We understand the importance of confidentiality and create a safe, non-judgmental space where you can freely express yourself and work towards positive change.",
      previewParagraphs: [
        "We believe that mental well-being is the cornerstone of a fulfilling life, impacting both individuals and organizations alike.",
        "Our experienced team of therapists provides individualized counselling services tailored to your unique needs. Whether you're dealing with anxiety, depression, relationship issues, or other mental health concerns, we're here to support you on your journey to healing and self- discovery.",
        "Our therapists are licensed professionals with extensive training in evidence-based therapeutic modalities, including cognitive-behavioural therapy (CBT), mindfulness-based approaches, and more. We understand the importance of confidentiality and create a safe, non-judgmental space where you can freely express yourself and work towards positive change.",
      ],
      modalParagraphs: [
        "We believe that mental well-being is the cornerstone of a fulfilling life, impacting both individuals and organizations alike.",
        "Our experienced team of therapists provides individualized counselling services tailored to your unique needs. Whether you're dealing with anxiety, depression, relationship issues, or other mental health concerns, we're here to support you on your journey to healing and self- discovery.",
        "Our therapists are licensed professionals with extensive training in evidence-based therapeutic modalities, including cognitive-behavioural therapy (CBT), mindfulness-based approaches, and more. We understand the importance of confidentiality and create a safe, non-judgmental space where you can freely express yourself and work towards positive change.",
        "In addition to individual therapy, we offer consulting services to promote organizational health and psychology within companies. By addressing workplace dynamics, improving communication, and fostering a culture of mental wellness, we help organizations thrive. Investing in the mental health of your employees not only enhances their well-being but also boosts productivity, reduces absenteeism, and creates a more positive work environment.",
        "Led by our experienced facilitators, our workshops combine engaging activities, discussions, and exercises to help participants apply new skills in their personal and professional lives. Elevate your company's performance and culture with our organizational health and psychology services. From executive coaching to team-building workshops, we work closely with organizations to foster resilience, improve communication, and enhance employee well- being. Invest in your team's mental health, and watch your organization thrive.",
        "Ready to prioritize your mental health? Take the first step towards a happier, healthier you by scheduling a consultation with one of our experienced therapists today. Your journey to wellness starts here.",
      ],
      description:
        "We believe that mental well-being is the cornerstone of a fulfilling life, impacting both individuals and organizations alike. Our experienced team of therapists provides individualized counselling services tailored to your unique needs. Whether you're dealing with anxiety, depression, relationship issues, or other mental health concerns, we're here to support you on your journey to healing and self- discovery. Our therapists are licensed professionals with extensive training in evidence-based therapeutic modalities, including cognitive-behavioural therapy (CBT), mindfulness-based approaches, and more. We understand the importance of confidentiality and create a safe, non-judgmental space where you can freely express yourself and work towards positive change. In addition to individual therapy, we offer consulting services to promote organizational health and psychology within companies. By addressing workplace dynamics, improving communication, and fostering a culture of mental wellness, we help organizations thrive. Investing in the mental health of your employees not only enhances their well-being but also boosts productivity, reduces absenteeism, and creates a more positive work environment. Led by our experienced facilitators, our workshops combine engaging activities, discussions, and exercises to help participants apply new skills in their personal and professional lives. Elevate your company's performance and culture with our organizational health and psychology services. From executive coaching to team-building workshops, we work closely with organizations to foster resilience, improve communication, and enhance employee well- being. Invest in your team's mental health, and watch your organization thrive. Ready to prioritize your mental health? Take the first step towards a happier, healthier you by scheduling a consultation with one of our experienced therapists today. Your journey to wellness starts here.",
      offerings: [
        "Counselling Services",
        "Therapy",
        "Parenting",
        "De-addiction services",
        "Psychosis Treatment",
        "Psychological Testing",
      ],
      image: serviceImg1,
      imageAlt: "Therapist conducting an empathetic, supportive mental health consultation in a sunlit room",
    },
    {
      id: "branddigitalmanagement",
      number: "03",
      title: "Digital Marketing / Creative Branding and PR",
      tagline: "The growth game is all about fame. Let's spread the word about you to the entire world",
      description:
        "Change in lifestyle of your customers needs to be balanced with change in your selling experience too. Take a step forward towards your customers who are not roaming through the market but sitting in their homes and scrolling over their digital devices. Amp up your marketing and sales technique by reaching your customers in the digital world. We create an intelligent marketing strategy that builds personalized experiences for your customers. We focus on not just selling your product but also making you a brand of trust. Whether it's social media or print media, we help you to reach all those places where you can win the hearts of your customers.",
      subBrand: "Hello @ Marshmellowww",
      image: serviceImg3,
      imageAlt: "Professional studio microphone and audio monitor representing creative podcast branding and digital PR",
    },
    {
      id: "businessautomation",
      number: "04",
      title: "Business Automation",
      tagline: "Rewire your organization with a new way to operate. Embrace automation.",
      description:
        "Anticipate and resolve the biggest challenges of your business with automation and AI. Let your business self-evolve and adapt via technology that not only empowers your employees to focus on creative tasks but also helps you to innovate and create a business model that completely suits your organization. But just introducing these technologies to your business won't pay off until you do it the smart way. We can help you decide which technology would work best with your business priorities, how to incorporate it into your operations, and the trick to quickly make it adaptable across your business.",
      image: serviceImg0,
      imageAlt: "Software and automation engineers collaborating on code across monitors in a modern office",
    },
    {
      id: "financialmanagement",
      number: "05",
      title: "Finance and Advisory Services",
      tagline: "Let's call your future finance team in today's world and rock your profit margins.",
      description:
        "A trembling economy doesn't mean that your business has to go down with it. It just highlights the importance of financial management. Monotony often directs you towards negligence and leaves no room for a new perspective. That's when you get stuck in a poor financial plan which slowly deteriorates the foundation of your business; hence pushing you towards the sea of losses. We help your financial team to gain a new perspective & re-evaluate the value of your business in order to identify the target areas of potential growth. We let you dive deep into your business model by providing you meaningful insights and analytics. Bringing financial plans in the digital world helps to unburden the employees as well as anticipate potential risks of the future. When you know what's coming for you, you can raise your guard and prepare well to defeat it",
      image: serviceImg2,
      imageAlt: "Financial advisors reviewing business spreadsheets, plans, and analytics at a conference table",
    },
    {
      id: "operationalexcellence",
      number: "06",
      title: "Business Process Excellence",
      tagline: "Transform how you work and success would follow you.",
      description:
        "Shifting customer demands and fragmented employees need an upgraded operating model. Getting ahead of your competitors even in disruptive times can soon become a reality once you reach your operational excellence. We equip organizations with the capabilities that they need to withstand the new normal.",
      pillars: [
        {
          title: "Agility",
          text: "We help you to shift the decision-making power from top-down while maintaining the essence of leadership.",
        },
        {
          title: "Speed",
          text: "Fast forward your operations by embracing technology and nurturing relationships with your employees.",
        },
        {
          title: "Cost-efficiency",
          text: "Reach the level of excellence while boycotting unnecessary expenses and making smart investments.",
        },
        {
          title: "Resilience",
          text: "Build an operating model that can counterattack the crisis by always keeping a plan ready for anticipating and resolving risks.",
        },
      ],
      image: serviceImg4,
      imageAlt: "Multidisciplinary team collaborating on an agile business process workflow with sticky notes",
    },
    {
      id: "legalservices",
      number: "07",
      title: "Legal and Advisory Services",
      tagline: "Keep us in the loop and nothing can hamper the reputation & growth of your business.",
      description:
        "You have worked hard in building your business and taking it to this level of success. To make sure that your tireless efforts do not go in vain due to some legal disputes, we stay with you to always keep your business on the safe side of the law. We have an experienced team of legal experts who will support you in your entire journey from business registration to expansion, from procuring company policy to handling contracts and confidential documents, from saving you from lawsuits to settling issues with partners & employees, and many other things. Our legal advisors make sure that no false accusation gets to defame your business by resolving disputes in a timely and appropriate manner",
      image: serviceImg5,
      imageAlt: "Corporate legal counsel closing an advisory agreement with a genuine handshake in a boardroom",
    },
  ] satisfies ServiceItem[],


  itRecruitment: {
    eyebrow: "Careers & Staffing",
    title: "We're Hiring IT Talent Across India & the US",
    lead: "At bOLDFUSE, we're on a mission to build workplaces where people thrive and projects succeed. Our recruitment and staffing division is growing, and we're looking for passionate IT professionals to join team and our clients' teams across India and the United States.",
    whatWeDo: {
      title: "What We Do",
      body: "bOLDFUSE was born from a deep understanding of the challenges organizations face—retaining top talent, navigating project complexities, and creating inclusive, high-performance environments. We partner with companies to transform their operations, blend technology into every aspect of their business, and strengthen their workforce We don't just fill positions. We build meaningful connections between exceptional talent and organizations that value their people.",
    },
    hiringPositions: {
      title: "Hiring for IT Positions",
      lead: "We Hire qualified candidates for a wide range of IT roles. Whether you're a developer, engineer, analyst, or IT leader, we want to hear from you.",
      categories: [
        {
          title: "Software Development",
          description: "Full-stack developers, front-end/back-end engineers, mobile app developers",
          iconName: "Code",
        },
        {
          title: "IT Infrastructure & Operations",
          description: "Network engineers, cloud architects (Azure, AWS), systems administrators",
          iconName: "Server",
        },
        {
          title: "Data & Analytics",
          description: "Data scientists, data engineers, business intelligence analysts",
          iconName: "BarChart3",
        },
        {
          title: "Cybersecurity",
          description: "Security analysts, compliance specialists, IT security managers",
          iconName: "ShieldCheck",
        },
        {
          title: "IT Leadership",
          description: "CTO, IT Directors, Operations leads, Project managers",
          iconName: "Users",
        },
        {
          title: "Emerging Tech",
          description: "AI/ML specialists, automation engineers",
          iconName: "Cpu",
        },
      ],
    },
    locations: {
      title: "Locations",
      items: [
        {
          country: "India",
          description: "Hyderabad and other major IT hubs",
          flag: "🇮🇳",
        },
        {
          country: "United States",
          description: "Remote and onsite opportunities across multiple states",
          flag: "🇺🇸",
        },
      ],
    },
    howToApply: {
      title: "How to Apply",
      subtitle: "Ready to take the next step in your IT career?",
      email: "info@boldfuse.in",
      emailPrompt: "Send your resume to:",
      linkedinPrompt: "Connect with us: Follow us on LinkedIn @bOLDFUSE for the latest openings and updates",
      linkedinUrl: "https://www.linkedin.com/company/boldfuse",
    },
  },

  raiseTheBar: {
    eyebrow: "Raise the bar",
    title: "Get ready to visualize your business with a whole new perspective.",
    stats: [
      {
        value: "10+",
        label: "Industries Covered",
      },
      {
        value: "50+",
        label: "Happy Client",
      },
    ],
  },
} as const;

