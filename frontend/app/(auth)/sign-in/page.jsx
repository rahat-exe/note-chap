"use client"
import React from 'react'
import { signIn } from '@/lib/auth-client'

const SignInPage = () => {
  return (
    <section className="flex flex-col gap-30">
      <h1>Sign In</h1>
      <button
        className="border"
        onClick={() =>
          signIn.social({
            provider: "google",
            callbackURL: process.env.NEXT_PUBLIC_APP_URL,
          })
        }
      >
        Continue with google
      </button>
      <button
        className="border"
        onClick={() =>
          signIn.social({
            provider: "github",
            callbackURL: process.env.NEXT_PUBLIC_APP_URL,
          })
        }
      >
        Continue with gitHub
      </button>
    </section>
  );
}

export default SignInPage