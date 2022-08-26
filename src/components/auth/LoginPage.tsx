import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../services/AuthService'
import Button from '../common/button/Button'
import { useAppSelector } from '../../hooks/redux'
import { localStorageRemove } from '../../utils/localStoradre'

export interface PropsType {
  children?: React.ReactNode | React.ReactNode[]
}

const LoginPage: React.FC<PropsType> = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<any>()

  const [login, { isLoading, data }] = authApi.useLoginMutation()

  const loginHandler = async () => {
    try {
      await login({ email: 'alik@mail.ru', password: '123456789qwe' }).unwrap()
    } catch (e) {
      localStorageRemove(['name', 'refreshToken', 'userId', 'token', 'message'])
      setError(e)
      console.log(e)
    }
  }
  const { token } = useAppSelector((state) => state.auth)
  console.log(token)
  data && console.log(data.token)

  return (
    <>
      <Button text='login' onClick={loginHandler} />
      {isLoading && <div>loading</div>}
      {error && <div>{error}</div>}
      <div>Login PAge</div>
      <Link to='/registration' onClick={() => null}>
        <li>Registration</li>
      </Link>
    </>
  )
}

export default LoginPage
