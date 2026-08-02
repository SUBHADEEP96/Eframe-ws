import { CatalogListing } from "@/components/catalog-pages"; import { caseStudies } from "@/lib/catalog";
export default function Page(){return <CatalogListing title="A closer look at the work." eyebrow="Case Studies" description="Detailed project narratives built from verified Eframe work." items={caseStudies}/>}
