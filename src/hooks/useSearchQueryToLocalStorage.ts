import { useState } from 'react'
import {
  getKeyFromLocalStorage,
  setKeyToLocalStorage,
} from '@/src/const/local-storage-keys.ts'

export function useSearchQueryToLocalStorage(key) {
  const [searchQuery, setSearchQuery] = useState(getKeyFromLocalStorage(key))

  const setQueryToLocalStorage = (value) => {
    setKeyToLocalStorage(key, value)
  }

  return { searchQuery, setSearchQuery, setQueryToLocalStorage }
}
