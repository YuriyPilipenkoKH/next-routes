import React, { useState } from 'react'
import FormWrapper from './FormWrapper'
import { RegisterFormProps } from '@/data/formProps'
import { useForm } from 'react-hook-form'
import { RegInput, RegisterSchema } from '@/models/auth'
import { zodResolver } from '@hookform/resolvers/zod'

const RegisterForm = () => {
  const [logError, setLogError] = useState<string>('')
  const {
    register, 
    handleSubmit,
    formState,
    reset,
} = useForm<RegInput>({
    defaultValues: {
        email: '',
        password: '',
    },
        mode:'all',
        resolver: zodResolver(RegisterSchema),
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
    titleLabel={RegisterFormProps.titleLabel}
    backButtonLabel={RegisterFormProps.backButtonLabel}
    backButtonHref={RegisterFormProps.backButtonHref}
    showSocial={RegisterFormProps.showSocial}
  >
    <form >

    </form>
    </FormWrapper>
  )
}

export default RegisterForm