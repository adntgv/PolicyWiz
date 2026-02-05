import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

// GET /api/policies?token=xxx — list policies for anonymous user
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from("policies")
    .select("*")
    .eq("anonymous_token", token)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ policies: data });
}

// PUT /api/policies — update a policy
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, content, is_published, anonymous_token } = body;

  if (!id) {
    return NextResponse.json({ error: "Policy ID required" }, { status: 400 });
  }

  const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (content !== undefined) updateData.content = content;
  if (is_published !== undefined) updateData.is_published = is_published;

  let query = supabaseServer.from("policies").update(updateData).eq("id", id);

  if (anonymous_token) {
    query = query.eq("anonymous_token", anonymous_token);
  }

  const { data, error } = await query.select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ policy: data });
}

// DELETE /api/policies?id=xxx&token=xxx
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const token = req.nextUrl.searchParams.get("token");

  if (!id) {
    return NextResponse.json({ error: "Policy ID required" }, { status: 400 });
  }

  let query = supabaseServer.from("policies").delete().eq("id", id);

  if (token) {
    query = query.eq("anonymous_token", token);
  }

  const { error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
