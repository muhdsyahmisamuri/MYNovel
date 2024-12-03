import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Create a Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      timezone: "+08:00",
    }
);

export default sequelize;
