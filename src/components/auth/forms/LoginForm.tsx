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
import styles from './Form.module.scss'

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
  const buttonText = isLoading ? 'Секунду...' : 'Войти в аккаунт'

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
        <label className={styles.formLabel} htmlFor='email'>E-mail</label>
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
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
        <label className={styles.formLabel} htmlFor='password'>Пароль</label>
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
      </div>
      

      <button className={styles.formSubmit} disabled={isLoading} type='submit'>
        {buttonText}
      </button>
      {error && <div>{error}</div>}
    </form>
  )
}
