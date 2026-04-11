import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
    },
    groupDescription: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    isPublic: {
      type: Boolean,
      default: true,
    },
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    coverImage: {
      type: String,
      default: null,
    },
    tags: { type: [String], index: true },
  },
  { timestamps: true },
);

export const Group = mongoose.model("Group",groupSchema)