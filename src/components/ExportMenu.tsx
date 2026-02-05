"use client";

import { useState, useRef, useEffect } from "react";
import { markdownToHtml, stripMarkdown } from "@/lib/utils";

interface ExportMenuProps {
  content: string;
  title: string;
}

export default function ExportMenu({ content, title }: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const copyAs = async (format: "markdown" | "html" | "text") => {
    let text = content;
    if (format === "html") text = markdownToHtml(content);
    if (format === "text") text = stripMarkdown(content);

    await navigator.clipboard.writeText(text);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadPdf = () => {
    // Open print dialog for PDF export
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const html = markdownToHtml(content);
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; line-height: 1.6; }
            h1 { font-size: 24px; border-bottom: 2px solid #333; padding-bottom: 10px; }
            h2 { font-size: 20px; margin-top: 30px; }
            h3 { font-size: 16px; margin-top: 20px; }
            ul { padding-left: 20px; }
            li { margin-bottom: 4px; }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 overflow-hidden">
          <button
            onClick={() => copyAs("markdown")}
            className="w-full px-4 py-2.5 text-sm text-left text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            {copied === "markdown" ? "✓ Copied!" : "Copy as Markdown"}
          </button>
          <button
            onClick={() => copyAs("html")}
            className="w-full px-4 py-2.5 text-sm text-left text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            {copied === "html" ? "✓ Copied!" : "Copy as HTML"}
          </button>
          <button
            onClick={() => copyAs("text")}
            className="w-full px-4 py-2.5 text-sm text-left text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            {copied === "text" ? "✓ Copied!" : "Copy as Plain Text"}
          </button>
          <div className="border-t border-gray-700" />
          <button
            onClick={downloadPdf}
            className="w-full px-4 py-2.5 text-sm text-left text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}
