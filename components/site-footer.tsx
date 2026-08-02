import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Link as LinkIcon } from "lucide-react";
import { serviceGroups } from "@/lib/content";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell py-16 sm:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Image
              src="/bottom-logo.png"
              alt="Eframe"
              width={170}
              height={58}
              className="h-auto w-40"
            />
            <p className="mt-6 max-w-sm leading-7 text-white/55">
              Learning, immersive, creative and enterprise digital solutions
              shaped around real business needs.
            </p>
            <a
              href="https://www.linkedin.com"
              className="mt-6 inline-flex size-10 items-center justify-center rounded-full border border-white/15"
              aria-label="Eframe on LinkedIn"
            >
              <LinkIcon />
            </a>
          </div>
          <div>
            <h3>Services</h3>
            <div>
              {serviceGroups.map((group) => (
                <Link href={`/services/${group.slug}`} key={group.slug}>
                  {group.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3>Explore</h3>
            <div>
              {[
                ["Solutions", "/solutions"],
                ["Products", "/products"],
                ["Industries", "/industries"],
                ["Success Stories", "/success-stories"],
              ].map(([label, href]) => (
                <Link href={href} key={label}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3>Company</h3>
            <div>
              {[
                ["About", "/about"],
                ["Insights", "/insights"],
                ["Contact", "/contact"],
                ["Case Studies", "/case-studies"],
              ].map(([label, href]) => (
                <Link href={href} key={label}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Eframe Infomedia Pvt. Ltd. All rights
            reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact" className="inline-flex items-center gap-1">
              Contact <ArrowUpRight />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
