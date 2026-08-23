export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials } from '@/features/testimonials/use-cases/getTestimonials';
import { TestimonialSchema } from '@/features/testimonials/domain/testimonial.schema';
import { TestimonialModel } from '@/features/testimonials/data/testimonial.model';
import { connectToDatabase } from '@/shared/lib/db';
import { verifyAuthSession } from '@/shared/lib/auth';

export async function GET(req: NextRequest) {
  const session = verifyAuthSession(req);
  await connectToDatabase();

  if (session) {
    const allItems = await TestimonialModel.find().sort({ orderIndex: 1 }).lean();
    return NextResponse.json({ success: true, data: allItems });
  }

  const items = await getTestimonials();
  return NextResponse.json({ success: true, data: items });
}

export async function POST(req: NextRequest) {
  const session = verifyAuthSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = TestimonialSchema.parse(body);

    await connectToDatabase();
    const newItem = await TestimonialModel.create(validatedData);

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Invalid payload';
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
