export interface IAuth {
  message: string
  token: string
  refreshToken: string
  userId: string
  name: string
}

export type AuthErrorType = {
  [key: string]: string
}

