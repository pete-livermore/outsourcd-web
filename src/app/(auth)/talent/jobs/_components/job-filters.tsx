'use client'

import { usePathname, useRouter } from 'next/navigation'
import qs from 'qs'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'

interface Filters {
  [key: string]: object | string | number | boolean
}

export function JobFilters() {
  const [filters, setFilters] = useState<Filters>({})
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const query = Object.keys(filters).length
      ? `?${qs.stringify({ filters })}`
      : ''
    router.push(`${pathname}${query}`)
  }, [router, filters, pathname])

  const employmentTypes = ['permanent', 'temporary', 'contract']
  const locationTypes = ['on-site', 'remote', 'hybrid']

  function filterEmploymentType(option: string, checked: string | boolean) {
    if (checked) {
      setFilters({ ...filters, employmentType: option })
    }
  }

  function filterLocationType(value: string) {
    setFilters({ ...filters, location: { type: value } })
  }

  function clearFilters() {
    setFilters({})
  }

  return (
    <div className='mb-6 flex gap-x-4 p-6'>
      <Slider defaultValue={[50]} max={100} step={1} className='w-1/5' />
      <DatePicker />
      <div className='flex flex-col space-y-2'>
        {employmentTypes.map((et, i) => (
          <div className='flex' key={i}>
            <Checkbox
              id={et}
              onCheckedChange={(checked) => filterEmploymentType(et, checked)}
              className='mr-2'
            />
            <div className='grid gap-1.5 leading-none'>
              <Label
                htmlFor='terms1'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {et}
              </Label>
            </div>
          </div>
        ))}
      </div>
      <RadioGroup onValueChange={(value) => filterLocationType(value)}>
        {locationTypes.map((lt) => (
          <div key={lt} className='flex items-center space-x-2'>
            <RadioGroupItem value={lt} id={lt} />
            <Label htmlFor={lt}>{lt}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={clearFilters}>Clear filters</Button>
    </div>
  )
}
