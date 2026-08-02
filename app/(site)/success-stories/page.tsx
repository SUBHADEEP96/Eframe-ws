import { CatalogListing } from "@/components/catalog-pages";
import { getStories } from "@/lib/cms";
export default async function Page() {
  const items = await getStories();
  return (
    <CatalogListing
      title="Ideas, made tangible."
      eyebrow="Success Stories"
      description="A visual collection of learning, immersive, creative and enterprise work."
      items={items}
    />
  );
}
