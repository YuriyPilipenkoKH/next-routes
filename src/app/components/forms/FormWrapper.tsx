import React from 'react'
import FormHeader from './FormHeader';
import { BtnX } from '../Button/Button';
import SocialLogin from '../OAuth/SocialLogin';

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
        <SocialLogin/>
       )} 
       <div className='flex w-full justify-center items-center mt-4'>
          <BtnX 
            href={backButtonHref}
            label={backButtonLabel}> 
            GO </BtnX>
       </div>
    </div>
  )
}

export default FormWrapper