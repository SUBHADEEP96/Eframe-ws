import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const read = (p) => readFile(new URL(`../${p}`, import.meta.url), "utf8");
test("all editable types have published-perspective query coverage", async () => {
  const q = await read("sanity/lib/queries.ts");
  for (const type of [
    "homepage",
    "clientLogo",
    "solution",
    "product",
    "serviceCategory",
    "service",
    "industry",
    "successStory",
    "caseStudy",
    "testimonial",
    "event",
    "faq",
    "cta",
    "videoEmbed",
    "navigation",
    "footer",
    "siteSettings",
    "contactSettings",
    "generalPage",
  ])
    assert.match(q, new RegExp(type));
  assert.doesNotMatch(q, /status == "published"/);
});
test("marquee is prop driven and hides duplicate slides", async () => {
  const c = await read("components/client-marquee.tsx");
  assert.doesNotMatch(c, /lib\/catalog/);
  assert.match(c, /clients: CmsClient\[\]/);
  assert.match(c, /aria-hidden=/);
});
test("public routes use CMS gateway and live refresh excludes Studio", async () => {
  for (const p of [
    "app/(site)/page.tsx",
    "app/(site)/solutions/page.tsx",
    "app/(site)/products/page.tsx",
    "app/(site)/industries/page.tsx",
    "app/(site)/success-stories/page.tsx",
    "app/(site)/case-studies/page.tsx",
    "app/sitemap.ts",
  ])
    assert.match(await read(p), /lib\/cms/);
  assert.match(await read("app/(site)/layout.tsx"), /SanityLive/);
  assert.doesNotMatch(await read("app/layout.tsx"), /SanityLive/);
});
test("Sanity image CDN is constrained", async () => {
  const c = await read("next.config.ts");
  assert.match(c, /cdn\.sanity\.io/);
  assert.match(c, /\/images\/\*\*/);
});
