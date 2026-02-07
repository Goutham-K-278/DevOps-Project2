const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", uptime: process.uptime() });
});

// Version Endpoint
app.get("/version", (req, res) => {
  res.json({ version: process.env.APP_VERSION });
});

// Task Routes
app.use("/api/tasks", taskRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
