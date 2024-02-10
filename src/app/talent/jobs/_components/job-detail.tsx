import { Card } from '@/components/ui/card'
import { cn } from '@/utils/styles'

export function JobDetail({ className }: { className?: string }) {
  return <Card className={cn(className)}>Job detail</Card>
}
