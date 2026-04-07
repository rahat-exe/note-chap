import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import {toNodeHandler} from "better-auth/node"
import { auth } from "./auth.ts";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
  }),
);

app.use(express.json());

// Mount Better Auth — handles /api/auth/** routes automatically
app.all("/api/auth/*path", toNodeHandler(auth))

// routes
app.use("/api/users", userRoutes);

// health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
