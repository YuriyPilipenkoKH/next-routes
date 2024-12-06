import AuthForm from '@/app/components/forms/AuthForm'
import { LoginFormProps, RegisterFormProps } from '@/data/formProps'
import { getSession } from '@/lib/getSession'
import { redirect } from 'next/navigation'
import React from 'react'

const AuthPage = async() => {
  const session = await getSession() 
  if (session) {
    redirect('/dashboard')
  }
  return (
    <div>
      <AuthForm 
      formName='loginForm'
      formProps={LoginFormProps }/>
    </div>
  )
}

export default AuthPage