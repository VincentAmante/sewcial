export default defineEventHandler(async (event) => {
  // if (!event.params?.id) {
  //   throw new Error('Missing id')
  // }

  const email = event.context.params?.email || ''

  const user = await event.context.prisma.user.upsert({
    where: {
      email
    },
    update: {},
    create: {
      email
    }
  })

  return user
})
