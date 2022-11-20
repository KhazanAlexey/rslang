import React from 'react'
import { clsx } from 'src/utils/clsx'
import styles from './AuthModal.module.scss'
import { LoginForm } from './forms/LoginForm'
import { RegisterForm } from './forms/RegisterForm'
import { SettingsForm } from './forms/SettingsForm'

export interface PropsType {
  isAuthModal: string
  setIsAuthModal: React.Dispatch<string>
  children?: React.ReactNode | React.ReactNode[]
}

const AuthModal: React.FC<PropsType> = (props) => {
  const { isAuthModal, setIsAuthModal } = props

  const authState = ['login', 'register', 'settings', '']
  const authHello = [
    {
      title: 'Вход в Enggo',
      subtitle: 'Привет!',
      text: 'Enggo тебя уже заждался, скорее заходи!',
    },
    {
      title: 'Регистрация',
      subtitle: 'Привет, незнакомец!',
      text: 'Давай заведем тебе аккаунт, чтобы ты мог пользоваться всеми возможностями Enggo!',
    },
    {
      title: 'Настройки',
      subtitle: '',
      text: '',
    },
    {
      title: '',
      subtitle: '',
      text: '',
    },
  ]
  const authText = authHello[authState.indexOf(isAuthModal)] ?? authHello[0]
  return (
    <>
      <div
        className={clsx({
          [styles.auth]: true,
          [styles.authOpen]: !!isAuthModal,
        })}
        onClick={() => setIsAuthModal('')}
      >
        <div className={globalThis.globalStyles.container}>
          <div className={styles.authWrapper} onClick={(e) => e.stopPropagation()}>
            <div className={styles.authHeader}>
              <p className={styles.authTitle}>{authText.title}</p>
              <button className={styles.authClose} onClick={() => setIsAuthModal('')}></button>
            </div>
            <p className={styles.authSubtitle}>{authText.subtitle}</p>
            <p className={styles.authText}>{authText.text}</p>
            {isAuthModal == 'login' && <LoginForm setIsAuthModal={setIsAuthModal} />}
            {isAuthModal == 'register' && <RegisterForm setIsAuthModal={setIsAuthModal} />}
            {isAuthModal == 'settings' && <SettingsForm setIsAuthModal={setIsAuthModal} />}
            {isAuthModal == 'login' && (
              <p className={styles.authOptionalText}>
                Еще нет аккаунта? Не беда!{' '}
                <button className={styles.authLink} onClick={() => setIsAuthModal('register')}>
                  Зарегистрироваться в Enggo
                </button>
              </p>
            )}
            {isAuthModal == 'settings' && (
              <p className={styles.authOptionalText}>Enggo будет скучать...</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthModal
