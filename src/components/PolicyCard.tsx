"use client";

import type { Policy } from "@/lib/types";
import { POLICY_TYPE_LABELS } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface PolicyCardProps {
  policy: Policy;
  onDelete: (id: string) => void;
}

const TYPE_COLORS: Record<string, string> = {
  privacy: "bg-blue-500/20 text-blue-300",
  terms: "bg-purple-500/20 text-purple-300",
  cookies: "bg-amber-500/20 text-amber-300",
  refund: "bg-green-500/20 text-green-300",
  dmca: "bg-red-500/20 text-red-300",
};

export default function PolicyCard({ policy, onDelete }: PolicyCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              TYPE_COLORS[policy.policy_type] || "bg-gray-700 text-gray-300"
            }`}
          >
            {POLICY_TYPE_LABELS[policy.policy_type]}
          </span>
          <h3 className="text-lg font-semibold text-white mt-2">
            {policy.app_name}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <span
            className={`w-2 h-2 rounded-full ${
              policy.is_published ? "bg-green-400" : "bg-gray-600"
            }`}
          />
          <span className="text-xs text-gray-500">
            {policy.is_published ? "Published" : "Draft"}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Created {formatDate(policy.created_at)}
        {policy.app_url && (
          <>
            {" · "}
            <span className="text-gray-400">{policy.app_url}</span>
          </>
        )}
      </p>
      <div className="flex items-center gap-2">
        <Link
          href={`/p/${policy.short_code}`}
          target="_blank"
          className="text-xs text-brand-400 hover:text-brand-300 font-medium"
        >
          View Public Page →
        </Link>
        <span className="text-gray-700">|</span>
        <Link
          href={`/dashboard?edit=${policy.id}`}
          className="text-xs text-gray-400 hover:text-white font-medium"
        >
          Edit
        </Link>
        <span className="text-gray-700">|</span>
        <button
          onClick={() => onDelete(policy.id)}
          className="text-xs text-red-400 hover:text-red-300 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
