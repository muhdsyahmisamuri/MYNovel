import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
import userRoutes from "./src/routes/userRoutes.js";
import initDatabase from "./src/config/initDatabase.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);

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
