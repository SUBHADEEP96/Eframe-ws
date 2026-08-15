# Sanity → UI sync debug report

## What was broken

The frontend never queried Sanity on the homepage: the hero-adjacent content, client marquee, and success stories all rendered `lib/content.ts` or `lib/catalog.ts` directly. Although GROQ queries existed, no fetch utility or homepage data flow used them. The only client also used the Sanity CDN, and there was no Next cache tagging or webhook endpoint, so publishing could not invalidate the rendered homepage.

## What was fixed

- A single published client now reads from the Sanity origin (`perspective: "published"`, `useCdn: false`). A separate token-backed origin client supports draft mode.
- `sanityFetch` centralizes preview behavior, hourly safety revalidation, cache tags, error handling, and development-only fallback warnings.
- The homepage fetches clients, success stories, and events once in parallel. Valid non-empty CMS results win; existing public assets remain the fallback.
- `/api/revalidate` securely validates `SANITY_REVALIDATE_SECRET`, maps Sanity document types to homepage tags, expires matching caches, and revalidates `/`.
- The event query accepts the existing `event` type and the optional `eventGlimpse` type for compatibility.

## Changed areas

Sanity client/fetch/query utilities, the homepage, the three homepage section components and fallback data, the revalidation route, and this documentation.

## Test a publish

1. Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_SANITY_API_VERSION` in the deployment. Set `SANITY_API_READ_TOKEN` only for private-dataset or draft-preview reads.
2. Create and publish an active document with its required image: `clientLogo`, `successStory`, or `event`.
3. Refresh the homepage. Hourly revalidation is the safety net; for immediate updates, configure the webhook below.
4. Confirm a client appears in the logo grid, a story appears under its exact category tab, or an event appears in the carousel.
5. Unpublish all documents of one type to confirm the static fallback remains visible.

## Sanity/Vercel webhook setup

Immediate publishing requires one manual Sanity project webhook:

- URL: `https://YOUR_DOMAIN/api/revalidate`
- Method: `POST`
- Dataset: the same value as `NEXT_PUBLIC_SANITY_DATASET`
- Trigger: create, update, delete
- Filter: `_type in ["homepage", "clientLogo", "successStory", "event", "eventGlimpse", "siteSettings"]`
- Projection/body: `{_type}`
- Header: `Authorization: Bearer YOUR_SECRET`

Set the same value as server-only `SANITY_REVALIDATE_SECRET` in Vercel. Redeploy after adding environment variables. The route also accepts `?secret=...` for webhook providers that cannot set headers, though the header is preferred.
