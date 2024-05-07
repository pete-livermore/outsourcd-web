'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/utils/styles'

export function JobFilters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  function updateSearchParams(value: string | number | boolean, key: string) {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (!value) {
      current.delete(key)
    } else {
      current.set(key, String(value))
    }

    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  // function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
  //   const value = event.target.value?.trim()

  //   updateSearchParams(value)
  // }

  const employmentTypes = ['permanent', 'temporary', 'contract']

  return (
    <div className='mb-6 flex gap-x-4 p-6'>
      <Slider defaultValue={[50]} max={100} step={1} className='w-1/5' />
      <DatePicker />
      <div className='flex flex-col space-y-2'>
        {employmentTypes.map((et, i) => (
          <div className='flex' key={i}>
            <Checkbox
              id={et}
              onCheckedChange={(checked) => updateSearchParams(checked, et)}
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
      <RadioGroup
        defaultValue='permanent'
        onValueChange={(value) => updateSearchParams(value, 'type')}
      >
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='permanent' id='permanent' />
          <Label htmlFor='permanent'>Permanent</Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='temporary' id='temporary' />
          <Label htmlFor='temporary'>Temporary</Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='contract' id='contract' />
          <Label htmlFor='contract'>Contract</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
