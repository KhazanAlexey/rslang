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
import { authApi } from '../../../services/AuthService'
import styles from './Form.module.scss'
import { authSlice } from '../../../store/reducers/authSlice'

type PropsType = {
  setIsAuthModal: (_: string) => void
}

export const RegisterForm = ({ setIsAuthModal }: PropsType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [error, setError] = useState()

  const [createUser, { isLoading }] = userAPI.useCreateUserMutation()
  const [login] = authApi.useLoginMutation()

  const buttonText = isLoading ? 'Создаем аккаунт...' : 'Поехали учиться!'

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
      setIsAuthModal('')
      console.log(createdUser)
      // navigate('/')
    } catch (e: any) {
      setError(e.data)
      console.log(e)
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
      name: '',
      passwordConfirm: '',
    },

    onSubmit: (values: IUserForm) => {
      registerHandler({ email: values.email, password: values.password, name: values.name })
    },
    validate: validateRegister,
  })

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.formGroup}>
        <input
          className={styles.formInput}
          placeholder='Введи своё имя'
          id='name'
          name='name'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label className={styles.formLabel} htmlFor='name'>
          Как тебя зовут?
        </label>
        {formik.errors.name ? <p className={styles.formError}>{formik.errors.name}</p> : null}
      </div>

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
          Адрес для писем от Enggo
        </label>
        {formik.errors.email ? <p className={styles.formError}>{formik.errors.email}</p> : null}
      </div>

      <div className={styles.formGroup}>
        <input
          className={styles.formInput}
          placeholder='Введи надежный пароль'
          id='password'
          name='password'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label className={styles.formLabel} htmlFor='password'>
          Придумай себе пароль
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

      <button className={styles.formSubmit} disabled={isLoading} type='submit'>
        {buttonText}
      </button>
      {error && <div>{error}</div>}
    </form>
  )
}
