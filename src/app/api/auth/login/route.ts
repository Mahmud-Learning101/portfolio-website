import { NextRequest, NextResponse } from 'next/server';
import { AdminCredentialsSchema } from '@/features/auth/domain/auth.schema';
import { authenticateAdmin } from '@/features/auth/use-cases/authenticateAdmin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = AdminCredentialsSchema.parse(body);

    const result = await authenticateAdmin(validatedData);

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      data: result.user,
    });

    response.cookies.set('admin_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Authentication failed';
    return NextResponse.json({ success: false, error: message }, { status: 401 });
  }
}
