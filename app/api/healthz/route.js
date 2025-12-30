import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
