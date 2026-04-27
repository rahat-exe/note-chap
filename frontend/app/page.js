import CreateGroupButton from "@/components/CreateGroupButton";
import HelloUser from "@/components/HelloUser";
import JoinGroup from "@/components/JoinGroup";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@/components/UserButton";
import ViewAllGroups from "@/components/ViewAllGroups";
import MobileNav from "@/components/MobileNav";
import Protected from "@/components/Protected";

export default function Home() {
  return (
    <Protected>
      <main className=" min-h-screen min-w-full">
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
        <section className="grid grid-cols-1 lg:grid-cols-4 px-2 md:px-10 lg:px-15 mt-2 min-h-full">
          <div className="bg-red-500 hidden lg:inline">
            <p>lorem10 jdj jdn qdjwndnd djndnndn dfghj dfghj sdfghj</p>
          </div>
          <div className="bg-blue-400 lg:col-span-2 ">
            <h1>asdfghjk qwertyuio zxcvbnm ertyui</h1>
          </div>
          <div className="bg-red-500">a</div>
        </section>
      </main>
    </Protected>
  );
}
