import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

/**
 * Contact form endpoint. Emails the enquiry via Resend when RESEND_API_KEY is set on the server
 * (optionally CONTACT_TO / CONTACT_FROM). Without a key it answers 503 `{ fallback: true }` and the form
 * offers an email / WhatsApp link instead, so no enquiry is lost.
 */
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  budget: z.string().optional(),
  message: z.string().min(10),
  website: z.string().max(0).optional(), // honeypot
});

const hits = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

function limited(ip: string) {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now > e.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  e.count++;
  return e.count > LIMIT;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let data: z.infer<typeof schema>;
  try {
    data = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  if (data.website) return NextResponse.json({ success: true });

  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ error: "Email sending is not set up yet.", fallback: true }, { status: 503 });

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "Hey Coco! website <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? "weare@heycoco.agency",
      replyTo: data.email,
      subject: `New enquiry: ${data.subject}`,
      html: `<p><strong>${esc(data.name)}</strong> &lt;${esc(data.email)}&gt;</p>
<p><strong>About:</strong> ${esc(data.subject)}${data.budget ? `<br><strong>Budget:</strong> ${esc(data.budget)}` : ""}</p>
<p>${esc(data.message).replace(/\n/g, "<br>")}</p>`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "We couldn’t send that just now.", fallback: true }, { status: 502 });
  }
}
