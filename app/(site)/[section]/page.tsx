import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InternalPage } from "@/components/internal-page";
import { getGeneralPage } from "@/lib/cms";
const pages: Record<
  string,
  { title: string; eyebrow: string; description: string; image?: string }
> = {
  solutions: {
    title: "Solutions for the work that matters.",
    eyebrow: "Solutions",
    description:
      "Connected learning, safety, immersive and AI-enabled solutions designed around enterprise priorities.",
  },
  products: {
    title: "Purpose-built technology.",
    eyebrow: "Products",
    description:
      "Eframe platforms and products help organisations deliver learning and digitise critical work.",
  },
  industries: {
    title: "Context changes everything.",
    eyebrow: "Industries",
    description:
      "Explore verified industry expertise and connected Eframe solutions as our CMS catalogue grows.",
  },
  "success-stories": {
    title: "Ideas, made tangible.",
    eyebrow: "Success stories",
    description:
      "A visual collection of learning, immersive, creative and enterprise work delivered by Eframe.",
    image: "/sucess-story/VRandAR/Index/NT_VR_CEAT.png",
  },
  "case-studies": {
    title: "A closer look at the work.",
    eyebrow: "Case studies",
    description:
      "Detailed challenges, approaches and outcomes will be published here as verified project content becomes available.",
  },
  insights: {
    title: "Thinking for a changing workplace.",
    eyebrow: "Insights",
    description:
      "Perspectives on learning, immersive technology, creativity and enterprise transformation.",
  },
  about: {
    title: "We turn complex ideas into useful experiences.",
    eyebrow: "About Eframe",
    description:
      "Eframe brings learning expertise, creative craft and technology capability together in one collaborative team.",
    image: "/exprience-bengal.jpg",
  },
  contact: {
    title: "Bring us your next challenge.",
    eyebrow: "Contact Eframe",
    description:
      "Tell us what you are trying to change. We will help you find a clear and practical way forward.",
    image: "/contact_img.png",
  },
  privacy: {
    title: "Privacy policy",
    eyebrow: "Legal",
    description: "Eframe privacy information.",
  },
  terms: {
    title: "Terms and conditions",
    eyebrow: "Legal",
    description: "Eframe website terms and conditions.",
  },
};
type Props = { params: Promise<{ section: string }> };
export function generateStaticParams() {
  return Object.keys(pages).map((section) => ({ section }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = pages[(await params).section];
  const cms = await getGeneralPage((await params).section);
  return cms
    ? {
        title: cms.seo?.metaTitle ?? cms.title,
        description: cms.seo?.metaDescription ?? cms.summary,
        robots: cms.seo?.noIndex ? { index: false } : undefined,
      }
    : page
      ? { title: page.eyebrow, description: page.description }
      : {};
}
export default async function SectionPage({ params }: Props) {
  const key = (await params).section;
  const cms = await getGeneralPage(key);
  const page = cms
    ? {
        title: cms.title,
        eyebrow: cms.eyebrow,
        description: cms.summary,
        image: cms.image,
      }
    : pages[key];
  if (!page) notFound();
  return <InternalPage {...page} breadcrumbs={[{ label: page.eyebrow }]} />;
}
