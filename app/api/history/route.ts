import { NextResponse } from 'next/server';

export async function GET() {
  // This endpoint returns a template response
  // The actual history is retrieved on the client using localStorage
  return NextResponse.json({
    message: 'History endpoint. Retrieve history on client using localStorage.',
    studyDates: []
  });
}
