"use client"
import { useAuth } from '@/hooks/use-auth'
import React from 'react'

const Protected = ({children}) => {
    const { isPending, session } = useAuth()
    if (isPending || !session) return null;

    return <>{children}</>

}

export default Protected