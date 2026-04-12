"use client";

import { useSession } from "@/lib/auth-client";

export function useUser() {
  const { data: session, isPending } = useSession();

  return {
    user: session?.user ?? null,
    userId: session?.user?.id ?? null,
    userName: session?.user?.name ?? null,
    userEmail: session?.user?.email ?? null,
    userImage: session?.user?.image ?? null,
    isPending,
  };
}
