// src/app/api/enquiry/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const PROPERTY_TYPES = [
  "commercial-office",
  "residential-block",
  "industrial-logistics",
  "public-infrastructure",
  "private-residence",
] as const;

const TRIGGERS = ["new-install", "upgrading-existing", "compliance-requirement"] as const;

const CALL_TIMES = ["morning", "afternoon", "either"] as const;

const PROPERTY_TYPE_LABELS: Record<(typeof PROPERTY_TYPES)[number], string> = {
  "commercial-office": "Commercial Office",
  "residential-block": "Residential Block",
  "industrial-logistics": "Industrial & Logistics",
  "public-infrastructure": "Public Infrastructure",
  "private-residence": "Private Residence",
};

const TRIGGER_LABELS: Record<(typeof TRIGGERS)[number], string> = {
  "new-install": "New installation",
  "upgrading-existing": "Upgrading existing system",
  "compliance-requirement": "Compliance requirement",
};

// Server-side contract for the single-screen consultation form. Never trust
// the client payload — re-validate every field here regardless of what the
// browser already checked.
const enquirySchema = z.object({
  propertyType: z.enum(PROPERTY_TYPES),
  buildings: z.number().int().min(1).max(50),
  postcode: z.string().trim().regex(/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i, "Valid UK postcode required"),
  trigger: z.array(z.enum(TRIGGERS)).min(1),
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(1, "Phone is required"),
  callTime: z.enum(CALL_TIMES),
  website: z.string(), // honeypot — must stay empty
});

type EnquiryData = z.infer<typeof enquirySchema>;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

// In-memory rate limit store. Resets on cold start (each new serverless
// instance starts empty) and only holds per-instance state — move to Redis
// or Vercel KV if this route sees real traffic or runs across many instances.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

function buildEmailBody(data: EnquiryData): string {
  return [
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Role: ${data.role}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Postcode: ${data.postcode}`,
    `Property type: ${PROPERTY_TYPE_LABELS[data.propertyType]}`,
    `Buildings: ${data.buildings}`,
    `Reason for enquiry: ${data.trigger.map((t) => TRIGGER_LABELS[t]).join(", ")}`,
    `Preferred call time: ${data.callTime}`,
  ].join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (body === null) {
      return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
    }

    const result = enquirySchema.safeParse(body);
    if (!result.success) {
      console.error("[ENQUIRY] Validation failed:", result.error.flatten());
      return NextResponse.json(
        { ok: false, error: "Some details are invalid. Please check the form and try again." },
        { status: 400 }
      );
    }
    const data = result.data;

    // Honeypot: real users never see or fill this field. A bot that
    // autofills every field trips it — pretend success and send nothing,
    // so the bot never learns its submission was rejected.
    if (data.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM || !process.env.RESEND_TO) {
      console.error("[ENQUIRY] Missing Resend environment configuration (RESEND_API_KEY/RESEND_FROM/RESEND_TO).");
      return NextResponse.json(
        { ok: false, error: "Something went wrong on our end. Please try again shortly." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO,
      replyTo: data.email,
      subject: `New enquiry — ${data.company} — ${data.postcode}`,
      text: buildEmailBody(data),
    });

    if (error) {
      console.error("[ENQUIRY] Resend send failed:", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your enquiry. Please try again or call us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[ENQUIRY] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
