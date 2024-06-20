import { z } from 'zod'

const INVALID_TYPE_ERROR = 'Invalid type provided for this field'
const REQUIRED_ERROR = 'This field cannot be blank'

interface SchemaParams {
  message?: string | undefined
  description?: string | undefined
  nullable?: boolean
  minLength?: number
}

export function textFormFieldSchema(
  params: { nullable: true } & SchemaParams,
): z.ZodNullable<z.ZodString>
export function textFormFieldSchema(params?: SchemaParams): z.ZodString

export function textFormFieldSchema(params: SchemaParams = {}) {
  const { nullable = false, minLength = 1, ...rest } = params

  const baseSchema = z
    .string({
      invalid_type_error: INVALID_TYPE_ERROR,
      required_error: REQUIRED_ERROR,
      ...rest,
    })
    .min(minLength, { message: REQUIRED_ERROR })

  return nullable ? baseSchema.nullable() : baseSchema
}

export function numberFormFieldSchema(
  params: { nullable: true } & SchemaParams,
): z.ZodNullable<z.ZodNumber>

export function numberFormFieldSchema(params?: SchemaParams): z.ZodNumber

export function numberFormFieldSchema(params: SchemaParams = {}) {
  const { nullable = false, ...rest } = params

  const baseSchema = z.number({
    invalid_type_error: INVALID_TYPE_ERROR,
    required_error: REQUIRED_ERROR,
    ...rest,
  })

  return nullable ? baseSchema.nullable() : baseSchema
}
