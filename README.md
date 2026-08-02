# Eframe Main Website

This repository contains the core frontend for the Eframe website built with Next.js App Router, Tailwind CSS, and shadcn UI.

## Project overview

- **Primary brand color**: `#ee851a`
- **Section/navbar background**: `#f1f012`
- **UI library**: `shadcn/ui`
- **CSS**: Tailwind CSS 4 with custom theme variables in `app/globals.css`
- **Fonts**: Geist and Inter loaded via `next/font`
- **Public assets**: store static media in `public/` and reference them with paths like `/image.png` or `/sucess-story/...`

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the site.

## Key files

- `app/page.tsx` — home page content and layout
- `app/layout.tsx` — root HTML layout and font setup
- `app/globals.css` — global theme variables, background, and color system
- `components/ui/button.tsx` — shared button component using Tailwind and shadcn
- `public/` — static media assets for the website

## Editing the site

- Update the main landing content in `app/page.tsx`
- Change global colors and theme variables in `app/globals.css`
- Add or replace images under `public/` and reference them by public path

## Notes

- This site uses the `public/` directory for static assets and expects asset URLs to start with `/`.
- The design currently uses custom brand styling through CSS variables rather than hard-coded colors.

## CMS seed and enquiry delivery

Copy `.env.example` to `.env.local`. Run `npm run seed:sanity` with a Sanity write token to create deterministic initial documents; the script uses guarded `createIfNotExists` operations and is safe to rerun. Existing documents are not overwritten.

Contact delivery uses the Resend HTTP API only on the server. Configure `RESEND_API_KEY`, a verified `CONTACT_FROM_EMAIL`, and optionally `CONTACT_TO_EMAIL` (defaults to `info@eframe.in`). The visitor address is used only as Reply-To. Without those credentials the form returns an honest configuration message and the page retains direct phone and email links.
