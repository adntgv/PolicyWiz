"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Wizard from "@/components/Wizard";
import PolicyEditor from "@/components/PolicyEditor";
import { getAnonymousToken } from "@/lib/utils";
import type { Policy, PolicyType, QuestionnaireData } from "@/lib/types";

export default function GeneratePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPolicy, setGeneratedPolicy] = useState<Policy | null>(null);

  const handleGenerate = async (
    type: PolicyType,
    data: QuestionnaireData
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const anonymousToken = getAnonymousToken();
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          policyType: type,
          questionnaire: data,
          anonymousToken,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to generate policy");
      }

      setGeneratedPolicy(result.policy);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (content: string) => {
    if (!generatedPolicy) return;

    const anonymousToken = getAnonymousToken();
    const res = await fetch("/api/policies", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: generatedPolicy.id,
        content,
        anonymous_token: anonymousToken,
      }),
    });

    if (res.ok) {
      const result = await res.json();
      setGeneratedPolicy(result.policy);
    }
  };

  if (generatedPolicy) {
    return (
      <div className="py-10 px-4">
        <PolicyEditor
          policy={generatedPolicy}
          onSave={handleSave}
          onBack={() => setGeneratedPolicy(null)}
        />
      </div>
    );
  }

  return (
    <div className="py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white">Generate a Policy</h1>
        <p className="text-gray-400 mt-2">
          Follow the steps below to create your legal policy document.
        </p>
      </div>
      {error && (
        <div className="max-w-2xl mx-auto mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}
      <Wizard onComplete={handleGenerate} isLoading={isLoading} />
    </div>
  );
}
