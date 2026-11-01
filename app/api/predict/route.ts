import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 120;
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Server-side proxy: browsers call /api/predict; Next.js calls the FastAPI service. */
export async function POST(request: NextRequest) {
  const backend = (process.env.MODEL_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ detail: 'Invalid JSON request.' }, { status: 400 });
  }

  try {
    const response = await fetch(`${backend}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: AbortSignal.timeout(90000),
    });
    const responseBody: unknown = await response.json().catch(() => ({ detail: 'Invalid model API response.' }));
    return NextResponse.json(responseBody, { status: response.status, headers: { 'Cache-Control': 'no-store' } });
  } catch {
    // Do not expose backend hostname or internal error details to browsers.
    return NextResponse.json({ detail: 'Prediction service unavailable. Check that the model API is running and MODEL_API_URL is correct.' }, { status: 503 });
  }
}
