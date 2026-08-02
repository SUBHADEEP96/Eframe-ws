import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { InternalPage } from "./internal-page";
import type { CatalogItem } from "@/lib/catalog";

export function CatalogListing({title,eyebrow,description,items}:{title:string;eyebrow:string;description:string;items:CatalogItem[]}){
 return <InternalPage title={title} eyebrow={eyebrow} description={description} breadcrumbs={[{label:eyebrow}]} image={items[0]?.image}>
  <section className="section-shell py-20"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{items.map(item=><Link href={`/${eyebrow.toLowerCase().replaceAll(" ","-")}/${item.slug}`} className="group overflow-hidden rounded-2xl border bg-white" key={item.slug}><div className="relative aspect-[16/10]"><Image src={item.image} alt="" fill sizes="(max-width:768px) 100vw,33vw" className="object-cover transition duration-500 group-hover:scale-105"/></div><div className="p-6"><p className="text-xs font-semibold uppercase tracking-widest text-primary">{item.client??item.category??item.eyebrow}</p><h2 className="mt-3 text-2xl font-semibold">{item.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{item.summary}</p><span className="text-link mt-6">Explore <ArrowRight/></span></div></Link>)}</div></section>
 </InternalPage>
}
export function CatalogDetail({item,section}:{item:CatalogItem;section:string}){
 const faqs=item.faq??[{question:`What did Eframe create for ${item.client??item.title}?`,answer:item.overview}];
 return <InternalPage title={item.title} eyebrow={item.eyebrow} description={item.summary} image={item.image} breadcrumbs={[{label:section,href:`/${section.toLowerCase().replaceAll(" ","-")}`},{label:item.title}]}>
  <section className="section-shell py-20"><div className="grid gap-12 lg:grid-cols-[.7fr_1fr]"><div><p className="section-kicker">Overview</p><h2 className="display-title">Designed for the real context.</h2></div><p className="section-copy">{item.overview}</p></div></section>
  <section className="bg-soft py-20"><div className="section-shell grid gap-12 md:grid-cols-2"><div><h2 className="text-3xl font-semibold">Capabilities</h2><ul className="mt-7 flex flex-col gap-3">{item.features.map(x=><li className="feature-pill bg-white" key={x}><CheckCircle2 className="size-4 text-primary"/>{x}</li>)}</ul></div><div><h2 className="text-3xl font-semibold">What it supports</h2><ul className="mt-7 flex flex-col gap-3">{item.benefits.map(x=><li className="feature-pill bg-white" key={x}><CheckCircle2 className="size-4 text-primary"/>{x}</li>)}</ul></div></div></section>
  {item.gallery?.length?<section className="section-shell py-20"><h2 className="display-title">Project gallery</h2><div className="mt-10 grid gap-5 md:grid-cols-2">{item.gallery.map(src=><div className="relative aspect-video overflow-hidden rounded-2xl" key={src}><Image src={src} alt={`${item.title} project view`} fill sizes="(max-width:768px) 100vw,50vw" className="object-cover"/></div>)}</div></section>:null}
  <section className="section-shell py-20"><div className="grid gap-12 lg:grid-cols-2"><div><p className="section-kicker">Questions answered</p><h2 className="display-title">Planning your next step.</h2></div><div className="faq-list">{faqs.map(x=><details className="faq-item" key={x.question}><summary>{x.question}<span>+</span></summary><p>{x.answer}</p></details>)}</div></div><div className="cta-panel mt-20"><h2 className="text-3xl font-semibold text-white">Bring us your next challenge.</h2><Link href="/contact" className="cta-button">Start a conversation <ArrowRight/></Link></div></section>
 </InternalPage>
}
