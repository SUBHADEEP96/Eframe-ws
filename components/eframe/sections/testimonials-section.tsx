import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Testimonial } from "../data/homepage-sections";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;
  return (
    <section className="bg-ink py-20 text-white sm:py-24" aria-labelledby="testimonials-heading">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[.7fr_1fr] lg:items-end">
          <div><Badge variant="outline" className="border-white/20 text-white">Client perspectives</Badge><h2 id="testimonials-heading" className="display-title mt-5">Hear from our clients</h2></div>
          <p className="max-w-2xl text-base leading-7 text-white/65 lg:justify-self-end">First-hand perspectives on the partnerships, ideas and experiences we create together.</p>
        </div>
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0 lg:pb-0">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="min-w-[calc(100vw-2.5rem)] snap-center overflow-hidden border-white/10 bg-white/5 py-0 text-white shadow-none sm:min-w-[min(76vw,38rem)] lg:min-w-0">
              <div className="relative aspect-[16/9] overflow-hidden bg-black/30">
                {testimonial.mediaType === "video" && testimonial.videoUrl ? (
                  <video className="size-full object-cover" controls playsInline preload="metadata" poster={testimonial.videoPosterUrl} aria-label={testimonial.accessibleLabel || `Video testimonial from ${testimonial.personName}`}><source src={testimonial.videoUrl} /></video>
                ) : testimonial.image ? (
                  <Image src={testimonial.image.url} alt={testimonial.image.alt} fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover" />
                ) : null}
              </div>
              <CardHeader className="gap-3 p-6 sm:p-8"><blockquote className="text-lg leading-8 text-white/85">“{testimonial.quote}”</blockquote></CardHeader>
              <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8"><p className="font-semibold">{testimonial.personName}</p>{(testimonial.personRole || testimonial.company) && <p className="mt-1 text-sm text-white/55">{[testimonial.personRole, testimonial.company].filter(Boolean).join(" · ")}</p>}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
