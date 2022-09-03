export interface IUsersWords {
  difficulty: 'hard' | 'easy'
  optional: IUsersWordsOptional
}

export interface IUsersWordsOptional {
  attempts: number
  successAttempts: number
}

export interface IPostUsersWord extends IUsersWords {
  id: string
  wordId: string
}
