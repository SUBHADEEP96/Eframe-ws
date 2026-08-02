import { defineQuery } from "next-sanity";

const image = `{"url":asset->url,"alt":coalesce(alt,^ .accessibleLabel,^ .title),"width":asset->metadata.dimensions.width,"height":asset->metadata.dimensions.height,"aspectRatio":asset->metadata.dimensions.aspectRatio,"lqip":asset->metadata.lqip,"crop":crop,"hotspot":hotspot}`;
const card = `_id,_updatedAt,_type,title,"slug":slug.current,eyebrow,summary,coalesce(order,9999) as order,featured,active,image${image},features,benefits,"bodyText":pt::text(body),gallery[]{${image}},"related":relatedStories[]->{_id,_type,title,"slug":slug.current,summary,image${image}},seo{metaTitle,metaDescription,noIndex,"imageUrl":openGraphImage.asset->url}`;

export const HOMEPAGE_QUERY = defineQuery(
  `*[_type=="homepage"][0]{_id,_updatedAt,title,seo{metaTitle,metaDescription,noIndex,"imageUrl":openGraphImage.asset->url},heroSlides[visible!=false]|order(coalesce(order,9999) asc){_key,headline,eyebrow,supportingText,mediaType,"desktopMedia":desktopMedia.asset->url,"mobileMedia":mobileMedia.asset->url,"poster":poster.asset->url,primaryCta,secondaryCta,coalesce(overlayStrength,.6) as overlayStrength},sectionContent}`,
);
export const CLIENT_LOGOS_QUERY = defineQuery(
  `*[_type=="clientLogo"&&active!=false&&defined(image.asset)]|order(coalesce(order,9999) asc,title asc){_id,_updatedAt,"name":title,"slug":slug.current,"logo":image.asset->url,"displayLabel":coalesce(accessibleLabel,image.alt,title+" client logo"),coalesce(order,9999) as order}`,
);
export const SOLUTIONS_QUERY = defineQuery(
  `*[_type=="solution"&&active!=false]|order(coalesce(order,9999) asc,title asc){${card}}`,
);
export const FEATURED_SOLUTIONS_QUERY = defineQuery(
  `*[_type=="solution"&&active!=false&&featured==true]|order(coalesce(order,9999) asc,title asc){${card}}`,
);
export const PRODUCTS_QUERY = defineQuery(
  `*[_type=="product"&&active!=false]|order(coalesce(order,9999) asc,title asc){${card}}`,
);
export const SERVICE_CATEGORIES_QUERY = defineQuery(
  `*[_type=="serviceCategory"&&active!=false]|order(coalesce(order,9999) asc,title asc){${card},"services":*[_type=="service"&&active!=false&&references(^._id)]|order(coalesce(order,9999) asc,title asc){${card}}}`,
);
export const SERVICES_QUERY = defineQuery(
  `*[_type=="service"&&active!=false]|order(coalesce(order,9999) asc,title asc){${card},parent->{_id,title,"slug":slug.current}}`,
);
export const INDUSTRIES_QUERY = defineQuery(
  `*[_type=="industry"&&active!=false]|order(coalesce(order,9999) asc,title asc){${card}}`,
);
export const SUCCESS_STORIES_QUERY = defineQuery(
  `*[_type=="successStory"&&active!=false]|order(coalesce(order,9999) asc,title asc){${card},client,category}`,
);
export const FEATURED_STORIES_QUERY = defineQuery(
  `*[_type=="successStory"&&active!=false&&featured==true]|order(coalesce(order,9999) asc,title asc){${card},client,category}`,
);
export const CASE_STUDIES_QUERY = defineQuery(
  `*[_type=="caseStudy"&&active!=false]|order(coalesce(order,9999) asc,title asc){${card},client,category}`,
);
export const TESTIMONIALS_QUERY = defineQuery(
  `*[_type=="testimonial"&&active!=false]|order(coalesce(order,9999) asc,title asc){${card},quote,personName,personRole}`,
);
export const EVENTS_QUERY = defineQuery(
  `*[_type=="event"&&active!=false]|order(coalesce(order,9999) asc,title asc){${card},eventDate}`,
);
export const FAQS_QUERY = defineQuery(
  `*[_type=="faq"&&active!=false]|order(coalesce(order,9999) asc,title asc){_id,_updatedAt,"question":title,"answer":coalesce(answer,summary,pt::text(body)),coalesce(order,9999) as order}`,
);
export const CTAS_QUERY = defineQuery(
  `*[_type=="cta"&&active!=false]|order(coalesce(order,9999) asc,title asc){${card},primaryCta,secondaryCta}`,
);
export const VIDEO_EMBEDS_QUERY = defineQuery(
  `*[_type=="videoEmbed"&&active!=false]|order(coalesce(order,9999) asc,title asc){${card},embedUrl}`,
);
export const NAVIGATION_QUERY = defineQuery(
  `*[_type=="navigation"][0]{_id,_updatedAt,title,items[]{label,href,children[]{label,href}},contactCta}`,
);
export const FOOTER_QUERY = defineQuery(
  `*[_type=="footer"][0]{_id,_updatedAt,title,summary,columns[]{title,links[]{label,href}},legalLinks[]{label,href}}`,
);
export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type=="siteSettings"][0]{_id,_updatedAt,title,summary,logo${image},footerLogo${image},socialLinks[]{label,url}}`,
);
export const CONTACT_SETTINGS_QUERY = defineQuery(
  `*[_type=="contactSettings"][0]{_id,_updatedAt,title,address,email,phones,mapUrl}`,
);
export const GENERAL_PAGES_QUERY = defineQuery(
  `*[_type=="generalPage"&&active!=false]|order(coalesce(order,9999) asc,title asc){${card}}`,
);
export const DOCUMENT_BY_SLUG_QUERY = defineQuery(
  `*[_type==$type&&slug.current==$slug&&active!=false][0]{${card},client,category,parent->{_id,title,"slug":slug.current},faqs[]->{_id,"question":title,"answer":coalesce(answer,summary,pt::text(body))}}`,
);
export const GENERAL_PAGE_BY_SLUG_QUERY = defineQuery(
  `*[_type=="generalPage"&&slug.current==$slug&&active!=false][0]{${card}}`,
);
export const ALL_PUBLIC_DOCUMENTS_QUERY = defineQuery(
  `*[_type in ["service","solution","product","industry","successStory","caseStudy","event","generalPage"]&&active!=false&&defined(slug.current)&&seo.noIndex!=true]{_id,_type,"slug":slug.current,_updatedAt}`,
);
