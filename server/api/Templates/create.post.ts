import { Template, Author, Skill, Prisma } from '@prisma/client'
import { JSONContent } from '@tiptap/vue-3'
// import { z } from 'zod'
type TemplateOptional = {
  name: string,
  description: string,
  details: JSONContent,
  priceAED: number,
  isFeatured: boolean,
  categoryTagId: string,
  skill: Skill,
  authorFirstName: string,
  authorLastName: string
}

export default defineEventHandler(async (event) => {
  const body: TemplateOptional = await readBody(event)

  const details = body.details as Prisma.JsonValue
  const result = await event.context.prisma.template.create({
    data: {
      name: body.name,
      description: body.description,
      details: (details) || null || undefined,
      priceAED: body.priceAED,
      isFeatured: body.isFeatured,
      categoryTagId: body.categoryTagId,
      skill: (body.skill as Skill),
      authorFirstName: body.authorFirstName,
      authorLastName: body.authorLastName
    }
  })

  return result
})
