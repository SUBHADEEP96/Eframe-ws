import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogDetail } from "@/components/catalog-pages";
import { getDocument, getSolutions } from "@/lib/cms";
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getSolutions()).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getDocument(
    "solution",
    (await params).slug,
    await getSolutions(),
  );
  if (!item) return {};
  return {
    title: item.seo?.metaTitle ?? item.title,
    description: item.seo?.metaDescription ?? item.summary,
    robots: item.seo?.noIndex ? { index: false } : undefined,
    openGraph: {
      images: item.seo?.imageUrl ? [item.seo.imageUrl] : [item.image],
    },
  };
}
export default async function Page({ params }: Props) {
  const item = await getDocument(
    "solution",
    (await params).slug,
    await getSolutions(),
  );
  if (!item) notFound();
  return <CatalogDetail item={item} section="Solutions" />;
}
