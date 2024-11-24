import React from 'react'
import FormWrapper from './FormWrapper'
import { LoginFormProps } from '@/data/formProps'

const LoginForm = () => {
  return (
    <FormWrapper 
      titleLabel={LoginFormProps.titleLabel}
      backButtonLabel={LoginFormProps.backButtonLabel}
      backButtonHref={LoginFormProps.backButtonHref}
      showSocial={LoginFormProps.showSocial}
    >
        <h2>login</h2>
    </FormWrapper>
  )
}

export default LoginForm