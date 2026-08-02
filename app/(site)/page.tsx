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
import { ClientMarquee } from "@/components/client-marquee";
import { getGlobalContent, getHomepage } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Enterprise Learning, Immersive & Digital Solutions",
  description:
    "Eframe creates learning, immersive, creative and enterprise digital experiences built around real business needs.",
};

const icons = [Layers3, Sparkles, BrainCircuit, ShieldCheck, Clapperboard];

export default async function Home() {
  const [homepage, globalContent] = await Promise.all([
    getHomepage(),
    getGlobalContent(),
  ]);
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
      <SiteHeader overlay content={globalContent} />
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
                  href={`/solutions/${solution.slug}`}
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
                        {solution.summary}
                      </span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="overflow-hidden bg-ink py-24 text-white sm:py-32">
          <div className="section-shell grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
            <div>
              <div className="section-kicker text-primary">
                Strategy + solutions
              </div>
              <h2 className="display-title max-w-xl text-white">
                The right technology begins with the right question.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
                We connect business priorities to practical learning and digital
                systems—so teams can perform with greater confidence,
                consistency and visibility.
              </p>
              <Link href="/services" className="text-link mt-9">
                Explore our approach <ArrowRight />
              </Link>
            </div>
            <div
              className="strategy-orbit"
              aria-label="Eframe delivery approach"
            >
              <div className="strategy-core">
                <span>
                  Business
                  <br />
                  outcome
                </span>
              </div>
              {["Discover", "Design", "Build", "Measure"].map((item, index) => (
                <span className={`orbit-label orbit-${index + 1}`} key={item}>
                  {item}
                </span>
              ))}
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

        <section
          className="bg-soft py-20 sm:py-24"
          aria-labelledby="clients-heading"
        >
          <div className="section-shell">
            <div className="text-center">
              <div className="section-kicker justify-center">
                Trusted relationships
              </div>
              <h2
                id="clients-heading"
                className="text-3xl font-semibold sm:text-4xl"
              >
                Clients at a glance
              </h2>
            </div>
            <div className="mt-12">
              <ClientMarquee clients={homepage.clients} />
            </div>
          </div>
        </section>

        <section className="section-shell py-24 sm:py-32">
          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="section-kicker">Selected work</div>
              <h2 className="display-title">Ideas, made tangible.</h2>
            </div>
            <Link className="text-link text-foreground" href="/success-stories">
              View success stories <ArrowRight />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {homepage.stories.map((story, index) => (
              <Link
                href={`/success-stories/${story.slug}`}
                className={`story-card ${index === 0 ? "md:col-span-2" : ""}`}
                key={story.title}
              >
                <Image
                  src={story.image}
                  alt={`${story.title} project image`}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                  className="object-cover transition duration-700 hover:scale-105"
                />
                <span className="story-overlay">
                  <span className="text-xs font-semibold uppercase tracking-[.18em] text-primary">
                    {story.category}
                  </span>
                  <span className="mt-2 block max-w-lg text-2xl font-semibold text-white sm:text-3xl">
                    {story.title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {homepage.testimonials.length ? (
          <section className="bg-soft py-24">
            <div className="section-shell">
              <div className="section-kicker">Client perspectives</div>
              <h2 className="display-title">What our partners say.</h2>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {homepage.testimonials.map((item) => (
                  <blockquote
                    className="rounded-2xl bg-white p-8"
                    key={item._id}
                  >
                    <p className="text-xl leading-8">
                      {item.quote ?? item.title}
                    </p>
                    <footer className="mt-5 text-sm text-muted-foreground">
                      {item.personName}
                      {item.personRole ? ` · ${item.personRole}` : ""}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {homepage.events.length ? (
          <section className="section-shell py-24">
            <div className="section-kicker">Pictures & events</div>
            <h2 className="display-title">Life at Eframe.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {homepage.events.map((event) => (
                <article
                  className="overflow-hidden rounded-2xl border"
                  key={event._id}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={event.image}
                      alt={`${event.title} event`}
                      fill
                      sizes="(max-width:768px) 100vw,33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {event.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

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
      <SiteFooter content={globalContent} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
