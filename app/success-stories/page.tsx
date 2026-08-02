import { CatalogListing } from "@/components/catalog-pages"; import { stories } from "@/lib/catalog";
export default function Page(){return <CatalogListing title="Ideas, made tangible." eyebrow="Success Stories" description="Verified Eframe projects across learning, immersive, creative and enterprise work." items={stories}/>}
