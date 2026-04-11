import CreateGroupButton from "@/components/CreateGroupButton";
import HelloUser from "@/components/HelloUser";
import SignOutButton from "@/components/SignOutButton";
import { UserButton } from "@/components/UserButton";
import ViewAllGroups from "@/components/ViewAllGroups";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto pt-2">
      {/* header section */}
      <section className="flex justify-between items-center p-4">
        <HelloUser />
        <div className="flex gap-2 items-center">
          <ViewAllGroups />
          <CreateGroupButton />
          <UserButton />
        </div>
      </section>
      <div className="w-full border-border border-b"></div>

      
    </main>
  );
}
