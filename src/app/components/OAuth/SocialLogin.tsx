import React from 'react'
import SignInButton from '../Button/SignInButton'

const SocialLogin = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <SignInButton provider='google'/>
      <SignInButton provider='github'/>
    </div>
  )
}

export default SocialLogin