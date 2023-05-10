import { Prisma } from '@prisma/client'
export default defineEventHandler(async (event) => {
  if (event.context.params === undefined) {
    return null
  }
  const id = event.context.params.id

  const item = await event.context.prisma.catalogueItem.findUnique({
    where: {
      id
    }
  })

  let sizingsData: Prisma.JsonArray
  if (item?.sizingsData &&
    typeof item.sizingsData === 'object' &&
    Array.isArray(item?.sizingsData)) {
    sizingsData = item?.sizingsData as Prisma.JsonArray
  } else {
    sizingsData = []
  }

  return {
    ...item,
    sizingsData
  }
})
