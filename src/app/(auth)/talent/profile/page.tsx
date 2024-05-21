import { redirect } from 'next/navigation'

import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { env } from '@/config/env'
import { buildRedirectUrl } from '@/lib/auth/redirect-url'
import { getAuthToken } from '@/lib/auth/token'

import { ProfileForm } from './_components/profile-form'

export default async function ProfilePage() {
  const token = getAuthToken()
  const redirectUrl = buildRedirectUrl()

  const res = await fetch(`${env.SERVER_URL}/api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.status === 401) {
    return redirect(redirectUrl)
  }

  const resData = await res.json()
  const user = resData.data

  return (
    <div>
      <div className='mb-2'>
        <Heading variant='h1' justification='left'>
          Profile
        </Heading>
        <p>This is how others will see you on the site.</p>
      </div>
      <Separator />
      <div className='mt-6'>
        <ProfileForm
          firstName={user.first_name}
          lastName={user.last_name}
          email={user.email}
        />
      </div>
    </div>
  )
}
