export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getExperiences } from '@/features/experience/use-cases/getExperiences';
import { ExperienceSchema } from '@/features/experience/domain/experience.schema';
import { ExperienceModel } from '@/features/experience/data/experience.model';
import { connectToDatabase } from '@/shared/lib/db';
import { verifyAuthSession } from '@/shared/lib/auth';

export async function GET() {
  const experiences = await getExperiences();
  return NextResponse.json({ success: true, data: experiences });
}

export async function POST(req: NextRequest) {
  const session = verifyAuthSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = ExperienceSchema.parse(body);

    await connectToDatabase();
    const newExp = await ExperienceModel.create(validatedData);

    return NextResponse.json({ success: true, data: newExp }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Invalid experience payload';
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
