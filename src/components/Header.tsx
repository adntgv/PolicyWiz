"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            PW
          </div>
          <span className="text-xl font-bold text-white">
            Policy<span className="text-brand-400">Wiz</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/generate"
            className={`text-sm font-medium transition-colors ${
              pathname === "/generate"
                ? "text-brand-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Generate
          </Link>
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors ${
              pathname === "/dashboard"
                ? "text-brand-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/generate"
            className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
