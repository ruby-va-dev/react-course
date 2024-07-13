import { ChangeEvent, Component, FormEvent, useEffect, useState } from 'react'

import { Character } from '@/src/types'
import { CharacterPreviewCard } from '@/src/components/character-preview-card.tsx'
import { getCharacters } from '@/src/api'
import { useSearchQueryToLocalStorage } from '@/src/hooks/useSearchQueryToLocalStorage.ts'
import { MAIN_QUERY_SEARCH_STRING } from '@/src/const/local-storage-keys.ts'

export function Header() {
  const { searchQuery, setSearchQuery, setQueryToLocalStorage } =
    useSearchQueryToLocalStorage(MAIN_QUERY_SEARCH_STRING)
  const [characters, setCharacters] = useState<Character[]>([])
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [throwTestError, setThrowTestError] = useState(false)

  const testError = () => {
    setThrowTestError(true)
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      setQueryToLocalStorage(searchQuery)
      const data = await getCharacters(searchQuery)
      setCharacters(data.results ? data.results : [])
      setNotFound(!data.results)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await handleSearch()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    ;(async function () {
      await handleSearch()
    })()
  }, [])

  if (throwTestError) {
    return <ErrorTestComponent />
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <header>
      <h1>Hallo!</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          onSubmit={() => handleSearch()}
          placeholder="Поиск по имени персонажа"
        />
        <button type="submit">Найти</button>
        <button onClick={() => testError()}>Сделать Ошибку</button>
      </form>

      {notFound && <h2>Не нашол никово прасти пажлауйста)</h2>}
      {characters.length > 0 && (
        <ul className="list">
          {characters.map((character) => (
            <CharacterPreviewCard key={character.id} character={character} />
          ))}
        </ul>
      )}
    </header>
  )
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
