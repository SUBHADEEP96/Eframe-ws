import { CatalogListing } from "@/components/catalog-pages";
import { getCaseStudies } from "@/lib/cms";
export default async function Page() {
  const items = await getCaseStudies();
  return (
    <CatalogListing
      title="A closer look at the work."
      eyebrow="Case Studies"
      description="Detailed project narratives built from verified Eframe work."
      items={items}
    />
  );
}
