"use client";

import { useState } from "react";

export default function HomePage() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLink("");

    if (!content.trim()) {
      setError("Paste content cannot be empty");
      return;
    }

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: maxViews ? Number(maxViews) : undefined,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setLink(`/p/${data.id}`);
    setContent("");
    setTtl("");
    setMaxViews("");
  }

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1>Create a Paste</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          rows={8}
          placeholder="Write your paste here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%" }}
        />

        <br /><br />

        <input
          type="number"
          placeholder="TTL (seconds, optional)"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Max views (optional)"
          value={maxViews}
          onChange={(e) => setMaxViews(e.target.value)}
        />

        <br /><br />

        <button type="submit">Create Paste</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {link && (
        <p>
          Paste link:{" "}
          <a href={link} target="_blank">
            {window.location.origin + link}
          </a>
        </p>
      )}
    </main>
  );
}
