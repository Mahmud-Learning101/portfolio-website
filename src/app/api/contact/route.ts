import { NextRequest, NextResponse } from 'next/server';
import { ContactMessageSchema } from '@/features/contact/domain/contact.schema';
import { ContactMessageModel } from '@/features/contact/data/contact.model';
import { connectToDatabase } from '@/shared/lib/db';
import { verifyAuthSession } from '@/shared/lib/auth';

export async function GET(req: NextRequest) {
  const session = verifyAuthSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const messages = await ContactMessageModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ success: true, data: messages });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = ContactMessageSchema.parse(body);

    // Anti-Spam Honeypot Check
    if (validatedData.honeypot && validatedData.honeypot.trim() !== '') {
      // Silently discard spam bot submissions
      return NextResponse.json({ success: true, message: 'Message sent successfully' });
    }

    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    await connectToDatabase();
    const newMessage = await ContactMessageModel.create({
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
      status: 'unread',
      ipAddress,
    });

    return NextResponse.json({ success: true, message: 'Message submitted successfully', data: { id: newMessage._id } }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to submit contact message';
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
