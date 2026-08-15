import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ClientLogo } from "../data/homepage-sections";

export function ClienteleSection({ clients }: { clients: ClientLogo[] }) {
  const unique = clients.filter((client, index, all) =>
    all.findIndex((item) => item.name.trim().toLowerCase() === client.name.trim().toLowerCase()) === index,
  );

  return (
    <section className="relative overflow-hidden bg-muted/50 py-20 sm:py-28" aria-labelledby="clients-heading">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_38%)]" />
      <div className="section-shell relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <Badge variant="outline">Trusted relationships</Badge>
          <h2 id="clients-heading" className="display-title">Clients at a glance</h2>
          <p className="section-copy">From safety and learning to immersive technology and digital transformation, Eframe has partnered with leading organizations across industries.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {unique.map((client) => (
            <Card key={client.id} className="group min-w-0 border-border/70 bg-card/90 py-0 shadow-sm transition duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0">
              <CardContent className="relative flex aspect-[1.55] items-center justify-center p-5 sm:p-6">
                <Image src={client.logo} alt={client.alt || `${client.name} logo`} fill sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 180px" className="object-contain p-5" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
