"use client";

import { useState } from "react";
import type { Policy } from "@/lib/types";
import { POLICY_TYPE_LABELS } from "@/lib/types";
import ExportMenu from "./ExportMenu";

interface PolicyEditorProps {
  policy: Policy;
  onSave: (content: string) => Promise<void>;
  onBack: () => void;
}

export default function PolicyEditor({
  policy,
  onSave,
  onBack,
}: PolicyEditorProps) {
  const [content, setContent] = useState(policy.content);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(content);
    setSaving(false);
    setIsEditing(false);
  };

  const renderMarkdown = (md: string) => {
    // Simple markdown renderer
    const lines = md.split("\n");
    const html = lines
      .map((line) => {
        if (line.startsWith("### "))
          return `<h3 class="text-lg font-semibold text-white mt-6 mb-2">${line.slice(4)}</h3>`;
        if (line.startsWith("## "))
          return `<h2 class="text-xl font-bold text-white mt-8 mb-3">${line.slice(3)}</h2>`;
        if (line.startsWith("# "))
          return `<h1 class="text-2xl font-bold text-white mt-4 mb-4">${line.slice(2)}</h1>`;
        if (line.startsWith("- "))
          return `<li class="text-gray-300 ml-4">${line.slice(2)}</li>`;
        if (line.trim() === "") return "<br/>";
        // Bold
        const processed = line
          .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
          .replace(/\*(.+?)\*/g, "<em>$1</em>");
        return `<p class="text-gray-300 leading-relaxed">${processed}</p>`;
      })
      .join("");
    return html;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={onBack}
            className="text-sm text-gray-400 hover:text-white mb-2 flex items-center gap-1"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">
            {POLICY_TYPE_LABELS[policy.policy_type]} — {policy.app_name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Public URL:{" "}
            <a
              href={`/p/${policy.short_code}`}
              className="text-brand-400 hover:underline"
              target="_blank"
            >
              /p/{policy.short_code}
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportMenu content={content} title={`${POLICY_TYPE_LABELS[policy.policy_type]} - ${policy.app_name}`} />
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setContent(policy.content);
                  setIsEditing(false);
                }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm bg-brand-600 hover:bg-brand-500 text-white rounded-lg disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-6">
        <p className="text-yellow-200 text-sm">
          ⚠️ Generated policies are templates and not legal advice. Please
          review with a qualified attorney before publishing.
        </p>
      </div>

      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[600px] bg-gray-900 border border-gray-700 rounded-xl p-6 text-gray-300 font-mono text-sm leading-relaxed focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-y"
        />
      ) : (
        <div
          className="bg-gray-900 border border-gray-700 rounded-xl p-8 prose-invert"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
      )}
    </div>
  );
}
