import { Banknote, Calendar } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/styles'

import { CompanyInfo } from '.'

export function JobDetail({ className }: { className?: string }) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CompanyInfo name='Company A' />
        <div className='space-y-4'>
          <CardTitle className='mt-4'>Job Title</CardTitle>
          <div className='mt-4 flex items-center gap-x-4'>
            <div className='flex items-center gap-x-1 text-xs'>
              <Calendar />
              <p>25th June 2024</p>
            </div>
            <div className='flex items-center gap-x-1 text-xs'>
              <Banknote />
              <p>35 K</p>
            </div>
          </div>
          <div className='flex'>
            <Badge>Permanent</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='py-4'>Here is a job description</p>
        <Button variant='default'>Apply</Button>
      </CardContent>
    </Card>
  )
}
