import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(request, { params }) {
  const { id } = await params;
  const { database } = await connectToDatabase();
  const favorites = database.collection('favorites');
  await favorites.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}