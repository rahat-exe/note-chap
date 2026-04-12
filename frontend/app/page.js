import CreateGroupButton from "@/components/CreateGroupButton";
import HelloUser from "@/components/HelloUser";
import JoinGroup from "@/components/JoinGroup";
import SignOutButton from "@/components/SignOutButton";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@/components/UserButton";
import ViewAllGroups from "@/components/ViewAllGroups";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Home() {
  return (
    <main className=" pt-2 px-10">
      {/* header section */}
      <nav>
        <section className="flex justify-between items-center p-4">
          <HelloUser />
          <div className="hidden md:flex gap-2 items-center">
            <JoinGroup />
            <ViewAllGroups />
            <CreateGroupButton />
            <ModeToggle />
            <UserButton />
          </div>
          {/* Mobile Navigation */}
          <div className="flex gap-2 items-center md:hidden">
            <ModeToggle />
            <UserButton />
          </div>
        </section>
        <div className="border-b"></div>
        {/* <div className="flex justify-around gap-2 items-center md:hidden pt-3">
          <JoinGroup />
          <ViewAllGroups />
          <CreateGroupButton />
        </div> */}
      </nav>
    </main>
  );
}
