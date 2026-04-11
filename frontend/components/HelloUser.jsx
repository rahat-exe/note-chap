"use client"
import { authClient } from '@/lib/auth-client'
import React from 'react'

const HelloUser = () => {
    const {data:session, loading} = authClient.useSession();
    if(loading) return null;
    if(!session) return null;
  return (
    <h1>Hello {session.user.name}</h1>
  )
}

export default HelloUser