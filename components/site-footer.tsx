import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Link as SocialIcon } from "lucide-react";
import { serviceGroups } from "@/lib/content";
export function SiteFooter() {
  const socials = [
    ["LinkedIn", "https://www.linkedin.com/company/28124515/", SocialIcon],
    ["Facebook", "https://www.facebook.com/eframe.infomedia", SocialIcon],
    ["YouTube", "https://youtube.com/channel/UC-CUXTkd1dwbyPSCN-yadnw", SocialIcon],
    ["Instagram", "https://www.instagram.com/eframehub/", SocialIcon],
  ] as const;
  return (
    <footer className="site-footer">
      <svg className="footer-wave" viewBox="0 0 1440 72" preserveAspectRatio="none" aria-hidden="true"><path d="M0 52C230 2 430 0 720 38c290 38 500 32 720-20v54H0Z" fill="#f0bf4c"/></svg>
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
            <p className="mt-6 max-w-sm leading-7 text-black/75">
              Learning, immersive, creative and enterprise digital solutions
              shaped around real business needs.
            </p>
            <div className="mt-6 flex gap-3">{socials.map(([label,href,Icon])=><a href={href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={`Eframe on ${label}`} key={label}><Icon aria-hidden="true"/></a>)}</div>
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
          <div className="lg:col-span-2"><h3>Contact</h3><div><span>E405, DC Block, City Centre, Sector - 1, Salt Lake, Kolkata - 700 064</span><a href="mailto:info@eframe.in">info@eframe.in</a><a href="tel:+919674032010">+91 9674032010</a></div></div>
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
        <div className="flex flex-col gap-4 pt-7 text-xs text-black/70 sm:flex-row sm:items-center sm:justify-between">
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
