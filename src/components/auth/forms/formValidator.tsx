import 'react-app-polyfill/ie11'
import React from 'react'
import { IUserForm } from 'src/models/IUser'

export const validateLogin = (values: IUserForm) => {
  const errors: Record<string, string> = {}

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

export const validateRegister = (values: IUserForm) => {
  const errors: Record<string, string> = {}

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more'
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
