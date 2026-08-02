import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiFacebook, SiYoutube, SiInstagram } from "react-icons/si";
import { ImLinkedin2 } from "react-icons/im";

import { serviceGroups } from "@/lib/content";
export function SiteFooter() {
  const socials = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/28124515/",
      Icon: ImLinkedin2,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/eframe.infomedia",
      Icon: SiFacebook,
    },
    {
      label: "YouTube",
      href: "https://youtube.com/channel/UC-CUXTkd1dwbyPSCN-yadnw",
      Icon: SiYoutube,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/eframehub/",
      Icon: SiInstagram,
    },
  ] as const;
  return (
    <footer className="site-footer">
      <svg
        className="footer-wave"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 52C230 2 430 0 720 38c290 38 500 32 720-20v54H0Z"
          fill="#f0bf4c"
        />
      </svg>
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

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Eframe on ${label}`}
                  className="
        inline-flex size-11 items-center justify-center
        rounded-full border border-black/20
        text-black transition duration-200
        hover:-translate-y-1 hover:bg-black hover:text-[#f0bf4c]
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-black
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#f0bf4c]
      "
                >
                  <Icon
                    className="size-5"
                    aria-hidden="true"
                    focusable="false"
                  />
                </a>
              ))}
            </div>

            {/*  */}
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
          <div className="lg:col-span-2">
            <h3>Contact</h3>
            <div>
              <span>
                E405, DC Block, City Centre, Sector - 1, Salt Lake, Kolkata -
                700 064
              </span>
              <a href="mailto:info@eframe.in">info@eframe.in</a>
              <a href="tel:+919674032010">+91 9674032010</a>
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
