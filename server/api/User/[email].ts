export default defineEventHandler(async (event) => {

  const email = event.context.params?.email || ''
  const user = await event.context.prisma.user.upsert({
    where: {
      email
    },
    select: {
      id: true,
      email: true
    },
    update: {},
    create: {
      email
    }
  })

  return user
})
