// Farmer GPT backend (CommonJS)
// Works on Render and locally

const express = require("express");
const cors = require("cors");

const app = express();

// Allow JSON bodies
app.use(express.json());

// CORS: allow your static site on render.com and local dev
const allowed = [
  // add your static site origin(s) here if you want to restrict
  // e.g. "https://farmer-gpt-3.onrender.com"
];
app.use(
  cors({
    origin: (origin, cb) => {
      // Allow no-origin requests too (curl, same-origin on Render)
      if (!origin || allowed.length === 0 || allowed.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: false
  })
);

// --- Routes ---

// Health check used by frontend: GET /api/health
app.get("/api/health", (req, res) => {
  res.json({
    app: "Farmer GPT",
    status: "healthy",
    by: "ChatGPT",
    time: new Date().toISOString()
  });
});

// Echo endpoint used by frontend: POST /api/echo
// Expects: { text: "hello" }  (we also accept { message: "..." } to be flexible)
app.post("/api/echo", (req, res) => {
  const text = req.body?.text ?? req.body?.message ?? "";
  res.json({
    echo: text,
    time: new Date().toISOString()
  });
});

// (Optional) Welcome at root
app.get("/", (_req, res) => {
  res.type("text").send("Farmer GPT backend is running. Try GET /api/health");
});

// --- Start server ---
// Render provides PORT; default to 3001 locally
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
