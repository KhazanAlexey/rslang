import 'react-app-polyfill/ie11'
import * as React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/redux'
import { validateRegister } from './formValidator'
import { userAPI } from '../../../services/UserService'
import { IUserForm } from '../../../models/IUser'
import { localStorageRemove } from 'src/utils/localStoradre'
import { authSlice } from 'src/store/reducers/auth/AuthSlice'
import { authApi } from '../../../services/AuthService'

export const RegisterForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [error, setError] = useState()

  const [createUser, { isLoading }] = userAPI.useCreateUserMutation()
  const [login] = authApi.useLoginMutation()

  const buttonText = isLoading ? 'Loading.........' : 'Submit'

  const registerHandler = async ({ email, name, password }) => {
    localStorageRemove(['name', 'refreshToken', 'userId', 'token', 'message'])
    dispatch(authSlice.actions.logOut())
    try {
      const createdUser = await createUser({
        email,
        name,
        password,
      }).unwrap()
      await login({ email: email, password: password })
      console.log(createdUser)
      // navigate('/')
    } catch (e: any) {
      setError(e.data)
      console.log(e)
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '123456789qwe',
      email: 'alik@mail.ru',
      name: 'user_name',
      passwordConfirm: '123456789qwe',
    },

    onSubmit: (values: IUserForm) => {
      registerHandler({ email: values.email, password: values.password, name: values.name })
    },
    validate: validateRegister,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='email'>Email Address</label>
      <input
        id='name'
        name='name'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.name}
      />

      {formik.errors.email ? <div>{formik.errors.email}</div> : null}
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

      <label htmlFor='passwordConfirm'>passwordConfirm</label>
      <input
        id='passwordConfirm'
        name='passwordConfirm'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.passwordConfirm}
      />
      {formik.errors.passwordConfirm ? <div>{formik.errors.passwordConfirm}</div> : null}

      <button disabled={isLoading} type='submit'>
        {buttonText}
      </button>
      {error && <div>{error}</div>}
    </form>
  )
}
