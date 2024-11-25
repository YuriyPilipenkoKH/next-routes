import React from 'react'
import FormWrapper from './FormWrapper'
import { LoginFormProps } from '@/data/formProps'
import {useForm} from 'react-hook-form'
import { LogInput, LoginSchema } from '@/models/auth'
import { zodResolver } from '@hookform/resolvers/zod'

const LoginForm = () => {
  const {
    register, 
    handleSubmit,
    formState,
    reset,
    watch
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
    <FormWrapper 
      titleLabel={LoginFormProps.titleLabel}
      backButtonLabel={LoginFormProps.backButtonLabel}
      backButtonHref={LoginFormProps.backButtonHref}
      showSocial={LoginFormProps.showSocial}
    >
        <form action="">
          
        </form>
    </FormWrapper>
  )
}

export default LoginForm