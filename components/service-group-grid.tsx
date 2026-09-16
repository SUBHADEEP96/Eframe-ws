import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceGroups } from "@/lib/content";

export function ServiceGroupGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {serviceGroups.map((group, index) => (
        <Link href={`/services/${group.slug}`} className="group flex min-h-64 flex-col rounded-2xl border border-border/70 bg-muted p-7 transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-9" key={group.slug}>
          <span className="text-xs font-semibold uppercase tracking-[.2em] text-primary">{String(index + 1).padStart(2, "0")} / Service</span>
          <h3 className="mt-7 text-2xl font-semibold tracking-tight sm:text-3xl">{group.title}</h3>
          <p className="mt-3 max-w-lg leading-7 text-muted-foreground">{group.description}</p>
          <span className="text-link mt-auto pt-7">Explore service <ArrowRight /></span>
        </Link>
      ))}
    </div>
  );
}
