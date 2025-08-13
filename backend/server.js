import express from "express";
import cors from "cors";

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables from Render settings (no dotenv needed)
const PORT = process.env.PORT || 5000;

// Root route
app.get("/", (req, res) => {
  res.send("Farmer GPT backend is running on Render 🚀");
});

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Farmer GPT backend!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
