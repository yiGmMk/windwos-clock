import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  try {
    const positions = await request.json();
    await writeFile(
      path.join(process.cwd(), 'public/config/clock-positions.json'),
      JSON.stringify(positions, null, 2)
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
} 