// Frontend JS (Made by ChatGPT)
const BACKEND_URL = "http://localhost:3001";

const statusEl = document.getElementById("status");
const echoInput = document.getElementById("echoInput");
const sendBtn = document.getElementById("sendBtn");
const echoOut = document.getElementById("echoOut");

(async () => {
  try {
    const r = await fetch(`${BACKEND_URL}/api/health`);
    const data = await r.json();
    statusEl.textContent = "Backend says: " + JSON.stringify(data);
  } catch {
    statusEl.textContent = "Could not reach backend. Is it running on port 3001?";
  }
})();

sendBtn.addEventListener("click", async () => {
  try {
    const body = { message: echoInput.value || "hello from frontend" };
    const r = await fetch(`${BACKEND_URL}/api/echo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    echoOut.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    echoOut.textContent = "Error calling backend: " + e.message;
  }
});
