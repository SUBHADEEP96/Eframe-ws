import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomepageHero } from "@/components/homepage-hero";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FAQ } from "@/components/faq";
import { homepage } from "@/lib/content";
import { ClienteleSection } from "@/components/eframe/sections/clientele-section";
import { SuccessStoriesSection } from "@/components/eframe/sections/success-stories-section";
import { EventsCarouselSection } from "@/components/eframe/sections/events-carousel-section";
import { TechnologySolutionsSection } from "@/components/technology-solutions-section";
import {
  fallbackClients,
  fallbackEvents,
  fallbackStories,
  type ClientLogo,
  type EventGlimpse,
  type SuccessStory,
} from "@/components/eframe/data/homepage-sections";
import { sanityFetch } from "@/sanity/lib/fetch";
import { stories as catalogStories } from "@/lib/catalog";
import {
  CLIENT_LOGOS_QUERY,
  EVENTS_QUERY,
  SUCCESS_STORIES_QUERY,
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
type CmsEvent = {
  _id: string;
  title?: string;
  eventDate?: string;
  alt?: string;
  image?: { url?: string; alt?: string };
};

export default async function Home() {
  const [cmsClients, cmsStories, cmsEvents] = await Promise.all([
    sanityFetch<CmsClient[]>(CLIENT_LOGOS_QUERY, { tags: ["clientele"] }),
    sanityFetch<CmsStory[]>(SUCCESS_STORIES_QUERY, {
      tags: ["successStories"],
    }),
    sanityFetch<CmsEvent[]>(EVENTS_QUERY, { tags: ["events"] }),
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

        <section
          className="section-shell py-20 sm:py-28"
          id="services"
          aria-labelledby="services-heading"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <div className="section-kicker mb-0">What we do</div>
            <h2 id="services-heading" className="display-title">
              Services built around the outcome.
            </h2>
            <p className="section-copy">
              Eight connected capabilities, delivered with the right balance of
              creative thinking and technology.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homepage.services.map((service) => (
              <Link
                className="service-card group"
                href={service.href}
                key={service.title}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>
                  <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-primary">
                    Explore service{" "}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <EventsCarouselSection
          events={events.length ? events : fallbackEvents}
        />
        <div id="clientele">
          <ClienteleSection
            clients={clients.length ? clients : fallbackClients}
          />
        </div>
        <SuccessStoriesSection
          stories={stories.length ? stories : fallbackStories}
        />

        <section
          className="relative overflow-hidden bg-primary py-16 sm:py-20"
          aria-labelledby="milestone-heading"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            aria-hidden="true"
          >
            <div className="absolute -bottom-32 left-1/2 h-64 w-[72rem] -translate-x-1/2 rounded-[50%] border border-black/30" />
            <div className="absolute -bottom-40 left-1/2 h-64 w-[58rem] -translate-x-1/2 rounded-[50%] border border-black/20" />
          </div>
          <div className="section-shell relative">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[.2em] text-black/60">
                Our journey
              </p>
              <h2
                id="milestone-heading"
                className="mt-4 text-4xl font-semibold tracking-[-.04em] text-black sm:text-6xl"
              >
                Milestones
              </h2>
              <p className="mt-4 text-black/65">
                Innovation and excellence, built through the years.
              </p>
            </div>
            <ul className="mt-10 grid overflow-hidden rounded-2xl border border-black/20 bg-black/10 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ["20+", "Years of experience"],
                ["156+", "AV content created"],
                ["247+", "Hours of VR content created"],
                ["892+", "Projects delivered"],
                ["10,000+", "Users across industries"],
              ].map(([value, label]) => (
                <li
                  className="flex min-h-40 flex-col items-center justify-center border-black/15 p-6 text-center sm:border-r sm:last:border-r-0"
                  key={label}
                >
                  <strong className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
                    {value}
                  </strong>
                  <span className="mt-3 text-sm font-medium text-black/65">
                    {label}
                  </span>
                </li>
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
        <section className="section-shell pb-24">
          <div className="cta-panel">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[.2em] text-primary">
                Let&apos;s build what&apos;s next
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Bring us the challenge. We&apos;ll help shape the way forward.
              </h2>
            </div>
            <Link href="/contact" className="cta-button">
              Start a conversation <ArrowRight />
            </Link>
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
