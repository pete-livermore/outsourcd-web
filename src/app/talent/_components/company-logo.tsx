'use client'
import { useRouter } from 'next/navigation'
import OutsourcdLogo from 'public/assets/svg/outsourcd-logo.svg'

interface CompanyLogoProps {
  className?: string
}

export function CompanyLogo({ className }: CompanyLogoProps) {
  const router = useRouter()

  function handleLogoClick() {
    router.push('/talent')
  }

  return (
    <OutsourcdLogo
      height={75}
      width={300}
      onClick={handleLogoClick}
      className={className}
    />
  )
}
