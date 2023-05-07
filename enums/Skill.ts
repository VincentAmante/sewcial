import type { Skill as SkillOrigin } from '@prisma/client'

export const Skill: {[key in SkillOrigin]: key} = {
  beginner: 'beginner',
  intermediate: 'intermediate',
  advanced: 'advanced'
} as const

export type Skill = SkillOrigin
