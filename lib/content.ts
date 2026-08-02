export type HeroSlide = {
  headline: string;
  eyebrow: string;
  text: string;
  desktopMedia: string;
  mobileMedia?: string;
  mediaType: "image" | "video";
  poster?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  overlay: number;
};

export const serviceGroups = [
  {
    title: "Learning Solutions",
    slug: "learning-solutions",
    description:
      "Learning experiences and platforms designed for confident performance.",
    children: [
      ["E-Learning", "e-learning"],
      ["LMS", "lms"],
      ["Simulation Games", "simulation-games"],
    ],
  },
  {
    title: "Immersive Experiences",
    slug: "immersive-experiences",
    description:
      "Practice real-world decisions in safe, memorable virtual environments.",
    children: [
      ["VR & AR", "vr-ar"],
      ["Digital Simulations", "digital-simulations"],
    ],
  },
  {
    title: "Creative Studio",
    slug: "creative-studio",
    description:
      "Stories, films and visual systems that make complex ideas resonate.",
    children: [
      ["Films", "films"],
      ["2D/3D Animation", "2d-3d-animation"],
      ["Explainer Videos", "explainer-videos"],
      ["Branding & Campaigns", "branding-campaigns"],
    ],
  },
  {
    title: "Enterprise Solutions",
    slug: "enterprise-solutions",
    description:
      "Connected platforms and automated workflows built around your operations.",
    children: [
      ["Process Digitization", "process-digitization"],
      ["Business Automation", "business-automation"],
      ["Custom Digital Platforms", "custom-digital-platforms"],
    ],
  },
] as const;

export const homepage = {
  heroSlides: [
    {
      eyebrow: "Learning that performs",
      headline: "Turn knowledge into confident action.",
      text: "Enterprise learning experiences that help people understand, practise and perform when it matters.",
      desktopMedia: "/E-Learning-Solution-banner.png",
      mobileMedia: "/E-Learning-Solution-banner-mobile.png",
      mediaType: "image",
      primaryCta: { label: "Know More", href: "/services/learning-solutions" },
      secondaryCta: { label: "View PDF", href: "/eframe-profile.pdf" },
      overlay: 0.64,
    },
    {
      eyebrow: "Immersive experiences",
      headline: "Make every critical moment feel real.",
      text: "VR, AR and simulation experiences that create safer spaces to build practical capability.",
      desktopMedia: "/Virtual-Reality-banner.png",
      mobileMedia: "/Virtual-Reality-banner-mobile.png",
      mediaType: "image",
      primaryCta: {
        label: "Know More",
        href: "/services/immersive-experiences",
      },
      secondaryCta: {
        label: "View PDF",
        href: "/VR_based_defensive_driving_simulator.pdf",
      },
      overlay: 0.6,
    },
    {
      eyebrow: "Enterprise transformation",
      headline: "Build a simpler way to get work done.",
      text: "Purpose-built digital platforms that connect people, processes and insight across the enterprise.",
      desktopMedia: "/Process-Digitization-banner.png",
      mobileMedia: "/Process-Digitization-banner-mobile.png",
      mediaType: "image",
      primaryCta: {
        label: "Know More",
        href: "/services/enterprise-solutions",
      },
      secondaryCta: { label: "View PDF", href: "/eframe-profile.pdf" },
      overlay: 0.67,
    },
  ] satisfies HeroSlide[],
  solutions: [
    {
      title: "Elevox",
      description:
        "A connected learning platform for creating and managing organisational capability.",
      image: "/Learning-Management-System-banner.png",
      href: "/products/elevox",
    },
    {
      title: "Drive 360",
      description:
        "An immersive approach to driver awareness, practice and safer decision-making.",
      image: "/VRSimulator.jpg",
      href: "/products/drive-360",
    },
    {
      title: "AI-Enabled Solutions",
      description:
        "Practical intelligence designed around specific learning and workflow needs.",
      image: "/bannerimg.png",
      href: "/solutions/ai-enabled-solutions",
    },
    {
      title: "Safety Management System",
      description:
        "Digitise critical safety processes and make action visible across teams.",
      image: "/ehs-next.jpg",
      href: "/solutions/safety-management-system",
    },
    {
      title: "Immersive Technology",
      description:
        "VR, AR and digital simulations for high-impact learning and engagement.",
      image: "/Virtual-Reality-banner.png",
      href: "/services/immersive-experiences",
    },
  ],
  clients: [
    ["Amazon", "/amazon.jpg"],
    ["Coca-Cola", "/cocacola.jpg"],
    ["Unilever", "/unilever.jpg"],
    ["GE", "/ge.jpg"],
    ["Tata", "/Tata.jpg"],
    ["Castrol", "/Castrol.jpg"],
    ["Berger", "/berger.jpg"],
    ["Vesuvius", "/vesuvius.jpg"],
  ].map(([name, logo]) => ({ name, logo })),
  stories: [
    {
      title: "Immersive practice for high-stakes environments",
      category: "VR & simulation",
      image: "/sucess-story/VRandAR/Index/NT_VR_CEAT.png",
      alt: "Industrial virtual reality training environment",
    },
    {
      title: "Learning designed for distributed teams",
      category: "E-learning",
      image: "/sucess-story/Elearning/VesuviusITM1.jpg",
      alt: "Digital learning experience",
    },
    {
      title: "Turning process into a connected digital workflow",
      category: "Digitisation",
      image: "/sucess-story/Process_Digitization/Index/ePTW.png",
      alt: "Digital permit-to-work interface",
    },
  ],
  faqs: [
    {
      question: "What kinds of business challenges does Eframe solve?",
      answer:
        "Eframe works across enterprise learning, immersive practice, creative communication and process digitisation. We begin with the business need and recommend the most useful combination of services and technology.",
    },
    {
      question: "Can Eframe work with our existing platforms?",
      answer:
        "Yes. Integration requirements are identified during discovery so a proposed learning or digital solution can fit your existing technology environment.",
    },
    {
      question: "Do you create custom solutions?",
      answer:
        "Yes. Eframe designs tailored experiences and platforms when an off-the-shelf approach cannot address the audience, workflow or operational context.",
    },
    {
      question: "How does a new engagement begin?",
      answer:
        "We begin with a focused discovery conversation to understand the audience, desired outcome, constraints, available content and measures of success.",
    },
  ],
};
