import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";
const attempts = new Map<string, { count: number; reset: number }>();
const WINDOW = 60_000,
  LIMIT = 4;
export async function POST(request: NextRequest) {
  const size = Number(request.headers.get("content-length") || 0);
  if (size > 12_000)
    return NextResponse.json(
      { message: "Request is too large." },
      { status: 413 },
    );
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const state = attempts.get(ip);
  if (state && state.reset > now && state.count >= LIMIT)
    return NextResponse.json(
      { message: "Please wait before trying again." },
      { status: 429 },
    );
  attempts.set(
    ip,
    !state || state.reset <= now
      ? { count: 1, reset: now + WINDOW }
      : { ...state, count: state.count + 1 },
  );
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      {
        message: "Please check the highlighted fields.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  const { website, ...data } = parsed.data;
  if (website)
    return NextResponse.json({ message: "Request rejected." }, { status: 400 });
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL)
    return NextResponse.json(
      {
        message:
          "Email delivery is not configured. Please email info@eframe.in directly.",
      },
      { status: 503 },
    );
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL || "info@eframe.in"],
        reply_to: data.email,
        subject: `Website enquiry: ${data.enquiry}`,
        text: `Name: ${data.name}\nOrganisation: ${data.organisation || "Not supplied"}\nPhone: ${data.phone || "Not supplied"}\nEnquiry: ${data.enquiry}\n\n${data.message}`,
      }),
    });
    if (!response.ok)
      return NextResponse.json(
        {
          message:
            "We could not send your enquiry. Please email info@eframe.in.",
        },
        { status: 502 },
      );
    return NextResponse.json({
      message: "Thank you. Your enquiry has been sent.",
    });
  } catch {
    return NextResponse.json(
      { message: "Email delivery timed out. Please try again." },
      { status: 504 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
