'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { FormFieldErrorMessage } from '@/components/form/error/form-field-error-message'
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
import { useToast } from '@/components/ui/toast'
import { cn } from '@/utils/styles'

import { updateUser } from '../actions'
import { EditProfileImage } from './edit-profile-image'

interface FormErrors {
  firstName?: string[]
  lastName?: string[]
  password?: string[]
  biography?: string[]
}

export type ProfileFormState =
  | {
      errors: FormErrors
      result?: undefined
    }
  | { errors?: undefined; result: 'success' | 'failure' }

const INITIAL_STATE: ProfileFormState = {
  errors: { password: [], biography: [] },
}

interface ProfileFormProps {
  firstName: string
  lastName: string
  email: string
}

export function ProfileForm({ firstName, lastName, email }: ProfileFormProps) {
  const [selectedEmail, setSelectedEmail] = useState<string | undefined>()
  const { pending } = useFormStatus()
  const imageFormData = new FormData()
  const [open, setOpen] = useState(false)
  const updateUserWithImage = updateUser.bind(null, imageFormData)
  const [state, formAction] = useFormState(updateUserWithImage, INITIAL_STATE)
  const { toast } = useToast()
  const errors = state?.errors

  const userEmails = [{ value: email }]

  function handleSelectEmail(currentValue: string) {
    const email = currentValue === selectedEmail ? '' : currentValue
    setSelectedEmail(email)
    setOpen(false)
  }

  function handleImageEditComplete(blob: Blob) {
    imageFormData.append('profileImage', blob)
  }

  useEffect(() => {
    if (state.result === 'success') {
      toast({
        title: 'User updated succesfully',
      })
    }
  }, [state, firstName, toast])

  return (
    <form className='grid grid-cols-2' action={formAction}>
      <div className='flex max-w-lg flex-col space-y-6'>
        <div>
          <Label htmlFor='first_name'>First name</Label>
          <Input id='first-name' name='first-name' placeholder={firstName} />
          <FormFieldErrorMessage errors={errors?.firstName} />
        </div>
        <div>
          <Label htmlFor='last_name'>Last name</Label>
          <Input id='last-name' name='last-name' placeholder={lastName} />
          <FormFieldErrorMessage errors={errors?.lastName} />
        </div>
        <div>
          <Label>Email</Label>
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
            <input type='hidden' name='userId' value={selectedEmail} />
          </div>
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
          <Button disabled={pending}>Update profile</Button>
        </div>
      </div>
      <EditProfileImage onEditComplete={handleImageEditComplete} />
    </form>
  )
}
