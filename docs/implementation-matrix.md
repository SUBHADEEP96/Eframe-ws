# Eframe remediation implementation map

| Requirement | Implementation evidence |
|---|---|
| 1 Clients | `components/client-marquee.tsx`, `lib/catalog.ts`, client schema fields and deterministic seed |
| 2 Services | `app/services/[...slug]/page.tsx`, `components/internal-page.tsx`, approved service hero assets |
| 3 Success stories | `app/success-stories/`, `components/catalog-pages.tsx`, verified project media in `lib/catalog.ts` |
| 4 Solutions | `app/solutions/`, solution catalogue and Sanity solution documents |
| 5 Icons | `app/favicon.ico`, `app/icon.svg`, `app/manifest.ts`, root metadata |
| 6 Social | `components/site-footer.tsx` and seeded `siteSettings.socialLinks` |
| 7 Video | `videoEmbed` schema and optional `youtubeUrls`; no unverified video ID is published |
| 8 Contact | `app/contact`, `app/api/contact`, shared Zod schema, Resend server transport and environment example |
| 9 Footer | `components/site-footer.tsx`; exact `#f0bf4c`, scalable SVG wave, navigation/contact/social/legal content |
| 10 Header | `components/site-header.tsx` and balanced `.logo-wrap` sizing in global CSS |
| 11 CMS | expanded related-document fields and deterministic guarded seed in `scripts/seed-sanity.mjs` |
| 12 Routing/SEO | dynamic detail routes, metadata, sitemap/robots, 404, loading, route/root errors |

## Legacy route and approved asset mapping

| Legacy source | New route | Representative repository media |
|---|---|---|
| `film-production.html` | `/services/creative-studio/films` | `banner-film-production.png`, `sucess-story/film/*` |
| `creative-designs-branding.html` | `/services/creative-studio/branding-campaigns` | `Creative-Designs-Branding_banner.png`, `sucess-story/Creative_Branding_and_Campaign/*` |
| `virtual-reality.html` | `/services/immersive-experiences/vr-ar` | `Virtual-Reality-banner.png`, `sucess-story/VRandAR/*` |
| `process-digitization.html` | `/services/enterprise-solutions/process-digitization` | `Process-Digitization-banner.png`, `sucess-story/Process_Digitization/*` |
| `e-learning-solution.html` | `/services/learning-solutions/e-learning` | `E-Learning-Solution-banner.png`, `sucess-story/Elearning/*` |
| `learning-management-system.html` | `/services/learning-solutions/lms` | `Learning-Management-System-banner.png`, `sucess-story/Learning_Management_System/*` |
| `2D-and-3D-animation-and-explainer-videos.html` | `/services/creative-studio/2d-3d-animation` | `2d-3d-Animation-banner.png`, `sucess-story/2D_and_3D/*` |
| `gaming_and_simulation.html` | `/services/learning-solutions/simulation-games` | `game-and-simulation.png`, `sucess-story/Simulation_and_Game/*` |

## Asset audit

The `public/` tree contains 190 approved files: service desktop/mobile banners, 23 verified client logos, profile/simulator PDFs and success-story media organised by Film, Creative Branding, VR/AR, Process Digitisation, E-learning, LMS, Animation and Simulation. Duplicate raster pairs (notably simulation `.jpg`/`.png` variants and `surya-nepal` copies) are retained but only one matching source is selected in page data. Runtime references always use public-root URLs and `next/image` with fixed aspect ratios.
