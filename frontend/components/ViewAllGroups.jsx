"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';

const ViewAllGroups = () => {
    const router = useRouter();
  return (
    <div>
      <Button
        
        size="sm"
        onClick={() => router.push("/groups")}
      >
        View Groups
      </Button>
    </div>
  );
}

export default ViewAllGroups