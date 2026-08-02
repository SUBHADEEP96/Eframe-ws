import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const sanityConfigured = Boolean(projectId);
export const sanityClient = createClient({
  projectId: projectId ?? "lxh9l3bt",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
