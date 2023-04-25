import { error, warn } from 'console'
import { TemplateTag } from '@prisma/client'

interface IHashTemplateTag {
  [key: string]: TemplateTag
}

export default defineEventHandler(async (event) => {
  const res = await event.context.prisma.catalogueItem.findMany()
  const items = []

  // Saves tags already queried to avoid repeats
  const existingTags: IHashTemplateTag = {}

  for (const item of res) {
    const tags = await event.context.prisma.templateTagsOnTemplate.findMany({
      where: {
        templateId: item.id
      }
    })

    // Every item in catalogues will have tag info provided, for filtering purposes
    const tagsData = []

    // Pulls tag info from the database
    for (const tag of tags) {
      // This saves up queries to the database by fetching tags already queried from the hash
      if (existingTags[tag.templateTagId] !== undefined) {
        tagsData.push(existingTags[tag.templateTagId])
        continue
      }

      const tagData = await event.context.prisma.catalogueTag.findUnique({
        where: {
          id: tag.templateTagId
        }
      })

      //  New tags are added to the existingTags hash
      if (tagData !== null) {
        tagsData.push(tagData)
        existingTags[tag.templateTagId] = tagData
      } else {
        warn(`Tag with id ${tag.templateTagId} not found`)
        continue
      }
    }

    const itemData = {
      ...item,
      tags: tagsData.map((tag) => {
        if (tag === null) {
          return null
        }
        return {
          tagType: tag.type,
          tagName: tag.name
        }
      })
    }

    items.push(itemData)
  }

  return items
})
