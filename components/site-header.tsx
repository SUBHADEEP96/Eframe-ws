"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { serviceGroups } from "@/lib/content";

const simpleLinks = [{ label: "Solutions", href: "/solutions" }, { label: "Products", href: "/products" }, { label: "Industries", href: "/industries" }, { label: "Success Stories", href: "/success-stories" }, { label: "Insights", href: "/insights" }, { label: "About", href: "/about" }];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const light = !overlay || scrolled || mobileOpen || servicesOpen;

  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); addEventListener("scroll", onScroll, { passive: true }); return () => removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { document.body.style.overflow = mobileOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [mobileOpen]);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setMobileOpen(false); setServicesOpen(false); } }; addEventListener("keydown", onKey); return () => removeEventListener("keydown", onKey); }, []);

  return <header ref={headerRef} className="site-header" data-light={light}>
    <div className="header-inner">
      <Link href="/" aria-label="Eframe home" className="logo-wrap"><Image src="/eframe-logo.png" alt="Eframe" width={154} height={48} className="h-auto w-[132px]" priority /></Link>
      <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
        <Link className="nav-link" href="/solutions">Solutions</Link>
        <button className="nav-link" aria-expanded={servicesOpen} aria-controls="services-mega-menu" onClick={() => setServicesOpen(!servicesOpen)}>Services <ChevronDown /></button>
        {simpleLinks.slice(1).map((link) => <Link className="nav-link" href={link.href} key={link.label}>{link.label}</Link>)}
      </nav>
      <div className="flex items-center gap-3"><Link className="header-contact hidden sm:flex" href="/contact">Contact us <ArrowRight /></Link><button className="menu-button xl:hidden" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button></div>
    </div>
    {servicesOpen && <div id="services-mega-menu" className="mega-menu" onMouseLeave={() => setServicesOpen(false)}>
      <div className="section-shell grid gap-8 py-10 lg:grid-cols-4">
        {serviceGroups.map((group) => <div key={group.slug}><Link href={`/services/${group.slug}`} className="text-base font-semibold hover:text-primary" onClick={() => setServicesOpen(false)}>{group.title}</Link><p className="mt-2 text-sm leading-6 text-muted-foreground">{group.description}</p><div className="mt-5 flex flex-col gap-3">{group.children.map(([name, slug]) => <Link className="text-sm text-muted-foreground hover:text-foreground" href={`/services/${group.slug}/${slug}`} onClick={() => setServicesOpen(false)} key={slug}>{name}</Link>)}</div></div>)}
      </div>
    </div>}
    {mobileOpen && <nav className="mobile-menu" aria-label="Mobile navigation"><div className="section-shell flex max-h-[calc(100svh-76px)] flex-col gap-1 overflow-y-auto py-6">
      <Link className="mobile-link" href="/solutions" onClick={() => setMobileOpen(false)}>Solutions</Link>
      <details className="mobile-details"><summary>Services <ChevronDown /></summary><div className="flex flex-col gap-1 pb-3 pl-4">{serviceGroups.map((group) => <Link href={`/services/${group.slug}`} onClick={() => setMobileOpen(false)} key={group.slug}>{group.title}</Link>)}</div></details>
      {simpleLinks.slice(1).map((link) => <Link className="mobile-link" href={link.href} onClick={() => setMobileOpen(false)} key={link.label}>{link.label}</Link>)}
      <Link className="header-contact mt-4 flex justify-center" href="/contact" onClick={() => setMobileOpen(false)}>Contact us <ArrowRight /></Link>
    </div></nav>}
  </header>;
}
