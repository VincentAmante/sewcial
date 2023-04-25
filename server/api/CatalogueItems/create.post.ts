import { Prisma, CatalogueItem, Material, EnumMaterial, MaterialOnCatalogueItems } from '@prisma/client'
// // import { z } from 'zod'

type MaterialsData = {
  materials: EnumMaterial[]
}
type CatalogueItemWithMaterials = CatalogueItem & MaterialsData

export default defineEventHandler(async (event) => {
  const body: CatalogueItemWithMaterials = await readBody(event)

  const sizingsData = body.sizingsData as Prisma.JsonArray

  const result = await event.context.prisma.catalogueItem.create({
    data: {
      name: body.name,
      description: body.description,
      imageSrc: body.imageSrc,
      priceAED: body.priceAED,
      isFeatured: body.isFeatured,
      categoryTagName: body.categoryTagName,
      sizingsData
    }
  })
  const materialsData = body.materials.map((material) => {
    return {
      materialName: (material as EnumMaterial),
      catalogueId: result.id
    }
  })

  const materials = await event.context.prisma.materialOnCatalogueItems.createMany({
    data: materialsData
  })

  return result
})
