import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://cms.hymnsvillage.com/wp-json/wp/v2/hymns?_embed'
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Something went wrong' }, { status: 500 });
  }
}
