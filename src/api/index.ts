const BASE_URL = 'https://rickandmortyapi.com/api/'

export const getCharacters = async (name = '') => {
  let searchString = `${BASE_URL}character/`
  if (name != '') {
    searchString += `?name=${name}`
  }
  const response = await fetch(searchString)
  const data = await response.json()

  return data
}
