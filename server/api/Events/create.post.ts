import { Event, Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const body: Event = await readBody(event)

  const result = await event.context.prisma.event.create({
    data: {
      title: body.title,
      startTime: body.startTime,
      endTime: body.endTime,
      description: body.description,
      details: body.details as Prisma.JsonObject,
      priceAED: body.priceAED
    }
  })

  return result
})
