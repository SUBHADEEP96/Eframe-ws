"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Pause, Play } from "lucide-react";
import type { HeroSlide } from "@/lib/content";

export function HomepageHero({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (paused || reduced) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured Eframe solutions"
      onPointerDown={() => setPaused(true)}
    >
      {slides.map((slide, index) => (
        <div
          className="hero-slide"
          data-active={active === index}
          aria-hidden={active !== index}
          key={slide.headline}
        >
          {slide.mediaType === "video" ? (
            <video
              className="hero-media"
              poster={slide.poster}
              muted
              loop
              playsInline
              autoPlay={!paused}
            >
              <source src={slide.desktopMedia} />
            </video>
          ) : (
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet={slide.mobileMedia ?? slide.desktopMedia}
              />
              <Image
                src={slide.desktopMedia}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="hero-media"
              />
            </picture>
          )}
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: slide.overlay }}
          />
          <div className="section-shell relative flex min-h-[760px] items-end pb-24 pt-40 sm:min-h-[820px] sm:pb-28">
            <div className="max-w-4xl">
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.24em] text-primary before:h-px before:w-8 before:bg-primary">
                {slide.eyebrow}
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.055em] text-white sm:text-7xl lg:text-[5.6rem]">
                {slide.headline}
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
                {slide.text}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  className="hero-cta hero-cta-primary"
                  href={slide.primaryCta.href}
                >
                  {slide.primaryCta.label}
                  <ArrowRight />
                </Link>
                <a
                  className="hero-cta hero-cta-secondary"
                  href={slide.secondaryCta.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {slide.secondaryCta.label}
                  <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="section-shell pointer-events-none absolute inset-x-0 bottom-8 flex items-center justify-between text-white">
        <div
          className="pointer-events-auto flex items-center gap-2"
          role="tablist"
          aria-label="Choose hero slide"
        >
          {slides.map((slide, index) => (
            <button
              className="hero-dot"
              data-active={active === index}
              onClick={() => {
                setActive(index);
                setPaused(true);
              }}
              role="tab"
              aria-selected={active === index}
              aria-label={`Show slide ${index + 1}: ${slide.headline}`}
              key={slide.headline}
            >
              <span />
            </button>
          ))}
          <button
            className="ml-2 flex size-10 items-center justify-center rounded-full border border-white/25 hover:bg-white/10"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Resume carousel" : "Pause carousel"}
          >
            {paused ? <Play /> : <Pause />}
          </button>
        </div>
        <a
          href="#solutions"
          className="pointer-events-auto hidden items-center gap-3 text-xs uppercase tracking-[.2em] text-white/65 sm:flex"
        >
          Explore <ArrowDown />
        </a>
      </div>
    </section>
  );
}
