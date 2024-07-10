import { CharacterGenderKeys } from '@/src/const/character-genders.ts'

export interface Character {
  name: string
  id: string
  image: string
  gender?: CharacterGenderKeys
}
