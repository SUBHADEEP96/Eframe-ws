export type CatalogItem = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  client?: string;
  category?: string;
  overview: string;
  features: string[];
  benefits: string[];
  gallery?: string[];
  faq?: { question: string; answer: string }[];
};

const faq = (subject: string) => [
  {
    question: `How does a ${subject} engagement begin?`,
    answer:
      "We begin with discovery: the audience, operating context, available material and the change the work needs to support.",
  },
  {
    question: "Can the work fit our existing systems?",
    answer:
      "Yes. Delivery, hosting and integration needs are established before design and development begin.",
  },
];

export const solutions: CatalogItem[] = [
  [
    "elevox",
    "Elevox",
    "Connected learning",
    "A learning management solution for organising, delivering and tracking workforce learning.",
    "/Learning-Management-System-banner.png",
    ["Learning delivery", "Content organisation", "Progress visibility"],
    ["A consistent learning destination", "Simpler administration", "Access across distributed teams"],
  ],
  [
    "drive-360",
    "Drive 360",
    "Driver learning",
    "Immersive driver awareness and practice in a safe, controlled simulation environment.",
    "/VRSimulator.jpg",
    ["Scenario-based practice", "Defensive driving context", "Facilitated simulation"],
    ["Practice without road exposure", "Repeatable scenarios", "Reflective learning"],
  ],
  [
    "ai-enabled-solutions",
    "AI-Enabled Solutions",
    "Applied intelligence",
    "Purposeful AI-enabled experiences designed around defined learning and workflow needs.",
    "/bannerimg.png",
    ["Knowledge access", "Workflow guidance", "Learning personalisation"],
    ["Faster access to relevant knowledge", "Support in the flow of work", "Adaptable experiences"],
  ],
  [
    "safety-management-system",
    "Safety Management System",
    "Connected safety",
    "A digital approach to making critical safety workflows visible and manageable.",
    "/ehs-next.jpg",
    ["Permit workflows", "Safety observations", "Action visibility"],
    ["Consistent digital records", "Clearer accountability", "Connected safety activity"],
  ],
  [
    "immersive-technology",
    "Immersive Technology",
    "Experience-led learning",
    "VR, AR and simulations that let people practise decisions in realistic environments.",
    "/Virtual-Reality-banner.png",
    ["Virtual reality", "Augmented reality", "Digital simulations"],
    ["Safe practice", "Memorable experiences", "Repeatable learning"],
  ],
].map(
  ([slug, title, eyebrow, summary, image, features, benefits]) => ({
    slug: String(slug),
    title: String(title),
    eyebrow: String(eyebrow),
    summary: String(summary),
    image: String(image),
    features: features as string[],
    benefits: benefits as string[],
    overview: String(summary),
    faq: faq(String(title)),
  }) as CatalogItem,
);

export const stories: CatalogItem[] = [
  {
    slug: "ceat-vr-training",
    title: "CEAT virtual reality training",
    eyebrow: "Success story",
    summary: "An immersive industrial training experience created for CEAT.",
    image: "/sucess-story/VRandAR/Index/NT_VR_CEAT.png",
    client: "CEAT",
    category: "VR & AR",
    overview:
      "Eframe created a virtual reality experience that supports industrial learning through visual, contextual practice.",
    features: ["Immersive environment", "Industrial learning", "Scenario-led experience"],
    benefits: ["Safe practice", "Repeatable experience"],
    gallery: [
      "/sucess-story/VRandAR/Index/Ceat1.PNG",
      "/sucess-story/VRandAR/Services/Ceat3.jpg",
    ],
  },
  {
    slug: "vesuvius-interactive-learning",
    title: "Vesuvius interactive learning",
    eyebrow: "Success story",
    summary: "A visual interactive training module developed for Vesuvius.",
    image: "/sucess-story/Elearning/VesuviusITM1.jpg",
    client: "Vesuvius",
    category: "E-learning",
    overview:
      "The module turns subject material into a structured digital learning experience for consistent delivery.",
    features: ["Interactive learning", "Visual explanation", "Structured modules"],
    benefits: ["Consistent delivery", "Self-paced access"],
  },
  {
    slug: "vesuvius-digital-permit-to-work",
    title: "Digital permit-to-work",
    eyebrow: "Success story",
    summary: "A digitised permit-to-work workflow for Vesuvius.",
    image: "/sucess-story/Process_Digitization/Index/ePTW.png",
    client: "Vesuvius",
    category: "Process digitisation",
    overview:
      "Eframe translated a critical permit process into a connected digital workflow.",
    features: ["Digital workflow", "Permit records", "Action visibility"],
    benefits: ["Clearer process", "Accessible records"],
    gallery: ["/sucess-story/Process_Digitization/Service/VPTW.JPG"],
  },
  {
    slug: "amazon-virtual-reality",
    title: "Amazon virtual reality experience",
    eyebrow: "Success story",
    summary: "A virtual reality experience produced for Amazon.",
    image: "/sucess-story/VRandAR/Index/AmazonVR1.png",
    client: "Amazon",
    category: "VR & AR",
    overview:
      "A media-rich immersive experience using virtual reality to place the audience inside the subject.",
    features: ["Virtual reality", "Immersive storytelling", "Interactive experience"],
    benefits: ["Focused engagement", "Memorable presentation"],
    gallery: ["/sucess-story/VRandAR/Services/Amazon2.jpg"],
  },
  {
    slug: "himadri-utkarsh-lms",
    title: "Himadri Utkarsh learning platform",
    eyebrow: "Success story",
    summary: "A branded learning management experience for Himadri.",
    image: "/sucess-story/Learning_Management_System/himadriutkarsh.jpg",
    client: "Himadri",
    category: "LMS",
    overview:
      "A dedicated learning destination supporting organised access to digital learning.",
    features: ["Branded LMS", "Learning catalogue", "User access"],
    benefits: ["Central learning destination", "Consistent access"],
  },
  {
    slug: "hul-kaizen-explainer",
    title: "HUL Kaizen explainer",
    eyebrow: "Success story",
    summary: "An animated explainer created for HUL.",
    image: "/sucess-story/2D_and_3D/Services/Explainer Video/HUL_Kaizen2.JPG",
    client: "HUL",
    category: "Animation",
    overview: "Animation and visual storytelling make the subject easier to follow and share.",
    features: ["2D animation", "Visual explanation", "Storyboarding"],
    benefits: ["Clear communication", "Reusable media"],
    gallery: ["/sucess-story/2D_and_3D/Services/Explainer Video/HUL_Kaizen5.JPG"],
  },
];

