import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { lead } from "@/db/schema";
import { z } from "zod";
import { randomUUID } from "crypto";
import { logger } from "@/lib/logger";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

// Validation schema
const leadMagnetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().optional(),
});

/**
 * POST /api/lead-magnet
 * Capture lead email and send lead magnet PDF
 */
export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const validated = leadMagnetSchema.parse(body);

    logger.debug("Lead magnet request received", {
      email: validated.email,
      hasFirstName: !!validated.firstName
    });

    // Check if lead already exists
    const existingLead = await db
      .select()
      .from(lead)
      .where(eq(lead.email, validated.email))
      .limit(1);

    let leadId: string;
    let isNew = false;

    if (existingLead.length > 0) {
      // Lead already exists - still send email
      leadId = existingLead[0].id;
      logger.info("Existing lead requested checklist again", {
        leadId,
        email: validated.email
      });
    } else {
      // Create new lead
      const newLead = await db
        .insert(lead)
        .values({
          id: randomUUID(),
          email: validated.email,
          firstName: validated.firstName || null,
          source: "checklist",
          createdAt: new Date(),
        })
        .returning();

      leadId = newLead[0].id;
      isNew = true;

      logger.info("New lead created", {
        leadId,
        email: validated.email
      });
    }

    // Send lead magnet delivery email
    const { sendLeadMagnetEmail } = await import("@/lib/email-sender");

    const emailResult = await sendLeadMagnetEmail({
      email: validated.email,
      firstName: validated.firstName || null,
    });

    if (!emailResult.success) {
      logger.error("Failed to send lead magnet email", undefined, {
        leadId,
        email: validated.email,
        error: emailResult.error,
      });

      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    logger.info("Lead magnet email sent successfully", {
      leadId,
      email: validated.email,
      emailId: emailResult.emailId,
      isNew,
    });

    return NextResponse.json(
      {
        success: true,
        message: isNew ? "Check your inbox!" : "Email sent again!",
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error processing lead magnet request", error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
