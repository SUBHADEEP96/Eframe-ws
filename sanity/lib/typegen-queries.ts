import { defineQuery } from "next-sanity";
export const TYPEGEN_HOMEPAGE = defineQuery(
  `*[_type=="homepage"][0]{_id,_updatedAt,title}`,
);
export const TYPEGEN_CLIENTS = defineQuery(
  `*[_type=="clientLogo"&&active!=false]{_id,_updatedAt,title,"slug":slug.current,"imageUrl":image.asset->url}`,
);
export const TYPEGEN_SOLUTIONS = defineQuery(
  `*[_type=="solution"&&active!=false]{_id,_updatedAt,title,"slug":slug.current}`,
);
export const TYPEGEN_PRODUCTS = defineQuery(
  `*[_type=="product"&&active!=false]{_id,_updatedAt,title,"slug":slug.current}`,
);
export const TYPEGEN_SERVICE_CATEGORIES = defineQuery(
  `*[_type=="serviceCategory"&&active!=false]{_id,_updatedAt,title,"slug":slug.current}`,
);
export const TYPEGEN_SERVICES = defineQuery(
  `*[_type=="service"&&active!=false]{_id,_updatedAt,title,"slug":slug.current}`,
);
export const TYPEGEN_INDUSTRIES = defineQuery(
  `*[_type=="industry"&&active!=false]{_id,_updatedAt,title,"slug":slug.current}`,
);
export const TYPEGEN_STORIES = defineQuery(
  `*[_type=="successStory"&&active!=false]{_id,_updatedAt,title,"slug":slug.current}`,
);
export const TYPEGEN_CASE_STUDIES = defineQuery(
  `*[_type=="caseStudy"&&active!=false]{_id,_updatedAt,title,"slug":slug.current}`,
);
export const TYPEGEN_TESTIMONIALS = defineQuery(
  `*[_type=="testimonial"&&active!=false]{_id,_updatedAt,title,quote}`,
);
export const TYPEGEN_EVENTS = defineQuery(
  `*[_type=="event"&&active!=false]{_id,_updatedAt,title,eventDate}`,
);
export const TYPEGEN_FAQS = defineQuery(
  `*[_type=="faq"&&active!=false]{_id,_updatedAt,title,answer}`,
);
export const TYPEGEN_CTAS = defineQuery(
  `*[_type=="cta"&&active!=false]{_id,_updatedAt,title,primaryCta}`,
);
export const TYPEGEN_VIDEOS = defineQuery(
  `*[_type=="videoEmbed"&&active!=false]{_id,_updatedAt,title,embedUrl}`,
);
export const TYPEGEN_NAVIGATION = defineQuery(
  `*[_type=="navigation"][0]{_id,_updatedAt,title}`,
);
export const TYPEGEN_FOOTER = defineQuery(
  `*[_type=="footer"][0]{_id,_updatedAt,title}`,
);
export const TYPEGEN_SITE = defineQuery(
  `*[_type=="siteSettings"][0]{_id,_updatedAt,title}`,
);
export const TYPEGEN_CONTACT = defineQuery(
  `*[_type=="contactSettings"][0]{_id,_updatedAt,title,email}`,
);
export const TYPEGEN_PAGE = defineQuery(
  `*[_type=="generalPage"&&slug.current==$slug&&active!=false][0]{_id,_updatedAt,title,"slug":slug.current}`,
);
export const TYPEGEN_SITEMAP = defineQuery(
  `*[_type in ["service","solution","product","industry","successStory","caseStudy","event","generalPage"]&&active!=false]{_id,_type,"slug":slug.current,_updatedAt}`,
);
