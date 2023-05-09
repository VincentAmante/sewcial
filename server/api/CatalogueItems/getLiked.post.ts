export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = await event.context.prisma.likedCatalogueItem.findMany({
    where: {
      userId: body.userId
    },
    include: {
      catalogueItem: {
        select: {
          id: true,
          name: true,
          imageSrc: true,
          authorFirstName: true,
          authorLastName: true
        }
      }
    }
  })

  return result
})
