// "use client";
// import { defineConfig } from "sanity";
// import { structureTool } from "sanity/structure";
// import { visionTool } from "@sanity/vision";
// import { schemaTypes } from "./sanity/schemaTypes";
// export default defineConfig({
//   name: "default",
//   title: "Eframe CMS",
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "replaceMe",
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
//   plugins: [structureTool(), visionTool()],
//   schema: { types: schemaTypes },
// });

"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}

if (!dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
}

export default defineConfig({
  name: "default",
  title: "Eframe CMS",

  // Required because Studio is mounted at /studio
  basePath: "/studio",

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});