export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getProfileConfig } from '@/features/profile/use-cases/getProfileConfig';
import { ProfileConfigSchema } from '@/features/profile/domain/profile.schema';
import { ProfileModel } from '@/features/profile/data/profile.model';
import { connectToDatabase } from '@/shared/lib/db';
import { verifyAuthSession } from '@/shared/lib/auth';

export async function GET() {
  const profile = await getProfileConfig();
  return NextResponse.json({ success: true, data: profile });
}

export async function PUT(req: NextRequest) {
  const session = verifyAuthSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = ProfileConfigSchema.parse(body);

    await connectToDatabase();
    let profile = await ProfileModel.findOne();
    if (profile) {
      Object.assign(profile, validatedData);
      await profile.save();
    } else {
      profile = await ProfileModel.create(validatedData);
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to update profile';
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
