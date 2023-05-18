import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  pages: {
    signIn: '/sign-in'
  }

  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
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
