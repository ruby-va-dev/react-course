import { Character } from '@/src/types'
import { charactersGenders } from '@/src/const/character-genders.ts'

interface Props {
  character: Character
}

export function CharacterPreviewCard({ character }: Props) {
  return (
    <li key={character.id}>
      <h2>{character.name}</h2>
      <img src={character.image} alt="" />
      {character.gender && <p>Пол: {charactersGenders[character.gender]}</p>}
    </li>
  )
}
