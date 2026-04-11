"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const CreateGroupButton = () => {
    const router = useRouter();
  return (
    <div>
        <Button variant="destructive" size="sm" onClick={()=>router.push("/create-group")}>
            Create Group
        </Button>
    </div>
  )
}

export default CreateGroupButton