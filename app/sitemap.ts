import type { MetadataRoute } from "next";
import { getSitemapDocuments } from "@/lib/cms";
const roots: Record<string, string> = {
  service: "services",
  solution: "solutions",
  product: "products",
  industry: "industries",
  successStory: "success-stories",
  caseStudy: "case-studies",
  event: "events",
  generalPage: "",
};
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eframe.in";
  const staticPaths = [
    "",
    "/services",
    "/solutions",
    "/products",
    "/industries",
    "/success-stories",
    "/case-studies",
    "/insights",
    "/about",
    "/contact",
  ];
  const docs = await getSitemapDocuments();
  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...docs.map((doc) => ({
      url: `${base}/${[roots[doc._type], doc.slug].filter(Boolean).join("/")}`,
      lastModified: new Date(doc._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
