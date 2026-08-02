import type { Metadata } from "next"; import { notFound } from "next/navigation"; import { CatalogDetail } from "@/components/catalog-pages"; import { solutions } from "@/lib/catalog";
type Props={params:Promise<{slug:string}>}; export function generateStaticParams(){return solutions.map(({slug})=>({slug}))};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const x=solutions.find(i=>i.slug===slug);return x?{title:x.title,description:x.summary,alternates:{canonical:`/solutions/${x.slug}`}}:{}};
export default async function Page({params}:Props){const {slug}=await params;const x=solutions.find(i=>i.slug===slug);if(!x)notFound();return <CatalogDetail item={x} section="Solutions"/>}
