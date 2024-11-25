'use client'
import React, { useState } from 'react'
import FormWrapper from './FormWrapper'
import { LoginFormProps } from '@/data/formProps'
import {useForm} from 'react-hook-form'
import { LogInput, LoginSchema } from '@/models/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import capitalize from '@/lib/capitalize'
import { FormInput } from './FormStyles.styled'
import { CancelBtn } from '../Button/Button'


const LoginForm = () => {
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
const onSubmit = async (data: LogInput) => {
  // if (!user) {
  //   toast.error('User not found. Please log in.');
  //   return;
  // }
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);


  try {
      // const result = await addCollection(formData);
      // if (result.success) {
      //     toast.success(`success`!);
      //     reset();
      // } else {
      //     toast.error(`Failed : ${result.error}`);
      // }
    } catch 
    (error) {
      reset();
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(`An error occurred: ${errorMessage}`);
      setLogError(errorMessage)
  }
};
const handleInputChange = () => {
if (logError) {
  setLogError('');
}
};

const onInvalid = () => {
setLogError('Please fill in all required fields');
};


  return (
    <FormWrapper 
      titleLabel={LoginFormProps.titleLabel}
      backButtonLabel={LoginFormProps.backButtonLabel}
      backButtonHref={LoginFormProps.backButtonHref}
      showSocial={LoginFormProps.showSocial}
    >
        <form 		
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className='flex flex-col gap-3 items-center'
        autoComplete="off"
        noValidate>
          <label >
          <FormInput 
            {...register('email', { onChange: handleInputChange })}
              placeholder=	{( isSubmitting ) 
              ? "Processing" 
              : 'email'}
            />
          </label>
          <label >
          <FormInput 
            {...register('password', { onChange: handleInputChange })}
              placeholder=	{( isSubmitting ) 
              ? "Processing" 
              : 'password'}
            />
          </label>
          <CancelBtn 
            className='mt-auto '
            type='submit'
            disabled={isSubmitting || !isDirty || !isValid}
                >
            Login
        </CancelBtn>
          
        </form>
    </FormWrapper>
  )
}

export default LoginForm