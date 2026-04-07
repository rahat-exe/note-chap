"use client";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

const SignOutButton = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() =>
          signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/welcome");
              },
            },
          })
        }
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutButton;
