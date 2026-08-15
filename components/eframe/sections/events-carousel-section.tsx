"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { EventGlimpse } from "../data/homepage-sections";

export function EventsCarouselSection({ events }: { events: EventGlimpse[] }) {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  if (!events.length) return null;
  const move = (direction: number) => setActive((current) => (current + direction + events.length) % events.length);

  return <section className="overflow-hidden bg-background py-20 sm:py-28" aria-labelledby="events-heading">
    <div className="section-shell">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"><Badge variant="outline">Life at Eframe</Badge><h2 id="events-heading" className="display-title">Events &amp; moments</h2><p className="section-copy">Glimpses of the people, partnerships and hands-on experiences behind our work.</p></div>
      <div className="relative mt-12 h-[290px] sm:h-[420px] lg:h-[520px]" role="region" aria-roledescription="carousel" aria-label="Eframe event glimpses" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1); touchStart.current = null; }}>
        {events.map((event, index) => {
          const raw = (index - active + events.length) % events.length;
          const offset = raw > events.length / 2 ? raw - events.length : raw;
          const visible = Math.abs(offset) <= 2;
          return <figure key={event.id} aria-hidden={index !== active} className="absolute left-1/2 top-1/2 aspect-[16/10] w-[82%] max-w-[820px] overflow-hidden rounded-2xl bg-muted shadow-2xl transition-[transform,opacity,filter] duration-500 ease-out motion-reduce:transition-none" style={{ opacity: visible ? offset === 0 ? 1 : Math.abs(offset) === 1 ? .55 : .18 : 0, transform: `translate(-50%, -50%) translateX(${offset * 58}%) scale(${offset === 0 ? 1 : Math.abs(offset) === 1 ? .78 : .62}) perspective(1200px) rotateY(${offset * -8}deg)`, zIndex: 10 - Math.abs(offset), pointerEvents: offset === 0 ? "auto" : "none" }}>
            <Image src={event.image} alt={event.alt} fill sizes="(max-width: 640px) 82vw, 820px" className="object-cover" />
            {offset === 0 && <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-16 text-sm font-medium text-white sm:px-7 sm:pb-7 sm:text-lg">{event.title}</figcaption>}
          </figure>;
        })}
        <Button size="icon-lg" variant="outline" className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-background/90 shadow-md sm:left-4" onClick={() => move(-1)} aria-label="Previous glimpse"><ChevronLeft /></Button>
        <Button size="icon-lg" variant="outline" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-background/90 shadow-md sm:right-4" onClick={() => move(1)} aria-label="Next glimpse"><ChevronRight /></Button>
      </div>
      <div className="mt-3 flex justify-center gap-2" aria-label="Choose a glimpse">{events.map((event, index) => <button key={event.id} type="button" onClick={() => setActive(index)} aria-label={`Show glimpse ${index + 1}: ${event.title}`} aria-current={index === active ? "true" : undefined} className="flex size-11 items-center justify-center"><span className={`h-1.5 rounded-full bg-primary transition-all motion-reduce:transition-none ${index === active ? "w-7" : "w-1.5 opacity-30"}`} /></button>)}</div>
    </div>
  </section>;
}
