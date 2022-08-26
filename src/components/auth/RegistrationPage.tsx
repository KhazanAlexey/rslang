import React from 'react'
import { authApi } from '../../services/AuthService'
import Button from '../common/button/Button'
import { useAppSelector } from '../../hooks/redux'
import { userAPI } from '../../services/UserService'

export interface PropsType {
  children?: React.ReactNode | React.ReactNode[]
}

const RegistrationPage: React.FC<PropsType> = () => {
  const [createUser,{isLoading,error,isSuccess}]=userAPI.useCreateUserMutation()
  const registerHandler = async () => {
    try {
      const createdUser=await createUser({ email: 'emaawqik@mail.ru', password: '123456789qwe' }).unwrap()
      console.log(createdUser)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <div>Registration Form</div>
      <form>{JSON.stringify(error)}</form>
      {isSuccess&&<div>REgistration success</div>}
      {isLoading && <div>loading</div>}
      <Button text='Register' onClick={registerHandler} />
    </>
  )
}

export default RegistrationPage
