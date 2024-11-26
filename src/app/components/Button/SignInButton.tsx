
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { googleSignIn } from '@/actions/google-signin'

const SignInButton = () => {

    return (
      <form
      className='w-full'
      action={googleSignIn}
      >
      <button className='flex w-full justify-center border rounded-lg p-2 space-x-2 items-center'>
          <p>LogIn With Google</p> <FcGoogle className='h-5 w-5' />
      </button>
    </form>
    )

}

export default SignInButton