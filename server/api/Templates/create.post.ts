import { Template, Author, Skill, Prisma, EnumMaterial } from '@prisma/client'
import { JSONContent } from '@tiptap/vue-3'
import { z } from 'zod'

type TemplateOptional = {
  name: string,
  description: string,
  priceAED: number,
  isFeatured: boolean,
  categoryTagId: string,
  skill: Skill,
  authorFirstName: string,
  authorLastName: string,
  thumbnail: string,
  templateImage: string,
  materialsRequired: Prisma.JsonArray,
  equipment: Prisma.JsonArray,
  assembly: Prisma.JsonArray,
  materials: EnumMaterial[]
}

export default defineEventHandler(async (event) => {
  const body: TemplateOptional = await readBody(event)

  // const details = body.details as Prisma.JsonValue
  const result = await event.context.prisma.template.create({
    data: {
      name: body.name,
      description: body.description,
      thumbnail: body.thumbnail,
      templateImage: body.templateImage,
      materialsRequired: body.materialsRequired as Prisma.JsonArray,
      equipment: body.equipment as Prisma.JsonArray,
      assembly: body.assembly as Prisma.JsonArray,
      priceAED: body.priceAED,
      isFeatured: body.isFeatured,
      categoryTagId: body.categoryTagId,
      skill: (body.skill as Skill),
      authorFirstName: body.authorFirstName,
      authorLastName: body.authorLastName
    }
  })

  const materialsData = body.materials.map((material) => {
    return {
      materialName: (material as EnumMaterial),
      templateId: result.id
    }
  })

  const materials = await event.context.prisma.materialOnTemplate.createMany({
    data: materialsData
  })

  return result
})
