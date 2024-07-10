import { Component } from 'react'
import { Character } from '@/src/types'
import { charactersGenders } from '@/src/const/character-genders.ts'

interface Props {
  character: Character
}
interface State {}

export class CharacterPreviewCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    const { character } = this.props

    return (
      <li key={character.id}>
        <h2>{character.name}</h2>
        <img src={character.image} alt="" />
        {character.gender && <p>Пол: {charactersGenders[character.gender]}</p>}
      </li>
    )
  }
}
