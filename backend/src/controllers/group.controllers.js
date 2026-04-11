import { Group } from "../models/group.model.js";

export async function createGroup(req, res) {
  try {
    const { groupName, groupDescription, isPublic, tags } = req.body;

    if (!groupName || !groupDescription) {
      return res.status(400).json({
        success: false,
        message: "Group name and description is required",
      });
    }

    const group = Group.create({
      groupName,
      groupDescription,
      isPublic: isPublic || true,
      tags: tags || [],
      createdBy: req.user.id,
      members: [req.user.id],
      admin: [req.user.id],
    });

    res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: group,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function getGroups(req, res) {}

export async function getGroupById(req, res) {}

export async function joinGroup(req, res) {}

export async function leaveGroup(req, res) {}

export async function deleteGroup(req, res) {}

export async function exploreGroups(req, res) {}