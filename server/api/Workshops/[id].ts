export default defineEventHandler(async (event) => {
  return await event.context.prisma.workshop.findUnique(
    {
      where: {
        id: event.context.params?.id
      }
    }
  )
})
