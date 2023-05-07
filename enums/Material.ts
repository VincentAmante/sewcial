import type { EnumMaterial as EnumMaterialOrigin } from '@prisma/client'

export const EnumMaterial: {[key in EnumMaterialOrigin]: key} = {
  canvas: 'canvas',
  chiffon: 'chiffon',
  cotton: 'cotton',
  crepe: 'crepe',
  denim: 'denim',
  leather: 'leather',
  lace: 'lace',
  linen: 'linen',
  satin: 'satin',
  silk: 'silk',
  synthetic: 'synthetic',
  velvet: 'velvet',
  wool: 'wool'
} as const

export type EnumMaterial = EnumMaterialOrigin
