import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { FAQ } from "./faq";

export function InternalPage({
  title,
  eyebrow,
  description,
  image = "/banner.png",
  breadcrumbs,
  children,
}: {
  title: string;
  eyebrow: string;
  description: string;
  image?: string;
  breadcrumbs: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="pt-[76px]">
        <section className="relative min-h-[500px] overflow-hidden bg-ink">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="section-shell relative flex min-h-[500px] flex-col justify-end pb-16 pt-24 text-white">
            <nav
              aria-label="Breadcrumb"
              className="mb-10 flex flex-wrap gap-2 text-xs text-white/55"
            >
              <Link href="/">Home</Link>
              {breadcrumbs.map((item) => (
                <span key={item.label}>
                  /{" "}
                  {item.href ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    item.label
                  )}
                </span>
              ))}
            </nav>
            <p className="section-kicker">{eyebrow}</p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-none tracking-[-.05em] sm:text-7xl">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
              {description}
            </p>
          </div>
        </section>
        {children ?? <ServiceBody title={title} />}
      </main>
      <SiteFooter />
    </>
  );
}

function ServiceBody({ title }: { title: string }) {
  const faqs = [
    {
      question: `How does an Eframe ${title} engagement begin?`,
      answer:
        "We begin with discovery to understand the audience, operational context, desired outcome and measures of success before recommending an approach.",
    },
    {
      question: "Can the solution be adapted to our technology environment?",
      answer:
        "Integration and delivery requirements are mapped during discovery so the final solution can work effectively within your existing environment.",
    },
  ];
  return (
    <>
      <section className="section-shell py-24">
        <div className="grid gap-14 lg:grid-cols-[.7fr_1fr]">
          <div>
            <div className="section-kicker">Built around the outcome</div>
            <h2 className="display-title">
              A practical path from challenge to change.
            </h2>
          </div>
          <div>
            <p className="section-copy">
              Eframe combines domain understanding, learning design, creative
              craft and technology delivery. The result is a tailored solution
              that is useful for people and viable for the business.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Focused discovery",
                "Human-centred design",
                "Iterative development",
                "Measured improvement",
              ].map((item) => (
                <div className="feature-pill" key={item}>
                  <CheckCircle2 className="size-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-soft py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-2">
          <div>
            <div className="section-kicker">Our approach</div>
            <h2 className="display-title">Discover. Design. Build. Improve.</h2>
            <p className="section-copy mt-6">
              A collaborative delivery model keeps stakeholders aligned, reduces
              uncertainty and creates room to test the experience before scale.
            </p>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>
      <section className="section-shell py-24">
        <div className="cta-panel">
          <h2 className="max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
            Let&apos;s explore what {title.toLowerCase()} could do for your
            organisation.
          </h2>
          <Link className="cta-button" href="/contact">
            Start a conversation <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
