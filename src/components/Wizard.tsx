"use client";

import { useState } from "react";
import type { PolicyType, QuestionnaireData } from "@/lib/types";
import {
  POLICY_TYPE_LABELS,
  DATA_COLLECTION_OPTIONS,
  THIRD_PARTY_OPTIONS,
  COOKIE_TYPE_OPTIONS,
  JURISDICTION_OPTIONS,
} from "@/lib/types";

interface WizardProps {
  onComplete: (type: PolicyType, data: QuestionnaireData) => void;
  isLoading: boolean;
}

const STEPS = ["Policy Type", "Basic Info", "Data & Services", "Review"];

export default function Wizard({ onComplete, isLoading }: WizardProps) {
  const [step, setStep] = useState(0);
  const [policyType, setPolicyType] = useState<PolicyType>("privacy");
  const [data, setData] = useState<QuestionnaireData>({
    appName: "",
    appUrl: "",
    appDescription: "",
    contactEmail: "",
    jurisdiction: "United States",
    dataCollected: [],
    thirdPartyServices: [],
    hasUserAccounts: false,
    acceptsPayments: false,
    hasRefundPolicy: false,
    cookieTypes: [],
    minimumAge: "13",
  });

  const updateData = (updates: Partial<QuestionnaireData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const toggleArrayItem = (
    field: "dataCollected" | "thirdPartyServices" | "cookieTypes",
    item: string
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const canProceed = () => {
    if (step === 1) return data.appName.trim() && data.contactEmail.trim();
    return true;
  };

  const handleSubmit = () => {
    onComplete(policyType, data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i <= step
                  ? "bg-brand-600 text-white"
                  : "bg-gray-800 text-gray-500"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`ml-2 text-sm hidden sm:inline ${
                i <= step ? "text-white" : "text-gray-500"
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={`w-8 sm:w-16 h-px mx-2 ${
                  i < step ? "bg-brand-600" : "bg-gray-800"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Policy Type */}
      {step === 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            What policy do you need?
          </h2>
          <p className="text-gray-400">
            Select the type of policy you want to generate.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {(Object.entries(POLICY_TYPE_LABELS) as [PolicyType, string][]).map(
              ([key, label]) => (
                <button
                  key={key}
                  onClick={() => setPolicyType(key)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    policyType === key
                      ? "border-brand-500 bg-brand-500/10 text-white"
                      : "border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-600"
                  }`}
                >
                  <span className="font-medium">{label}</span>
                  <span className="block text-xs text-gray-500 mt-1">
                    {key === "privacy" && "How you collect and use data"}
                    {key === "terms" && "Rules for using your service"}
                    {key === "cookies" && "Cookie usage disclosure"}
                    {key === "refund" && "Return and refund conditions"}
                    {key === "dmca" && "Copyright takedown procedures"}
                  </span>
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-2xl font-bold text-white">
            Tell us about your app
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              App / Website Name *
            </label>
            <input
              type="text"
              value={data.appName}
              onChange={(e) => updateData({ appName: e.target.value })}
              placeholder="e.g. MyAwesomeApp"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Website URL
            </label>
            <input
              type="url"
              value={data.appUrl}
              onChange={(e) => updateData({ appUrl: e.target.value })}
              placeholder="https://example.com"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Brief Description
            </label>
            <textarea
              value={data.appDescription}
              onChange={(e) => updateData({ appDescription: e.target.value })}
              placeholder="What does your app do?"
              rows={2}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Contact Email *
            </label>
            <input
              type="email"
              value={data.contactEmail}
              onChange={(e) => updateData({ contactEmail: e.target.value })}
              placeholder="legal@example.com"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Jurisdiction
            </label>
            <select
              value={data.jurisdiction}
              onChange={(e) => updateData({ jurisdiction: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            >
              {JURISDICTION_OPTIONS.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.hasUserAccounts}
                onChange={(e) =>
                  updateData({ hasUserAccounts: e.target.checked })
                }
                className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-brand-500 focus:ring-brand-500"
              />
              <span className="text-sm text-gray-300">User accounts</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.acceptsPayments}
                onChange={(e) =>
                  updateData({ acceptsPayments: e.target.checked })
                }
                className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-brand-500 focus:ring-brand-500"
              />
              <span className="text-sm text-gray-300">Accepts payments</span>
            </label>
          </div>
        </div>
      )}

      {/* Step 2: Data & Services */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Data & Third-Party Services
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              What data do you collect?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DATA_COLLECTION_OPTIONS.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={data.dataCollected.includes(item)}
                    onChange={() => toggleArrayItem("dataCollected", item)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-sm text-gray-300">{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Third-party services used
            </label>
            <div className="grid grid-cols-2 gap-2">
              {THIRD_PARTY_OPTIONS.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={data.thirdPartyServices.includes(item)}
                    onChange={() => toggleArrayItem("thirdPartyServices", item)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-sm text-gray-300">{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Cookie types
            </label>
            <div className="grid grid-cols-2 gap-2">
              {COOKIE_TYPE_OPTIONS.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={data.cookieTypes.includes(item)}
                    onChange={() => toggleArrayItem("cookieTypes", item)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-sm text-gray-300">{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Minimum age requirement
            </label>
            <select
              value={data.minimumAge}
              onChange={(e) => updateData({ minimumAge: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            >
              <option value="13">13+</option>
              <option value="16">16+</option>
              <option value="18">18+</option>
              <option value="">No restriction</option>
            </select>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-2xl font-bold text-white">Review & Generate</h2>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Policy Type</span>
              <span className="text-white font-medium">
                {POLICY_TYPE_LABELS[policyType]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">App Name</span>
              <span className="text-white">{data.appName}</span>
            </div>
            {data.appUrl && (
              <div className="flex justify-between">
                <span className="text-gray-400">URL</span>
                <span className="text-white">{data.appUrl}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">Contact</span>
              <span className="text-white">{data.contactEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Jurisdiction</span>
              <span className="text-white">{data.jurisdiction}</span>
            </div>
            {data.dataCollected.length > 0 && (
              <div>
                <span className="text-gray-400 block mb-1">Data collected</span>
                <div className="flex flex-wrap gap-1.5">
                  {data.dataCollected.map((d) => (
                    <span
                      key={d}
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.thirdPartyServices.length > 0 && (
              <div>
                <span className="text-gray-400 block mb-1">Third-party services</span>
                <div className="flex flex-wrap gap-1.5">
                  {data.thirdPartyServices.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-200 text-sm">
              ⚠️ Generated policies are templates and not legal advice. Please
              review with a qualified attorney before publishing.
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed()}
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
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
                Generating...
              </>
            ) : (
              "Generate Policy"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
