import { LoginForm } from './_components/login-form'

export default function LoginPage() {
  return (
    <div className='flex min-w-[400px] flex-col justify-center lg:min-w-[450px]'>
      <h1 className='mb-20 text-center text-4xl'>Hello, come on in</h1>
      <LoginForm />
    </div>
  )
}
