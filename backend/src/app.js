import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { doubleCsrf } from "csrf-csrf";
import userRoutes from "./routes/user.routes.js";
import groupRoutes from "./routes/group.route.js";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.ts";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
  getSessionIdentifier: (req) => req.ip,
  cookieName:
    process.env.NODE_ENV === "production"
      ? "__Host-psifi.x-csrf-token"
      : "x-csrf-token",
  cookieOptions: {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  },
});

// health check
app.get("/", (req, res) => {
  res.json({ message: "Hello form backend...server is running" });
});

// Route to give the CSRF token to the frontend
app.get("/api/csrf-token", (req, res) => {
  const csrfToken = generateCsrfToken(req, res);
  res.json({ csrfToken });
});

// Mount Better Auth — handles /api/auth/** routes automatically
app.all("/api/auth/*path", toNodeHandler(auth));

// routes
app.use("/api", doubleCsrfProtection);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);

export default app;
