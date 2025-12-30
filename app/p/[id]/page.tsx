import { connectDB } from "@/lib/db";
import Paste from "@/models/Paste";
import { notFound } from "next/navigation";
import mongoose from "mongoose";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) notFound();

  await connectDB();
  const paste = await Paste.findById(id);

  const now = Date.now();

  if (
    !paste ||
    (paste.expiresAt && now > paste.expiresAt.getTime()) ||
    (paste.maxViews !== null && paste.views >= paste.maxViews)
  ) {
    notFound();
  }

  paste.views += 1;
  await paste.save();

  return <pre>{paste.content}</pre>;
}
