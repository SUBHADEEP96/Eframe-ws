import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InternalPage } from "@/components/internal-page";
import { serviceGroups } from "@/lib/content";

type Props = { params: Promise<{ slug: string[] }> };
function resolve(slugs: string[]) {
  const group = serviceGroups.find((item) => item.slug === slugs[0]);
  if (!group) return;
  if (slugs.length === 1)
    return {
      title: group.title,
      description: group.description,
      image:
        group.slug === "immersive-experiences"
          ? "/Virtual-Reality-banner.png"
          : group.slug === "creative-studio"
            ? "/banner-film-production.png"
            : group.slug === "enterprise-solutions"
              ? "/Process-Digitization-banner.png"
              : "/E-Learning-Solution-banner.png",
      crumbs: [
        { label: "Services", href: "/services" },
        { label: group.title },
      ],
    };
  const child = group.children.find(([, slug]) => slug === slugs[1]);
  if (!child) return;
  return {
    title: child[0],
    description: `Custom ${child[0]} solutions designed around your audience, operational context and desired business outcome.`,
    image:
      group.slug === "immersive-experiences"
        ? "/Virtual-Reality-banner.png"
        : group.slug === "creative-studio"
          ? "/2d-3d-Animation-banner.png"
          : group.slug === "enterprise-solutions"
            ? "/Process-Digitization-banner.png"
            : "/E-Learning-Solution-banner.png",
    crumbs: [
      { label: "Services", href: "/services" },
      { label: group.title, href: `/services/${group.slug}` },
      { label: child[0] },
    ],
  };
}
export function generateStaticParams() {
  return serviceGroups.flatMap((group) => [
    { slug: [group.slug] },
    ...group.children.map(([, child]) => ({ slug: [group.slug, child] })),
  ]);
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = resolve((await params).slug);
  return item ? { title: item.title, description: item.description } : {};
}
export default async function ServicePage({ params }: Props) {
  const item = resolve((await params).slug);
  if (!item) notFound();
  return (
    <InternalPage
      title={item.title}
      eyebrow="Eframe service"
      description={item.description}
      image={item.image}
      breadcrumbs={[...item.crumbs]}
    />
  );
}
