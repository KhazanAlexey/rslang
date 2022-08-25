import React from 'react'
import { Link } from 'react-router-dom'

export interface PropsType {
  children?: React.ReactNode | React.ReactNode[]
}

const LoginPage: React.FC<PropsType> = () => {
  return (
    <>
      <div>Login PAge</div>
      <Link to='/registration' onClick={() => null}>
        <li>Registration</li>
      </Link>
    </>
  )
}

export default LoginPage
