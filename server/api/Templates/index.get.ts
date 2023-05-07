export default defineEventHandler(async (event) => {
  return await event.context.prisma.template.findMany({
    include: {
      MaterialOnTemplate: {
        select: {
          material: true
        }
      }
    }
  })
})
