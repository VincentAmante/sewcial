export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = await event.context.prisma.likedCatalogueItem.findMany({
    where: {
      userId: 'c336c2f7-1f04-4613-97fa-fb68777c420e'
    },
    select: {
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
