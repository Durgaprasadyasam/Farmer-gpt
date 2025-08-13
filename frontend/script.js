// === CONFIG: set your backend URL (NO trailing slash) ===
const BACKEND_URL = "https://farmer-gpt.onrender.com"; // <-- keep this exact value

// tiny helper
const $ = (sel) => document.querySelector(sel);

// show messages in the status line
function setStatus(text) {
  const el = $("#status");
  if (el) el.textContent = text;
}

async function checkHealth() {
  setStatus("Connecting to backend...");
  try {
    const res = await fetch(`${BACKEND_URL}/api/health`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    setStatus(`Backend says: ${data.status || "ok"}`);
  } catch (err) {
    setStatus("Could not reach backend. Is it running?");
    console.error("Health check failed:", err);
  }
}

async function sendEcho() {
  const input = $("#echo-input");
  const out = $("#echo-output");
  if (!input || !out) return;

  const text = input.value.trim();
  if (!text) {
    out.textContent = "Type something first 🙂";
    return;
  }

  out.textContent = "…sending…";
  try {
    const res = await fetch(`${BACKEND_URL}/api/echo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // prefer echoed text if backend returns it
    out.textContent = data.echo ?? JSON.stringify(data);
  } catch (err) {
    out.textContent = `Error: ${err.message || err}`;
    console.error("Echo failed:", err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // wire up button
  const btn = $("#echo-btn");
  if (btn) btn.addEventListener("click", (e) => {
    e.preventDefault(); // <- keep page from navigating
    sendEcho();
  });

  // run initial health check
  checkHealth();
});
