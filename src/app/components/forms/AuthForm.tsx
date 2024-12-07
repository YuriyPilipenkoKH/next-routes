'use client'
import { registerUser } from '@/actions/register-user'
import capitalize from '@/lib/capitalize'
import { retrieveToken } from '@/lib/retrieveToken'
import { LogInput, LoginSchema, RegInput, RegisterSchema } from '@/models/auth'
import { AuthFormBaseTypes,  AuthInput,  FormName } from '@/types/formTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import FormWrapper from './FormWrapper'
import { AuthError, FormInput,  } from './FormStyles.styled'
import { CancelBtn, FlatBtn } from '../Button/Button'
import { CgCloseO } from 'react-icons/cg'
import { loginUser } from '@/actions/login-user'
import { debounce } from '@/lib/debounce'


interface AuthFormProps {
  formProps: AuthFormBaseTypes
}

const AuthForm:React.FC<AuthFormProps> = ({formProps}) => {
  
  const [logError, setLogError] = useState<string>('')
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<LogInput | RegInput>>({});
  const router = useRouter()
  const {
    formName,
    titleLabel,
    welcomeMsg,
    backButtonLabel, 
    backButtonHref, 
    showSocial
  } = formProps
  const {
    register, 
    handleSubmit,
    formState,
    reset,
  } = useForm<LogInput | RegInput>({
    defaultValues:
    formName === 'loginForm'
      ? { email: '', password: '' }
      : { name: '', email: '', password: '' },
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

  const onSubmit = async (data: LogInput | RegInput) => {
      const formData = new FormData();
    if (formName === 'registerForm' && isRegisterData(data)) {
      formData.append('name', data.name); 
    }
    formData.append('email', data.email);
    formData.append('password', data.password);

  try {
    if (formName === 'loginForm') {
      const result = await loginUser( formData );
      if (result.success) {
        toast.success(
          `${capitalize(result?.user?.name) || 'Dude'}, you are logged in!`
        );
        reset();
        router.push('/dashboard');
      }
    } else {
      const result = await registerUser(formData);
      if (result.success) {
        toast.success(
          `${capitalize(result?.user.name)}, your registration was successful!`
        );
        reset();
        router.push('/login');
      }
      else if (!result.success) {
        console.log(result.error);
        
      }
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    setLogError(errorMessage);
    toast.error(`An error occurred: ${errorMessage}`);
  }
  };


  // const handleInputChange = () => {
  // if (logError) {
  //   setLogError('');
  // }
  // };

  const handleDebouncedChange = useCallback(
    debounce((name: string, value: string) => {
      setFormData((prevData) => ({ ...prevData, [name]: value }));

    }, 1000), // Adjust the debounce delay as needed
    []
  );

  const createChangeHandler = (name: string) => {
    if (logError) {
      setLogError(''); // Clear error message when the user starts typing
    }
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      handleDebouncedChange(name, value);
    };

  };

  const onInvalid = () => {
    setLogError('Please fill in all required fields');
    };

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await retrieveToken(); 
      setCsrfToken(token); 
    };

    fetchCsrfToken();
  }, []);

  const isRegisterErrors = (
    errors: Partial<FieldErrors <LogInput | RegInput>>
  ): errors is Partial <FieldErrors<RegInput>> => {
    return 'name' in errors;
  };

  return (
    <FormWrapper 
      formName={formName}
      titleLabel={titleLabel}
      welcomeMsg={welcomeMsg}     
      backButtonLabel={backButtonLabel}
      backButtonHref={backButtonHref}
      showSocial={showSocial}
  >
  <form 		
    onSubmit={handleSubmit(onSubmit, onInvalid)}
    className='flex flex-col gap-3 items-center'
    autoComplete="off"
    noValidate>
      {(formName === 'loginForm') && csrfToken && <input type="hidden" name="csrfToken" value={csrfToken} />}
      {(formName === 'registerForm') && (
      <>
        <label >
          <FormInput
          {...register('name')}
          onChange={createChangeHandler('name')}
          placeholder={isSubmitting ? "Processing" : 'Name'}
            />
        </label>
      </>
      )}
      <label >
        <FormInput 
          {...register('email')}
          onChange={createChangeHandler('email')}
          placeholder={isSubmitting ? "Processing" : 'Email'}
          />
      </label>
      <label >
        <FormInput 
          {...register('password')}
          onChange={createChangeHandler('password')}
          placeholder={isSubmitting ? "Processing" : 'Password'}
          />
      </label>
      <CancelBtn 
        className='mt-auto '
        type='submit'
        disabled={isSubmitting || !isDirty || !isValid}
            >
        { isLoading  ? "Sending.." : (formName === 'registerForm' )
          ? 'Register'  : 'Login'}
      </CancelBtn>


        {(isRegisterErrors(errors)  || errors.email || errors.password || logError) && (
          <AuthError className="autherror w-full">
            { isRegisterErrors(errors) && errors.name && <div>{errors.name.message}</div>}
            { !isRegisterErrors(errors) && errors.email && <div>{errors.email.message}</div>}
            { !isRegisterErrors(errors) && !errors.email && errors.password && <div>{errors.password.message}</div>}
            { !isRegisterErrors(errors) && !errors.email && !errors.password && logError && <div>{logError}</div>}
            <FlatBtn onClick={() => reset()}>
              <CgCloseO size={30} />
            </FlatBtn>
          </AuthError>
        )}

    </form>
    </FormWrapper>
  )
}

export default AuthForm


// Debouncing is a great way to improve performance by limiting how often a function is executed, especially in scenarios like form input validation or API calls.

// ===============================
// const isRegisterData = (data: LogInput | RegInput): data is RegInput => {
//   return (data as RegInput).name !== undefined;
// };

// const onSubmit = async (data: AuthInput<FormName>) => {
//   // if (!user) {

//   const formData = new FormData();
//   if (formName === 'registerForm' && isRegisterData(data)) {
//     formData.append('name', data.name); 
//   }
//   formData.append('email', data.email);
//   formData.append('password', data.password);


  // if (!user) {
  //   toast.error('User not found. Please log in.');
  //   return;
  // }


    // const hasNameError = (errors: FieldErrors<any>): errors is FieldErrors<{ name: string }> => {
  //   return 'name' in errors;
  // };

// example to be written under every input
        // {errors?.name && (
        // <AuthError className="autherror w-full">
        //   <div>{errors.name.message }</div>
        // </AuthError>
        // )} 