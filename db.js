import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;
dotenv.config();

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const connection = new Pool(databaseConfig);

export default connection;
