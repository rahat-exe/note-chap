"use client";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const GoBack = () => {
    const router = useRouter();
  return (
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
  );
}

export default GoBack