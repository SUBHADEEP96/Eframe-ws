import type { MetadataRoute } from "next";
import { serviceGroups } from "@/lib/content";
import { caseStudies, industries, solutions, stories } from "@/lib/catalog";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://eframe.in";
  const services = serviceGroups.flatMap((group) => [
    `/services/${group.slug}`,
    ...group.children.map(([, slug]) => `/services/${group.slug}/${slug}`),
  ]);
  return [
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
    ...services,
    ...solutions.map((item)=>`/solutions/${item.slug}`),
    ...industries.map((item)=>`/industries/${item.slug}`),
    ...stories.map((item)=>`/success-stories/${item.slug}`),
    ...caseStudies.map((item)=>`/case-studies/${item.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
