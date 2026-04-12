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
    <div className="w-full max-w-full sm:max-w-2xl mx-auto p-2 sm:p-4">
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Cover Image Section */}
        <div className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          {coverImage ? (
            <img
              src={coverImage}
              alt={groupName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/80">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-4">
            <Badge
              variant={isPublic ? "default" : "secondary"}
              className="mb-1 sm:mb-2 text-xs sm:text-sm"
            >
              {isPublic ? (
                <>
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Public
                </>
              ) : (
                <>
                  <Lock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Private
                </>
              )}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold truncate">
                {groupName}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1 text-xs sm:text-sm text-muted-foreground truncate">
                <Hash className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">ID: {_id}</span>
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary hover:text-primary-foreground self-start sm:self-auto shrink-0 text-xs sm:text-sm h-8 sm:h-9"
            >
              <span className="hidden sm:inline">View Group</span>
              <span className="sm:hidden">View</span>
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6 pb-4 sm:pb-6">
          {/* Description */}
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 line-clamp-3">
            {groupDescription || "No description provided."}
          </p>

          {/* Creator Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-primary shrink-0">
                <AvatarImage src={createdBy.image} alt={createdBy.name} />
                <AvatarFallback className="text-sm sm:text-base">
                  {createdBy.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm sm:text-base truncate">
                    {createdBy.name}
                  </span>
                  {isCreator(createdBy._id) && (
                    <Badge
                      variant="outline"
                      className="text-xs text-blue-600 border-blue-600 shrink-0"
                    >
                      Created By
                    </Badge>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 truncate">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">{createdBy.email}</span>
                </p>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 sm:pl-2 sm:border-l sm:border-border shrink-0">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              <span className="whitespace-nowrap">{formatDate(createdAt)}</span>
            </div>
          </div>

          <Separator className="my-2 sm:my-4" />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div className="p-2 sm:p-3 bg-muted/30 rounded-lg">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                {members.length}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Members
              </div>
            </div>
            <div className="p-2 sm:p-3 bg-muted/30 rounded-lg">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                {admins.length}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Admins
              </div>
            </div>
            <div className="p-2 sm:p-3 bg-muted/30 rounded-lg">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                {tags.length}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Tags
              </div>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs sm:text-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupItems;
