import { defineArrayMember, defineField, defineType } from "sanity";

const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "openGraphImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "noIndex", type: "boolean", initialValue: false }),
  ],
});
const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
});
const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero slide",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "supportingText", type: "text", rows: 3 }),
    defineField({
      name: "mediaType",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "desktopMedia",
      type: "file",
      options: { accept: "image/*,video/*" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "mobileMedia",
      type: "file",
      options: { accept: "image/*,video/*" },
    }),
    defineField({
      name: "poster",
      type: "image",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({ name: "primaryCta", type: "link" }),
    defineField({ name: "secondaryCta", type: "link" }),
    defineField({
      name: "overlayStrength",
      type: "number",
      initialValue: 0.6,
      validation: (r) => r.min(0).max(1),
    }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "visible", type: "boolean", initialValue: true }),
  ],
});
const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      initialValue: "Homepage",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroSlides",
      type: "array",
      of: [defineArrayMember({ type: "heroSlide" })],
    }),
    defineField({
      name: "sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [
            { type: "solution" },
            { type: "testimonial" },
            { type: "successStory" },
            { type: "faq" },
            { type: "event" },
            { type: "cta" },
          ],
        }),
      ],
    }),
    defineField({ name: "seo", type: "seo" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["draft", "published"] },
      initialValue: "draft",
    }),
  ],
});
const contentDoc = (name: string, title: string) =>
  defineType({
    name,
    title,
    type: "document",
    fields: [
      defineField({
        name: "title",
        type: "string",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "slug",
        type: "slug",
        options: { source: "title" },
        validation: (r) => r.required(),
      }),
      defineField({ name: "summary", type: "text", rows: 3 }),
      ...(name === "successStory" || name === "caseStudy"
        ? [
            defineField({ name: "client", type: "string" }),
            defineField({
              name: "category",
              type: "string",
              options: {
                list: [
                  "Film Production",
                  "Virtual Reality",
                  "Process Digitization",
                  "Simulation Games",
                  "Creative Design",
                ],
              },
              validation: (r) => r.required(),
            }),
          ]
        : []),
      ...(name === "event"
        ? [defineField({ name: "eventDate", type: "date" })]
        : []),
      defineField({ name: "eyebrow", type: "string" }),
      defineField({ name: "active", type: "boolean", initialValue: true }),
      defineField({ name: "featured", type: "boolean", initialValue: false }),
      defineField({ name: "accessibleLabel", type: "string" }),
      defineField({ name: "websiteUrl", type: "url" }),
      defineField({
        name: "image",
        type: "image",
        options: { hotspot: true },
        fields: [{ name: "alt", type: "string" }],
      }),
      defineField({
        name: "body",
        type: "array",
        of: [{ type: "block" }, { type: "image" }],
      }),
      defineField({ name: "order", type: "number" }),
      defineField({ name: "features", type: "array", of: [{type:"string"}] }),
      defineField({ name: "benefits", type: "array", of: [{type:"string"}] }),
      defineField({ name: "gallery", type: "array", of: [{type:"image", options:{hotspot:true}, fields:[{name:"alt",type:"string",validation:(r)=>r.required()}]}] }),
      defineField({ name: "relatedServices", type: "array", of: [{type:"reference",to:[{type:"service"}]}] }),
      defineField({ name: "relatedSolutions", type: "array", of: [{type:"reference",to:[{type:"solution"}]}] }),
      defineField({ name: "relatedIndustries", type: "array", of: [{type:"reference",to:[{type:"industry"}]}] }),
      defineField({ name: "relatedClients", type: "array", of: [{type:"reference",to:[{type:"clientLogo"}]}] }),
      defineField({ name: "relatedStories", type: "array", of: [{type:"reference",to:[{type:"successStory"},{type:"caseStudy"}]}] }),
      defineField({ name: "youtubeUrls", type: "array", of: [{type:"url"}] }),
      defineField({ name: "faqs", type: "array", of: [{type:"reference",to:[{type:"faq"}]}] }),
      defineField({ name: "socialLinks", type: "array", of: [{type:"object",fields:[{name:"label",type:"string"},{name:"url",type:"url"}]}] }),
      defineField({
        name: "status",
        type: "string",
        options: { list: ["draft", "published"] },
        initialValue: "draft",
      }),
      defineField({ name: "seo", type: "seo" }),
    ],
  });
const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" },
            { name: "children", type: "array", of: [{ type: "link" }] },
          ],
        }),
      ],
    }),
    defineField({ name: "contactCta", type: "link" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["draft", "published"] },
    }),
  ],
});
export const schemaTypes = [
  seo,
  link,
  heroSlide,
  homepage,
  navigation,
  ...[
    ["solution", "Solutions"],
    ["product", "Products"],
    ["service", "Services"],
    ["industry", "Industries"],
    ["clientLogo", "Client logos"],
    ["testimonial", "Testimonials"],
    ["successStory", "Success stories"],
    ["caseStudy", "Case studies"],
    ["event", "Pictures & events"],
    ["faq", "FAQs"],
    ["cta", "Calls to action"],
    ["footer", "Footer"],
    ["siteSettings", "Site settings"],
    ["contactSettings", "Contact settings"],
    ["videoEmbed", "Video embeds"],
    ["generalPage", "General pages"],
  ].map(([name, title]) => contentDoc(name, title)),
];
