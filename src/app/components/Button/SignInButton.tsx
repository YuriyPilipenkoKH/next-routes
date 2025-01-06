'use client'
import React, { useActionState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { googleSignIn } from '@/actions/google-signin'

const SignInButton = () => {
  const [state, formAction, isPending] = useActionState(googleSignIn, undefined)

    return (
    <form
      className='w-full'
      action={formAction}
      >
      <button className='flex w-full justify-center border rounded-lg p-2 space-x-2 items-center'>
          <p>LogIn With Google</p> <FcGoogle className='h-5 w-5' />
      </button>
    </form>
    )

}

export default SignInButton