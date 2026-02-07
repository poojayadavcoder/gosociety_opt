import express from "express";
import cors from "cors";
import operationsRoutes from "./routes/operations.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
console.log("--- OPERATIONS SERVICE CODEBASE MARKER: v1.1 ---");

app.use("/operations", authMiddleware, operationsRoutes);

app.get("/", (req, res) => {
  res.send("GoSociety Operations Service Running");
});

export default app;

