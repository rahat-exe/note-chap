"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Globe,
  Lock,
  Users,
  Image as ImageIcon,
  Hash,
  Loader2,
} from "lucide-react";
import { useCreateGroup } from "@/hooks/useGroups";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CreateGroupForm() {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const { mutate: createGroup, isPending, error } = useCreateGroup();

  function addTag(e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const val = tagInput.trim().toLowerCase();
    if (!val || tags.includes(val) || tags.length >= 8) return;
    setTags([...tags, val]);
    setTagInput("");
  }

  function removeTag(tag) {
    setTags(tags.filter((t) => t !== tag));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createGroup({
      groupName,
      groupDescription,
      coverImage: coverImage || null,
      isPublic,
      tags,
    });
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-muted/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0 overflow-hidden">
          {/* Header Section with Gradient */}
          <div className="bg-linear-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
            <CardHeader className="p-0 space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Create a Group
                </CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground max-w-lg">
                Build your community by filling in the details below. You can
                customize settings and add members later.
              </CardDescription>
            </CardHeader>
          </div>

          <CardContent className="p-6 sm:p-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                </div>

                <div className="space-y-4 pl-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="groupName"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      Group Name
                      <span className="text-xs text-muted-foreground font-normal">
                        ({groupName.length}/60)
                      </span>
                    </Label>
                    <Input
                      id="groupName"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder="e.g. CS 3rd Year Notes"
                      maxLength={60}
                      required
                      className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="groupDescription"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      Description
                      <span className="text-xs text-muted-foreground font-normal">
                        ({groupDescription.length}/300)
                      </span>
                    </Label>
                    <Textarea
                      id="groupDescription"
                      value={groupDescription}
                      onChange={(e) => setGroupDescription(e.target.value)}
                      placeholder="What is this group about? Describe the purpose and topics..."
                      maxLength={300}
                      required
                      className="min-h-[120px] resize-none transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-muted/60" />

              {/* Visuals Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-primary/60 rounded-full" />
                  <h3 className="text-lg font-semibold">Visuals</h3>
                </div>

                <div className="space-y-4 pl-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="coverImage"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      Cover Image URL
                      <span className="text-xs text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="coverImage"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                    />
                    {coverImage && (
                      <div className="mt-2 p-2 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/30">
                        <p className="text-xs text-muted-foreground truncate">
                          Preview: {coverImage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="bg-muted/60" />

              {/* Tags Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-primary/40 rounded-full" />
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    Tags
                    <Badge variant="secondary" className="text-xs font-normal">
                      {tags.length}/8
                    </Badge>
                  </h3>
                </div>

                <div className="space-y-3 pl-4">
                  <Label className="text-sm text-muted-foreground">
                    Press Enter to add tags. Tags help others discover your
                    group.
                  </Label>
                  <div className="flex flex-wrap gap-2 p-3 border rounded-xl bg-muted/30 min-h-[52px] focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-3 py-1 text-sm font-medium bg-background border shadow-sm hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors group"
                      >
                        <Hash className="h-3 w-3 mr-1 text-muted-foreground" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 outline-none focus:ring-2 focus:ring-primary rounded"
                        >
                          <X className="h-3 w-3 cursor-pointer text-muted-foreground group-hover:text-destructive" />
                        </button>
                      </Badge>
                    ))}
                    <input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={addTag}
                      placeholder={
                        tags.length === 0
                          ? "Add tags like 'study', 'notes', 'exam'..."
                          : "Add another..."
                      }
                      className="flex-1 min-w-[120px] bg-transparent outline-none text-sm placeholder:text-muted-foreground/60 h-8"
                      disabled={tags.length >= 8}
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-muted/60" />

              {/* Privacy Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-primary/20 rounded-full" />
                  <h3 className="text-lg font-semibold">Privacy Settings</h3>
                </div>

                <div className="pl-4">
                  <div
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${isPublic ? "border-primary/20 bg-primary/5" : "border-muted bg-muted/30"}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2 rounded-lg ${isPublic ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                      >
                        {isPublic ? (
                          <Globe className="h-5 w-5" />
                        ) : (
                          <Lock className="h-5 w-5" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium flex items-center gap-2">
                          {isPublic ? "Public Group" : "Private Group"}
                          <Badge
                            variant={isPublic ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {isPublic ? "Anyone can join" : "Invite only"}
                          </Badge>
                        </p>
                        <p className="text-sm text-muted-foreground max-w-xs">
                          {isPublic
                            ? "Visible to everyone. Anyone can find and join this group."
                            : "Hidden from search. Only invited members can access this group."}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  <p className="font-medium">Error creating group</p>
                  <p className="text-destructive/80">{error.message}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 px-6 order-2 sm:order-1"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isPending || !groupName.trim() || !groupDescription.trim()
                  }
                  className="h-11 px-8 order-1 sm:order-2 min-w-[140px]"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Group"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
