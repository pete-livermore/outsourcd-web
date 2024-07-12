import { CldImage } from '@/components/ui/cld-image'

const companies = [
  { name: 'Bluehouse', logo: 'bluehouse_logo' },
  { name: 'Pinnacle', logo: 'pinnacle_logo' },
  { name: 'Nexus', logo: 'nexus_logo' },
  { name: 'Lifeline', logo: 'lifeline_logo' },
  { name: 'Freshwave', logo: 'freshwave_logo' },
  { name: 'Brightpath', logo: 'brightpath_logo' },
]

function AnimatedCompanyLogoList() {
  return (
    <div className='inline-block animate-slide group-hover:[animation-play-state:paused]'>
      {companies.map((company) => (
        <CldImage
          src={company.logo}
          alt={`${company.name}_logo`}
          height={30}
          width={100}
          key={company.name}
          className='mx-12 inline object-cover opacity-75 grayscale'
        />
      ))}
    </div>
  )
}

export function CompanyLogoCarousel() {
  return (
    <div className='group relative overflow-hidden whitespace-nowrap before:absolute before:left-0 before:top-0 before:z-20 before:h-full before:w-32 before:bg-gradient-to-l before:from-transparent before:to-muted before:content-[""] after:absolute after:right-0 after:top-0 after:z-20 after:h-full after:w-32 after:bg-gradient-to-r after:from-transparent after:to-muted after:content-[""]'>
      <AnimatedCompanyLogoList />
      <AnimatedCompanyLogoList />
    </div>
  )
}
