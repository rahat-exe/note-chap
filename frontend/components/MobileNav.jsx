"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import JoinGroup from "@/components/JoinGroup";
import ViewAllGroups from "@/components/ViewAllGroups";
import CreateGroupButton from "@/components/CreateGroupButton";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center gap-4 mt-6">
          <JoinGroup />
          <ViewAllGroups />
          <CreateGroupButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}
