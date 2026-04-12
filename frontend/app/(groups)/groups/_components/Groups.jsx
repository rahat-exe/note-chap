"use client";
import React, { useReducer } from "react";
import { useGroups } from "@/hooks/useGroups";
import GroupItems from "./GroupItems";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";


const Groups = () => {
    const router = useRouter();
 const {data, isLoading,isError, error} = useGroups();
  if(isLoading){
    return <div>Loading...</div>
  }  
  return (
    <div className="min-h-screen min-w-full md:px-20 pt-3">
      <div>
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className={`ml-4`}
        >
          <ArrowLeft />
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
        {data?.map((group) => (
          <div key={group._id} className="">
            <GroupItems group={group} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
