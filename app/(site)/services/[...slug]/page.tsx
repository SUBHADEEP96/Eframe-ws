import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogDetail } from "@/components/catalog-pages";
import { getDocument, getServices, getServiceGroups } from "@/lib/cms";
type Props = { params: Promise<{ slug: string[] }> };
export async function generateStaticParams() {
  const [groups, services] = await Promise.all([
    getServiceGroups(),
    getServices(),
  ]);
  return [
    ...groups.flatMap((g) => [
      { slug: [g.slug] },
      ...g.children.map(([, s]) => ({ slug: [g.slug, s] })),
    ]),
    ...services.map((s) => ({ slug: [s.slug] })),
  ];
}
async function resolve(parts: string[]) {
  const services = await getServices();
  const leaf = parts.at(-1) ?? "";
  const doc = await getDocument("service", leaf, services);
  if (doc) return doc;
  const group = (await getServiceGroups()).find((g) => g.slug === parts[0]);
  return group
    ? {
        _id: `category-${group.slug}`,
        _updatedAt: new Date(0).toISOString(),
        order: 0,
        slug: group.slug,
        title: group.title,
        eyebrow: "Eframe service",
        summary: group.description,
        image: "/E-Learning-Solution-banner.png",
        overview: group.description,
        features: group.children.map((x) => x[0]),
        benefits: [],
      }
    : null;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const x = await resolve((await params).slug);
  return x ? { title: x.title, description: x.summary } : {};
}
export default async function Page({ params }: Props) {
  const x = await resolve((await params).slug);
  if (!x) notFound();
  return <CatalogDetail item={x} section="Services" />;
}
