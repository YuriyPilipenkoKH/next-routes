import React from 'react'
import FormWrapper from './FormWrapper'
import { RegisterFormProps } from '@/data/formProps'

const RegisterForm = () => {
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