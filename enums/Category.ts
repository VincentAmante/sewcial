export const Category = {
  coats: 'coats',
  dresses: 'dresses',
  misc: 'misc',
  pants: 'pants',
  shirts: 'shirts',
  skirts: 'skirts'
}

export type Category = typeof Category[keyof typeof Category]
