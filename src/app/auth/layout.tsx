import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex min-h-screen items-center justify-center px-2 py-4'>
      {children}
    </div>
  )
}
