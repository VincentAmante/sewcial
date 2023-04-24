
export default defineEventHandler(async (event) => {
  if (event.context.params === undefined) { return null }
  if (event.context.params.id === undefined) { return null }

  const id = event.context.params.id
  return await event.context.prisma.template.findUnique({
    where: {
      id
    }
  })
})
