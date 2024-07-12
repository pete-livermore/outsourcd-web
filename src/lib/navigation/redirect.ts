import { redirect } from 'next/navigation'

import { ERROR_URL } from '@/constants/error-url'

import { buildAuthRedirectUrl } from '../auth/redirect-url'

export const authRedirect = () => redirect(buildAuthRedirectUrl())
export const errorRedirect = () => redirect(ERROR_URL)
