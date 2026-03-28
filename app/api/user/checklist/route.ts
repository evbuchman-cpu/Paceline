import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const dynamic = "force-dynamic";

const patchSchema = z.object({
  itemId: z.string().min(1),
  checked: z.boolean(),
});

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { itemId, checked } = patchSchema.parse(body);

    // Fetch current progress
    const userRows = await db
      .select({ checklistProgress: user.checklistProgress })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (userRows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const currentProgress =
      (userRows[0].checklistProgress as Record<string, boolean> | null) ?? {};

    const updatedProgress = { ...currentProgress, [itemId]: checked };

    await db
      .update(user)
      .set({ checklistProgress: updatedProgress, updatedAt: new Date() })
      .where(eq(user.id, session.user.id));

    return NextResponse.json({ ok: true, progress: updatedProgress });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request", details: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