export const industries: CatalogItem[] = [
  [
    "manufacturing",
    "Manufacturing",
    "Industry",
    "Learning, safety, process and communication experiences grounded in industrial environments.",
    "/sucess-story/VRandAR/Services/Vesuvius.jpg",
  ],
  [
    "energy-utilities",
    "Energy & Utilities",
    "Industry",
    "Digital and immersive experiences for safety-critical, distributed operations.",
    "/NT_VR_Jhajjar_Power_Ltd.png",
  ],
  [
    "consumer-business",
    "Consumer Business",
    "Industry",
    "Learning and creative communication for large brands and distributed teams.",
    "/sucess-story/Creative_Branding_and_Campaign/Index/HUL.png",
  ],
  [
    "education-skills",
    "Education & Skills",
    "Industry",
    "Platforms and digital content that expand access to structured learning.",
    "/sucess-story/Learning_Management_System/GeneoEsekha1.JPG",
  ],
].map(
  ([slug, title, eyebrow, summary, image]) => ({
    slug: String(slug),
    title: String(title),
    eyebrow: String(eyebrow),
    summary: String(summary),
    image: String(image),
    overview: String(summary),
    features: ["Discovery", "Experience design", "Technology delivery"],
    benefits: ["Context-aware design", "Connected delivery"],
    faq: faq(String(title)),
  }) as CatalogItem,
);

export const caseStudies: CatalogItem[] = stories
  .slice(0, 3)
  .map((story) => ({
    ...story,
    slug: `${story.slug}-case-study`,
    eyebrow: "Case study",
    title: `${story.title}: case study`,
  }));

export const clients = [
  ["Unilever", "/unilever.jpg"],
  ["ITC", "/itc.jpg"],
  ["Coca-Cola", "/cocacola.jpg"],
  ["Vesuvius", "/vesuvius.jpg"],
  ["Amazon", "/amazon.jpg"],
  ["Alstom", "/alstom.jpg"],
  ["thyssenkrupp", "/thyssenkrupp.jpg"],
  ["CEAT", "/ceat.jpg"],
  ["TCG Lifesciences", "/tcg-lifesciences.jpg"],
  ["Himadri", "/himadri.jpg"],
  ["Emami", "/emami.jpg"],
  ["GE", "/ge.jpg"],
  ["UGL", "/ugl.jpg"],
  ["Experience Bengal", "/exprience-bengal.jpg"],
  ["NSDC", "/nsdc.jpg"],
  ["Techno Canada", "/techno-canada.jpg"],
  ["CLP India", "/clp.jpg"],
  ["Scarborough Cares", "/scarborough-cares.jpg"],
  ["Apraava", "/Aprava.jpg"],
  ["Tata", "/Tata.jpg"],
  ["Castrol", "/Castrol.jpg"],
  ["Berger", "/berger.jpg"],
].map(([name, logo], order) => ({
  name,
  logo,
  order,
  active: true,
  displayLabel: `${name} client logo`,
}));
