import "server-only";
import type { HeroSlide } from "./content";
import {
  homepage as legacyHomepage,
  serviceGroups as legacyServiceGroups,
} from "./content";
import {
  caseStudies,
  clients,
  industries,
  solutions,
  stories,
  type CatalogItem,
} from "./catalog";
import { sanityConfigured } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ALL_PUBLIC_DOCUMENTS_QUERY,
  CASE_STUDIES_QUERY,
  CLIENT_LOGOS_QUERY,
  CONTACT_SETTINGS_QUERY,
  DOCUMENT_BY_SLUG_QUERY,
  FAQS_QUERY,
  FOOTER_QUERY,
  GENERAL_PAGE_BY_SLUG_QUERY,
  HOMEPAGE_QUERY,
  INDUSTRIES_QUERY,
  NAVIGATION_QUERY,
  PRODUCTS_QUERY,
  SERVICE_CATEGORIES_QUERY,
  SERVICES_QUERY,
  SITE_SETTINGS_QUERY,
  SOLUTIONS_QUERY,
  SUCCESS_STORIES_QUERY,
  TESTIMONIALS_QUERY,
  EVENTS_QUERY,
} from "@/sanity/lib/queries";

export type CmsImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  lqip?: string;
};
export type CmsCard = CatalogItem & {
  _id: string;
  _updatedAt: string;
  order: number;
  featured?: boolean;
  active?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    noIndex?: boolean;
    imageUrl?: string;
  };
};
export type CmsClient = {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  displayLabel: string;
  order: number;
};
export type ServiceGroup = {
  title: string;
  slug: string;
  description: string;
  children: readonly (readonly [string, string])[];
};
export type Navigation = {
  items: {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
  }[];
  contactCta?: { label: string; href: string };
};
export type GlobalContent = {
  navigation: Navigation;
  footer: {
    summary: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
    legalLinks: { label: string; href: string }[];
  };
  site: { socialLinks: { label: string; url: string }[] };
  contact: {
    address: string;
    email: string;
    phones: string[];
    mapUrl?: string;
  };
  serviceGroups: ServiceGroup[];
};

const migrationComplete = process.env.SANITY_MIGRATION_COMPLETE === "true";
async function fetchData<T>(
  query: string,
  params: Record<string, string> = {},
  fallback: T,
): Promise<T> {
  if (!sanityConfigured || process.env.NEXT_PHASE === "phase-production-build")
    return fallback;
  try {
    const result = (await sanityFetch({ query, params })).data as unknown as T;
    if (Array.isArray(result) && result.length === 0 && !migrationComplete)
      return fallback;
    return result ?? fallback;
  } catch (error) {
    console.error(
      "Sanity published-content request failed",
      error instanceof Error ? error.message : "Unknown error",
    );
    return fallback;
  }
}
const toLegacy = (
  item: Partial<CmsCard> & { title?: string; slug?: string },
): CmsCard => ({
  _id: item._id ?? `cms-${item.slug ?? "untitled"}`,
  _updatedAt: item._updatedAt ?? new Date(0).toISOString(),
  order: item.order ?? 9999,
  slug: item.slug ?? "",
  title: item.title ?? "Untitled",
  eyebrow: item.eyebrow ?? "Eframe",
  summary: item.summary ?? "",
  image: typeof item.image === "string" ? item.image : "/banner.png",
  overview: item.overview ?? item.summary ?? "",
  features: item.features ?? [],
  benefits: item.benefits ?? [],
  gallery: item.gallery ?? [],
  client: item.client,
  category: item.category,
  faq: item.faq,
  featured: item.featured,
  seo: item.seo,
});
function normalizeCards(value: unknown, fallback: CatalogItem[]): CmsCard[] {
  if (!Array.isArray(value))
    return fallback.map((x, i) => toLegacy({ ...x, order: i }));
  return value.map((raw) => {
    const x = raw as Partial<CmsCard> & { bodyText?: string };
    const projectedImage = x.image as unknown as CmsImage | string | undefined;
    const projectedGallery = x.gallery as unknown as
      (CmsImage | string)[] | undefined;
    return toLegacy({
      ...x,
      image:
        typeof projectedImage === "string"
          ? projectedImage
          : (projectedImage?.url ?? "/banner.png"),
      overview: x.bodyText ?? x.summary,
      gallery: projectedGallery?.map((g) =>
        typeof g === "string" ? g : g.url,
      ),
    });
  });
}
async function cards(query: string, fallback: CatalogItem[]) {
  const raw = await fetchData<unknown>(query, {}, fallback);
  return normalizeCards(raw, fallback);
}

