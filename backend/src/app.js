import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import groupRoutes from "./routes/group.route.js";

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
app.use(cookieParser());

// Mount Better Auth — handles /api/auth/** routes automatically
app.all("/api/auth/*path", toNodeHandler(auth))

// routes
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes)

// health check
app.get("/", (req, res) => {
  res.json({message:"Hello form backend...server is running"});
});

export default app;
