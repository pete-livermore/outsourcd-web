import { Masterclass } from './masterclass'
import { FileUpload } from './file-upload'
import { BaseEntity } from './base'

export interface Company extends BaseEntity {
  name: string
}

export interface Cohort extends BaseEntity {
  number: number
}

export interface Country extends BaseEntity {
  name: string
}

export interface UserPrivacy extends BaseEntity {
  consented: boolean
  createdAt: string
  updatedAt: string
}

export interface User extends BaseEntity {
  first_name: string
  last_name: string
  email: string
  company: Company | null
  country: Country | null
  biography: string | null
  role: 'Manager' | 'Coachee' | 'Expert'
}
