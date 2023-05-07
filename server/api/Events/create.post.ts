import { Event, Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const body: Event = await readBody(event)

  const coeff = 1000 * 60 * 5
  const startTimeRounded = new Date(Math.round(new Date(body.startTime).getTime() / coeff) * coeff)
  const endTimeRounded = new Date(Math.round(new Date(body.endTime).getTime() / coeff) * coeff)
  const result = await event.context.prisma.event.create({
    data: {
      title: body.title,
      startTime: startTimeRounded,
      endTime: endTimeRounded,
      details: body.details as Prisma.JsonObject,
      thumbnail: body.thumbnail
    }
  })

  return result
})
