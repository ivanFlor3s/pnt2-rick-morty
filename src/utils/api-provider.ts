import type { CharacterResult, CharactersApiResponse, EpisodeApiResponse } from '@/interfaces/api-response'
import axios from 'axios'

const API_URL = 'https://rickandmortyapi.com/api'

export const getCharacters = async () => {
  const response = await axios( `${API_URL}/character`)
  return response.data as CharactersApiResponse
}

export const getCharacter = async (id: number) => {
  const response = await axios(`${API_URL}/character/${id}`)
  return response.data as CharacterResult
}

export const getEpisode = async (id: number) => {
  const response = await axios(`${API_URL}/episode/${id}`)
  return response.data as EpisodeApiResponse
}
