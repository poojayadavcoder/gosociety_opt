import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });


const options = {
};

export const operationsConn = mongoose.createConnection(process.env.OPERATIONS_DB_URI, options);
export const peopleConn = mongoose.createConnection(process.env.PEOPLE_DB_URI, options);

operationsConn.on("connected", () => {
  console.log(`Operation Database Connected: ${operationsConn.host}`);
});

operationsConn.on("error", (err) => {
  console.error(`Operation DB Connection Error: ${err.message}`);
});

peopleConn.on("connected", () => {
  console.log(`People Database Connected (from Ops): ${peopleConn.host}`);
});

peopleConn.on("error", (err) => {
  console.error(`People DB Connection Error: ${err.message}`);
});

const connectDB = async () => {
  try {
    await Promise.all([
      operationsConn.asPromise(),
      peopleConn.asPromise()
    ]);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
