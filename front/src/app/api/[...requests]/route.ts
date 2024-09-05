import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const endpoint = pathname.replace('/api/', '');

  try {
    const response = await fetch(`${process.env.API_URL}/${endpoint}`, {
      method: req.method,
      headers: new Headers(req.headers),
    });

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
      } else {
        const data = await response.text(); 
        return NextResponse.rewrite(data, { status: response.status });
      }

  } catch (error) {
    return NextResponse.json({ error: 'Erro ao comunicar com o servidor backend' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
