import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getGlobalContent } from "@/lib/cms";
export default async function NotFound() {
  const content = await getGlobalContent();
  return (
    <>
      <SiteHeader content={content} />
      <main className="section-shell flex min-h-[70vh] flex-col items-start justify-center pt-28">
        <p className="section-kicker">404 · Page not found</p>
        <h1 className="display-title max-w-3xl">
          That page has moved—or never existed.
        </h1>
        <p className="section-copy mt-6">
          Explore Eframe&apos;s services and solutions, or return to the
          homepage.
        </p>
        <div className="mt-9 flex gap-4">
          <Link className="cta-button" href="/">
            Go home
          </Link>
          <Link className="cta-button" href="/services">
            Explore services
          </Link>
        </div>
      </main>
      <SiteFooter content={content} />
    </>
  );
}
