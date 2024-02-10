import { Briefcase, CircleUserRound } from 'lucide-react'
import { forwardRef, SVGProps } from 'react'

const ProfileIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ ...props }, ref) => <CircleUserRound {...props} ref={ref} />,
)

ProfileIcon.displayName = 'ProfileIcon'

const JobsIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ ...props }, ref) => <Briefcase {...props} ref={ref} />,
)

JobsIcon.displayName = 'JobsIcon'

const Icons = {
  Profile: ProfileIcon,
  Jobs: JobsIcon,
}

export default Icons
