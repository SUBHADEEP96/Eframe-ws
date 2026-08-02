import Image from "next/image";
import type { CmsClient } from "@/lib/cms";

function Row({
  items,
  reverse = false,
}: {
  items: CmsClient[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee" data-reverse={reverse}>
      <div className="marquee-track">
        {doubled.map((client, index) => (
          <div
            className="marquee-cell"
            key={`${client.name}-${index}`}
            aria-hidden={index >= items.length || undefined}
          >
            <Image
              src={client.logo}
              alt={index < items.length ? client.displayLabel : ""}
              width={200}
              height={96}
              sizes="180px"
              className="max-h-20 w-auto max-w-[210px] object-contain  "
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientMarquee({ clients }: { clients: CmsClient[] }) {
  const midpoint = Math.ceil(clients.length / 2);

  return (
    <div className="client-marquee" aria-label="Selected Eframe clients">
      <Row items={clients.slice(0, midpoint)} />
      <Row items={clients.slice(midpoint)} reverse />
    </div>
  );
}
