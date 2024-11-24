import React from 'react'

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
    <div>FormWrapper</div>
  )
}

export default FormWrapper