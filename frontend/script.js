// --- CONFIG: set your backend base URL (NO trailing slash) ---
const BACKEND_URL = "https://farmer-gpt.onrender.com";

// small helper
const $ = (sel) => document.querySelector(sel);

async function checkHealth() {
  const statusEl = $("#status");
  statusEl.textContent = "Connecting to backend...";
  try {
    const res = await fetch(`${BACKEND_URL}/api/health`, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    statusEl.textContent = `Backend says: ${data.status}`;
  } catch (e) {
    statusEl.textContent = "Could not reach backend. Is it running?";
    console.error("Health check failed:", e);
  }
}

async function sendEcho() {
  const input = $("#echo-input").value || "";
  const out = $("#echo-output");
  out.textContent = "…sending…";
  try {
    const res = await fetch(`${BACKEND_URL}/api/echo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    out.textContent = data.echo ?? JSON.stringify(data);
  } catch (e) {
    out.textContent = `Error: ${e}`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  checkHealth();
  $("#echo-btn").addEventListener("click", sendEcho);
});
