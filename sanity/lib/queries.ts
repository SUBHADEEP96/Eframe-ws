import { defineQuery } from "next-sanity";
export const HOMEPAGE_QUERY =
  defineQuery(`*[_type == "homepage" && status == "published"][0]{
  title, seo, "heroSlides": heroSlides[visible == true] | order(order asc){..., desktopMedia{..., asset->}, mobileMedia{..., asset->}, poster{..., asset->}},
  sections[]->{_id, _type, title, slug, summary, image{..., asset->}}
}`);
export const NAVIGATION_QUERY = defineQuery(
  `*[_type == "navigation" && status == "published"][0]{title, items[]{label, href, children[]{label, href}}, contactCta}`,
);
export const FOOTER_QUERY = defineQuery(
  `*[_type == "footer" && status == "published"][0]{..., columns[]{title, links[]{label, href}}}`,
);
export const SERVICES_QUERY = defineQuery(
  `*[_type == "service" && status == "published"] | order(order asc){_id, title, slug, summary, parent->{title, slug}, seo}`,
);
