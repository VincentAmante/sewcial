import { Author } from '@prisma/client'

type FirstLastName = {
  firstName: string
  lastName: string
}

type WithAuthorName<T> = T & {
  authorName: string
}

function withAuthorName<Author extends FirstLastName> (author: Author): WithAuthorName<Author> {
  return {
    ...author,
    authorName: `${author.firstName} ${author.lastName}`
  }
}

export default defineEventHandler(async (event) => {
  const authors = await event.context.prisma.author.findMany()
  return authors.map(withAuthorName)
})
