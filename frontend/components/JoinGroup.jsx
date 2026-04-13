"use client"
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const JoinGroup = () => {
    const router = useRouter()
  return (
    <div>
      <Button
        
        size="sm"
        onClick={() => router.push("/join-group")}
      >
        Join Group
      </Button>
    </div>
  );
}

export default JoinGroup