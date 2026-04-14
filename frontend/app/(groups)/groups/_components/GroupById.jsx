"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useGroupById } from "@/hooks/useGroups";
import {
  Users,
  Calendar,
  Crown,
  UserMinus,
  UserPlus,
  ArrowUpCircle,
  ArrowDownCircle,
  FileText,
  Download,
  MoreVertical,
  Tag,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MembersList from "./MembersList";

// Demo notes data
const demoNotes = [
  {
    id: "1",
    title: "Java OOP Concepts",
    description:
      "Complete guide on Object Oriented Programming principles including inheritance, polymorphism, encapsulation and abstraction.",
    pdfUrl: "/notes/java-oop.pdf",
    uploadedBy: "Prof. Smith",
    uploadedAt: "2026-04-10T10:30:00Z",
    fileSize: "2.4 MB",
  },
  {
    id: "2",
    title: "Multithreading in Java",
    description:
      "Deep dive into Java concurrency, thread lifecycle, synchronization, and executor framework.",
    pdfUrl: "/notes/multithreading.pdf",
    uploadedBy: "John Doe",
    uploadedAt: "2026-04-08T14:20:00Z",
    fileSize: "1.8 MB",
  },
  {
    id: "3",
    title: "Spring Boot Fundamentals",
    description:
      "Introduction to Spring Boot framework, dependency injection, REST APIs, and JPA integration.",
    pdfUrl: "/notes/spring-boot.pdf",
    uploadedBy: "Jane Wilson",
    uploadedAt: "2026-04-05T09:15:00Z",
    fileSize: "3.2 MB",
  },
];

const GroupById = ({ groupId }) => {
  const { data, isLoading, isError, error } = useGroupById(groupId);
  console.log(data);
  console.log(error);
  const [open, setOpen] = useState(false);

  const { userId } = useUser();
  const isAdmin = data?.admins.some(
    (id) => id.toString() === userId.toString(),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardHeader>
            <CardTitle>Error Loading Group</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  let groupData;
  if (data) {
    groupData = data;
  }

  
  const handleOpen = () =>{
    setOpen(prev => !prev)
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="w-full  border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Group Info */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                {groupData.groupName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {groupData.groupName}
                  </h1>
                  <Badge variant="secondary">
                    {groupData.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {groupData.groupDescription}
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />

                    <Button
                      variant="ghost"
                      size="sm"
                      className={`text-blue-200`}
                      onClick={handleOpen}
                    >
                      {groupData.members.length} members
                    </Button>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Members</DialogTitle>
                        </DialogHeader>
                          <MembersList groupId={groupData._id} />
                        
                      </DialogContent>
                    </Dialog>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Created {new Date(groupData.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Crown className="w-4 h-4 text-amber-500" />
                    {groupData.admins.length} admins
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons Space */}
            <div className="flex items-center gap-2 flex-wrap">
              {isAdmin && (
                <Button variant="outline" className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Invite
                </Button>
              )}

              {isAdmin && (
                <Button variant="outline" className="gap-2">
                  <ArrowDownCircle className="w-4 h-4" />
                  Demote to Member
                </Button>
              )}

              {isAdmin && (
                <Button variant="outline" className="gap-2">
                  <ArrowUpCircle className="w-4 h-4" />
                  Promote to Admin
                </Button>
              )}

              <Button variant="destructive" className="gap-2">
                <UserMinus className="w-4 h-4" />
                Leave Group
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {groupData.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="gap-1">
                <Tag className="w-3 h-3" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1  gap-8">
          {/* Left Sidebar - Members Space */}

          {/* Right Content - Notes Space */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Study Notes
              </h2>
              {/* Upload button space */}
              <Button className="gap-2">
                <FileText className="w-4 h-4" />
                Upload Note
              </Button>
            </div>

            {/* Notes Grid Space */}
            <div className="grid gap-4">
              {demoNotes.map((note) => (
                <Card
                  key={note.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">
                            {note.title}
                          </h3>
                          <Badge variant="outline">PDF</Badge>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                          {note.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>{note.uploadedBy}</span>
                          <span>•</span>
                          <span>
                            {new Date(note.uploadedAt).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>{note.fileSize}</span>
                        </div>
                      </div>

                      {/* Note actions space */}
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupById;
