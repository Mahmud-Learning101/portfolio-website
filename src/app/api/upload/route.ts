import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthSession } from '@/shared/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const session = verifyAuthSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalName = file.name || 'upload';
    const ext = path.extname(originalName) || '.jpg';
    const mimeType = file.type || (ext === '.pdf' ? 'application/pdf' : 'image/jpeg');

    // 1. Attempt local filesystem save (Works during local development: npm run dev)
    try {
      const cleanBaseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `${cleanBaseName}_${Date.now()}${ext}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');

      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);

      return NextResponse.json({ success: true, url: `/uploads/${filename}` });
    } catch (fsError: unknown) {
      // 2. Fallback for Serverless / Vercel (Read-only file system: EROFS)
      // Convert buffer directly into a Data URI so uploads work instantly on Vercel
      const base64String = buffer.toString('base64');
      const dataUrl = `data:${mimeType};base64,${base64String}`;

      return NextResponse.json({ success: true, url: dataUrl });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

