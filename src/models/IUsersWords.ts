export interface IUsersWords {
  wordId: string
  difficulty: 'hard' | 'easy'
  optional: IUsersWordsOptional
}

export interface IUsersWordsOptional {
  attempts?: number
  successAttempts?: number
  learned?: boolean
}

export interface IPostUsersWord extends IUsersWords {
  id: string
  wordId: string
}

export interface IDeleteUsersWord {
  id: string
  wordId: string
}
