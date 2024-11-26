'use client'
import { LogInput, LoginSchema } from '@/models/auth'
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
  const {
    titleLabel,
    backButtonLabel, 
    backButtonHref, 
    showSocial
  } = formProps
  const [logError, setLogError] = useState<string>('')
  const {
    register, 
    handleSubmit,
    formState,
    reset,
} = useForm<LogInput>({
    defaultValues: {
        email: '',
        password: '',
    },
        mode:'all',
        resolver: zodResolver(LoginSchema),
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