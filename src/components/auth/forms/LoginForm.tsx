import 'react-app-polyfill/ie11'
import * as React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import { localStorageRemove } from '../../../utils/localStorage'
import { authApi } from 'src/services/AuthService'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/redux'
import { validateLogin } from './formValidator'
import styles from './Form.module.scss'
import { authSlice } from 'src/store/reducers/authSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

type PropsType = {
  setIsAuthModal: (v: string) => void
}

export const LoginForm = (props: PropsType) => {
  const { setIsAuthModal } = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string>()
  const [login, { isLoading }] = authApi.useLoginMutation()

  const loginHandler = async ({ email, password }) => {
    try {
      await login({ email: email, password: password }).unwrap()
      setIsAuthModal('')
      // navigate('/')
    } catch (e) {
      localStorageRemove(['name', 'refreshToken', 'userId', 'token', 'message'])
      dispatch(authSlice.actions.logOut())
      setError(e as string)
      // console.log(e)
    }
  }
  const buttonText = isLoading ? 'Секунду...' : 'Войти в аккаунт'

  const formik = useFormik({
    initialValues: {
      password: '', // 123456789qwe
      email: '', // alik@mail.ru
    },

    onSubmit: (values) => {
      loginHandler({ email: values.email, password: values.password })
    },
    validate: validateLogin,
  })

  return (
    <>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.formGroup}>
          <input
            className={styles.formInput}
            placeholder='Введи свой E-mail'
            id='email'
            name='email'
            type='email'
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <label className={styles.formLabel} htmlFor='email'>
            E-mail
          </label>
          {formik.errors.email ? <p className={styles.formError}>{formik.errors.email}</p> : null}
        </div>

        <div className={styles.formGroup}>
          <input
            className={styles.formInput}
            placeholder='Введи свой пароль'
            id='password'
            name='password'
            type='password'
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <label className={styles.formLabel} htmlFor='password'>
            Пароль
          </label>
          {formik.errors.password ? (
            <p className={styles.formError}>{formik.errors.password}</p>
          ) : null}
        </div>

        <button className={styles.formSubmit} disabled={isLoading} type='submit'>
          {buttonText}
        </button>
        {error && <div>{error}</div>}
      </form>
    </>
  )
}
