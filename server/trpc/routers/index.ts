import { publicProcedure, router } from '../trpc'

export const appRouter = router({
  fetchInstagram: publicProcedure
    .query(async () => {
      const fields = ['id', 'caption', 'thumbnail_url', 'permalink', 'media_url'].join(',')
      const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
      return await $fetch(url).catch((err) => {
        console.error(err)
        return []
      })
    })
})

// export type definition of API
export type AppRouter = typeof appRouter
