'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-500 glow">CodeZIP</h1>
        <div className="space-x-6">
          <Link href="/" className="text-gray-300 hover:text-green-500 transition">Home</Link>
          <Link href="/codezip" className="text-gray-300 hover:text-green-500 transition">CodeZIP Studio</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-extrabold text-green-500 glow mb-6 animate-pulse">
          CodeZIP: Build the Future
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Transform ideas into reality with our AI-powered coding platform. Zip your code, unleash your creativity.
        </p>
        <Link
          href="/codezip"
          className="px-8 py-4 bg-green-500 text-black font-semibold rounded-full glow hover:bg-green-600 transition transform hover:scale-105"
        >
          Try CodeZIP Now
        </Link>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400">
        <p>
          Powered by{' '}
          <a
            href="https://github.com/subatomicERROR"
            className="text-green-500 glow hover:underline"
          >
            subatomicERROR
          </a>
        </p>
      </footer>
    </div>
  );
}