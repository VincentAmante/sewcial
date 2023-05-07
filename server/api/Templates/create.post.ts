import { Template, Author, Skill, Prisma, EnumMaterial } from '@prisma/client'
import { JSONContent } from '@tiptap/vue-3'
import { z } from 'zod'

type WithMaterials<T> = T & {
  materials: EnumMaterial[]
}

type TemplateWithMaterials = WithMaterials<Template>

export default defineEventHandler(async (event) => {
  const body: TemplateWithMaterials = await readBody(event)

  // const details = body.details as Prisma.JsonValue
  const result = await event.context.prisma.template.create({
    data: {
      name: body.name,
      description: body.description as string,
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
