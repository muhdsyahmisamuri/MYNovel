import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
import userRoutes from "./src/routes/userRoutes.js";
import initDatabase from "./src/config/initDatabase.js";
import path from "path";
import { fileURLToPath } from "url";

// Configure dotenv
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", userRoutes);

// Root route - Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Initialize database and start the server
const startServer = async () => {
  try {
    // Ensure the database exists
    await initDatabase();

    // Sync Sequelize models and start the server
    await sequelize.sync({ alter: true });
    console.log("Database connected and synchronized");
    const PORT = process.env.PORT;
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();
