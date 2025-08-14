// backend/server.js
require("dotenv").config(); // local dev only; harmless on Render

const express = require("express");
const cors = require("cors");

const app = express();

// Allow your static site (and be lenient to avoid CORS surprises)
const FRONTEND_URL = process.env.FRONTEND_URL || "https://farmer-gpt-3.onrender.com";
const ALLOWED = new Set([FRONTEND_URL, "http://localhost:3000", "http://localhost:5173", "http://localhost:5500"]);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || ALLOWED.has(origin)) return cb(null, true);
      // be permissive to avoid blocking during tests
      return cb(null, true);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json());

// Root for quick check (text)
app.get("/", (_req, res) => {
  res.type("text/plain").send("Farmer GPT backend is running. Try GET /api/health");
});

// Health (JSON)
app.get("/api/health", (_req, res) => {
  res.json({ app: "Farmer GPT", status: "healthy", by: "ChatGPT", time: new Date().toISOString() });
});

// Echo (JSON)
app.post("/api/echo", (req, res) => {
  const text = (req.body && (req.body.text ?? req.body.message)) || "";
  res.json({ echo: text, ok: true, time: new Date().toISOString() });
});

// 404 JSON (prevents HTML responses breaking the frontend)
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.path });
});

// Error handler (always JSON)
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error", detail: err.message || String(err) });
});

const PORT = process.env.PORT || 3001; // Render sets PORT automatically
app.listen(PORT, () => console.log(`✅ Backend listening on ${PORT}`));
