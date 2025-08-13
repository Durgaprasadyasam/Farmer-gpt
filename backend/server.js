// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// CORS — allow your static site (or all during dev)
app.use(cors({ origin: true })); // you can restrict later: { origin: "https://YOUR-FRONTEND-DOMAIN" }
app.use(express.json());

// health check used by the frontend banner
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "farmer-gpt-backend" });
});

// echo endpoint supports both GET and POST
app.get("/echo", (req, res) => {
  const message = req.query.message ?? "";
  res.json({ message });
});

app.post("/echo", (req, res) => {
  const message = req.body?.message ?? "";
  res.json({ echo: message });
});

// optional root
app.get("/", (req, res) => res.send("Hello from Farmer GPT backend"));

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
