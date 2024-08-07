import { redirect } from 'next/navigation'

import { buildAuthRedirectUrl } from '../auth/redirect-url'

export const authRedirect = () => redirect(buildAuthRedirectUrl())
export const errorRedirect = (errors: unknown) => {
  throw new Error(JSON.stringify(errors))
}
