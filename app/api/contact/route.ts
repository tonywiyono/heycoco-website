import { saveContactSubmission } from "@/lib/cms";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  budget: z.string().optional(),
  message: z.string().min(10),
  website: z.string().max(0).optional(),
});

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const data = contactSchema.parse(body);

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    await saveContactSubmission({
      name: data.name,
      email: data.email,
      subject: data.subject,
      budget: data.budget,
      message: data.message,
      sourceIp: ip,
    });

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? "hello@heycoco.agency";

    if (!apiKey) {
      console.log("[contact] Resend not configured. Submission:", {
        name: data.name,
        email: data.email,
        subject: data.subject,
      });
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Hey Coco! <onboarding@resend.dev>",
      to: toEmail,
      replyTo: data.email,
      subject: `New inquiry from ${data.name} — ${data.subject}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Subject: ${data.subject}`,
        `Budget: ${data.budget || "Not specified"}`,
        "",
        data.message,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 },
      );
    }

    console.error("[contact] Error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
