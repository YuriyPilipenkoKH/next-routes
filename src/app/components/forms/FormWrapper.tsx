// 'use server'
import React from 'react'
import FormHeader from './FormHeader';
import { BtnX } from '../Button/Button';
import SocialLogin from '../OAuth/SocialLogin';
import { FaRegistered } from "react-icons/fa";

interface FormWrapperProps {
  children: React.ReactNode;
  titleLabel: string;
  welcomeMsg: string
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean
  
}

const FormWrapper = ({
  children,
  titleLabel, 
  welcomeMsg,
  backButtonLabel,
  backButtonHref,
  showSocial
}: FormWrapperProps) => {
  return (
    <div className='shadow-sm rounded-md bg-green-200'>
      <FormHeader 
      titleLabel={titleLabel}
      welcomeMsg={welcomeMsg}
      />
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
              <FaRegistered/>
            </BtnX >
       </div>
    </div>
  )
}

export default FormWrapper