'use client'
import { registerUser } from '@/actions/register-user'
import capitalize from '@/lib/capitalize'
import { wait } from '@/lib/wait'
import { LogInput, LoginSchema, RegInput, RegisterSchema } from '@/models/auth'
import { AuthFormBaseTypes, FormInput, FormName } from '@/types/formTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface AuthFormProps {
  formName: string
  formProps: AuthFormBaseTypes
}

const AuthForm:React.FC<AuthFormProps> = ({
  formName,
  formProps
}) => {
  const [logError, setLogError] = useState<string>('')
  const router = useRouter()
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

const isRegisterData = (data: LogInput | RegInput): data is RegInput => {
  return (data as RegInput).name !== undefined;
};
const onSubmit = async <T extends FormName>(formName: T, data: FormInput<T>) => {
  // if (!user) {
  //   toast.error('User not found. Please log in.');
  //   return;
  // }
  const formData = new FormData();
  if (formName === 'registerForm' && isRegisterData(data)) {
    formData.append('name', data.name); // Теперь TypeScript знает, что 'name' существует
  }
  formData.append('email', data.email);
  formData.append('password', data.password);


  try {
      const result = await  registerUser(formData);

      if (result.success) {
        console.log("User created successfully:", result);
        
          toast.success(`${capitalize(result?.user.name)}, Your registration was successfull`!);
          reset();
          await wait(2000)
          reset();
          router.push('/login') // Redirect without reloading page
          // window.location.href = '/login'; // Redirect the user after success
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
  return (
    <div>AuthForm</div>
  )
}

export default AuthForm