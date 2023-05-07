import { Author } from '@prisma/client'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const body: Author = await readBody(event)

  const result = await event.context.prisma.author.create({
    data: {
      name: body.name
    }
  })

  return result
})
