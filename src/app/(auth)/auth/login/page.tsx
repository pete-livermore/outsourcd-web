import OutsourcdLogo from 'public/assets/svg/outsourcd-logo.svg'

import { Button } from '@/components/ui/button'

import { LoginForm } from './_components/login-form'

export default function LoginPage() {
  return (
    <div className='flex min-w-[400px] flex-col items-center justify-center space-y-6 rounded-lg border px-10 py-14 shadow-md lg:min-w-[480px]'>
      <OutsourcdLogo />
      <p className='text-2xl font-semibold'>Log in to your account</p>
      <LoginForm className='w-full' />
      <div className='flex items-center justify-between text-muted-foreground before:mr-2 before:h-0.5 before:w-5 before:bg-gray-400 after:ml-2 after:h-0.5 after:w-5 after:bg-gray-400'>
        Don&apos;t have an Outsourcd account?
      </div>
      <Button variant='outline'>Sign up</Button>
    </div>
  )
}
