export default defineEventHandler(async (event) => {
  return await event.context.prisma.catalogueItem.findMany({
    include: {
      materials: {
        select: {
          material: true
        }
      }
    }
  })
})
