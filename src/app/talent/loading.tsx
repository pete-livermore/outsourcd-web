import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <div className='flex size-full items-center justify-center'>
      <Spinner size='lg' />
    </div>
  )
}
