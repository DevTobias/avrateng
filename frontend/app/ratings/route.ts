import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '$lib/database';
import { createRatingsSchema, ratings } from '$lib/database/schema';

export async function POST(req: Request) {
  const body = createRatingsSchema.safeParse(await req.json());

  if (!body.success) {
    const { errors } = body.error;
    return NextResponse.json({ error: { message: 'Invalid request', errors } }, { status: 500 });
  }

  const insertedRating = db
    .insert(ratings)
    .values(body.data)
    .onConflictDoUpdate({ target: ratings.id, set: { rating: sql`excluded.rating` } })
    .returning()
    .all();
  return NextResponse.json(insertedRating);
}

export async function GET() {
  return NextResponse.json(db.select().from(ratings).all());
}
