
export default defineEventHandler(async (event) => {
  return await event.context.prisma.catalogueCategoryTag.findMany()
})
