import type { StaticImageData } from "next/image";
import type { RouteKey } from "@/config/routes";
import anxietyImg from "@/assets/services/wellness-and-mental-health/anxiety-counselling.jpeg";
import depressionImg from "@/assets/services/wellness-and-mental-health/depression-counselling.jpeg";
import childImg from "@/assets/services/wellness-and-mental-health/child-and-adolescent-counselling.jpeg";
import teenImg from "@/assets/services/wellness-and-mental-health/teen-counselling.jpeg";
import parentingImg from "@/assets/services/wellness-and-mental-health/parenting.png";
import traumaImg from "@/assets/services/wellness-and-mental-health/trauma-counselling.jpeg";
import griefImg from "@/assets/services/wellness-and-mental-health/grief-and-loss-counselling.jpeg";
import eatingImg from "@/assets/services/wellness-and-mental-health/eating-disorder-counselling.jpeg";
import substanceImg from "@/assets/services/wellness-and-mental-health/substance-abuse-counselling.jpeg";
import selfEsteemImg from "@/assets/services/wellness-and-mental-health/self-esteem-counselling.jpeg";
import stressImg from "@/assets/services/wellness-and-mental-health/stress-management-counselling-new.jpeg";
import couplesImg from "@/assets/services/wellness-and-mental-health/couples-counselling-1.jpeg";

export type DetailBullet = { title: string; text: string };
export type DetailSection = {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly DetailBullet[];
};

export type CounsellingDetail = {
  route: RouteKey;
  title: string;
  cardTitle: string;
  heroText: string;
  metaDescription: string;
  intro: readonly string[];
  sections: readonly DetailSection[];
  image: StaticImageData;
  imageAlt: string;
  cardText: string;
};

