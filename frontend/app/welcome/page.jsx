import Link from 'next/link'
import React from 'react'

const Welcome = () => {
  return (
    <div>
        <h1>Landing page</h1>
        <Link className='' href={"/sign-in"}>Sign in</Link>
    </div>
  )
}

export default Welcome