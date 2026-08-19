import { NextRequest, NextResponse } from 'next/server';
import { EducationSchema } from '@/features/education/domain/education.schema';
import { EducationModel } from '@/features/education/data/education.model';
import { connectToDatabase } from '@/shared/lib/db';
import { verifyAuthSession } from '@/shared/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = verifyAuthSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = EducationSchema.parse(body);

    await connectToDatabase();
    const updated = await EducationModel.findByIdAndUpdate(params.id, validatedData, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Update failed';
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = verifyAuthSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const deleted = await EducationModel.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Record deleted' });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Delete failed';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
