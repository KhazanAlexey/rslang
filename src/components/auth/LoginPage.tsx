import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../services/AuthService'
import Button from '../common/button/Button'
import { useAppSelector } from '../../hooks/redux'

export interface PropsType {
  children?: React.ReactNode | React.ReactNode[]
}

const LoginPage: React.FC<PropsType> = () => {
  const navigate = useNavigate()

  const [login, { isLoading }] = authApi.useLoginMutation()

  const loginHandler = async () => {
    try {
      await login({ email: 'emaawqik@mail.ru', password: '123456789qwe' }).unwrap()

    } catch (e) {
      console.log(e)
    }
  }
  const { token } = useAppSelector((state) => state.auth)
  console.log(token)
  return (
    <>
      <Button text='login' onClick={loginHandler} />
      {isLoading && <div>loading</div>}
      <div>Login PAge</div>
      <Link to='/registration' onClick={() => null}>
        <li>Registration</li>
      </Link>
    </>
  )
}

export default LoginPage
