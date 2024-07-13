'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover/popover'
import { cn } from '@/utils/styles'

interface DatePickerProps {
  placeholder?: string
  onSelectDate: (date?: Date) => void
  selectedDate?: Date
}

export function DatePicker({
  placeholder = 'Pick a date',
  selectedDate,
  onSelectDate,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal text-secondary-foreground',
            !selectedDate && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 size-4' />
          {selectedDate ? (
            format(selectedDate, 'PPP')
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={selectedDate}
          onSelect={onSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
