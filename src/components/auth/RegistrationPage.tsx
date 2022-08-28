import React from 'react'
import { RegisterForm } from './forms/RegisterForm'

export interface PropsType {
  children?: React.ReactNode | React.ReactNode[]
}

const RegistrationPage: React.FC<PropsType> = () => {
  return (
    <>
      <div>Registration Form</div>
      <RegisterForm />
    </>
  )
}

export default RegistrationPage
