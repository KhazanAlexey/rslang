import { IWord } from './IWord'

export interface IUsersWords {
  wordId: string
  difficulty?: 'hard' | 'completed' | 'learn'
  // optional?: IUsersWordsOptional
  optional?: IUsersWordsOptional
}

export interface IAggreratedWords {
  paginatedResults: Array<Omit<IWord, 'id'> & {_id:string}>
  totalCount: {count: number}[]
}

export interface IUsersWordsOptional {
  attempts?: number
  successAttempts?: number
  learned?: boolean
  // history?: IDateStat[]
  history?: string
}

export interface IDateStat {
  date: string
  gamesStat: {
    audioCall: IStatGame
    sprint: IStatGame
  }
}

interface IStatGame {
  attempts: number
  successAttempts: number
  maxSeries: number
}

export interface IPostUsersWord extends IUsersWords {
  id: string
  wordId: string
}

export interface IDeleteUsersWord {
  id: string
  wordId: string
}
