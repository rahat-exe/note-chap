"use client"
import { authClient } from '@/lib/auth-client'
import React from 'react'
import { Skeleton } from './ui/skeleton';

const HelloUser = () => {
    const {data:session, isPending} = authClient.useSession();
    if(isPending) return <Skeleton />;
    if(!session) return null;
  return (
    <h1>Hello {session.user.name}</h1>
  )
}

export default HelloUser