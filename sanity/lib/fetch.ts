import type { QueryParams } from "@sanity/client";
import { draftMode } from "next/headers";
import { sanityClient, sanityPreviewClient } from "./client";

type SanityFetchOptions = {
  params?: QueryParams;
  tags?: string[];
  revalidate?: number;
};

export async function sanityFetch<T>(
  query: string,
  { params = {}, tags = [], revalidate = 3600 }: SanityFetchOptions = {},
): Promise<T | null> {
  if (!sanityClient) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Sanity is not configured; homepage static fallbacks are in use.");
    }
    return null;
  }

  const preview = (await draftMode()).isEnabled;
  const client = preview ? sanityPreviewClient : sanityClient;

  if (preview && !process.env.SANITY_API_READ_TOKEN) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Draft mode needs SANITY_API_READ_TOKEN; published content is in use.");
    }
  }

  try {
    return await (preview && process.env.SANITY_API_READ_TOKEN ? client! : sanityClient).fetch<T>(
      query,
      params,
      preview
        ? { cache: "no-store" }
        : { next: { revalidate, tags: ["home", ...tags] } },
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Sanity fetch failed; homepage static fallbacks are in use.", error);
    }
    return null;
  }
}
