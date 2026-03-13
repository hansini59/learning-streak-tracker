import { NextResponse } from 'next/server';

export async function GET() {
  // This endpoint returns a template response
  // The actual streak calculation happens on the client using localStorage
  return NextResponse.json({
    message: 'Streak endpoint. Calculate streak on client using localStorage.',
    currentStreak: 0,
    totalDaysStudied: 0,
    lastStudyDate: null
  });
}
