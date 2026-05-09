import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=40`
  );
  const data = await res.json();
  
  const books = data.items?.map((item) => ({
    id: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors?.join(', ') || 'Autor necunoscut',
    description: item.volumeInfo.description || 'Fără descriere',
    thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
  })) || [];

  return NextResponse.json(books);
}