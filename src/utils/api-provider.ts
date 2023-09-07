import type { CharacterResult, CharactersApiResponse } from '@/interfaces/api-response'
import axios from 'axios'

const API_URL = 'https://rickandmortyapi.com/api/character'

export const getCharacters = async () => {
  const response = await axios(API_URL)
  return response.data as CharactersApiResponse
}

export const getCharacter = async (id: number) => {
  const response = await axios(`${API_URL}/${id}`)
  return response.data as CharacterResult
}
