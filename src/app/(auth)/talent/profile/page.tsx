import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { ProfileForm } from './_components/profile-form'
import { ProfileImageForm } from './_components/profile-image-form'

export default async function ProfilePage() {
  return (
    <div>
      <div className='mb-2'>
        <Heading variant='h1' justification='left'>
          Profile
        </Heading>
        <p>This is how others will see you on the site.</p>
      </div>
      <Separator />
      <div className='mt-6 grid grid-cols-2'>
        <ProfileForm />
        <ProfileImageForm />
      </div>
    </div>
  )
}
