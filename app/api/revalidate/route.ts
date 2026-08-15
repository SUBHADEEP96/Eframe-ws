import { revalidatePath, revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";

const TYPE_TAGS: Record<string, string> = {
  clientLogo: "clientele",
  successStory: "successStories",
  event: "events",
  eventGlimpse: "events",
  homepage: "home",
  siteSettings: "siteSettings",
};

function isValidSecret(value: string | null) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret || !value) return false;
  const actual = Buffer.from(value);
  const expected = Buffer.from(secret);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function POST(request: Request) {
  if (!isValidSecret(request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || new URL(request.url).searchParams.get("secret"))) {
    return Response.json({ revalidated: false, message: "Invalid revalidation secret" }, { status: 401 });
  }
  let body: { _type?: string } = {};
  try { body = await request.json(); } catch { /* A global webhook may omit a body. */ }
  revalidateTag("home", { expire: 0 });
  const tag = body._type && TYPE_TAGS[body._type];
  if (tag) revalidateTag(tag, { expire: 0 });
  else ["clientele", "successStories", "events", "siteSettings"].forEach((item) => revalidateTag(item, { expire: 0 }));
  revalidatePath("/");
  return Response.json({ revalidated: true, tag: tag || "all-homepage-content" });
}