export const getSolutions = () => cards(SOLUTIONS_QUERY, solutions);
export const getProducts = () => cards(PRODUCTS_QUERY, solutions.slice(0, 2));
export const getIndustries = () => cards(INDUSTRIES_QUERY, industries);
export const getStories = () => cards(SUCCESS_STORIES_QUERY, stories);
export const getCaseStudies = () => cards(CASE_STUDIES_QUERY, caseStudies);
export const getServices = () => cards(SERVICES_QUERY, []);
export async function getDocument(
  type: string,
  slug: string,
  fallback: CatalogItem[] = [],
) {
  const raw = await fetchData<unknown>(
    DOCUMENT_BY_SLUG_QUERY,
    { type, slug },
    null,
  );
  if (raw) return normalizeCards([raw], [])[0] ?? null;
  return migrationComplete
    ? null
    : (normalizeCards(fallback, fallback).find((x) => x.slug === slug) ?? null);
}
export async function getServiceGroups(): Promise<ServiceGroup[]> {
  const raw = await fetchData<unknown>(SERVICE_CATEGORIES_QUERY, {}, []);
  if (!Array.isArray(raw) || raw.length === 0)
    return legacyServiceGroups.map((g) => ({
      title: g.title,
      slug: g.slug,
      description: g.description,
      children: g.children,
    }));
  return raw.map((v) => {
    const x = v as {
      title: string;
      slug: string;
      summary?: string;
      services?: { title: string; slug: string }[];
    };
    return {
      title: x.title,
      slug: x.slug,
      description: x.summary ?? "",
      children: (x.services ?? []).map((s) => [s.title, s.slug] as const),
    };
  });
}
export async function getClients(): Promise<CmsClient[]> {
  const raw = await fetchData<unknown>(CLIENT_LOGOS_QUERY, {}, clients);
  if (!Array.isArray(raw)) return [];
  return raw.map((v, i) => {
    const x = v as Partial<CmsClient> & { active?: boolean };
    return {
      _id: x._id ?? `client-${i}`,
      name: x.name ?? "Client",
      slug: x.slug ?? String(i),
      logo: x.logo ?? "/eframe-logo.png",
      displayLabel: x.displayLabel ?? `${x.name ?? "Client"} logo`,
      order: x.order ?? i,
    };
  });
}
export async function getHomepage() {
  const [
    document,
    solutionItems,
    clientItems,
    storyItems,
    faqItems,
    testimonials,
    events,
  ] = await Promise.all([
    fetchData<unknown>(HOMEPAGE_QUERY, {}, null),
    getSolutions(),
    getClients(),
    getStories(),
    fetchData<unknown>(FAQS_QUERY, {}, legacyHomepage.faqs),
    fetchData<
      {
        _id: string;
        title: string;
        quote?: string;
        personName?: string;
        personRole?: string;
      }[]
    >(TESTIMONIALS_QUERY, {}, []),
    cards(EVENTS_QUERY, []),
  ]);
  const h = document as null | {
    heroSlides?: {
      headline: string;
      eyebrow?: string;
      supportingText?: string;
      mediaType?: "image" | "video";
      desktopMedia?: string;
      mobileMedia?: string;
      poster?: string;
      primaryCta?: { label: string; href: string };
      secondaryCta?: { label: string; href: string };
      overlayStrength?: number;
    }[];
    seo?: CmsCard["seo"];
  };
  const heroSlides: HeroSlide[] =
    h?.heroSlides
      ?.filter((x) => x.desktopMedia)
      .map((x) => ({
        headline: x.headline,
        eyebrow: x.eyebrow ?? "Eframe",
        text: x.supportingText ?? "",
        mediaType: x.mediaType ?? "image",
        desktopMedia: x.desktopMedia!,
        mobileMedia: x.mobileMedia,
        poster: x.poster,
        primaryCta: x.primaryCta ?? { label: "Contact us", href: "/contact" },
        secondaryCta: x.secondaryCta ?? {
          label: "Our services",
          href: "/services",
        },
        overlay: x.overlayStrength ?? 0.6,
      })) ?? legacyHomepage.heroSlides;
  const faqs = Array.isArray(faqItems)
    ? (faqItems as { question: string; answer: string }[])
    : legacyHomepage.faqs;
  return {
    heroSlides,
    solutions: solutionItems,
    clients: clientItems,
    stories: storyItems,
    faqs,
    testimonials,
    events,
    seo: h?.seo,
  };
}

