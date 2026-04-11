import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/db/drizzle'
import { pricingFeedback } from '@/db/schema'

const schema = z.object({
  selectedOption: z.string().min(1),
  customComment: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  page: z.string().default('pricing'),
})

export async function POST(req: NextRequest) {
  const body: unknown = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
  await db.insert(pricingFeedback).values({
    selectedOption: parsed.data.selectedOption,
    customComment: parsed.data.customComment ?? null,
    email: parsed.data.email || null,
    page: parsed.data.page,
  })
  return NextResponse.json({ success: true })
}
