export const MAIN_QUERY_SEARCH_STRING = 'RubyAPP:MAIN_QUERY_SEARCH_STRING'

export const getKeyFromLocalStorage = (key) => {
  return localStorage.getItem(key) || ''
}

export const setKeyToLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}
