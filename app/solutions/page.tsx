import type { Metadata } from "next"; import { CatalogListing } from "@/components/catalog-pages"; import { solutions } from "@/lib/catalog";
export const metadata:Metadata={title:"Enterprise Solutions",description:"Explore Eframe learning, safety, immersive and AI-enabled solutions.",alternates:{canonical:"/solutions"}};
export default function Page(){return <CatalogListing title="Solutions for the work that matters." eyebrow="Solutions" description="Connected learning, safety, immersive and AI-enabled solutions designed around enterprise priorities." items={solutions}/>}
