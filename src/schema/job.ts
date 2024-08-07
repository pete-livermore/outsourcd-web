import { z } from 'zod'

const CompanyRelationDto = z.object({
  id: z.number(),
  name: z.string().min(1),
})
type CompanyRelationDto = z.infer<typeof CompanyRelationDto>

const SalaryDto = z.object({
  currency: z.string(),
  value: z.object({ max: z.number(), min: z.number() }),
  period: z.string(),
})
type SalaryDto = z.infer<typeof SalaryDto>

const JobDto = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  company: CompanyRelationDto,
  salary: SalaryDto,
  employment_type: z.string(),
  start_date: z.string(),
})
type JobDto = z.infer<typeof JobDto>

export { CompanyRelationDto, JobDto, SalaryDto }
