// src/app/api/consultation/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod schema for consultation intake validation
const consultationSchema = z.object({
  sector: z.enum(["residential_block", "commercial_office", "industrial_site", "public_sector", "private_estate"]),
  buildingCount: z.string().min(1),
  selectedSystems: z.array(z.string()).min(1, "At least one system must be selected"),
  cameraCount: z.number().int().min(4).max(64),
  hasDrawings: z.boolean(),
  timeline: z.enum(["immediate", "within_3_months", "budgeting_6_months"]),
  postcode: z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i, "Valid UK postcode required"),
  fullName: z.string().min(2, "Full name required"),
  role: z.string().min(2, "Role/title required"),
  email: z.string().email("Valid work email required"),
  phone: z.string().regex(/^[\d\s+-]{10,}$/, "Valid UK phone number required"),
  notes: z.string().optional(),
});

// In-memory rate limiting (production: use Redis/Upstash)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;
  
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

// Email template for principal engineers
function buildEngineerEmail(data: z.infer<typeof consultationSchema>): string {
  const sectorLabels: Record<string, string> = {
    residential_block: "Residential Block",
    commercial_office: "Commercial Office",
    industrial_site: "Industrial & Logistics",
    public_sector: "Public Infrastructure",
    private_estate: "Private Residence",
  };

  const systemLabels: Record<string, string> = {
    surveillance: "Smart CCTV Surveillance",
    access: "Keyless Door Entry",
    fire: "Fire & Life Safety",
    intercom: "Audio & Intercoms",
    automation: "Energy & Comfort Control",
  };

  const timelineLabels: Record<string, string> = {
    immediate: "Immediate / Emergency Review",
    within_3_months: "Within Next 3 Months",
    budgeting_6_months: "Planned Budgeting (6+ Months)",
  };

  return `
NEW SCOPING REVIEW - DIRECT PRINCIPAL ROUTING
==============================================

SECTOR: ${sectorLabels[data.sector]}
BUILDINGS: ${data.buildingCount}
POSTCODE: ${data.postcode.toUpperCase()}
TIMELINE: ${timelineLabels[data.timeline]}
CAD DRAWINGS: ${data.hasDrawings ? "Yes - Secure upload link required" : "No"}

SYSTEMS REQUESTED:
${data.selectedSystems.map(s => `- ${systemLabels[s] || s}`).join("\n")}

CAMERA COUNT: ${data.cameraCount} (includes night-vision zoning & 30-day local recording)

CONTACT:
Name: ${data.fullName}
Role: ${data.role}
Email: ${data.email}
Phone: ${data.phone}

NOTES:
${data.notes || "None provided"}

---
Submitted: ${new Date().toISOString()}
Source: Drievu Web Intake Funnel
GDPR: Consent implicit via form submission
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validate with Zod
    const result = consultationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // TODO: Replace with actual email service (Resend, SendGrid, etc.)
    // await sendEmail({
    //   to: "principals@drievu.co.uk",
    //   subject: `Scoping Review: ${data.sector} @ ${data.postcode}`,
    //   text: buildEngineerEmail(data),
    //   replyTo: data.email,
    // });

    // TODO: Log to CRM/Airtable/PostgreSQL
    // await db.consultation.create({ data });

    // Clear session storage spec (handled client-side after success)
    
    console.log("[CONSULTATION] New intake:", {
      sector: data.sector,
      postcode: data.postcode,
      systems: data.selectedSystems,
      cameraCount: data.cameraCount,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Scoping blueprint transmitted to principal engineers" 
    });

  } catch (error) {
    console.error("[CONSULTATION] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}