'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { useSearchParams } from '@/hooks/search/use-search-params'

interface Filters {
  [key: string]: object | string | number | boolean
}

const EMPLOYMENT_TYPES = ['permanent', 'temporary', 'contract'] as const
const LOCATION_TYPES = ['on-site', 'remote', 'hybrid'] as const

export function JobFilters() {
  const [filters, setFilters] = useState<Filters>({})
  const searchParams = useSearchParams()

  useEffect(() => {
    if (Object.keys(filters).length) {
      searchParams.set('filters', JSON.stringify(filters))
    } else {
      searchParams.clear()
    }
  }, [filters, searchParams])

  function filterOnEmploymentType(option: string, checked: string | boolean) {
    if (checked) {
      setFilters({ ...filters, employmentType: option })
    }
  }

  function filterOnLocationType(value: string) {
    setFilters({ ...filters, location: { type: value } })
  }

  function handleLocationTypeValueChange(value: string) {
    filterOnLocationType(value)
  }

  function clearFilters() {
    const clearedFilters = {}
    setFilters(clearedFilters)
  }

  function handleClearFiltersBtnClick(_e: React.MouseEvent<HTMLButtonElement>) {
    clearFilters()
  }

  return (
    <div className='mb-6 flex gap-x-4 p-6'>
      <Slider defaultValue={[50]} max={100} step={1} className='w-1/5' />
      <DatePicker />
      <div className='flex flex-col space-y-2'>
        {EMPLOYMENT_TYPES.map((et, i) => (
          <div className='flex' key={i}>
            <Checkbox
              id={et}
              onCheckedChange={(checked) => filterOnEmploymentType(et, checked)}
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
      <RadioGroup onValueChange={handleLocationTypeValueChange}>
        {LOCATION_TYPES.map((lt) => (
          <div key={lt} className='flex items-center space-x-2'>
            <RadioGroupItem value={lt} id={lt} />
            <Label htmlFor={lt}>{lt}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={handleClearFiltersBtnClick}>Clear filters</Button>
    </div>
  )
}
