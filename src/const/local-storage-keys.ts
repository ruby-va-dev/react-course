const MAIN_QUERY_SEARCH_STRING = 'RubyAPP:MAIN_QUERY_SEARCH_STRING'

export const setMainQuerySearchStringToStorage = (query: string) => {
  localStorage.setItem(MAIN_QUERY_SEARCH_STRING, query)
}

export const getMainQuerySearchStringfromStorage = () => {
  return localStorage.getItem(MAIN_QUERY_SEARCH_STRING) || ''
}
