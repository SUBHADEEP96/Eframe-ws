export type ClientLogo = { id: string; name: string; logo: string; alt: string };
export type SuccessStory = { id: string; title: string; slug: string; client: string; category: string; excerpt: string; image: string; alt: string };
export type EventGlimpse = { id: string; title: string; image: string; alt: string; date?: string };

export const fallbackClients: ClientLogo[] = [
  ["Amazon", "/amazon.jpg"], ["Coca-Cola", "/cocacola.jpg"], ["Unilever", "/unilever.jpg"],
  ["GE", "/ge.jpg"], ["Tata", "/Tata.jpg"], ["Castrol", "/Castrol.jpg"],
  ["Berger", "/berger.jpg"], ["Vesuvius", "/vesuvius.jpg"], ["CEAT", "/ceat.jpg"],
  ["Alstom", "/alstom.jpg"], ["ITC", "/itc.jpg"], ["Thyssenkrupp", "/thyssenkrupp.jpg"],
].map(([name, logo]) => ({ id: name, name, logo, alt: `${name} logo` }));

export const fallbackStories: SuccessStory[] = [
  { id: "ceat-vr", slug: "ceat-vr-training", client: "CEAT", category: "Virtual Reality", title: "Immersive practice for high-stakes environments", excerpt: "A realistic training experience that lets teams practise critical procedures safely and confidently.", image: "/sucess-story/VRandAR/Index/NT_VR_CEAT.png", alt: "CEAT virtual reality training environment" },
  { id: "vesuvius-learning", slug: "vesuvius-interactive-learning", client: "Vesuvius", category: "Creative Design", title: "Learning designed for distributed teams", excerpt: "A clear, engaging digital learning experience built for consistent knowledge across locations.", image: "/sucess-story/Elearning/VesuviusITM1.jpg", alt: "Vesuvius digital learning experience" },
  { id: "vesuvius-eptw", slug: "vesuvius-digital-permit-to-work", client: "Vesuvius", category: "Process Digitization", title: "Turning process into a connected digital workflow", excerpt: "A digital permit-to-work experience that makes essential safety actions easier to follow and track.", image: "/sucess-story/Process_Digitization/Index/ePTW.png", alt: "Digital permit-to-work interface" },
  { id: "amazon-film", slug: "amazon-film", client: "Amazon", category: "Film Production", title: "A human story, brought to screen", excerpt: "Purposeful film production combining a strong narrative with polished enterprise communication.", image: "/sucess-story/film/amazon4.png", alt: "Amazon corporate film" },
  { id: "road-safety", slug: "road-safety-simulation", client: "Eframe", category: "Simulation Games", title: "Building safer decisions through play", excerpt: "Interactive scenarios turn essential road-safety behaviours into memorable practice.", image: "/sucess-story/Simulation_and_Game/RoadSafety4.jpg", alt: "Road safety simulation game" },
];

export const fallbackEvents: EventGlimpse[] = [
  { id: "event-1", title: "Immersive technology showcase", image: "/NT_VR_CEAT.png", alt: "Eframe immersive technology showcase" },
  { id: "event-2", title: "Enterprise learning demonstration", image: "/sucess-story/VRandAR/Index/AmazonVR1.png", alt: "Enterprise virtual reality demonstration" },
  { id: "event-3", title: "Creative production moment", image: "/sucess-story/film/service/Corporate/Amazon3.jpg", alt: "Eframe creative production moment" },
  { id: "event-4", title: "Safety simulation experience", image: "/sucess-story/VRandAR/Index/Thysenkrup1.PNG", alt: "Safety simulation experience" },
  { id: "event-5", title: "Digital learning in action", image: "/sucess-story/Elearning/TCGLS1.jpg", alt: "Digital learning experience in action" },
];
