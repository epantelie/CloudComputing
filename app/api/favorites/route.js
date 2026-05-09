import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  const { database } = await connectToDatabase();
  const favorites = database.collection('favorites');
  const allFavorites = await favorites.find({}).toArray();
  return NextResponse.json(allFavorites);
}

export async function POST(request) {
  const body = await request.json();
  const { database } = await connectToDatabase();
  const favorites = database.collection('favorites');
  await favorites.insertOne(body);
  return NextResponse.json({ success: true });
}