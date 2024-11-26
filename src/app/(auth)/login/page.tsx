import LoginForm from '@/app/components/forms/LoginForm'
import { getSession } from '@/lib/getSession'
import { redirect } from 'next/navigation'
import React from 'react'

const LoginPage = async () => {
  const session = await getSession() 
  if (session) {
    redirect('/dashboard')
  }
  return (
    <div>
      <LoginForm/>
    </div>
  )
}

export default LoginPage