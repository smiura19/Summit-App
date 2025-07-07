// app/api/proxy-vote/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const wpResponse = await fetch('http://wp-starter.local/?rest_route=/wp/v2/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // If needed: add auth here
        // 'Authorization': 'Basic ' + btoa('username:password')
      },
      body: JSON.stringify(body),
    });

    const data = await wpResponse.json();

    if (!wpResponse.ok) {
      return NextResponse.json(
        { error: 'WordPress returned an error', details: data },
        { status: wpResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to submit vote to WordPress' },
      { status: 500 }
    );
  }
}
