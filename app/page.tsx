import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Clapperboard,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HomepageHero } from "@/components/homepage-hero";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FAQ } from "@/components/faq";
import { homepage } from "@/lib/content";
import { ClienteleSection } from "@/components/eframe/sections/clientele-section";
import { SuccessStoriesSection } from "@/components/eframe/sections/success-stories-section";
import { EventsCarouselSection } from "@/components/eframe/sections/events-carousel-section";
import { fallbackClients, fallbackEvents, fallbackStories, type ClientLogo, type EventGlimpse, type SuccessStory } from "@/components/eframe/data/homepage-sections";
import { sanityFetch } from "@/sanity/lib/fetch";
import { CLIENT_LOGOS_QUERY, EVENTS_QUERY, SUCCESS_STORIES_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Enterprise Learning, Immersive & Digital Solutions",
  description:
    "Eframe creates learning, immersive, creative and enterprise digital experiences built around real business needs.",
};

const icons = [Layers3, Sparkles, BrainCircuit, ShieldCheck, Clapperboard];

type CmsClient = { _id: string; name?: string; logo?: string; displayLabel?: string };
type CmsStory = { _id: string; title?: string; slug?: string; client?: string; category?: string; summary?: string; bodyText?: string; image?: { url?: string; alt?: string } };
type CmsEvent = { _id: string; title?: string; eventDate?: string; alt?: string; image?: { url?: string; alt?: string } };

export default async function Home() {
  const [cmsClients, cmsStories, cmsEvents] = await Promise.all([
    sanityFetch<CmsClient[]>(CLIENT_LOGOS_QUERY, { tags: ["clientele"] }),
    sanityFetch<CmsStory[]>(SUCCESS_STORIES_QUERY, { tags: ["successStories"] }),
    sanityFetch<CmsEvent[]>(EVENTS_QUERY, { tags: ["events"] }),
  ]);
  const clients: ClientLogo[] = cmsClients?.filter((item) => item.logo && item.name).map((item) => ({ id: item._id, name: item.name!, logo: item.logo!, alt: item.displayLabel || `${item.name} logo` })) || [];
  const stories: SuccessStory[] = cmsStories?.filter((item) => item.image?.url && item.title && item.category).map((item) => ({ id: item._id, title: item.title!, slug: item.slug || item._id, client: item.client || "Eframe", category: item.category!, excerpt: item.summary || item.bodyText || "Discover how Eframe transformed this business challenge into a purposeful experience.", image: item.image!.url!, alt: item.image?.alt || item.title! })) || [];
  const events: EventGlimpse[] = cmsEvents?.filter((item) => item.image?.url && item.title).map((item) => ({ id: item._id, title: item.title!, image: item.image!.url!, alt: item.alt || item.image?.alt || item.title!, date: item.eventDate })) || [];
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

        <section className="section-shell py-24 sm:py-32" id="solutions">
          <div className="section-kicker">What we build</div>
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_.72fr] lg:items-end">
            <h2 className="display-title max-w-4xl">
              Technology that moves people and business forward.
            </h2>
            <p className="section-copy lg:pb-2">
              From enterprise learning to immersive safety simulations, every
              solution is shaped around the outcome—not the format.
            </p>
          </div>
          <div className="solution-grid">
            {homepage.solutions.map((solution, index) => {
              const Icon = icons[index];
              return (
                <Link
                  className="solution-card group"
                  href={solution.href}
                  key={solution.title}
                >
                  <Image
                    src={solution.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="solution-shade" />
                  <span className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                    <Icon aria-hidden="true" className="size-8 text-primary" />
                    <span>
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[.2em] text-white/65">
                        0{index + 1}
                      </span>
                      <span className="flex items-end justify-between gap-4 text-2xl font-semibold text-white">
                        {solution.title}
                        <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="mt-3 block max-w-sm text-sm leading-6 text-white/70">
                        {solution.description}
                      </span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="welcome-section" aria-labelledby="welcome-heading">
          <div className="section-shell grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <div className="section-kicker">Who we are</div>
              <h2 id="welcome-heading" className="display-title max-w-3xl">
                Welcome to <span className="text-primary">Eframe.</span>
                <br />
                Ideas built to make an impact.
              </h2>
              <p className="section-copy mt-7">
                Eframe Infomedia brings focused creativity, strategic thinking
                and technology together to solve real business challenges. We
                turn ambitious ideas into learning, immersive and digital
                experiences that are clear, useful and built to perform.
              </p>
              <p className="section-copy mt-4">
                From creative design and film to process digitisation and
                Industry 4.0 solutions, our multidisciplinary team delivers
                work that keeps pace with an ever-evolving world.
              </p>

              <div className="welcome-principles" aria-label="Our creative principles">
                {["Convenient", "Consistent", "Cost-effective"].map((item, index) => (
                  <div className="welcome-principle" key={item}>
                    <span>0{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <Link href="/about-us" className="text-link mt-9 text-foreground">
                Discover our story <ArrowRight />
              </Link>
            </div>

            <div className="welcome-visual">
              <div className="welcome-image welcome-image-main">
                <Image
                  src="/Virtual-Reality-banner.png"
                  alt="Eframe immersive technology experience"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>
              <div className="welcome-image welcome-image-secondary">
                <Image
                  src="/Process-Digitization-banner.png"
                  alt="Eframe process digitisation solution"
                  fill
                  sizes="(max-width: 640px) 48vw, 260px"
                  className="object-cover"
                />
              </div>
              <div className="welcome-note">
                <span>Ideas that</span>
                <strong>win battles, set trends and speak for themselves.</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-24 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div className="relative min-h-[480px] overflow-hidden rounded-[2rem]">
              <Image
                src="/Process-Digitization-banner.png"
                alt="Digital enterprise interface designed by Eframe"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-black/65 p-5 text-white backdrop-blur-md sm:inset-x-8 sm:bottom-8">
                <p className="text-sm text-white/60">AI-enabled solutions</p>
                <p className="mt-1 text-xl font-medium">
                  Useful intelligence, embedded in the flow of work.
                </p>
              </div>
            </div>
            <div>
              <div className="section-kicker">Applied intelligence</div>
              <h2 className="display-title">
                Make complex work easier to learn, manage and improve.
              </h2>
              <p className="section-copy mt-7">
                Eframe brings AI into clearly defined workflows—from faster
                content discovery to guided decision support. The focus stays on
                responsible implementation and measurable operational value.
              </p>
              <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                {[
                  "Knowledge access",
                  "Workflow guidance",
                  "Learning personalisation",
                  "Operational insight",
                ].map((item) => (
                  <li className="feature-pill" key={item}>
                    <Sparkles className="size-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                className="text-link mt-9 text-foreground"
                href="/solutions/ai-enabled-solutions"
              >
                Learn more <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        <ClienteleSection clients={clients.length ? clients : fallbackClients} />

        <SuccessStoriesSection stories={stories.length ? stories : fallbackStories} />

        <EventsCarouselSection events={events.length ? events : fallbackEvents} />

        <section className="bg-primary py-24 sm:py-28">
          <div className="section-shell grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[.2em] text-black/60">
                Why Eframe
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-.04em] text-black sm:text-6xl">
                One partner. Many ways to create meaningful change.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-black/15">
              {[
                "Learning expertise",
                "Creative thinking",
                "End-to-end delivery",
                "Technology capability",
              ].map((item, i) => (
                <div className="bg-primary p-5 sm:p-7" key={item}>
                  <span className="text-sm text-black/45">0{i + 1}</span>
                  <p className="mt-6 font-semibold text-black">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-24 sm:py-32">
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
