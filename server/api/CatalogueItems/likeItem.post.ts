export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = await event.context.prisma.likedCatalogueItem.create({
    data: {
      catalogueItemId: body.catalogueItemId,
      userId: body.userId
    }
  })

  return result
})
