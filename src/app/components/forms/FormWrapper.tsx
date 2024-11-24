import React from 'react'
import FormHeader from './FormHeader';

interface FormWrapperProps {
  children: React.ReactNode;
  titleLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean
  
}

const FormWrapper = ({
  children,
  titleLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: FormWrapperProps) => {
  return (
    <div className='shadow-sm rounded-md bg-green-200'>
      <FormHeader titleLabel={titleLabel}/>
        <div className='p-2'>
          {children}
        </div>
       {showSocial && (
        <>
        Social Login
        </>
       )} 
       <div className='flex w-full justify-center items-center mt-4'>

       </div>
    </div>
  )
}

export default FormWrapper