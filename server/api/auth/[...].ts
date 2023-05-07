import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { useFetch } from '@vueuse/core'
import { PrismaClient } from '@prisma/client'
import type { User } from '@prisma/client'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  // TODO: SET A STRONG SECRET, SEE https://sidebase.io/nuxt-auth/configuration/nuxt-auth-handler#secret
  secret: process.env.AUTH_SECRET,
  // TODO: ADD YOUR OWN AUTHENTICATION PROVIDER HERE, READ THE DOCS FOR MORE: https://sidebase.io/nuxt-auth
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID || 'enter-your-client-id-here',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'enter-your-client-secret-here' // TODO: Replace this with an env var like "process.env.GITHUB_CLIENT_SECRET". The secret should never end up in your github repository
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (token) {
        // const userData = await $fetch(`/api/User/${token.email}`)
      }
      // const email = user ? user.email || '' : ''

      // const userData = await $fetch(`/api/User/${email}`)
      const isSignIn = !!user
      if (isSignIn) {
        token.id = user ? user.id || '' : ''
        token.role = user ? (user as any).role || '' : ''
      }
      return Promise.resolve(token)
    },

    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({ session, token }) => {
      (session as any).role = token.role;
      (session as any).uid = token.id
      return Promise.resolve(session)
    }
  }
})
