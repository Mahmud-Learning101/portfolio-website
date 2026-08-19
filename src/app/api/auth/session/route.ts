import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthSession } from '@/shared/lib/auth';

export async function GET(req: NextRequest) {
  const session = verifyAuthSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    data: {
      userId: session.userId,
      email: session.email,
      role: session.role,
    },
  });
}
