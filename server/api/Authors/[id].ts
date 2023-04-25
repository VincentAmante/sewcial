export default defineEventHandler(async (event) => {
  if (event.context.params === undefined) {
    return null
  }
  const id = event.context.params.id

  return await event.context.prisma.template.findMany({
    where: {
      authorId: id
    },
    select: {
      id: true,
      name: true,
      description: true
    }
  })
})
