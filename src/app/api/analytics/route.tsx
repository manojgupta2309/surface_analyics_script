// app/api/analytics/route.ts

import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

import { v4 as uuidv4 } from 'uuid';

interface AnalyticsEvent {
  eventType: string;
  metadata: Record<string, string>;
  visitorId: string;
}

export async function POST(request: Request) {
  try {
    const data: AnalyticsEvent = await request.json() as AnalyticsEvent;
    const cookieStore = cookies()
    const { eventType, metadata } = data;

    // Basic validation
    if (
      typeof eventType !== 'string' ||
      typeof metadata !== 'object' ||
      metadata === null
    ) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    const visitorId : string = cookieStore.get('visitorId')?.value || uuidv4();

    cookieStore.set('visitorId', visitorId, { httpOnly: true, sameSite: 'strict' });

    // Insert the event into the database
    const event = await prisma.event.create({
      data: {
        eventType,
        metadata,
        visitorId,
      }
    });
    return NextResponse.json({ success: true, eventId: event.id }, { status: 200 });
  } catch (error) {
    console.error('Error inserting event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const events = await prisma.event.findMany();
  return NextResponse.json(events, { status: 200 });
}
