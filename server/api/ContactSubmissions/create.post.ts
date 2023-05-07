import { ContactSubmission } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const body: ContactSubmission = await readBody(event)

  const result = await event.context.prisma.contactSubmission.create({
    data: {
      name: body.name,
      email: body.email,
      mobile: body.mobile,
      message: body.message
    }
  })
  return {
    result,
    body
  }
})
