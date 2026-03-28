import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { userRace } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

const createSchema = z.object({
  raceName: z.string().min(1).max(200),
  raceDate: z.string().refine((v) => !isNaN(Date.parse(v)), { message: "Invalid date" }),
});

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const races = await db
      .select()
      .from(userRace)
      .where(eq(userRace.userId, session.user.id));

    return NextResponse.json({ races });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { raceName, raceDate } = createSchema.parse(body);

    const id = randomUUID();
    await db.insert(userRace).values({
      id,
      userId: session.user.id,
      raceName,
      raceDate: new Date(raceDate),
      createdAt: new Date(),
    });

    return NextResponse.json({ id, raceName, raceDate }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request", details: err.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