export const counsellingDetails: readonly CounsellingDetail[] = [
  {
    route: "anxiety-counselling",
    title: "Anxiety Counselling",
    cardTitle: "Anxiety Counselling",
    heroText:
      "Persistent worry can narrow your life. Our therapists help you understand your anxiety and gently widen your room to breathe, decide and act again.",
    metaDescription:
      "Professional anxiety counselling in Hyderabad for generalized anxiety, panic, phobias, social anxiety and OCD. Book a session with Boldfuse today.",
    intro: [
      "We specialize in helping individuals manage the symptoms of anxiety disorders, including generalized anxiety disorder, panic disorder, phobias, social anxiety disorder and obsessive-compulsive disorder (OCD).",
      "Anxiety often feels like a constant alarm that never switches off. In a safe, non-judgmental space, our licensed therapists work with you to trace what triggers that alarm, and to replace avoidance with practical, evidence-based responses.",
    ],
    sections: [
      {
        heading: "How we can help",
        bullets: [
          {
            title: "Understanding your anxiety",
            text: "Map your personal triggers, early warning signs and the thought patterns that keep worry alive.",
          },
          {
            title: "Cognitive-behavioural strategies",
            text: "Identify and reframe unhelpful thoughts with structured CBT techniques that hold up in daily life.",
          },
          {
            title: "Relaxation and mindfulness",
            text: "Learn breathing, grounding and mindfulness exercises that calm the body and slow the spiral.",
          },
          {
            title: "Gradual exposure",
            text: "Face feared situations step by step, at a pace you control, so avoidance stops running your schedule.",
          },
          {
            title: "Confidence building",
            text: "Rebuild trust in your own judgement through small, repeatable wins in real situations.",
          },
          {
            title: "Ongoing support",
            text: "Regular check-ins and practical homework keep your progress moving between sessions.",
          },
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "Your first session is a conversation, not an interrogation. We explore your history, your current challenges and what you want from therapy, then agree on a plan together. Most clients start to feel lighter within the first few sessions and build lasting tools over six to twelve.",
        ],
      },
    ],
    image: anxietyImg,
    imageAlt:
      "Person finding calm and emotional relief through anxiety counselling",
    cardText:
      "Guidance and coping mechanisms for managing chronic worry, panic, and everyday stress through evidence-based therapeutic approaches.",
  },
  {
    route: "depression-counselling",
    title: "Depression Counselling",
    cardTitle: "Depression Counselling",
    heroText:
      "Depression dims everything it touches. With structured, compassionate support you can restore energy, meaning and hope — one small step at a time.",
    metaDescription:
      "Compassionate depression counselling for persistent sadness, low energy and loss of interest. Book a confidential session with Boldfuse.",
    intro: [
      "We offer support and therapy for individuals experiencing the symptoms of depression, such as persistent sadness, loss of interest in activities, feelings of worthlessness and changes in sleep or appetite.",
      "Depression is not a weakness of character; it is a treatable condition. Our therapists combine structured approaches like cognitive-behavioural therapy with compassionate listening to help you reconnect with the things that matter to you.",
    ],
    sections: [
      {
        heading: "How we can help",
        bullets: [
          {
            title: "Gentle assessment",
            text: "Understand the severity and shape of your depression and what maintains it.",
          },
          {
            title: "Behavioural activation",
            text: "Rebuild routine, movement and small pleasures that lift mood before motivation returns.",
          },
          {
            title: "Challenging negative thoughts",
            text: "Loosen the grip of self-criticism and hopelessness with CBT techniques.",
          },
          {
            title: "Sleep and energy care",
            text: "Practical guidance to stabilise sleep, appetite and daily structure.",
          },
          {
            title: "Relapse prevention",
            text: "Recognise early warning signs and keep a personal toolkit for difficult days.",
          },
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "Sessions are confidential and paced around your energy, not a fixed script. We set realistic goals, celebrate small wins and involve your family only if and when you want them involved.",
        ],
      },
    ],
    image: depressionImg,
    imageAlt:
      "Supportive therapist helping a client work through depression in a bright room",
    cardText:
      "Compassionate, structured support designed to help individuals navigate low moods, depressive symptoms, and emotional blockages.",
  },
  {
    route: "child-counselling",
    title: "Child and Adolescent Counselling",
    cardTitle: "Child and Adolescent Counselling",
    heroText:
      "Children don't always have the words for what they feel. We give them a safe place — and give you the tools to support them at home.",
    metaDescription:
      "Child counselling for behaviour problems, academic stress, family conflict and peer relationships. Book a child-friendly session with Boldfuse.",
    intro: [
      "We provide therapy tailored to the unique needs of children and teenagers, addressing issues such as behavioural problems, academic stress, family conflicts, peer relationships and emotional regulation.",
      "Children communicate through play, drawing and stories as much as through words. Our child specialists use age-appropriate, evidence-based methods — and work closely with parents so that progress made in the room continues at home and at school.",
    ],
    sections: [
      {
        heading: "How we can help",
        bullets: [
          {
            title: "Play and creative therapy",
            text: "Help younger children express feelings they cannot yet put into words.",
          },
          {
            title: "Behavioural support",
            text: "Address tantrums, defiance, screen overuse and school refusal with clear, consistent strategies.",
          },
          {
            title: "Academic stress",
            text: "Build study routines, exam coping skills and resilience around school pressure.",
          },
          {
            title: "Social and peer skills",
            text: "Develop confidence, friendship skills and responses to bullying or exclusion.",
          },
          {
            title: "Parent coaching",
            text: "Equip parents with practical, consistent approaches that reinforce therapy at home.",
          },
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "The first session usually includes both the child and the parents. We observe, listen and agree on goals together, then work in child-led sessions with regular parent reviews so you always know how things are progressing.",
        ],
      },
    ],
    image: childImg,
    imageAlt:
      "Child engaging in a warm and supportive counselling session with a therapist",
    cardText:
      "Age-appropriate psychological and emotional support to help younger children navigate emotional, behavioral, or developmental challenges.",
  },
  {
    route: "teen-counselling",
    title: "Teen Counselling",
    cardTitle: "Teen Counselling",
    heroText:
      "The teenage years are loud, fast and complicated. We give teens a trusted, judgment-free space to be heard — and to figure out who they are.",
    metaDescription:
      "Teen counselling for identity, peer pressure, self-esteem, academic stress, anxiety and depression. Book a confidential session with Boldfuse.",
    intro: [
      "We focus specifically on the challenges faced by adolescents, including identity issues, peer pressure, self-esteem concerns, academic stress and mental health disorders like depression or anxiety.",
      "Teenagers rarely open up where they feel judged. Our counsellors build trust first, so that what a teen cannot say at home or in school can finally be said — and worked through — in a space that belongs to them.",
    ],
    sections: [
      {
        heading: "How we can help",
        bullets: [
          {
            title: "Identity and confidence",
            text: "Support teens exploring who they are, away from labels and comparison.",
          },
          {
            title: "Peer pressure",
            text: "Build refusal skills, healthy friendships and independence from social media noise.",
          },
          {
            title: "Academic pressure",
            text: "Tackle procrastination, perfectionism and exam anxiety with realistic strategies.",
          },
          {
            title: "Mood and anxiety",
            text: "Address early signs of anxiety and depression before they settle into patterns.",
          },
          {
            title: "Family communication",
            text: "Rebuild respectful dialogue between teens and parents, with both sides heard.",
          },
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "Sessions are confidential within the boundaries agreed with the family. Teens set their own goals with our guidance, which is usually what makes therapy stick.",
        ],
      },
    ],
    image: teenImg,
    imageAlt: "Teenager in a trusting and empathetic counselling session",
    cardText:
      "A safe, non-judgmental space for adolescents dealing with academic pressure, identity shifts, peer pressure, and emotional wellbeing.",
  },
  {
    route: "parenting-support",
    title: "Parenting Support",
    cardTitle: "Parenting Support",
    heroText:
      "Parenting doesn't come with a manual. We help you replace exhaustion and guesswork with calm, consistent strategies that actually work.",
    metaDescription:
      "Parenting support to manage behaviour, communication and family dynamics. Book a session with Boldfuse's parenting specialists.",
    intro: [
      "We support parents through the everyday and the extraordinary: tantrums and teenage silences, screen battles, sibling rivalry and the pressure of doing it all right.",
      "Our parenting sessions give you practical strategies based on developmental psychology — adapted to your child's age, temperament and your family's reality, not a one-size-fits-all script.",
    ],
    sections: [
      {
        heading: "How we can help",
        bullets: [
          {
            title: "Understanding behaviour",
            text: "See what drives difficult behaviour so you can respond to the cause, not just the symptom.",
          },
          {
            title: "Clear boundaries",
            text: "Set expectations and consequences that are consistent, fair and actually enforceable.",
          },
          {
            title: "Positive communication",
            text: "Replace nagging and lectures with listening that invites cooperation.",
          },
          {
            title: "Emotional regulation",
            text: "Help your child name and manage big feelings — and manage your own reactions too.",
          },
          {
            title: "Everyday routines",
            text: "Design simple routines around sleep, meals, homework and screens that reduce daily friction.",
          },
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "Sessions can be with parents alone or include the child when appropriate. You leave each session with one or two concrete changes to try, and we review what worked at the next.",
        ],
      },
    ],
    image: parentingImg,
    imageAlt:
      "Parents receiving professional guidance in a parenting support session",
    cardText:
      "Guidance and practical strategies to help parents navigate behavioral management, family dynamics, and the day-to-day journey of raising children.",
  },
  {
    route: "trauma-counselling",
    title: "Trauma Counselling",
    cardTitle: "Trauma Counselling",
    heroText:
      "Trauma lives in the body long after the event is over. We help you process it safely, gently and at a pace your nervous system can accept.",
    metaDescription:
      "Trauma-informed counselling to heal from abuse, accidents, loss and overwhelming events. Book a confidential session with Boldfuse.",
    intro: [
      "We specialize in helping individuals heal from traumatic experiences such as physical or sexual abuse, domestic violence, accidents, natural disasters, traumatic loss, narcissistic abuse and psychopathic abuse.",
      "Trauma-informed care means we never push. We build safety first, help you understand your responses and use evidence-based approaches so memories lose their power over your present life.",
    ],
    sections: [
      {
        heading: "How we can help",
        bullets: [
          {
            title: "Safety and stabilisation",
            text: "Establish calm and grounding before any deeper work begins.",
          },
          {
            title: "Understanding your responses",
            text: "Normalise flashbacks, hypervigilance and numbness as the mind's protective strategies.",
          },
          {
            title: "Processing the experience",
            text: "Work through memories with structured, evidence-based methods at a safe pace.",
          },
          {
            title: "Rebuilding trust",
            text: "Restore a felt sense of safety in your body, relationships and daily routines.",
          },
          {
            title: "Post-traumatic growth",
            text: "Move from surviving to a life shaped by your strengths, not your history.",
          },
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "The first sessions focus on listening and stabilisation — you will never be asked to relive anything before you are ready. Many clients feel steady within weeks and continue deeper work at their own pace.",
        ],
      },
    ],
    image: traumaImg,
    imageAlt:
      "Therapist providing compassionate, trauma-informed mental health care",
    cardText:
      "Trauma-informed care and supportive processing mechanisms to help individuals heal from distressing or traumatic life events at their own pace.",
  },
  {
    route: "grief-and-loss-counselling",
    title: "Grief and Loss Counselling",
    cardTitle: "Grief and Loss Counselling",
    heroText:
      "Grief doesn't follow a timetable. Whether your loss is recent or years old, we walk with you through it until life feels possible again.",
    metaDescription:
      "Grief counselling for bereavement, divorce, miscarriage, job loss and major life changes. Book a supportive session with Boldfuse.",
    intro: [
      "We provide support for individuals coping with the death of a loved one, as well as other forms of loss including divorce, miscarriage, job loss and significant life changes.",
      "Grief can look like sadness, anger, numbness, guilt or exhaustion — sometimes all in one day. There is no correct way to grieve. Our role is to give your grief room, and to help you carry it without it carrying you.",
    ],
    sections: [
      {
        heading: "How we can help",
        bullets: [
          {
            title: "Safe space to grieve",
            text: "Say what feels unsayable elsewhere, without judgement or time limits.",
          },
          {
            title: "Understanding your grief",
            text: "Make sense of waves, triggers and the physical side of loss.",
          },
          {
            title: "Adjusting to change",
            text: "Rebuild routines, roles and identity after a major life shift.",
          },
          {
            title: "Honouring and remembering",
            text: "Find meaningful ways to stay connected to what you have lost.",
          },
          {
            title: "Renewed direction",
            text: "Gradually reconnect with people, purpose and plans at your own pace.",
          },
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "Sessions are led by you. Some days you may just need to talk; other days we work on practical rebuilding. There is no fixed number of sessions — we continue as long as it helps.",
        ],
      },
    ],
    image: griefImg,
    imageAlt:
      "Compassionate support for a person working through grief and loss",
    cardText:
      "Compassionate guidance and emotional support to help individuals process grief, navigate bereavement, and manage major life transitions.",
  },
  {
    route: "eating-disorder-counselling",
    title: "Eating Disorder Counselling",
    cardTitle: "Eating Disorder Counselling",
    heroText:
      "Healing your relationship with food means healing your relationship with yourself. We support both — patiently and without shame.",
    metaDescription:
      "Compassionate counselling for disordered eating, body image and self-worth. Book a confidential session with Boldfuse.",
    intro: [
      "We provide support and therapy for individuals struggling with disordered eating, binge eating, restrictive patterns and body image distress.",
      "Eating difficulties are rarely about food alone. They are often tied to control, perfectionism, trauma or self-worth. Our therapists address the behaviour and the feelings underneath it, working alongside medical professionals where needed.",
    ],
    sections: [
      {
        heading: "How we can help",
        bullets: [
          {
            title: "Understanding the pattern",
            text: "Trace what triggers restricting, bingeing or over-exercising in your life.",
          },
          {
            title: "Rebuilding body trust",
            text: "Reduce shame and rebuild a kinder, more honest relationship with food.",
          },
          {
            title: "Challenging food rules",
            text: "Loosen rigid rules around eating, weight and appearance step by step.",
          },
          {
            title: "Self-worth beyond appearance",
            text: "Build identity and confidence that do not depend on the scale or mirror.",
          },
          {
            title: "Coordinated care",
            text: "We collaborate with doctors and nutritionists so care stays safe and joined-up.",
          },
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "The first session is an unhurried conversation about your history and goals. Recovery is a gradual, collaborative process — we move at the pace your body and mind can sustain.",
        ],
      },
    ],
    image: eatingImg,
    imageAlt:
      "Professional eating disorder counselling in a supportive environment",
    cardText:
      "Specialized therapy addressing complex relationships with food, body image, and self-worth through compassionate therapeutic modalities.",
  },
  {
    route: "substance-abuse-counselling",
    title: "Substance Abuse Counselling",
    cardTitle: "Substance Abuse Counselling",
    heroText:
      "Recovery is not about willpower alone. We help you understand the need behind the use and build a life that doesn't require escape.",
    metaDescription:
      "Confidential counselling for alcohol, drug and prescription medication dependence. Start recovery with Boldfuse today.",
    intro: [
      "We provide support and therapy for individuals struggling with substance abuse or addiction issues, including alcohol, drugs and prescription medications.",
      "Addiction thrives in isolation and shame. Our counsellors offer confidential, judgment-free support to understand what drives the use, reduce harm and build sustainable recovery — with family involvement where it helps.",
    ],
    sections: [
      {
        heading: "How we can help",
        bullets: [
          {
            title: "Confidential assessment",
            text: "Understand your use, its triggers and its impact without judgement.",
          },
          {
            title: "Understanding the need",
            text: "Explore the emotional or situational drivers behind substance use.",
          },
          {
            title: "Personal recovery plan",
            text: "Set realistic goals for reduction or abstinence that fit your life.",
          },
          {
            title: "Coping without substances",
            text: "Build healthier ways to handle stress, boredom, pain and social pressure.",
          },
          {
            title: "Family support",
            text: "Help families respond constructively and rebuild trust during recovery.",
          },
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "Every plan is individual — recovery is a process, not a single decision. We work at your pace, celebrate progress honestly and stay with you through setbacks.",
        ],
      },
    ],
    image: substanceImg,
    imageAlt:
      "Confidential substance abuse counselling and addiction recovery support",
    cardText:
      "Confidential, judgment-free support and personalized recovery planning to address substance dependency and build long-term wellness.",
  },
  {
    route: "self-esteem-counselling",
    title: "Self-Esteem Counselling",
    cardTitle: "Self-Esteem Counselling",
    heroText:
      "The harshest critic usually lives inside your head. We help you quiet it and build a voice that speaks to you with fairness.",
    metaDescription:
      "Self-esteem counselling to overcome self-doubt, negative self-talk and build lasting confidence. Book a session with Boldfuse.",
    intro: [
      "We assist individuals in building self-confidence, overcoming negative self-talk and developing a positive, realistic self-image.",
      "Low self-esteem shows up as people-pleasing, perfectionism, avoiding opportunities or dismissing praise. Therapy helps you trace where those beliefs came from and replace them with a way of seeing yourself that is both kinder and truer.",
    ],
    sections: [
      {
        heading: "How we can help",
        bullets: [
          {
            title: "Tracing the roots",
            text: "Understand where self-critical beliefs began and what still feeds them.",
          },
          {
            title: "Quieting the inner critic",
            text: "Practise responding to negative self-talk with evidence instead of emotion.",
          },
          {
            title: "Assertiveness skills",
            text: "Say no, ask for what you need and hold boundaries without guilt.",
          },
          {
            title: "Owning your strengths",
            text: "Learn to receive praise and act on opportunities you used to avoid.",
          },
          {
            title: "Self-compassion",
            text: "Treat yourself with the fairness you offer a good friend.",
          },
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "Sessions mix conversation with practical exercises you can apply immediately. Confidence grows from repeated small actions — we design those actions with you.",
        ],
      },
    ],
    image: selfEsteemImg,
    imageAlt:
      "Person building confidence and self-worth through self-esteem counselling",
    cardText:
      "Dedicated counselling to overcome self-doubt, challenge negative core beliefs, and cultivate genuine self-compassion and lasting confidence.",
  },
  {
    route: "stress-management-counselling",
    title: "Stress Management Counselling",
    cardTitle: "Stress Management Counselling",
    heroText:
      "Stress is a signal, not a lifestyle. Learn to read it, respond to it and stop it from running your days.",
    metaDescription:
      "Stress management counselling to identify stressors, build coping skills and restore balance. Book a session with Boldfuse.",
    intro: [
      "We help individuals develop coping skills and relaxation techniques to manage stress effectively and improve overall well-being.",
      "Whether stress comes from work, relationships, health or the sheer weight of everything at once, counselling gives you a clear map of your stressors and a practical toolkit to respond rather than react.",
    ],
    sections: [
      {
        heading: "Common signs of stress",
        bullets: [
          {
            title: "Body responses",
            text: "Racing heart, headaches, tense muscles, or changes in sleep and appetite.",
          },
          {
            title: "Emotional responses",
            text: "Irritability, anxiety, low mood or feeling constantly overwhelmed.",
          },
          {
            title: "Behavioural changes",
            text: "Procrastination, snapping at people, withdrawing or leaning on unhealthy habits.",
          },
        ],
      },
      {
        heading: "How we can help",
        bullets: [
          {
            title: "Identifying stressors",
            text: "Pinpoint what actually drives your stress across work, relationships and health.",
          },
          {
            title: "Understanding your responses",
            text: "Learn how stress shows up in your body, emotions and behaviour.",
          },
          {
            title: "Coping strategies",
            text: "Practise deep breathing, mindfulness and progressive muscle relaxation.",
          },
          {
            title: "Time and organisation",
            text: "Manage your workload and tasks so overwhelm stops compounding.",
          },
          {
            title: "Setting boundaries",
            text: "Say no and communicate your needs assertively at work and home.",
          },
          {
            title: "Reframing negative thinking",
            text: "Use cognitive-behavioural techniques to challenge stress-feeding thoughts.",
          },
        ],
      },
    ],
    image: stressImg,
    imageAlt:
      "Calming stress management counselling session with relaxation techniques",
    cardText:
      "Practical coping skills and relaxation techniques to manage stress effectively and improve overall well-being.",
  },
  {
    route: "couples-counselling-for-specific-issues",
    title: "Couples Counselling (for specific issues)",
    cardTitle: "Couples Counselling",
    heroText:
      "Every relationship hits hard questions. We help couples talk about them honestly — and find answers they can both live with.",
    metaDescription:
      "Couples counselling for communication, conflict, trust, intimacy and life transitions. Book a session with Boldfuse.",
    intro: [
      "We offer counselling services tailored to couples facing specific challenges such as communication issues, infidelity, intimacy problems or navigating major life transitions together.",
      "Our counsellors are neutral, non-judgmental guides — not referees. We help both partners feel heard, break destructive patterns and rebuild a partnership that works in real life, not just in theory.",
    ],
    sections: [
      {
        heading: "Common reasons couples seek help",
        bullets: [
          {
            title: "Communication problems",
            text: "Difficulty expressing thoughts and feelings, frequent misunderstandings or conflict.",
          },
          {
            title: "Persistent conflict",
            text: "Frequent arguments, unresolved issues or feeling stuck in repetitive patterns.",
          },
          {
            title: "Emotional distance",
            text: "Feeling disconnected or drifting apart, with less intimacy and shared life.",
          },
          {
            title: "Trust issues",
            text: "Infidelity, suspicion or betrayal that has damaged trust in the relationship.",
          },
          {
            title: "Intimacy problems",
            text: "Differences in desire, difficulties with closeness or unresolved tension.",
          },
          {
            title: "Life transitions",
            text: "Moving, job changes, having children or adjusting to new family dynamics.",
          },
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "Sessions are usually 60 minutes with both partners, though individual sessions can support the work. We set shared goals early and give you concrete communication tools from the very first session.",
        ],
      },
    ],
    image: couplesImg,
    imageAlt:
      "Couple working through their relationship with a counselling therapist",
    cardText:
      "Support for couples facing communication issues, trust, intimacy and major life transitions together.",
  },
];

export function getCounsellingByRoute(route: RouteKey): CounsellingDetail {
  const detail = counsellingDetails.find((item) => item.route === route);
  if (!detail) throw new Error(`No counselling detail for route "${route}"`);
  return detail;
}
