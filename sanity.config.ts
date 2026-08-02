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

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            ...[
              "homepage",
              "navigation",
              "footer",
              "siteSettings",
              "contactSettings",
            ].map((type) =>
              S.listItem()
                .title(
                  type === "siteSettings"
                    ? "Site settings"
                    : type === "contactSettings"
                      ? "Contact settings"
                      : type[0].toUpperCase() + type.slice(1),
                )
                .child(
                  S.document()
                    .schemaType(type)
                    .documentId(
                      type === "homepage"
                        ? "homepage"
                        : type.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`),
                    ),
                ),
            ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) =>
                ![
                  "homepage",
                  "navigation",
                  "footer",
                  "siteSettings",
                  "contactSettings",
                ].includes(item.getId() ?? ""),
            ),
          ]),
    }),
    visionTool(),
  ],

  document: {
    newDocumentOptions: (items) =>
      items.filter(
        (item) =>
          ![
            "homepage",
            "navigation",
            "footer",
            "siteSettings",
            "contactSettings",
          ].includes(item.templateId),
      ),
  },

  schema: {
    types: schemaTypes,
  },
});
