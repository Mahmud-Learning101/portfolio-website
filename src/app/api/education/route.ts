export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getEducations } from '@/features/education/use-cases/getEducations';
import { EducationSchema } from '@/features/education/domain/education.schema';
import { EducationModel } from '@/features/education/data/education.model';
import { connectToDatabase } from '@/shared/lib/db';
import { verifyAuthSession } from '@/shared/lib/auth';

export async function GET() {
  const items = await getEducations();
  return NextResponse.json({ success: true, data: items });
}

export async function POST(req: NextRequest) {
  const session = verifyAuthSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = EducationSchema.parse(body);

    await connectToDatabase();
    const newItem = await EducationModel.create(validatedData);

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Invalid payload';
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
