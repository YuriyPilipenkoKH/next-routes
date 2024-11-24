import { ReactNode } from 'react'
interface Props {
    children: ReactNode;
  }

function Layout({ children }: Props) {
  return (
    <div className='flex flex-col justify-center items-center '>
        Auth
        {children}
    </div>
  )
}

export default Layout