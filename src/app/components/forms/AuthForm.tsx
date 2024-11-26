'use client'
import { AuthFormBaseTypes } from '@/types/formTypes'
import React from 'react'

interface AuthFormProps {
  formName: string
  formProps: AuthFormBaseTypes
}

const AuthForm:React.FC<AuthFormProps> = ({
  formName,
  formProps
}) => {
  const {
    titleLabel,
    backButtonLabel, 
    backButtonHref, 
    showSocial
  } = formProps
  return (
    <div>AuthForm</div>
  )
}

export default AuthForm