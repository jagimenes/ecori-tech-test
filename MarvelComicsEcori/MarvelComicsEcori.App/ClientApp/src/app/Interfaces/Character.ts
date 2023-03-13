export interface IParamsApi {
  name: string | null
  nameStartsWith: string | null
  modifiedSince: string | null
  comics: number | null
  series: number | null
  events: number | null
  stories: number | null
  OrderBy: string | null
  take: number | null
  skip: number | null
}

export interface ICharacterDataRequest {
  code: number
  data: {
    skip: number
    take: number
    total: number
    count: number
    results: ICharacter[]
  }
  status: string
}

export interface ICharacter {
  id: number
  name: string
  description: string
  modified: Date
  resourceURI: string
  comics: IComics
  series: ISeries
  storys: null
  thunbnail: IThunbnail
  urls: IUrls[]
}

interface IComics {
  available: number
  collectionURI: string
  items: IItems[]
  returned: number
}

interface ISeries {
  available: number
  collectionURI: string
  items: IItems[]
  returned: number
}

interface IThunbnail {
  extension: string
  path: string
}

interface IUrls {
  type: string
  url: string
}

interface IItems {
  name: string
  resourceURI: string
}
