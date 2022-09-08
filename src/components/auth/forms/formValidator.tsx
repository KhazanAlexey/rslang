import 'react-app-polyfill/ie11'
import * as React from 'react'
import { IUserForm } from 'src/models/IUser'
import { AuthErrorType } from 'src/models/IAuth'

export const validateLogin = (values: IUserForm) => {
  const errors: AuthErrorType = {}

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 3) {
    errors.password = 'Must be 3 characters or more'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

export const validateRegister = (values: IUserForm) => {
  const errors: AuthErrorType = {}

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 3) {
    errors.password = 'Must be 3 characters or more'
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required'
  } else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Password not the same'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.name) {
    errors.email = 'Required'
  }
  return errors
}

export const validateUpdate = (values: IUserForm) => {
  const errors: AuthErrorType = {}

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 3) {
    errors.password = 'Must be 3 characters or more'
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required'
  } else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Password not the same'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}
