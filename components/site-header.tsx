"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Career", href: "/career" },
  { label: "Services", href: "/services" },
  { label: "Clientele", href: "/#clientele" },
];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const light = !overlay || scrolled || mobileOpen;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  return (
    <header ref={headerRef} className="site-header" data-light={light}>
      <div className="header-inner">
        <Link href="/" aria-label="Eframe home" className="logo-wrap">
          <Image
            src="/eframe-logo.png"
            alt="Eframe"
            width={154}
            height={48}
            className="h-auto w-[132px]"
            priority
          />
        </Link>
        <nav
          className="hidden items-center gap-1 xl:flex"
          aria-label="Primary navigation"
        >
          {navigationLinks.map((link) => (
            <Link
              className="nav-link"
              data-active={isActive(link.href)}
              href={link.href}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link className="header-contact hidden sm:flex" href="/contact">
            Contact us <ArrowRight />
          </Link>
          <button
            className="menu-button xl:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          <div className="section-shell flex max-h-[calc(100svh-76px)] flex-col gap-1 overflow-y-auto py-6">
            {navigationLinks.map((link) => (
              <Link
                className="mobile-link"
                aria-current={isActive(link.href) ? "page" : undefined}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                key={link.label}
              >
                {link.label}
              </Link>
            ))}
            <Link
              className="header-contact mt-4 flex justify-center"
              href="/contact"
              onClick={() => setMobileOpen(false)}
            >
              Contact us <ArrowRight />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
