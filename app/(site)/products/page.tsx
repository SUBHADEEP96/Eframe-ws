import { CatalogListing } from "@/components/catalog-pages";
import { getProducts } from "@/lib/cms";
export default async function Page() {
  return (
    <CatalogListing
      title="Purpose-built technology."
      eyebrow="Products"
      description="Eframe platforms and products help organisations deliver learning and digitise critical work."
      items={await getProducts()}
    />
  );
}
