"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Globe,
  Lock,
  Calendar,
  User,
  Hash,
  ArrowRight,
} from "lucide-react";

const GroupItems = ({ group }) => {
  const {
    groupName,
    groupDescription,
    isPublic,
    createdAt,
    createdBy,
    admins,
    members,
    tags,
    coverImage,
    _id,
  } = group;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isAdmin = (userId) => admins.includes(userId);
  const isCreator = (userId) => createdBy._id === userId;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Cover Image Section */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          {coverImage ? (
            <img
              src={coverImage}
              alt={groupName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/80">
              <Users size={64} />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <Badge
              variant={isPublic ? "default" : "secondary"}
              className="mb-2"
            >
              {isPublic ? (
                <>
                  <Globe size={14} className="mr-1" /> Public
                </>
              ) : (
                <>
                  <Lock size={14} className="mr-1" /> Private
                </>
              )}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{groupName}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1 text-muted-foreground">
                <Hash size={14} />
                ID: {_id}
              </CardDescription>
            </div>
            {/* ✅ Changed to "View Group" */}
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary hover:text-primary-foreground"
            >
              View Group
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300">
            {groupDescription || "No description provided."}
          </p>

          {/* Creator Info */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src={createdBy.image} alt={createdBy.name} />
              <AvatarFallback>{createdBy.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{createdBy.name}</span>
                {isCreator(createdBy._id) && (
                  <Badge
                    variant="outline"
                    className="text-xs text-blue-600 border-blue-600"
                  >
                    Created By
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <User size={14} />
                {createdBy.email}
              </p>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar size={14} />
              Created {formatDate(createdAt)}
            </div>
          </div>

          <Separator />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {members.length}
              </div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {admins.length}
              </div>
              <div className="text-sm text-muted-foreground">Admins</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {tags.length}
              </div>
              <div className="text-sm text-muted-foreground">Tags</div>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Action Buttons - Updated labels */}
          {/* <div className="flex gap-2 pt-2">
            <Button className="flex-1">
              <Users className="mr-2 h-4 w-4" />
              View Members
            </Button>
            <Button variant="outline" className="flex-1">
              Group Settings
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupItems;
