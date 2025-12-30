import { connectDB } from "@/lib/db";
import Paste from "@/models/Paste";

export async function POST(req) {
  const { content, ttl_seconds, max_views } = await req.json();

  if (!content?.trim()) {
    return new Response(
      JSON.stringify({ error: "Content required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  await connectDB();

  const expiresAt = ttl_seconds
    ? new Date(Date.now() + ttl_seconds * 1000)
    : null;

  const paste = await Paste.create({
    content,
    expiresAt,
    maxViews: max_views ?? null,
  });

  return new Response(
    JSON.stringify({ id: paste._id.toString() }),
    { status: 201, headers: { "Content-Type": "application/json" } }
  );
}
