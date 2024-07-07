import { ChangeEvent, Component, FormEvent } from 'react'
import { getCharacters } from '../api'
import {
  getMainQuerySearchStringfromStorage,
  setMainQuerySearchStringToStorage,
} from '../const/local-storage-keys'

interface HeaderProps {}

interface Character {
  name: string
  id: string
  image: string
}

interface HeaderState {
  queryString: string
  characters: Character[]
  notFound: boolean
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
      setMainQuerySearchStringToStorage(this.state.queryString)
      const data = await getCharacters(this.state.queryString)
      this.setState((prevState) => ({
        ...prevState,
        characters: data.results ? data.results : [],
        notFound: !data.results,
      }))
    } catch (e) {
      console.log(e)
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

    return (
      <header>
        <h1>Hallo!</h1>

        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            value={this.state.queryString}
            onChange={this.handleChange}
            onSubmit={() => this.handleSearch()}
          />
          <button type="submit">Найти</button>
          <button onClick={() => this.testError()}>Сделать Ошибку</button>
        </form>

        {this.state.notFound && <h2>Не нашол никово прасти пажлауйста)</h2>}
        <ul className="list">
          {this.state.characters.map((character) => (
            <li key={character.id}>
              <h2>{character.name}</h2>
              <img src={character.image} alt="" />
            </li>
          ))}
        </ul>
      </header>
    )
  }
}

interface ErrorTestComponentProps {}

class ErrorTestComponent extends Component<ErrorTestComponentProps> {
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
