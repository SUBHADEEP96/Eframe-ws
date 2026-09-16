import type { Metadata } from "next";
import { InternalPage } from "@/components/internal-page";
import { ServiceGroupGrid } from "@/components/service-group-grid";
export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Eframe learning, immersive, creative and enterprise services.",
};
export default function ServicesPage() {
  return (
    <InternalPage
      title="Services built for meaningful change."
      eyebrow="Our services"
      description="Strategy, creativity and technology—connected to help people perform and organisations move forward."
      image={null}
      breadcrumbs={[{ label: "Services" }]}
    >
      <section className="section-shell py-24">
        <ServiceGroupGrid />
      </section>
    </InternalPage>
  );
}
