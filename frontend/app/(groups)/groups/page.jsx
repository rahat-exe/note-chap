"use client"
import { useGroups } from '@/hooks/useGroups'
import React from 'react'

const ViewGroups = () => {
  const {data, isLoading,isError, error} = useGroups();
  console.log(data)
  console.log(error)
  return (
    <div>ViewGroups</div>
  )
}

export default ViewGroups