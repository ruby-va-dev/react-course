import { ChangeEvent, Component, FormEvent } from 'react'
import { getCharacters } from '../api'

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
}

export class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props)
    this.state = {
      queryString: this.getQueryFromStorage(),
      characters: [],
      notFound: false,
    }
  }

  private setQueryToStorage = (query: string) => {
    localStorage.setItem('RubyAPP:SearchQuery', query)
  }

  private getQueryFromStorage = () => {
    return localStorage.getItem('RubyAPP:SearchQuery') || ''
  }

  handleSearch = async () => {
    try {
      this.setQueryToStorage(this.state.queryString)
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
