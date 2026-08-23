export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getProjects } from '@/features/projects/use-cases/getProjects';
import { ProjectSchema } from '@/features/projects/domain/project.schema';
import { ProjectModel } from '@/features/projects/data/project.model';
import { connectToDatabase } from '@/shared/lib/db';
import { verifyAuthSession } from '@/shared/lib/auth';

export async function GET() {
  const items = await getProjects();
  return NextResponse.json({ success: true, data: items });
}

export async function POST(req: NextRequest) {
  const session = verifyAuthSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = ProjectSchema.parse(body);

    await connectToDatabase();
    const existing = await ProjectModel.findOne({ slug: validatedData.slug });
    if (existing) {
      return NextResponse.json({ success: false, error: 'Project slug already exists' }, { status: 409 });
    }

    const newItem = await ProjectModel.create(validatedData);
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Invalid project payload';
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
