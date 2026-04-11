"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Settings, User, CreditCard } from "lucide-react";

export function UserButton() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Loading state - matches your theme's muted background
  if (isPending) {
    return <Skeleton className="h-8 w-8 rounded-full bg-muted" />;
  }

  // Not authenticated - optionally show sign in button or return null
  if (!session?.user) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/sign-in")}
        className="text-foreground hover:text-foreground hover:bg-accent"
      >
        Sign In
      </Button>
    );
  }

  const { user } = session;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email?.charAt(0).toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full hover:bg-accent"
        >
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src={user.image || ""} alt={user.name || user.email} />
            <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-60 bg-popover text-popover-foreground border-border"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1.5">
            {user.name && (
              <p className="text-sm font-medium leading-none text-foreground">
                {user.name}
              </p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          onClick={() => router.push("/profile")}
          className="text-foreground focus:bg-accent focus:text-foreground cursor-pointer"
        >
          <User className="mr-2 h-4 w-4 text-muted-foreground" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/settings")}
          className="text-foreground focus:bg-accent focus:text-foreground cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
          Settings
        </DropdownMenuItem>

        {/* Optional: Billing/Subscription page */}
        <DropdownMenuItem
          onClick={() => router.push("/billing")}
          className="text-foreground focus:bg-accent focus:text-foreground cursor-pointer"
        >
          <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
          Billing
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.refresh(); // Refresh server components
                  router.push("/welcome"); // Optional: redirect home
                },
              },
            });
          }}
          className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
