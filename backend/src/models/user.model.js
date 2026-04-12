// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {},
  {
    strict: false, // ← accepts any fields Better Auth adds
    collection: "user", // ← explicitly point to Better Auth's collection
  },
);

export const User = mongoose.model("user", userSchema);
