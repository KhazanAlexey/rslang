import React from 'react'
import { clsx } from 'src/utils/clsx'
import styles from './AuthModal.module.scss'
import { LoginForm } from './forms/LoginForm'
import { RegisterForm } from './forms/RegisterForm'

export interface PropsType {
  isAuthModal: string
  setIsAuthModal: any
  children?: React.ReactNode | React.ReactNode[]
}

const AuthModal: React.FC<PropsType> = (props) => {
  const { isAuthModal, setIsAuthModal } = props;
  return (
    <>
      <div className={clsx({
        [styles.auth]: true,
        [styles.authOpen]: !!isAuthModal
      })}>
        <div className={globalThis.globalStyles.container}>
          <div className={styles.authWrapper}>
            {isAuthModal == 'login' && <LoginForm />}
            {isAuthModal == 'register' && <RegisterForm />}
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthModal