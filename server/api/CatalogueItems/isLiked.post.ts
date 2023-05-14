export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = await event.context.prisma.likedCatalogueItem.findMany({
    where: {
      catalogueItemId: body.catalogueItemId,
      userId: body.userId
    }
  })

  return (result.length > 0)
})
