import { ChangeEvent, Component, FormEvent } from 'react'

import { Character } from '@/src/types'
import { CharacterPreviewCard } from '@/src/components/character-preview-card.tsx'
import { getCharacters } from '@/src/api'
import {
  getMainQuerySearchStringfromStorage,
  setMainQuerySearchStringToStorage,
} from '@/src/const/local-storage-keys.ts'

interface HeaderProps {}

interface HeaderState {
  queryString: string
  characters: Character[]
  notFound: boolean
  loading: boolean
  throwTestError: boolean
}

export class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props)
    this.state = {
      queryString: getMainQuerySearchStringfromStorage(),
      characters: [],
      notFound: false,
      throwTestError: false,
      loading: false,
    }
  }

  testError() {
    this.setState((prevState) => ({
      ...prevState,
      throwTestError: true,
    }))
  }

  handleSearch = async () => {
    try {
      this.setState((prevState) => ({
        ...prevState,
        loading: true,
      }))

      setMainQuerySearchStringToStorage(this.state.queryString)
      const data = await getCharacters(this.state.queryString)
      this.setState((prevState) => ({
        ...prevState,
        characters: data.results ? data.results : [],
        notFound: !data.results,
      }))
    } catch (e) {
      console.log(e)
    } finally {
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
      }))
    }
  }

  handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await this.handleSearch()
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => ({
      ...prevState,
      queryString: e.target.value,
    }))
  }

  async componentDidMount() {
    await this.handleSearch()
  }

  render() {
    if (this.state.throwTestError) {
      return <ErrorTestComponent />
    }

    if (this.state.loading) {
      return <h1>Loading...</h1>
    }

    return (
      <header>
        <h1>Hallo!</h1>

        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            value={this.state.queryString}
            onChange={this.handleChange}
            onSubmit={() => this.handleSearch()}
            placeholder="Поиск по имени персонажа"
          />
          <button type="submit">Найти</button>
          <button onClick={() => this.testError()}>Сделать Ошибку</button>
        </form>

        {this.state.notFound && <h2>Не нашол никово прасти пажлауйста)</h2>}
        {this.state.characters.length > 0 && (
          <ul className="list">
            {this.state.characters.map((character) => (
              <CharacterPreviewCard key={character.id} character={character} />
            ))}
          </ul>
        )}
      </header>
    )
  }
}

interface ErrorTestComponentProps {}

interface ErrorTestComponentState {}

class ErrorTestComponent extends Component<
  ErrorTestComponentProps,
  ErrorTestComponentState
> {
  constructor(props: ErrorTestComponentProps) {
    super(props)
    throw new Error('Test Error')
  }

  render() {
    return (
      <div>
        Привет, это тестовый компонент, но он не загрузится из-за ошибки и
        перенаправления на ErrorBoundary
      </div>
    )
  }
}
