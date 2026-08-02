import { Mail, MapPin, Phone } from "lucide-react";
import { getGlobalContent } from "@/lib/cms";
import { InternalPage } from "@/components/internal-page";
import { ContactForm } from "@/components/contact-form";
export default async function Page() {
  const { contact } = await getGlobalContent();
  const { address, phones, email } = contact;
  return (
    <InternalPage
      title="Bring us your next challenge."
      eyebrow="Contact Eframe"
      description="Tell us what you are trying to change. We will help you find a clear, practical way forward."
      image="/contact_img.png"
      breadcrumbs={[{ label: "Contact" }]}
    >
      <section className="section-shell py-20">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <aside>
            <p className="section-kicker">Corporate office</p>
            <h2 className="text-3xl font-semibold">
              Let&apos;s start a conversation.
            </h2>
            <address className="mt-8 flex flex-col gap-6 not-italic">
              <p className="flex gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-primary" />
                {address}
              </p>
              <div className="flex gap-3">
                <Phone className="mt-1 size-5 shrink-0 text-primary" />
                <div className="flex flex-col gap-2">
                  {phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replaceAll(" ", "")}`}>
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <a className="flex gap-3" href={`mailto:${email}`}>
                <Mail className="size-5 text-primary" />
                {email}
              </a>
            </address>
          </aside>
          <ContactForm />
        </div>
        <div className="mt-16 overflow-hidden rounded-2xl border bg-soft">
          <iframe
            className="h-[380px] w-full"
            title="Map showing Eframe corporate office in Salt Lake, Kolkata"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=88.404%2C22.57%2C88.43%2C22.595&layer=mapnik&marker=22.582%2C88.417`}
          />
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p>{address}</p>
            <a
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            >
              Get directions
            </a>
          </div>
        </div>
      </section>
    </InternalPage>
  );
}
