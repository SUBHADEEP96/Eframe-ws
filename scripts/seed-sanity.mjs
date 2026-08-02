import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token)
  throw new Error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding.",
  );
const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-08-01",
  useCdn: false,
});
const slug = (x) =>
  x
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const report = { created: 0, skipped: 0, assets: 0, unresolved: [] };
const clients = [
  ["Unilever", "unilever.jpg"],
  ["ITC", "itc.jpg"],
  ["Coca-Cola", "cocacola.jpg"],
  ["Vesuvius", "vesuvius.jpg"],
  ["Amazon", "amazon.jpg"],
  ["Alstom", "alstom.jpg"],
  ["thyssenkrupp", "thyssenkrupp.jpg"],
  ["CEAT", "ceat.jpg"],
  ["TCG Lifesciences", "tcg-lifesciences.jpg"],
  ["Himadri", "himadri.jpg"],
  ["Emami", "emami.jpg"],
  ["GE", "ge.jpg"],
  ["UGL", "ugl.jpg"],
  ["Experience Bengal", "exprience-bengal.jpg"],
  ["NSDC", "nsdc.jpg"],
  ["Techno Canada", "techno-canada.jpg"],
  ["CLP India", "clp.jpg"],
  ["Scarborough Cares", "scarborough-cares.jpg"],
  ["Apraava", "Aprava.jpg"],
  ["Tata", "Tata.jpg"],
  ["Castrol", "Castrol.jpg"],
  ["Berger", "berger.jpg"],
];
const cards = {
  solution: [
    ["Elevox", "Learning-Management-System-banner.png"],
    ["Drive 360", "VRSimulator.jpg"],
    ["AI-Enabled Solutions", "bannerimg.png"],
    ["Safety Management System", "ehs-next.jpg"],
    ["Immersive Technology", "Virtual-Reality-banner.png"],
  ],
  product: [
    ["Elevox", "Learning-Management-System-banner.png"],
    ["Drive 360", "VRSimulator.jpg"],
  ],
  industry: [
    ["Manufacturing", "sucess-story/VRandAR/Services/Vesuvius.jpg"],
    ["Energy & Utilities", "NT_VR_Jhajjar_Power_Ltd.png"],
    [
      "Consumer Business",
      "sucess-story/Creative_Branding_and_Campaign/Index/HUL.png",
    ],
    [
      "Education & Skills",
      "sucess-story/Learning_Management_System/GeneoEsekha1.JPG",
    ],
  ],
  successStory: [
    [
      "CEAT virtual reality training",
      "sucess-story/VRandAR/Index/NT_VR_CEAT.png",
    ],
    [
      "Vesuvius interactive learning",
      "sucess-story/Elearning/VesuviusITM1.jpg",
    ],
    [
      "Digital permit-to-work",
      "sucess-story/Process_Digitization/Index/ePTW.png",
    ],
    [
      "Amazon virtual reality experience",
      "sucess-story/VRandAR/Index/AmazonVR1.png",
    ],
    [
      "Himadri Utkarsh learning platform",
      "sucess-story/Learning_Management_System/himadriutkarsh.jpg",
    ],
    [
      "HUL Kaizen explainer",
      "sucess-story/2D_and_3D/Services/Explainer Video/HUL_Kaizen2.JPG",
    ],
  ],
};
async function image(path, alt) {
  const file = join(process.cwd(), "public", path);
  if (!existsSync(file)) {
    report.unresolved.push(path);
    return;
  }
  const asset = await client.assets.upload("image", createReadStream(file), {
    filename: basename(file),
  });
  report.assets++;
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt,
  };
}
async function insert(doc) {
  const found = await client.getDocument(doc._id);
  if (found) {
    report.skipped++;
    return;
  }
  await client.create(doc);
  report.created++;
}
for (const [order, [title, file]] of clients.entries())
  await insert({
    _id: `client-${slug(title)}`,
    _type: "clientLogo",
    title,
    slug: { _type: "slug", current: slug(title) },
    accessibleLabel: `${title} client logo`,
    order,
    active: true,
    featured: order < 12,
    image: await image(file, `${title} client logo`),
  });
for (const [type, items] of Object.entries(cards))
  for (const [order, [title, file]] of items.entries())
    await insert({
      _id: `${type}-${slug(title)}`,
      _type: type,
      title,
      slug: { _type: "slug", current: slug(title) },
      summary: `${title} content migrated from the verified public website.`,
      order,
      active: true,
      featured: order < 5,
      image: await image(file, `${title} featured image`),
    });
await insert({
  _id: "site-settings",
  _type: "siteSettings",
  title: "Eframe site settings",
  slug: { _type: "slug", current: "site-settings" },
  summary:
    "Learning, immersive, creative and enterprise digital solutions shaped around real business needs.",
  active: true,
  socialLinks: [
    {
      _key: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/28124515/",
    },
    {
      _key: "facebook",
      label: "Facebook",
      url: "https://www.facebook.com/eframe.infomedia",
    },
    {
      _key: "youtube",
      label: "YouTube",
      url: "https://youtube.com/channel/UC-CUXTkd1dwbyPSCN-yadnw",
    },
    {
      _key: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/eframehub/",
    },
  ],
});
await insert({
  _id: "contact-settings",
  _type: "contactSettings",
  title: "Contact settings",
  slug: { _type: "slug", current: "contact-settings" },
  active: true,
  address:
    "E405, DC Block, City Centre, Sector - 1, Salt Lake, Kolkata - 700 064",
  email: "info@eframe.in",
  phones: ["+91 9674032010", "+91 9674758699", "+91 9830443031"],
});
console.log(JSON.stringify(report, null, 2));
if (report.unresolved.length) process.exitCode = 2;
