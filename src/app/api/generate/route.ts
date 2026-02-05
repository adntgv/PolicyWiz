import { NextRequest, NextResponse } from "next/server";
import { generatePolicy } from "@/lib/openai";
import { supabaseServer } from "@/lib/supabase-server";
import { generateShortCode } from "@/lib/utils";
import type { PolicyType, QuestionnaireData } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      policyType,
      questionnaire,
      anonymousToken,
    }: {
      policyType: PolicyType;
      questionnaire: QuestionnaireData;
      anonymousToken?: string;
    } = body;

    if (!policyType || !questionnaire || !questionnaire.appName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate the policy content via OpenAI
    const content = await generatePolicy(policyType, questionnaire);

    // Generate a unique short code
    const shortCode = generateShortCode();

    // Store in Supabase
    const { data, error } = await supabaseServer
      .from("policies")
      .insert({
        short_code: shortCode,
        policy_type: policyType,
        app_name: questionnaire.appName,
        app_url: questionnaire.appUrl || null,
        content,
        questionnaire,
        anonymous_token: anonymousToken || null,
        is_published: true,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save policy" },
        { status: 500 }
      );
    }

    return NextResponse.json({ policy: data });
  } catch (err: unknown) {
    console.error("Generate error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
