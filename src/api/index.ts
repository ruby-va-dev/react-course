const BASE_URL = 'https://rickandmortyapi.com/api/'

export const getCharacters = async (name = '') => {
  let searchString = `${BASE_URL}character/`
  if (name != '') {
    searchString += `?name=${name}`
  }
  const response: Response = await new Promise((resolve) => {
    setTimeout(async () => {
      const res = await fetch(searchString)
      resolve(res)
    }, 500)
  })

  const data = await response.json()
  return data
}
