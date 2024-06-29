import { Content } from './content'

export interface PageSection {
  id: string
  name: string
  title: string | null
  pageId: string | null
  content: Content[]
}
