import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { HomepageHero } from "@/components/homepage-hero";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FAQ } from "@/components/faq";
import { homepage } from "@/lib/content";
import { ClienteleSection } from "@/components/eframe/sections/clientele-section";
import { SuccessStoriesSection } from "@/components/eframe/sections/success-stories-section";
import { EventsCarouselSection } from "@/components/eframe/sections/events-carousel-section";
import { TechnologySolutionsSection } from "@/components/technology-solutions-section";
import { TestimonialsSection } from "@/components/eframe/sections/testimonials-section";
import { ServiceGroupGrid } from "@/components/service-group-grid";
import { ContactForm } from "@/components/contact-form";
import {
  fallbackClients,
  fallbackEvents,
  fallbackStories,
  type ClientLogo,
  type EventGlimpse,
  type SuccessStory,
  type Testimonial,
} from "@/components/eframe/data/homepage-sections";
import { sanityFetch } from "@/sanity/lib/fetch";
import { stories as catalogStories } from "@/lib/catalog";
import {
  CLIENT_LOGOS_QUERY,
  EVENTS_QUERY,
  SUCCESS_STORIES_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Enterprise Learning, Immersive & Digital Solutions",
  description:
    "Eframe creates learning, immersive, creative and enterprise digital experiences built around real business needs.",
};
type CmsClient = {
  _id: string;
  name?: string;
  logo?: string;
  displayLabel?: string;
};
type CmsStory = {
  _id: string;
  title?: string;
  slug?: string;
  client?: string;
  category?: string;
  summary?: string;
  bodyText?: string;
  image?: { url?: string; alt?: string };
};
type CmsTestimonial = {
  _id: string; title?: string; personName?: string; personRole?: string; company?: string; quote?: string; mediaType?: "image" | "video";
  image?: { url?: string; alt?: string }; videoUrl?: string; videoPosterUrl?: string; accessibleLabel?: string;
};
type CmsEvent = {
  _id: string;
  title?: string;
  eventDate?: string;
  alt?: string;
  image?: { url?: string; alt?: string };
};

