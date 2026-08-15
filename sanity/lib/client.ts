import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Next owns freshness through tagged caching. Reading the origin avoids a
      // second, opaque CDN cache between a publish and webhook revalidation.
      useCdn: false,
      perspective: "published",
    })
  : null;

export const sanityPreviewClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "drafts",
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null;
