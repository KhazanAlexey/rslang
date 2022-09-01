import 'react-app-polyfill/ie11'
import * as React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import { localStorageRemove } from '../../../utils/localStoradre'
import { authApi } from 'src/services/AuthService'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/redux'
import { validateLogin } from './formValidator'
import { authSlice } from '../../../store/reducers/auth/authSlice'

export const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [error, setError] = useState()
  const [login, { isLoading }] = authApi.useLoginMutation()

  const loginHandler = async ({ email, password }) => {
    try {
      await login({ email: email, password: password }).unwrap()
      // navigate('/')
    } catch (e: any) {
      localStorageRemove(['name', 'refreshToken', 'userId', 'token', 'message'])
      dispatch(authSlice.actions.logOut())
      setError(e.error)
      console.log(e)
    }
  }
  const buttonText = isLoading ? 'Loading.........' : 'Submit'

  const formik = useFormik({
    initialValues: {
      password: '123456789qwe',
      email: 'alik@mail.ru',
    },

    onSubmit: (values) => {
      loginHandler({ email: values.email, password: values.password })
    },
    validate: validateLogin,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='email'>Email Address</label>
      <input
        id='email'
        name='email'
        type='email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

      <label htmlFor='password'>password</label>
      <input
        id='password'
        name='password'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password ? <div>{formik.errors.password}</div> : null}

      <button disabled={isLoading} type='submit'>
        {buttonText}
      </button>
      {error && <div>{error}</div>}
    </form>
  )
}
