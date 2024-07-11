interface CompanyRelationData {
  id: number
  name: string
}

interface SalaryData {
  currency: string
  value: { max: number; min: number }
  period: string
}

export interface JobData {
  id: number
  title: string
  description: string
  company: CompanyRelationData
  salary: SalaryData
  employment_type: string
  start_date: string
}

export class Job {
  id: number
  title: string
  description: string
  company: CompanyRelationData
  salary: SalaryData
  employmentType: string
  startDate: string

  constructor(data: JobData) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.company = data.company
    this.salary = data.salary
    this.employmentType = data.employment_type
    this.startDate = data.start_date
  }
}
