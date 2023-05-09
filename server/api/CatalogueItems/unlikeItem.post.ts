export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = await event.context.prisma.likedCatalogueItem.deleteMany({
    where: {
      // catalogueItemId: body.catalogueItemId,
      userId: body.userId
    }
  })
})
