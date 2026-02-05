export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-500 rounded flex items-center justify-center text-white font-bold text-xs">
              PW
            </div>
            <span className="text-sm text-gray-400">
              PolicyWiz &copy; {new Date().getFullYear()}
            </span>
          </div>
          <p className="text-xs text-gray-500 text-center max-w-lg">
            ⚠️ Generated policies are templates and not legal advice. Please
            consult a qualified attorney to ensure your policies meet all
            applicable legal requirements.
          </p>
        </div>
      </div>
    </footer>
  );
}
