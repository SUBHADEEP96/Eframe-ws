import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  Clapperboard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { homepage } from "@/lib/content";

const icons = [Boxes, Sparkles, BrainCircuit, ShieldCheck, Clapperboard];

export function TechnologySolutionsSection() {
  return (
    <section
      className="technology-section"
      id="solutions"
      aria-labelledby="technology-heading"
    >
      <div className="section-shell">
        <div className="technology-intro">
          <div>
            <p className="section-kicker">What we build</p>
            <h2 id="technology-heading" className="technology-heading">
              Technology that moves
              <br />
              people and business
              <br />
              forward.
            </h2>
          </div>
          <p className="technology-copy">
            From enterprise learning to immersive safety simulations, every
            solution is shaped around the outcome—not the format.
          </p>
        </div>

        <div className="technology-grid">
          {homepage.solutions.map((solution, index) => {
            const Icon = icons[index];

            return (
              <Link
                className="technology-card group"
                data-accent={index === 0 || index === 4}
                href={solution.href}
                key={solution.title}
              >
                <Image
                  src={solution.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 40vw"
                  className="technology-card-image"
                />
                <span className="technology-card-wash" aria-hidden="true" />
                <Icon className="technology-card-icon" aria-hidden="true" />
                <div className="technology-card-content">
                  <span className="technology-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3>{solution.title}</h3>
                      <p>{solution.description}</p>
                    </div>
                    <ArrowRight className="technology-card-arrow" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
