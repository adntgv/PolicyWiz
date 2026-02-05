import Link from "next/link";

const FEATURES = [
  {
    icon: "📋",
    title: "Step-by-Step Wizard",
    desc: "Answer simple questions about your app — no legal jargon required.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Generation",
    desc: "Get professional policies generated in seconds using GPT-4o-mini.",
  },
  {
    icon: "✏️",
    title: "Edit & Customize",
    desc: "Fine-tune every word. Your policies, your way.",
  },
  {
    icon: "📤",
    title: "Export Anywhere",
    desc: "Copy as HTML, Markdown, plain text, or download as PDF.",
  },
  {
    icon: "🌐",
    title: "Hosted Pages",
    desc: "Get a public URL for each policy. Link from your app instantly.",
  },
  {
    icon: "🔒",
    title: "5 Policy Types",
    desc: "Privacy, Terms, Cookies, Refund, and DMCA — all covered.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm px-4 py-1.5 rounded-full mb-6">
            ⚡ Ship your policies in minutes, not days
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Legal Policies for{" "}
            <span className="text-brand-400">Indie Hackers</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Answer a few questions about your app or website. Get professional
            Privacy Policy, Terms of Service, Cookie Policy, and more — ready to
            copy or embed.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/generate"
              className="bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-3.5 rounded-xl text-lg transition-colors shadow-lg shadow-brand-500/25"
            >
              Generate Free Policy →
            </Link>
            <Link
              href="/dashboard"
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3.5 rounded-xl text-lg transition-colors"
            >
              Dashboard
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            No sign-up required • First policy is free
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Everything you need to get compliant
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
              >
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 border-t border-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Three steps to compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Answer Questions",
                desc: "Fill in basic info about your app, data collection, and services.",
              },
              {
                step: "2",
                title: "Generate Policy",
                desc: "AI creates a comprehensive, professional policy document.",
              },
              {
                step: "3",
                title: "Publish & Embed",
                desc: "Copy the text, download PDF, or use your hosted public URL.",
              },
            ].map((item) => (
              <div key={item.step}>
                <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-gray-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to ship your policies?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of indie hackers who got compliant in minutes.
          </p>
          <Link
            href="/generate"
            className="inline-block bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-3.5 rounded-xl text-lg transition-colors shadow-lg shadow-brand-500/25"
          >
            Generate Your First Policy — Free
          </Link>
        </div>
      </section>
    </div>
  );
}
