import { Workshop, Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const body: Workshop = await readBody(event)

  const details = body.details as Prisma.JsonObject

  const result = await event.context.prisma.workshop.create({
    data: {
      title: body.title,
      startTime: body.startTime,
      endTime: body.endTime,
      skill: (body.skill as Skill),
      details: (details) || null || undefined,
      totalSlots: body.totalSlots,
      priceAED: body.priceAED
    }
  })

  return result
})
