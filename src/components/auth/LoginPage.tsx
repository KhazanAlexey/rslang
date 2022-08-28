import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from './forms/LoginForm'

export interface PropsType {
  children?: React.ReactNode | React.ReactNode[]
}

const LoginPage: React.FC<PropsType> = () => {
  return (
    <>
      <div>Login PAge</div>

      <LoginForm />
      <Link to='/registration' onClick={() => null}>
        <li>Я хочу зарегистрироваться</li>
      </Link>
    </>
  )
}

export default LoginPage
