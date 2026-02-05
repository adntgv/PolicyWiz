"use client";

import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
          PW
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Coming Soon
        </h1>
        <p className="text-gray-400 mb-8">
          User accounts with unlimited policies, custom branding, and more are
          coming soon. For now, your policies are stored locally and linked to
          your browser.
        </p>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-left space-y-3">
          <h3 className="font-semibold text-white">Pro Plan — $14/mo</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-brand-400">✓</span> Unlimited policies
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-400">✓</span> Custom branding on hosted pages
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-400">✓</span> Remove PolicyWiz branding
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-400">✓</span> Priority regeneration
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-400">✓</span> API access
            </li>
          </ul>
        </div>
        <Link
          href="/generate"
          className="inline-block mt-6 text-brand-400 hover:text-brand-300 text-sm font-medium"
        >
          ← Back to Generator
        </Link>
      </div>
    </div>
  );
}
