import 'react-app-polyfill/ie11'
import * as React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import { localStorageRemove } from '../../../utils/localStoradre'
import { authApi } from 'src/services/AuthService'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/redux'
import { validateLogin } from './formValidator'
import { authSlice } from '../../../store/reducers/authSlice'
import styles from './Form.module.scss'
import { userAPI } from 'src/services/UserService'

type PropsType = {
  setIsAuthModal: (_: string) => void
}

export const SettingsForm = ({ setIsAuthModal }: PropsType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string>()
  const [login, { isLoading: isLoginngIn }] = authApi.useLoginMutation()
  const [updateUser, { isLoading }] = userAPI.useCreateUserMutation()

  const updateHandler = async ({ name, email, password }) => {
    localStorageRemove(['name', 'refreshToken', 'userId', 'token', 'message'])
    dispatch(authSlice.actions.logOut())
    try {
      const updated = updateUser({ name, email, password }).unwrap()
      await login({ email, password }).unwrap()
      setIsAuthModal('')
    } catch (e: { data: string } | unknown) {
      e && setError(e as string)
      console.error(`ERROR UPDATING USER: ${e as string}`)
    }
  }

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
  const buttonText = isLoginngIn ? 'Выходим...' : 'Выйти из аккаунта'

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },

    onSubmit: (values) => {
      localStorageRemove(['name', 'refreshToken', 'userId', 'token', 'message'])
      dispatch(authSlice.actions.logOut())
      setIsAuthModal('')
      // loginHandler({ email: values.email, password: values.password })
    },
    // validate: validateLogin,
  })

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      {/* <div className={styles.formGroup}>
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
        <label className={styles.formLabel} htmlFor='password'>Пароль</label>
        {formik.errors.password ? <p className={styles.formError}>{formik.errors.password}</p> : null}
      </div> */}

      <button className={styles.formSubmit} disabled={isLoading} type='submit'>
        {buttonText}
      </button>
      {error && <div>{error}</div>}
    </form>
  )
}
