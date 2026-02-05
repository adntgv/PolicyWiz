import type { PolicyType, QuestionnaireData } from "./types";
import { POLICY_TYPE_LABELS } from "./types";

const SYSTEM_PROMPT = `You are a legal document generator for websites and applications. 
Generate professional, comprehensive policy documents based on the provided information.
The policies should be well-structured with clear sections and headings using Markdown formatting.
Include standard legal clauses appropriate for the policy type and jurisdiction.
IMPORTANT: These are templates — always include a note that they should be reviewed by a legal professional.
Use ## for main sections, ### for subsections. Be thorough but readable.`;

function buildUserPrompt(type: PolicyType, data: QuestionnaireData): string {
  const label = POLICY_TYPE_LABELS[type];

  let prompt = `Generate a ${label} for the following application/website:\n\n`;
  prompt += `- App/Website Name: ${data.appName}\n`;
  if (data.appUrl) prompt += `- URL: ${data.appUrl}\n`;
  if (data.appDescription) prompt += `- Description: ${data.appDescription}\n`;
  prompt += `- Contact Email: ${data.contactEmail}\n`;
  prompt += `- Jurisdiction: ${data.jurisdiction}\n`;

  if (type === "privacy" || type === "cookies") {
    prompt += `- Data Collected: ${data.dataCollected.join(", ")}\n`;
    prompt += `- Third-Party Services: ${data.thirdPartyServices.join(", ")}\n`;
    prompt += `- Has User Accounts: ${data.hasUserAccounts ? "Yes" : "No"}\n`;
    if (data.cookieTypes.length > 0) {
      prompt += `- Cookie Types: ${data.cookieTypes.join(", ")}\n`;
    }
    if (data.minimumAge) {
      prompt += `- Minimum User Age: ${data.minimumAge}\n`;
    }
  }

  if (type === "terms") {
    prompt += `- Has User Accounts: ${data.hasUserAccounts ? "Yes" : "No"}\n`;
    prompt += `- Accepts Payments: ${data.acceptsPayments ? "Yes" : "No"}\n`;
    prompt += `- Has Refund Policy: ${data.hasRefundPolicy ? "Yes" : "No"}\n`;
    if (data.minimumAge) {
      prompt += `- Minimum User Age: ${data.minimumAge}\n`;
    }
  }

  if (type === "refund") {
    prompt += `- Accepts Payments: ${data.acceptsPayments ? "Yes" : "No"}\n`;
  }

  prompt += `\nGenerate the complete ${label} in Markdown format. `;
  prompt += `Start with the title "# ${label} for ${data.appName}". `;
  prompt += `Include "Last updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}" after the title.`;

  return prompt;
}

export async function generatePolicy(
  type: PolicyType,
  data: QuestionnaireData
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(type, data) },
      ],
      temperature: 0.4,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const result = await response.json();
  return result.choices[0].message.content;
}
