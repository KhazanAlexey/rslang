import React from 'react'

export interface PropsType {
  children?: React.ReactNode | React.ReactNode[]
}

const RegistrationPage: React.FC<PropsType> = () => {

  return (
    <>
      <div>Registration Form</div>
      <form></form>
    </>
  )
}

export default RegistrationPage
