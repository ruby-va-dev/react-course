export const charactersGenders = {
  Male: 'Мужской',
  Female: 'Женский',
  Genderless: 'Бесполый',
  unknown: 'Неизвестный',
} as const

export type CharacterGenderKeys = keyof typeof charactersGenders
