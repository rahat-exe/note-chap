"use client";
import React from "react";
import { useGroups } from "@/hooks/useGroups";
import GroupItems from "./GroupItems";


const Groups = () => {
 const {data, isLoading,isError, error} = useGroups();
  if(isLoading){
    return <div>Loading...</div>
  }  
  return (
    <div className="min-h-screen min-w-full md:px-20 pt-10">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
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
