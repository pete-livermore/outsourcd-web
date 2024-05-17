'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import React, { useState } from 'react'
import { useFormState } from 'react-dom'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/utils/styles'

import { updateUser } from '../actions'

export type ProfileFormState =
  | {
      errors: { password?: string[]; biography?: string[] }
      result?: undefined
    }
  | { errors?: undefined; result: 'success' | 'failure' }

const INITIAL_STATE: ProfileFormState = {
  errors: { password: [], biography: [] },
}

export interface AdditionalData {
  selectedEmail: string
}
const INITIAL_ADDITIONAL_DATA: AdditionalData = {
  selectedEmail: '',
}

export function ProfileForm() {
  const [additionalData, setAdditionalData] = useState<AdditionalData>(
    INITIAL_ADDITIONAL_DATA,
  )
  const [open, setOpen] = useState(false)
  const [state, formAction] = useFormState(updateUser, INITIAL_STATE)
  const errors = state?.errors

  const updateUserWithAllFields = updateUser.bind(null, additionalData)

  const { selectedEmail } = additionalData

  const userEmails = [{ value: 'pete@email.com' }, { value: 'pete2@email.com' }]

  function handleSelectEmail(currentValue: string) {
    setAdditionalData({
      ...additionalData,
      selectedEmail: currentValue === selectedEmail ? '' : currentValue,
    })
    setOpen(false)
  }

  return (
    <form
      className='flex max-w-lg flex-col space-y-6'
      action={updateUserWithAllFields}
    >
      <div>
        <Label htmlFor='first_name'>First name</Label>
        <Input id='first_name' name='first_name' placeholder='Pete' />
      </div>
      <div>
        <Label htmlFor='last_name'>Last name</Label>
        <Input id='last_name' name='last_name' placeholder='Livermore' />
      </div>
      <div>
        <Label htmlFor='biography'>Biography</Label>
        <Textarea
          placeholder='Type your message here.'
          id='biography'
          name='biography'
        />
      </div>
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              size={'sm'}
              role='combobox'
              aria-expanded={open}
              aria-label='Select Email'
              className='w-[260px] justify-between text-muted-foreground dark:text-white'
            >
              {selectedEmail
                ? userEmails.find((email) => email.value === selectedEmail)
                    ?.value
                : 'Select a verified email to display'}
              <ChevronsUpDown className='ml-2 hidden size-4 shrink-0 opacity-50 lg:block' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[260px] p-0'>
            <Command>
              {/* <CommandInput placeholder='Search language...' /> */}
              <CommandList>
                <CommandEmpty>No email found.</CommandEmpty>
                <CommandGroup>
                  {userEmails.map((email) => (
                    <CommandItem
                      key={email.value}
                      value={email.value}
                      onSelect={handleSelectEmail}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedEmail === email.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {email.value}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Button>Update profile</Button>
    </form>
  )
}
