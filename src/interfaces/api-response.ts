export interface CharactersApiResponse {
  info: Info
  results: CharacterResult[]
}

export interface Info {
  count: number
  pages: number
  next: string
  prev: any
}

export interface CharacterResult {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Origin {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}

export interface EpisodeApiResponse {
    id: number
    name: string
    air_date: string
    episode: string
    characters: string[]
    url: string
    created: string
  }
  