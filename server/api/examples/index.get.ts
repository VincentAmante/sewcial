import { Example } from '@prisma/client'

/**
 * Fetch all `examples` from the database. Run `npx prisma db push` at least once for this to work.
 *
 * If you are using `tRPC` you can access the prisma-client by adding it to the context:
 * ```ts
 * export async function createContext(event: H3Event) {
 *   return { prisma: event.context.prisma }
 * }
 *
 * export type Context = inferAsyncReturnType<typeof createContext>
 * ```
 */
export default defineEventHandler(async (event) => {
  return await event.context.prisma.example.findMany().then((res) => {
    const filteredResult: Example[] = []

    // example filtering
    res.forEach((item) => {
      if (item.details === 'sample') {
        filteredResult.push(item)
      }
    })

    return filteredResult
  })
})
