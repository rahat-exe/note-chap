"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export function useAuth(){
    const { data: session, isPending } = useSession();
    const router = useRouter();

   useEffect(()=>{
    if(!isPending && !session){
        router.push("/welcome")
    }
   },[session, isPending])

    return { session,isPending };
}