export default defineEventHandler(async (event) => {
  const result = await event.context.prisma.likedCatalogueItem.findMany()

  return result
})
