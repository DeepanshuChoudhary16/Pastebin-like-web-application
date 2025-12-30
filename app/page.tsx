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

  function handleClear() {
    setContent("");
    setTtl("");
    setMaxViews("");
    setLink("");
    setError("");
  }

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  };

  const buttonStyle = {
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    border: "1px solid transparent",
  };

  return (
    <main style={{ padding: 24, maxWidth: 600, margin: "auto" }}>
      <h1 style={{ marginBottom: 16 }}>Create a Paste</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          rows={8}
          placeholder="Write your paste here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ ...inputStyle, resize: "vertical" }}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="TTL (seconds, optional)"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
          style={inputStyle}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Max views (optional)"
          value={maxViews}
          onChange={(e) => setMaxViews(e.target.value)}
          style={inputStyle}
        />

        <br />
        <br />
        <p><i>Please wait for 5 seconds after clicking Create Paste button</i></p>
        <button
          type="submit"
          style={{
            ...buttonStyle,
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "1px solid #2563eb",
          }}>
          Create Paste
        </button>

        <button
          type="button"
          onClick={handleClear}
          style={{
            ...buttonStyle,
            marginLeft: 12,
            backgroundColor: "#f3f4f6",
            color: "#111",
            border: "1px solid #ccc",
          }}>
          Clear
        </button>
      </form>

      {error && <p style={{ color: "#dc2626", marginTop: 12 }}>{error}</p>}

      {link && (
        <p style={{ marginTop: 12 }}>
          Paste link:{" "}
          <a
            href={link}
            target="_blank"
            style={{ color: "#2563eb", textDecoration: "underline" }}>
            {window.location.origin + link}
          </a>
        </p>
      )}
    </main>
  );
}
