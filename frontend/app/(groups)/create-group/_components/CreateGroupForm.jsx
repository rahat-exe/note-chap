"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useCreateGroup } from "@/hooks/useGroups";
import { useRouter } from "next/navigation";

export default function CreateGroupForm() {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const { mutate: createGroup, isPending } = useCreateGroup();

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

  function handleSubmit() {
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
    <div className="max-w-lg mx-auto space-y-5 p-6 border rounded-xl bg-background">
      <div>
        <h2 className="text-lg font-medium">Create a group</h2>
        <p className="text-sm text-muted-foreground">
          Fill in the details to set up your new group.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="groupName">Group name</Label>
        <Input
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="e.g. CS 3rd Year Notes"
          maxLength={60}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="groupDescription">Description</Label>
        <Textarea
          id="groupDescription"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          placeholder="What is this group about?"
          maxLength={300}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">
          Cover image URL{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Input
          id="coverImage"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-2">
        <Label>
          Tags{" "}
          <span className="text-muted-foreground font-normal">
            (press Enter to add)
          </span>
        </Label>
        <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px]">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tag}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            placeholder="Add a tag..."
            className="flex-1 min-w-[80px] bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between border rounded-lg p-3">
        <div>
          <p className="text-sm font-medium">Public group</p>
          <p className="text-xs text-muted-foreground">
            Anyone can find and join this group
          </p>
        </div>
        <Switch checked={isPublic} onCheckedChange={setIsPublic} />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Creating..." : "Create group"}
        </Button>
      </div>
    </div>
  );
}
