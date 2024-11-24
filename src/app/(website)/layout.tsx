import { ReactNode } from 'react'
interface Props {
    children: ReactNode;
  }

function Layout({ children }: Props) {
  return (
    <div className='h-full flex flex-col items-center justify-center gap-2 bg-[var(--website-bg)]'>
        Website
        {children}
    </div>
  )
}

export default Layout