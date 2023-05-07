export default defineEventHandler(async (event) => {
  return await event.context.prisma.event.findUnique(
    {
      where: {
        id: event.context.params?.id
      }
    }
  )
})
