import Image from "next/image";
import { clients } from "@/lib/catalog";

function Row({items,reverse=false}:{items:typeof clients;reverse?:boolean}) {
 const doubled=[...items,...items];
 return <div className="marquee" data-reverse={reverse}>
  <div className="marquee-track">
   {doubled.map((client,index)=><div className="marquee-cell" key={`${client.name}-${index}`} aria-hidden={index>=items.length||undefined}>
    <Image src={client.logo} alt={index<items.length?client.displayLabel:""} width={160} height={72} sizes="160px" className="max-h-12 w-auto max-w-[140px] object-contain grayscale transition hover:grayscale-0" />
   </div>)}
  </div>
 </div>
}
export function ClientMarquee(){const midpoint=Math.ceil(clients.length/2);return <div className="client-marquee" aria-label="Selected Eframe clients"><Row items={clients.slice(0,midpoint)}/><Row items={clients.slice(midpoint)} reverse/></div>}
