'use client'
import React, { useActionState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { googleSignIn } from '@/actions/oauth-signin'

interface SignInButtonProps {
  provider: "google" | "github"
}

const SignInButton = ({provider}:SignInButtonProps) => {
  const [message, formAction, isPending] = useActionState(googleSignIn, undefined)

    return (
    <form
      className='w-full'
      action={formAction}
      >
      <button className='flex w-full justify-center border rounded-lg p-2 space-x-2 items-center'>
          <p>LogIn With Google</p> <FcGoogle className='h-5 w-5' />
      </button>
      {isPending ? "Loading..." : message}
    </form>
    )

}

export default SignInButton