export default async function Home() {
  const [cmsClients, cmsStories, cmsEvents, cmsTestimonials] = await Promise.all([
    sanityFetch<CmsClient[]>(CLIENT_LOGOS_QUERY, { tags: ["clientele"] }),
    sanityFetch<CmsStory[]>(SUCCESS_STORIES_QUERY, {
      tags: ["successStories"],
    }),
    sanityFetch<CmsEvent[]>(EVENTS_QUERY, { tags: ["events"] }),
    sanityFetch<CmsTestimonial[]>(TESTIMONIALS_QUERY, { tags: ["testimonials"] }),
  ]);
  const clients: ClientLogo[] =
    cmsClients
      ?.filter((item) => item.logo && item.name)
      .map((item) => ({
        id: item._id,
        name: item.name!,
        logo: item.logo!,
        alt: item.displayLabel || `${item.name} logo`,
      })) || [];
  const detailSlugs = new Set(catalogStories.map((story) => story.slug));
  const stories: SuccessStory[] =
    cmsStories
      ?.filter((item) => item.image?.url && item.title && item.category)
      .map((item) => ({
        id: item._id,
        title: item.title!,
        slug: item.slug || item._id,
        client: item.client || "Eframe",
        category: item.category!,
        excerpt:
          item.summary ||
          item.bodyText ||
          "Discover how Eframe transformed this business challenge into a purposeful experience.",
        image: item.image!.url!,
        alt: item.image?.alt || item.title!,
        href: detailSlugs.has(item.slug || item._id)
          ? `/success-stories/${item.slug || item._id}`
          : "/success-stories",
      })) || [];
  const events: EventGlimpse[] =
    cmsEvents
      ?.filter((item) => item.image?.url && item.title)
      .map((item) => ({
        id: item._id,
        title: item.title!,
        image: item.image!.url!,
        alt: item.alt || item.image?.alt || item.title!,
        date: item.eventDate,
      })) || [];
  const testimonials: Testimonial[] = cmsTestimonials?.filter((item) => item.title && item.personName && item.quote && ((item.mediaType === "video" && item.videoUrl) || (item.mediaType !== "video" && item.image?.url))).map((item) => ({
    id: item._id, title: item.title!, personName: item.personName!, personRole: item.personRole, company: item.company, quote: item.quote!, mediaType: item.mediaType === "video" ? "video" : "image",
    image: item.image?.url ? { url: item.image.url, alt: item.image.alt || item.accessibleLabel || `Portrait of ${item.personName}` } : undefined, videoUrl: item.videoUrl, videoPosterUrl: item.videoPosterUrl, accessibleLabel: item.accessibleLabel,
  })) || [];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepage.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <SiteHeader overlay />
      <main>
        <HomepageHero slides={homepage.heroSlides} />

        <section
          className="bg-primary py-20 sm:py-24"
          aria-labelledby="about-heading"
        >
          <div className="section-shell">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-black/60">
              Who we are
            </p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_.75fr] lg:items-end">
              <div>
                <h2
                  id="about-heading"
                  className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-.04em] text-black sm:text-6xl"
                >
                  Ideas built to make an impact.
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-7 text-black/70 sm:text-lg">
                  Eframe brings creative learning, digital systems and immersive
                  technology together to make enterprise communication
                  practical, clear and useful.
                </p>
              </div>
              <ul
                className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-black/15"
                aria-label="What we bring together"
              >
                {[
                  "Creative learning",
                  "Digital systems",
                  "Immersive technology",
                  "Enterprise communication",
                ].map((item) => (
                  <li
                    className="bg-primary p-4 text-sm font-semibold text-black sm:p-5"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <TechnologySolutionsSection />

        <div id="clientele">
          <ClienteleSection clients={clients.length ? clients : fallbackClients} />
        </div>

        <section className="section-shell py-20 sm:py-28" id="services" aria-labelledby="services-heading">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <div className="section-kicker mb-0">What we do</div>
            <h2 id="services-heading" className="display-title">Services built around the outcome.</h2>
            <p className="section-copy">Four connected service groups, delivered with the right balance of creative thinking and technology.</p>
          </div>
          <div className="mt-12"><ServiceGroupGrid /></div>
        </section>

        <TestimonialsSection testimonials={testimonials} />
        <EventsCarouselSection events={events.length ? events : fallbackEvents} />
        <SuccessStoriesSection stories={stories.length ? stories : fallbackStories} />

        <section className="bg-primary py-14 sm:py-16" aria-labelledby="milestone-heading">
          <div className="section-shell">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-black/60">Our journey</p><h2 id="milestone-heading" className="mt-3 text-4xl font-semibold tracking-[-.04em] text-black sm:text-5xl">Milestones</h2></div>
              <p className="max-w-md text-black/65">Innovation and excellence, built through the years.</p>
            </div>
            <ul className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-black/20 bg-primary lg:grid-cols-5">
              {[["20+", "Years of experience"], ["156+", "AV content created"], ["247+", "Hours of VR content created"], ["892+", "Projects delivered"], ["10,000+", "Users across industries"]].map(([value, label]) => (
                <li className="min-w-0 border-b border-r border-black/15 p-5 last:col-span-2 sm:p-6 lg:last:col-span-1" key={label}><strong className="block text-3xl font-semibold tracking-tight text-black sm:text-4xl">{value}</strong><span className="mt-2 block text-sm font-medium leading-5 text-black/65">{label}</span></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-shell py-20 sm:py-28">
          <div className="grid gap-16 lg:grid-cols-[.72fr_1fr]">
            <div>
              <div className="section-kicker">Questions, answered</div>
              <h2 className="display-title">
                A clear start to your next initiative.
              </h2>
              <p className="section-copy mt-6">
                Every engagement is different. These answers explain how we
                typically begin.
              </p>
            </div>
            <FAQ items={homepage.faqs} />
          </div>
        </section>
        <section id="contact" className="bg-soft py-20 sm:py-24" aria-labelledby="contact-heading">
          <div className="section-shell grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div><p className="section-kicker">Let&apos;s build what&apos;s next</p><h2 id="contact-heading" className="display-title">Bring us the challenge. We&apos;ll help shape the way forward.</h2><p className="section-copy mt-6">Tell us what you are trying to change. We will help you find a clear, practical way forward.</p>
              <address className="mt-8 flex flex-col gap-5 not-italic text-sm"><p className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-primary" />E405, DC Block, City Centre, Sector - 1, Salt Lake, Kolkata - 700 064</p><a className="flex gap-3" href="mailto:info@eframe.in"><Mail className="size-5 text-primary" />info@eframe.in</a><a className="flex gap-3" href="tel:+919674032010"><Phone className="size-5 text-primary" />+91 9674032010</a></address>
            </div><ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
