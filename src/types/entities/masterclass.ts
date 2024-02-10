import { BaseEntity } from './base'
import { FileUpload } from './file-upload'

export interface MasterclassMaterial extends BaseEntity {
  description: string
  image: {
    id: number
    url: string
  }
  material: { id: number; url: string }
  createdAt: string
  updatedAt: string
  masterclass: {
    id: number
    order: number
    topic: string
  }
}

export interface Masterclass extends BaseEntity {
  topic: string
  about: string
  expectationsAndCommitments: string
  preBookingText: string
  externalMatchingRef: number
  image: FileUpload
  materials?: MasterclassMaterial[]
}
