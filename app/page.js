'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    const res = await fetch(`/api/books?q=${query}`);
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  const saveFavorite = async (book) => {
    await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    alert('Salvat la favorite!');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f6ff' }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#1a1f4e' }} className="px-8 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold text-white">📚 Book Explorer</h1>
        <div className="flex gap-6">
          <Link href="/" className="text-white hover:text-pink-300 font-medium transition">Acasă</Link>
          <Link href="/favorites" className="text-white hover:text-pink-300 font-medium transition">❤️ Favorite</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a1f4e 0%, #6b4f8e 50%, #c084b8 100%)' }} className="text-white py-20 px-8 text-center">
        <h2 className="text-5xl font-bold mb-4">Descoperă cărți noi</h2>
        <p className="text-purple-200 mb-10 text-lg">Caută orice carte și salvează-ți favoritele</p>
        <div className="flex justify-center gap-3 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Caută o carte..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchBooks()}
            className="flex-1 px-5 py-4 rounded-full text-gray-800 text-lg focus:outline-none shadow-lg bg-white border-2 border-white placeholder-gray-400"
          />
          <button
            onClick={searchBooks}
            style={{ backgroundColor: '#e8a0d0' }}
            className="text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition shadow-lg"
          >
            Caută
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        {loading && (
          <p className="text-center text-purple-500 text-lg">Se încarcă...</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition hover:-translate-y-1">
              {book.thumbnail ? (
                <img src={book.thumbnail} alt={book.title} className="w-full h-60 object-cover" />
              ) : (
                <div className="w-full h-60 flex items-center justify-center text-6xl" style={{ backgroundColor: '#e8d5f5' }}>📖</div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{book.authors}</p>
                <button
                  onClick={() => saveFavorite(book)}
                  style={{ backgroundColor: '#1a1f4e' }}
                  className="w-full text-white py-2 rounded-full hover:opacity-90 transition font-semibold"
                >
                  ❤️ Salvează
                </button>
              </div>
            </div>
          ))}
        </div>

        {books.length === 0 && !loading && (
          <div className="text-center mt-20">
            <p className="text-7xl mb-4">📚</p>
            <p className="text-xl text-purple-400 font-medium">Caută o carte pentru a începe</p>
          </div>
        )}
      </div>
    </div>
  );
}