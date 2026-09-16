export const successStoryCategories = [
  "AI & IoT Solution",
  "Process Digitization",
  "Learning Solutions",
  "Creative Studio",
  "Immersive Experiences",
] as const;

export type SuccessStoryCategory = (typeof successStoryCategories)[number];

const aliases: Record<string, SuccessStoryCategory> = {
  "ai & iot solution": "AI & IoT Solution",
  "ai enabled solutions": "AI & IoT Solution",
  "ai-enabled solutions": "AI & IoT Solution",
  "ai & iot": "AI & IoT Solution",
  "process digitization": "Process Digitization",
  "process digitisation": "Process Digitization",
  "e-learning": "Learning Solutions",
  lms: "Learning Solutions",
  "learning management system": "Learning Solutions",
  "simulation games": "Learning Solutions",
  "learning solutions": "Learning Solutions",
  "film production": "Creative Studio",
  "creative design": "Creative Studio",
  animation: "Creative Studio",
  "2d/3d animation": "Creative Studio",
  "creative studio": "Creative Studio",
  "virtual reality": "Immersive Experiences",
  "vr & ar": "Immersive Experiences",
  "vr/ar": "Immersive Experiences",
  "immersive technology": "Immersive Experiences",
  "immersive experiences": "Immersive Experiences",
};

export function normalizeSuccessStoryCategory(
  category: string,
): SuccessStoryCategory | null {
  return aliases[category.trim().toLowerCase()] ?? null;
}
