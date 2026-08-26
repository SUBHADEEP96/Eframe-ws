export type ClientLogo = {
  id: string;
  name: string;
  logo: string;
  alt: string;
};
export type SuccessStory = {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  excerpt: string;
  image: string;
  alt: string;
  href?: string;
};
export type EventGlimpse = {
  id: string;
  title: string;
  image: string;
  alt: string;
  date?: string;
};

export const fallbackClients: ClientLogo[] = [
  ["Amazon", "/amazon.jpg"],
  ["Coca-Cola", "/cocacola.jpg"],
  ["Unilever", "/unilever.jpg"],
  ["GE", "/ge.jpg"],
  ["Tata", "/Tata.jpg"],
  ["Castrol", "/Castrol.jpg"],
  ["Berger", "/berger.jpg"],
  ["Vesuvius", "/vesuvius.jpg"],
  ["CEAT", "/ceat.jpg"],
  ["Alstom", "/alstom.jpg"],
  ["ITC", "/itc.jpg"],
  ["Thyssenkrupp", "/thyssenkrupp.jpg"],
].map(([name, logo]) => ({ id: name, name, logo, alt: `${name} logo` }));

export const fallbackStories: SuccessStory[] = [
  {
    id: "ceat-vr",
    slug: "ceat-vr-training",
    client: "CEAT",
    category: "Virtual Reality",
    title: "Immersive practice for high-stakes environments",
    excerpt:
      "A realistic training experience that lets teams practise critical procedures safely and confidently.",
    image: "/sucess-story/VRandAR/Index/NT_VR_CEAT.png",
    alt: "CEAT virtual reality training environment",
  },
  {
    id: "vesuvius-learning",
    slug: "vesuvius-interactive-learning",
    client: "Vesuvius",
    category: "Creative Design",
    title: "Learning designed for distributed teams",
    excerpt:
      "A clear, engaging digital learning experience built for consistent knowledge across locations.",
    image: "/sucess-story/Elearning/VesuviusITM1.jpg",
    alt: "Vesuvius digital learning experience",
  },
  {
    id: "vesuvius-eptw",
    slug: "vesuvius-digital-permit-to-work",
    client: "Vesuvius",
    category: "Process Digitization",
    title: "Turning process into a connected digital workflow",
    excerpt:
      "A digital permit-to-work experience that makes essential safety actions easier to follow and track.",
    image: "/sucess-story/Process_Digitization/Index/ePTW.png",
    alt: "Digital permit-to-work interface",
  },
  {
    id: "amazon-vr",
    slug: "amazon-virtual-reality",
    client: "Amazon",
    category: "Virtual Reality",
    title: "A media-rich immersive experience",
    excerpt:
      "Virtual reality places the audience inside the subject for focused, memorable engagement.",
    image: "/sucess-story/VRandAR/Index/AmazonVR1.png",
    alt: "Amazon virtual reality experience",
  },
  {
    id: "himadri-lms",
    slug: "himadri-utkarsh-lms",
    client: "Himadri",
    category: "Learning Management System",
    title: "A branded destination for learning",
    excerpt:
      "A dedicated platform supporting organised, consistent access to digital learning.",
    image: "/sucess-story/Learning_Management_System/himadriutkarsh.jpg",
    alt: "Himadri Utkarsh learning platform",
  },
];

export const fallbackEvents: EventGlimpse[] = [
  {
    id: "event-1",
    title: "Immersive technology showcase",
    image: "/amazon.jpg",
    alt: "Eframe immersive technology showcase",
  },
  {
    id: "event-2",
    title: "Enterprise learning demonstration",
    image: "/sucess-story/VRandAR/Index/AmazonVR1.png",
    alt: "Enterprise virtual reality demonstration",
  },
  {
    id: "event-3",
    title: "Creative production moment",
    image: "/sucess-story/film/service/Corporate/Amazon3.jpg",
    alt: "Eframe creative production moment",
  },
  {
    id: "event-4",
    title: "Safety simulation experience",
    image: "/sucess-story/VRandAR/Index/Thysenkrup1.PNG",
    alt: "Safety simulation experience",
  },
  {
    id: "event-5",
    title: "Digital learning in action",
    image: "/sucess-story/Elearning/TCGLS1.jpg",
    alt: "Digital learning experience in action",
  },
];
