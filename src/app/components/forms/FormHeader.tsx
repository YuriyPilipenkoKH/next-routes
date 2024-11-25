import React from 'react'

interface FormHeaderProps {
  titleLabel: string;
}


const FormHeader = ({titleLabel}: FormHeaderProps) => {
  return (
    <div className='w-full flex flex-col space-y-1 items-center justify-center'>
      <h2 className='text-xl font-semibold '>
        Next-JS-Routes
      </h2>
      <p className='text-sm bg-green-200'>
        {titleLabel}</p>
    </div>
  )
}

export default FormHeader