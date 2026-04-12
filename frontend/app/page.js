import CreateGroupButton from "@/components/CreateGroupButton";
import HelloUser from "@/components/HelloUser";
import JoinGroup from "@/components/JoinGroup";
import SignOutButton from "@/components/SignOutButton";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@/components/UserButton";
import ViewAllGroups from "@/components/ViewAllGroups";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import MobileNav from "@/components/MobileNav";

export default function Home() {
  return (
    <main className="pt-2">
      <nav className="md:px-10">
        <section className="flex justify-between items-center p-4">
          <HelloUser />

          {/* Desktop */}
          <div className="hidden md:flex gap-2 items-center">
            <JoinGroup />
            <ViewAllGroups />
            <CreateGroupButton />
            <ModeToggle />
            <UserButton />
          </div>

          {/* Mobile */}
          <div className="flex gap-2 items-center md:hidden">
            <ModeToggle />
            <UserButton />
            <MobileNav />
          </div>
        </section>
        <div className="border-b"></div>
      </nav>
    </main>
  );
}
