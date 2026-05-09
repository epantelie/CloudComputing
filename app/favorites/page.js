'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    const res = await fetch('/api/favorites');
    const data = await res.json();
    setFavorites(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const deleteFavorite = async (id) => {
    await fetch(`/api/favorites/${id}`, { method: 'DELETE' });
    fetchFavorites();
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

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1a1f4e 0%, #6b4f8e 50%, #c084b8 100%)' }} className="text-white py-14 px-8 text-center">
        <h2 className="text-4xl font-bold mb-2">❤️ Cărțile mele favorite</h2>
        <p className="text-purple-200 text-lg">Colecția ta personală de cărți salvate</p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        {loading && <p className="text-center text-purple-500 text-lg">Se încarcă...</p>}

        {!loading && favorites.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-7xl mb-4">📭</p>
            <p className="text-xl text-purple-400 font-medium">Nu ai favorite salvate încă.</p>
            <Link href="/" style={{ backgroundColor: '#1a1f4e' }} className="inline-block mt-6 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition">
              Caută cărți
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((book) => (
            <div key={book._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition hover:-translate-y-1">
              {book.thumbnail ? (
                <img src={book.thumbnail} alt={book.title} className="w-full h-60 object-cover" />
              ) : (
                <div className="w-full h-60 flex items-center justify-center text-6xl" style={{ backgroundColor: '#e8d5f5' }}>📖</div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{book.authors}</p>
                <button
                  onClick={() => deleteFavorite(book._id)}
                  className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition font-semibold"
                >
                  🗑️ Șterge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}