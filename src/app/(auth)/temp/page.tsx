import AuthForm from '@/app/components/forms/AuthForm'
import { LoginFormProps, RegisterFormProps } from '@/data/formProps'
import React from 'react'

const AuthPage = () => {
  return (
    <div>
      <AuthForm 
      formName='registerForm'
      formProps={RegisterFormProps}/>
    </div>
  )
}

export default AuthPage