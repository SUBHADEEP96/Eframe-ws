import { CatalogListing } from "@/components/catalog-pages";
import { getSolutions } from "@/lib/cms";
export default async function Page() {
  const items = await getSolutions();
  return (
    <CatalogListing
      title="Solutions for the work that matters."
      eyebrow="Solutions"
      description="Connected learning, safety, immersive and AI-enabled solutions designed around enterprise priorities."
      items={items}
    />
  );
}
