export interface IUser {
  id?: string
  name: string
  email: string
  password: string
}

export interface IUserResp {
  name?: string
  email: string
  password: string
}

export interface IUser2 {
  id?: string
  name?: string
  email: string
  password: string
}

export interface IUserForm {
  passwordConfirm?: string
  name?: string
  email: string
  password: string
}
