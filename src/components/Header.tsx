import { ChangeEvent, Component } from 'react'
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
  state: HeaderState = {
    queryString: '',
    characters: [],
    notFound: false,
  }

  handleSearch = async (searchString = '') => {
    try {
      const data = await getCharacters(searchString)
      this.setState((prevState) => ({
        ...prevState,
        characters: data.results ? data.results : [],
        notFound: data.results ? false : true,
      }))
    } catch (e) {
      console.log(e)
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => ({
      ...prevState,
      queryString: e.target.value,
    }))
  }

  async componentDidUpdate(
    prevProps: Readonly<HeaderProps>,
    prevState: Readonly<HeaderState>,
  ) {
    if (prevState.queryString !== this.state.queryString) {
      await this.handleSearch(this.state.queryString)
    }
  }

  async componentDidMount() {
    await this.handleSearch()
  }

  render() {
    return (
      <header>
        <h1>Hallo!</h1>
        <input
          type="text"
          value={this.state.queryString}
          onChange={this.handleChange}
        />
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
