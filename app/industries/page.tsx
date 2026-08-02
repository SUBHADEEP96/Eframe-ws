import { CatalogListing } from "@/components/catalog-pages"; import { industries } from "@/lib/catalog";
export default function Page(){return <CatalogListing title="Context changes everything." eyebrow="Industries" description="Experience designed around the realities of each operating environment." items={industries}/>}
