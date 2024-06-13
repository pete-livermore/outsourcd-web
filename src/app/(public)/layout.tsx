import type { Metadata } from 'next'

import { GlobalNavigationMenu } from './_components/global-navigation-menu'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <GlobalNavigationMenu />
      <main>{children}</main>
    </>
  )
}
