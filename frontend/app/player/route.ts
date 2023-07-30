import { execSync } from 'child_process';

import { NextResponse } from 'next/server';
import { z } from 'zod';

import { config } from '$lib/config';

const playVideoSchema = z.object({ file: z.string() });

export async function POST(req: Request) {
  const body = playVideoSchema.safeParse(await req.json());

  if (!body.success) {
    const { errors } = body.error;
    return NextResponse.json({ error: { message: 'Invalid request', errors } }, { status: 500 });
  }

  try {
    execSync(config.player.replace('{file}', body.data.file));
  } catch (_) {
    return NextResponse.json({ msg: 'there was an error playing the video' });
  }

  return NextResponse.json({ msg: 'video has finished' });
}
