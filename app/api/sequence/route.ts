import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), 'public', 'sequence');

    if (!fs.existsSync(dirPath)) {
      // Create it so the user can easily drop their files in later
      fs.mkdirSync(dirPath, { recursive: true });
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(dirPath);
    
    // Filter out hidden files and only keep images
    const frames = files
      .filter((file) => /\.(webp|png|jpe?g)$/i.test(file))
      .sort((a, b) => {
        // Sort numerically by matching digits: e.g. frame_1.webp, frame_10.webp
        const numA = parseInt(a.replace(/\D/g, '')) || 0;
        const numB = parseInt(b.replace(/\D/g, '')) || 0;
        return numA - numB;
      });

    return NextResponse.json(frames.map((frame) => `/sequence/${frame}`));
  } catch (error) {
    console.error('Error reading sequence directory:', error);
    return NextResponse.json([], { status: 500 });
  }
}
