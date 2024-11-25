'use client'
import React, { useState } from 'react'
import FormWrapper from './FormWrapper'
import { RegisterFormProps } from '@/data/formProps'
import { useForm } from 'react-hook-form'
import { RegInput, RegisterSchema } from '@/models/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { AuthError, FormInput } from './FormStyles.styled'
import { CancelBtn, FlatBtn } from '../Button/Button'
import { CgCloseO } from 'react-icons/cg'
import { registerUser } from '@/actions/register-user'
import { wait } from '@/lib/wait'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
  const [logError, setLogError] = useState<string>('')
  const router = useRouter()
  const {
    register, 
    handleSubmit,
    formState,
    reset,
} = useForm<RegInput>({
    defaultValues: {
        name: '',
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
        const result = await  registerUser(formData);

        if (result.success) {
          console.log("User created successfully:", result);
          
            toast.success(`${result?.user.name}, Your registration was successfull`!);
            reset();
            await wait(2000)
            reset();
            router.push('/') // Redirect without reloading page
            // window.location.href = '/'; // Redirect the user after success
        }          
      } catch 
      (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast.error(`An error occurred: ${errorMessage}`);
        setLogError(errorMessage)
        reset();
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
  <form 		
    onSubmit={handleSubmit(onSubmit, onInvalid)}
    className='flex flex-col gap-3 items-center'
    autoComplete="off"
    noValidate>
      <label >
        <FormInput 
          {...register('name', { onChange: handleInputChange })}
            placeholder=	{( isSubmitting ) 
            ? "Processing" 
            : 'name'}
          />
      </label>
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
            Register
        </CancelBtn>
        {( errors?.email || errors?.password ) && (
				<AuthError className="autherror w-full">
					{errors.name && <div>{errors.name.message}</div>}
					{!errors.name && errors.email && <div>{errors.email.message}</div>}
					{!errors.name && !errors.email && errors.password && <div>{errors.password.message}</div>}
					{!errors && logError && <div>{logError}</div>}
					<FlatBtn 
						onClick={()=>reset()}>
							<CgCloseO size={30} />
					</FlatBtn>
				</AuthError>
				)}

    </form>
    </FormWrapper>
  )
}

export default RegisterForm