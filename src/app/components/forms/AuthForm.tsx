'use client'
import { LogInput, LoginSchema, RegisterSchema } from '@/models/auth'
import { AuthFormBaseTypes } from '@/types/formTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface AuthFormProps {
  formName: string
  formProps: AuthFormBaseTypes
}

const AuthForm:React.FC<AuthFormProps> = ({
  formName,
  formProps
}) => {
  const [logError, setLogError] = useState<string>('')
  const {
    titleLabel,
    backButtonLabel, 
    backButtonHref, 
    showSocial
  } = formProps
  const {
    register, 
    handleSubmit,
    formState,
    reset,
} = useForm ({
    defaultValues: (formName === 'loginForm') ? {
        email: '',
        password: '',
    } : {
        name: '',
        email: '',
        password: '',
    },
        mode:'all',
        resolver: zodResolver(formName === 'loginForm' 
          ? LoginSchema 
          : RegisterSchema),
})
const {
    errors,
    isDirty,
    isValid ,
    isSubmitting,
    isLoading
} = formState
  return (
    <div>AuthForm</div>
  )
}

export default AuthForm