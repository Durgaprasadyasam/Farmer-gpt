// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// allow browser calls
app.use(cors({ origin: true }));
app.use(express.json());           // <-- required for POST JSON

// Health used by frontend banner
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "farmer-gpt-backend" });
});

// Echo supports both GET and POST; always return JSON
app.get("/echo", (req, res) => {
  res.json({ message: String(req.query.message ?? "") });
});

app.post("/echo", (req, res) => {
  res.json({ echo: String(req.body?.message ?? "") });
});

// Optional: keep your existing /json route too
app.get("/", (req, res) => res.send("Hello from Farmer GPT backend"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
