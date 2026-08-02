import { CatalogListing } from "@/components/catalog-pages";
import { getIndustries } from "@/lib/cms";
export default async function Page() {
  const items = await getIndustries();
  return (
    <CatalogListing
      title="Context changes everything."
      eyebrow="Industries"
      description="Experience designed around the realities of each operating environment."
      items={items}
    />
  );
}
