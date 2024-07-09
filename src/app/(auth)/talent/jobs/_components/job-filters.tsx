'use client'

import React, { useCallback, useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useSearchParams } from '@/hooks/search/use-search-params'

type FilterName = 'employment_types' | 'location_types'

const EMPLOYMENT_TYPES = ['permanent', 'temporary', 'contract'] as const
const LOCATION_TYPES = ['on-site', 'remote', 'hybrid'] as const

interface FilterOptionProps {
  value: string
  label: string
  name: FilterName
  onAddFilter: (filterName: string, filterValue: string) => void
  onClearFilter: (filterName: string, filterValue: string) => void
}

const FilterOption = ({
  value,
  label,
  name,
  onAddFilter,
  onClearFilter,
}: FilterOptionProps) => {
  const searchParams = useSearchParams()
  const filterParam = searchParams.get(name)

  const isChecked = useMemo(() => {
    if (!filterParam) return false
    const filterValues: string[] = JSON.parse(filterParam)
    return filterValues.includes(value)
  }, [filterParam, value])

  function handleCheckChange(checked: string | boolean) {
    checked ? onAddFilter(name, value) : onClearFilter(name, value)
  }

  return (
    <div className='flex'>
      <Checkbox
        id={value}
        checked={isChecked}
        onCheckedChange={handleCheckChange}
        className='mr-2'
      />
      <div className='grid gap-1.5 leading-none'>
        <Label
          htmlFor={value}
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          {label}
        </Label>
      </div>
    </div>
  )
}

export function JobFilters() {
  const searchParams = useSearchParams()

  function handleClearFiltersBtnClick() {
    searchParams.clear()
  }

  const setFiltersQuery = useCallback(
    (filterName: string, filterValue: string) => {
      const prevFilterParamValue = searchParams.get(filterName)
      const prevFilterValues: string[] = prevFilterParamValue
        ? JSON.parse(prevFilterParamValue)
        : []
      const updatedFilterValues = new Set(prevFilterValues).add(filterValue)
      const updatedFilterParamValue = JSON.stringify(
        Array.from(updatedFilterValues),
      )
      searchParams.set(filterName, updatedFilterParamValue)
    },
    [searchParams],
  )

  const removeFiltersQuery = useCallback(
    (filterName: string, filterValue: string) => {
      const prevFilterParamValue = searchParams.get(filterName)

      if (!prevFilterParamValue) return

      const prevFilterValues: string[] = prevFilterParamValue
        ? JSON.parse(prevFilterParamValue)
        : []

      if (!prevFilterValues.length) return

      const updatedFilterValues = prevFilterValues.filter(
        (f) => f !== filterValue,
      )

      if (!updatedFilterValues.length) {
        return searchParams.clear()
      }

      searchParams.set(filterName, JSON.stringify(updatedFilterValues))
    },
    [searchParams],
  )

  return (
    <div className='mb-6 flex items-center gap-x-4 p-6'>
      {/* <Slider defaultValue={[50]} max={100} step={1} className='w-1/5' />
      <DatePicker /> */}
      <div className='mr-6 space-y-1.5'>
        <p className='text-sm font-bold text-secondary-foreground'>
          Employment type
        </p>
        <div className='flex space-x-2'>
          {EMPLOYMENT_TYPES.map((et) => (
            <FilterOption
              key={et}
              value={et}
              label={et}
              name='employment_types'
              onAddFilter={setFiltersQuery}
              onClearFilter={removeFiltersQuery}
            />
          ))}
        </div>
      </div>
      <div className='mr-6 space-y-1.5'>
        <p className='text-sm font-bold text-secondary-foreground'>
          Location type
        </p>
        <div className='flex space-x-2'>
          {LOCATION_TYPES.map((lt) => (
            <FilterOption
              key={lt}
              value={lt}
              label={lt}
              name='location_types'
              onAddFilter={setFiltersQuery}
              onClearFilter={removeFiltersQuery}
            />
          ))}
        </div>
      </div>
      <Button onClick={handleClearFiltersBtnClick}>Clear filters</Button>
    </div>
  )
}
