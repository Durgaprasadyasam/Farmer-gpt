// backend/server.js
require("dotenv").config(); // loads .env in local dev; harmless on Render

const express = require("express");
const cors = require("cors");

const app = express();

// CORS: allow your static site
const FRONTEND_URL = process.env.FRONTEND_URL || "https://farmer-gpt-3.onrender.com";

app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:3000", "http://localhost:5173", "http://localhost:5500"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.type("text/plain").send("Farmer GPT backend is running. Try GET /api/health");
});

app.get("/api/health", (_req, res) => {
  res.json({
    app: "Farmer GPT",
    status: "healthy",
    by: "ChatGPT",
    time: new Date().toISOString(),
  });
});

app.post("/api/echo", (req, res) => {
  const text = (req.body && (req.body.text || req.body.message)) || "";
  res.json({ echo: text, ok: true, time: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001; // Render sets PORT automatically
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
