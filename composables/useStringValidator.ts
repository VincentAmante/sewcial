import { z } from 'zod'

export const useStringValidator = (input: string, validator: z.ZodType<any>) => {
  const parsed = validator.safeParse(input)

  const response = () => {
    if (parsed.success) {
      return {
        status: 'success',
        result: parsed.data
      }
    } else {
      return {
        status: 'error',
        result: parsed.error
      }
    }
  }

  return { response }
}
