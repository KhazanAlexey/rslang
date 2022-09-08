import 'react-app-polyfill/ie11'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { localStorageGet, localStorageRemove, localStorageSet } from '../../../utils/localStoradre'
import { authApi } from 'src/services/AuthService'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { validateUpdate } from './formValidator'
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
  const [settings, setSettings] = useState<boolean>(false)
  const [isLoggingOut, setILoggingOut] = useState<boolean>(false)
  const { name: currentName, email: currentEmail } = useAppSelector((state) => state.auth)
  const currentId = localStorageGet(['userId'])
  // const [login, { isLoading: isLoginngIn }] = authApi.useLoginMutation()
  const [updateUser, { isLoading: isUpdating }] = userAPI.useCreateUserMutation()

  const toggleSettings = () => {
    setSettings((prev) => !prev)
  }

  const updateHandler = async ({ id, email, password }) => {
    try {
      const updated = await updateUser({ id, email, password }).unwrap()
      localStorageRemove(['name', 'refreshToken', 'userId', 'token', 'message'])
      setIsAuthModal('login')
    } catch {
      setError('error updating user')
      console.error('ERROR UPDATING USER')
    }
  }

  const logOutHandler = async () => {
    setILoggingOut(true)
    localStorageRemove(['name', 'refreshToken', 'userId', 'token', 'message'])
    dispatch(authSlice.actions.logOut())
    setILoggingOut(false)
    setIsAuthModal('')
    navigate('/')
  }

  const button1Text = isUpdating ? 'Обновляем...' : 'Изменить'

  const button2Text = isLoggingOut ? 'Ожидаем...' : 'Выйти из аккаунта'

  const formik = useFormik({
    initialValues: {
      name: currentName,
      email: currentEmail,
      password: '',
      passwordConfirm: '',
    },

    onSubmit: async (values) => {
      const newValues = {
        id: currentId,
        name: values.name,
        email: values.email,
        password: values.password,
      }
      await updateHandler(newValues)

      setIsAuthModal('')
    },
    validate: validateUpdate,
  })

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.formGroup}>
        <h2>{currentName}, измени настройки</h2>
        {!settings && (
          <button className={styles.formSubmit} onClick={toggleSettings}>
            Изменить настройки
          </button>
        )}
      </div>
      {settings && (
        <>
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
              Почта / логин
            </label>
            {formik.errors.email ? <p className={styles.formError}>{formik.errors.email}</p> : null}
          </div>

          <div className={styles.formGroup}>
            <input
              className={styles.formInput}
              placeholder='Введи Свой пароль'
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

          <div className={styles.formGroup}>
            <input
              className={styles.formInput}
              placeholder='Чтобы точно его не забыть'
              id='passwordConfirm'
              name='passwordConfirm'
              type='password'
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
            />
            <label className={styles.formLabel} htmlFor='passwordConfirm'>
              Повтори пароль
            </label>
            {formik.errors.passwordConfirm ? (
              <p className={styles.formError}>{formik.errors.passwordConfirm}</p>
            ) : null}
          </div>

          <button className={styles.formSubmit} disabled={isUpdating} type='submit'>
            {button1Text}
          </button>
        </>
      )}
      <button className={styles.formSubmit} disabled={isLoggingOut} onClick={logOutHandler}>
        {button2Text}
      </button>
      {error && <div>{error}</div>}
    </form>
  )
}
