"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAnonymousToken } from "@/lib/utils";
import type { Policy } from "@/lib/types";
import PolicyCard from "@/components/PolicyCard";
import PolicyEditor from "@/components/PolicyEditor";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex justify-center">
          <svg
            className="animate-spin h-8 w-8 text-brand-500"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);

  const fetchPolicies = useCallback(async () => {
    const token = getAnonymousToken();
    if (!token) {
      setLoading(false);
      return;
    }

    const res = await fetch(`/api/policies?token=${encodeURIComponent(token)}`);
    if (res.ok) {
      const data = await res.json();
      setPolicies(data.policies || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  useEffect(() => {
    if (editId && policies.length > 0) {
      const policy = policies.find((p) => p.id === editId);
      if (policy) setEditingPolicy(policy);
    }
  }, [editId, policies]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this policy? This cannot be undone.")) return;

    const token = getAnonymousToken();
    const res = await fetch(
      `/api/policies?id=${id}&token=${encodeURIComponent(token)}`,
      { method: "DELETE" }
    );

    if (res.ok) {
      setPolicies((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = async (content: string) => {
    if (!editingPolicy) return;

    const token = getAnonymousToken();
    const res = await fetch("/api/policies", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingPolicy.id,
        content,
        anonymous_token: token,
      }),
    });

    if (res.ok) {
      const result = await res.json();
      setEditingPolicy(result.policy);
      setPolicies((prev) =>
        prev.map((p) => (p.id === result.policy.id ? result.policy : p))
      );
    }
  };

  if (editingPolicy) {
    return (
      <div className="py-10 px-4">
        <PolicyEditor
          policy={editingPolicy}
          onSave={handleSave}
          onBack={() => setEditingPolicy(null)}
        />
      </div>
    );
  }

  return (
    <div className="py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Policies</h1>
            <p className="text-gray-400 mt-1">
              Manage and edit your generated policy documents.
            </p>
          </div>
          <Link
            href="/generate"
            className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            + New Policy
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <svg
              className="animate-spin h-8 w-8 text-brand-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        ) : policies.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/50 border border-gray-800 rounded-xl">
            <span className="text-5xl mb-4 block">📄</span>
            <h2 className="text-xl font-semibold text-white mb-2">
              No policies yet
            </h2>
            <p className="text-gray-400 mb-6">
              Generate your first policy to get started.
            </p>
            <Link
              href="/generate"
              className="inline-block bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              Generate Policy
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policies.map((policy) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
