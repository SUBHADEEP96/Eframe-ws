import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InternalPage } from "@/components/internal-page";
import { getServiceGroups, getServices } from "@/lib/cms";
export default async function Page() {
  const [groups, services] = await Promise.all([
    getServiceGroups(),
    getServices(),
  ]);
  return (
    <InternalPage
      title="Services built for meaningful change."
      eyebrow="Our services"
      description="Strategy, creativity and technology—connected to help people perform and organisations move forward."
      breadcrumbs={[{ label: "Services" }]}
    >
      <section className="section-shell py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {(groups.length
            ? groups
            : services.map((x) => ({
                title: x.title,
                slug: x.slug,
                description: x.summary,
                children: [],
              }))
          ).map((group, i) => (
            <Link
              href={`/services/${group.slug}`}
              className="group rounded-2xl bg-muted p-8 sm:p-10"
              key={group.slug}
            >
              <span className="text-sm text-primary">0{i + 1}</span>
              <h2 className="mt-8 text-3xl font-semibold">{group.title}</h2>
              <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
                {group.description}
              </p>
              <span className="text-link mt-8">
                Explore service <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </InternalPage>
  );
}
