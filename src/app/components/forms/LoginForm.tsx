'use client'
import React, { useEffect, useState } from 'react'
import FormWrapper from './FormWrapper'
import { LoginFormProps } from '@/data/formProps'
import {useForm} from 'react-hook-form'
import { LogInput, LoginSchema } from '@/models/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import capitalize from '@/lib/capitalize'
import { AuthError, FormInput } from './FormStyles.styled'
import { CancelBtn, FlatBtn } from '../Button/Button'
import { CgCloseO } from 'react-icons/cg'
import { loginUser } from '@/actions/login-user'
import { wait } from '@/lib/wait'
import { useRouter } from 'next/navigation'
import { retrieveToken } from '@/lib/retrieveToken'


const LoginForm = () => {
    const [logError, setLogError] = useState<string>('')
    const router = useRouter()
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
      const result = await loginUser(formData);
      if (result.success) {
          toast.success(`${(capitalize(result?.user?.name )) || 'Dude'}, You are logged In`!);
          reset(); 
          await wait(2000)
          reset();
          router.push('/dashboard')
      } 
    } 
    catch 
    (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(`An error occurred: ${errorMessage}`);
      setLogError(errorMessage)
      // reset();
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
  const [csrfToken, setCsrfToken] = useState<string | null>(null); // Локальное состояние для токена

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await retrieveToken(); // Разрешение промиса
      setCsrfToken(token); // Установка значения в состоянии
    };

    fetchCsrfToken(); // Запуск загрузки токена
  }, []);

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
         {csrfToken && <input type="hidden" name="csrfToken" value={csrfToken} />}
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
        {( errors?.email || errors?.password ) && (
				<AuthError className="autherror w-full">
					{errors.email && <div>{errors.email.message}</div>}
					{!errors.email && errors.password && <div>{errors.password.message}</div>}
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

export default LoginForm