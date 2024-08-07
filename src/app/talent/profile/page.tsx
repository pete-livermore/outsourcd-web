import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { getAuthToken } from '@/lib/auth/token'
import { authRedirect, errorRedirect } from '@/lib/navigation/redirect'
import { createUsersService } from '@/services/users'

import { ProfileForm } from './_components/profile-form'

export default async function ProfilePage() {
  const token = getAuthToken()

  if (!token) {
    return authRedirect()
  }

  const usersService = createUsersService(token)
  const result = await usersService.getAuthenticatedUser()

  if (result.type === 'failure') {
    if (result.reason === 'auth-error') {
      return authRedirect()
    }
    return errorRedirect(result.errors)
  }

  const user = result.data

  return (
    <div>
      <div className='mb-2'>
        <Heading as='h1' size='lg'>
          Profile
        </Heading>
        <p>This is how others will see you on the site.</p>
      </div>
      <Separator />
      <div className='mt-6'>
        <ProfileForm
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          image={user.image?.url}
          biography={user.biography}
        />
      </div>
    </div>
  )
}