const defaultGlobal: GlobalContent = {
  navigation: {
    items: [
      { label: "Solutions", href: "/solutions" },
      { label: "Products", href: "/products" },
      { label: "Industries", href: "/industries" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Insights", href: "/insights" },
      { label: "About", href: "/about" },
    ],
    contactCta: { label: "Contact us", href: "/contact" },
  },
  footer: {
    summary:
      "Learning, immersive, creative and enterprise digital solutions shaped around real business needs.",
    columns: [],
    legalLinks: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  site: {
    socialLinks: [
      { label: "LinkedIn", url: "https://www.linkedin.com/company/28124515/" },
      { label: "Facebook", url: "https://www.facebook.com/eframe.infomedia" },
      {
        label: "YouTube",
        url: "https://youtube.com/channel/UC-CUXTkd1dwbyPSCN-yadnw",
      },
      { label: "Instagram", url: "https://www.instagram.com/eframehub/" },
    ],
  },
  contact: {
    address:
      "E405, DC Block, City Centre, Sector - 1, Salt Lake, Kolkata - 700 064",
    email: "info@eframe.in",
    phones: ["+91 9674032010", "+91 9674758699", "+91 9830443031"],
  },
  serviceGroups: [],
};
export async function getGlobalContent(): Promise<GlobalContent> {
  const [n, f, s, c, serviceGroups] = await Promise.all([
    fetchData<Navigation | null>(NAVIGATION_QUERY, {}, null),
    fetchData<GlobalContent["footer"] | null>(FOOTER_QUERY, {}, null),
    fetchData<GlobalContent["site"] | null>(SITE_SETTINGS_QUERY, {}, null),
    fetchData<GlobalContent["contact"] | null>(
      CONTACT_SETTINGS_QUERY,
      {},
      null,
    ),
    getServiceGroups(),
  ]);
  return {
    navigation: n ?? defaultGlobal.navigation,
    footer: { ...defaultGlobal.footer, ...f },
    site: { ...defaultGlobal.site, ...s },
    contact: { ...defaultGlobal.contact, ...c },
    serviceGroups,
  };
}
export async function getGeneralPage(slug: string) {
  const raw = await fetchData<unknown>(
    GENERAL_PAGE_BY_SLUG_QUERY,
    { slug },
    null,
  );
  return raw ? (normalizeCards([raw], [])[0] ?? null) : null;
}
export const getSitemapDocuments = () =>
  fetchData<{ _id: string; _type: string; slug: string; _updatedAt: string }[]>(
    ALL_PUBLIC_DOCUMENTS_QUERY,
    {},
    [],
  );
