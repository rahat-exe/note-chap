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
      admins: [req.user.id],
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

export async function getGroups(req, res) {
  try {
    const groups = await Group.find({
      members: req.user.id,
    })
      .populate("createdBy", "name email image")
      .sort({ createdAt: -1 });

    if (groups.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No group found" });
    }

    return res.status(200).json({
      success: true,
      message: "Groups found",
      data: groups,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function getGroupById(req, res) {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "No group found with this id" });
    }

    return res.status(200).json({
      success: true,
      message: "Group found",
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

export async function joinGroup(req, res) {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "No group found with this id" });
    }

    const alreadyMember = group.members.some(
      (id) => id.toString() === req.user.id.toString(),
    );

    if (alreadyMember) {
      return res.status(200).json({
        success: false,
        message: "Already a member",
      });
    }

    group.members.push(req.user.id);
    await group.save();

    return res.status(200).json({
      success: true,
      message: "Joined successfully",
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

export async function leaveGroup(req, res) {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "No group found with this id" });
    }

    const isMember = group.members.some(
      (id) => id.toString() === req.user.id.toString(),
    );

    if (!isMember) {
      return res.status(200).json({
        success: false,
        message: "Not a member",
      });
    }

    const isAdmin = group.admins.some((id) => id.toString() === req.user.id.toString());
    if(isAdmin){
      return res.status(400).json({
        success: false,
        message: "Cannot leave as admin",
      });
    }
    

    group.members = group.members.filter(
      (id) => id.toString() !== req.user.id.toString(),
    );
    await group.save();

    return res.status(200).json({
      success: true,
      message: "Left successfully",
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

export async function deleteGroup(req, res) {
  try {
    const { groupId } = req.params;
    const group = await Group.findOneAndDelete({
      _id:groupId,
      createdBy:req.user.id
    });

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "No group found or unauthorized" });
    }

    return res.status(200).json({
      success:true,
      message:"Group deleted",
    })

    
  } catch (error) {
     console.error(error);
     res.status(500).json({
       success: false,
       message: "Internal server error",
       error: error.message,
     });
  }
}

export async function exploreGroups(req, res) {
  try {
    const { name } = req.query;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const sanitized = name.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const groups = await Group.find({
      groupName: { $regex: sanitized, $options: "i" },
    })
      .select("groupName groupDescription members createdBy isPublic")
      .lean(); //Without .lean(), Mongoose returns document objects not plain JS objects. So when you spread ...group it doesn't spread the document fields properly:

    if (groups.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No groups found",
      });
    }

    const groupsWithMembership = groups.map((group) => ({
      ...group,
      memberCount: group.members.length,
      isJoined: group.members.some(
        (id) => id.toString() === req.user.id.toString(),
      ),
    }));

    return res.status(200).json({
      success: true,
      message: "Groups fetched successfully",
      data: groupsWithMembership,
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

export async function getMembers(req, res){
  try {
    const {groupId} = req.params;
    const group = await Group.findById(groupId)
      .select("members admins createdBy")
      .populate("members", "name email image")
      .populate("admins", "name email image")
      .populate("createdBy", "name email image");

    if(!group){
      return res.status(404).json({
        success:false,
        message:"Group with this id not found",
      })
    }
    return res.status(200).json({
      success:true,
      message:"Group members found!",
      data:group
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success:false,
      message:"Internal server error",
      error:error.message
    })
  }
}
