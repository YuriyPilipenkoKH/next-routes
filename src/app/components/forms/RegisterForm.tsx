import React, { useState } from 'react'
import FormWrapper from './FormWrapper'
import { RegisterFormProps } from '@/data/formProps'
import { useForm } from 'react-hook-form'
import { RegInput, RegisterSchema } from '@/models/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

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
  const onSubmit = async (data: RegInput) => {
    // if (!user) {
    //   toast.error('User not found. Please log in.');
    //   return;
    // }
    const formData = new FormData();
    formData.append('name', data.name);
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