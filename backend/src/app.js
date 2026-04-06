import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);

// health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
