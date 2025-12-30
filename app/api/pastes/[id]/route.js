import { connectDB } from "@/lib/db";
import Paste from "@/models/Paste";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(
      JSON.stringify({ error: "Paste unavailable" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  await connectDB();
  const paste = await Paste.findById(id);

  // ✅ TEST_MODE time handling
  let now = Date.now();

  console.log("test_mode = ", process.env.TEST_MODE)
  
  if (process.env.TEST_MODE === "1") {
    const testNow = req.headers.get("x-test-now-ms");
    if (testNow) {
      now = Number(testNow);
    }
  }

  if (
    !paste ||
    (paste.expiresAt && now > paste.expiresAt.getTime()) ||
    (paste.maxViews !== null && paste.views >= paste.maxViews)
  ) {
    return new Response(
      JSON.stringify({ error: "Paste unavailable" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  paste.views += 1;
  await paste.save();

  return new Response(
    JSON.stringify({
      content: paste.content,
      remaining_views:
        paste.maxViews !== null ? paste.maxViews - paste.views : null,
      expires_at: paste.expiresAt
        ? paste.expiresAt.toISOString()
        : null,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
