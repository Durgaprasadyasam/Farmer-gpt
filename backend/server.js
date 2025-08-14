const express = require("express");
const cors = require("cors");

const app = express();

// IMPORTANT: set this to your static site's URL so browsers can call the API
const FRONTEND_URL = "https://farmer-gpt-3.onrender.com";

// CORS
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:5500", "http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// JSON body parsing
app.use(express.json());

// Welcome
app.get("/", (_req, res) => {
  res.type("text/plain").send("Farmer GPT backend is running. Try GET /api/health");
});

// Health endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    app: "Farmer GPT",
    status: "healthy",
    by: "ChatGPT",
    time: new Date().toISOString(),
  });
});

// Echo endpoint
app.post("/api/echo", (req, res) => {
  const text = (req.body && (req.body.text || req.body.message)) || "";
  res.json({ echo: text, ok: true, time: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 3001; // Render assigns PORT env var
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
