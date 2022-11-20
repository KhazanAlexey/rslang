import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { clsx } from 'src/utils/clsx'
import styles from './Header.module.scss'
import { userAPI } from '../../services/UserService'
import { useAppSelector } from '../../hooks/redux'
import AuthModal from '../auth/AuthModal'
import BurgerComponent from './burger/BurgerComponent'
import { userWordsAPI } from '../../services/UsersWordsService'

const Header = () => {
  const [isAuthModal, setIsAuthModal] = useState('')
  const [burger, setBurger] = useState(false)
  const [skip, setSkip] = useState(true)

  const { isAuth, name: userName } = useAppSelector((state) => state.auth)
  const id = localStorage.getItem('userId') || ''
  const { data, error, isLoading } = userAPI.useFetchUserQuery(id)
  const { data: hardW } = userWordsAPI.useFetchUserWordsQuery(id, { skip })
  useEffect(() => {
    if (isAuth) setSkip(false)
  }, [isAuth])
  return (
    <header className={styles.header}>
      <div className={globalThis.globalStyles.container}>
        <div className={styles.headerWrapper}>
          <BurgerComponent burger={burger} setBurger={setBurger} />
          <Link
            to='/'
            className={clsx({
              [styles.headerLogo]: true,
              [styles.optionalBg]: true,
              ['_icon-logo']: true,
            })}
            onClick={() => null}
          ></Link>
          <nav className={styles.headerNav}>
            <ul
              className={clsx({
                [styles.headerList]: true,
                [styles.optionalBg]: true,
              })}
            >
              <li className={styles.headerItem}>
                <NavLink
                  to='/textbook'
                  className={({ isActive }) => (isActive ? styles.itemActive : '')}
                  onClick={() => null}
                >
                  Учебник
                </NavLink>
              </li>
              <li className={styles.headerItem}>
                <NavLink
                  to='/games'
                  className={({ isActive }) => (isActive ? styles.itemActive : '')}
                  onClick={() => null}
                >
                  Мини-игры
                </NavLink>
              </li>
              <li className={styles.headerItem}>
                <NavLink
                  to={!isAuth ? '#' : '/stat'}
                  title={!isAuth ? 'Войдите в аккаунт для просмотра статистики' : ''}
                  className={({ isActive }) =>
                    clsx({
                      [styles.itemActive]: isActive,
                      [styles.itemDisable]: !isAuth,
                    })
                  }
                  onClick={() => (isAuth ? null : setIsAuthModal('login'))}
                >
                  Статистика
                </NavLink>
              </li>
            </ul>
          </nav>
          {!isAuth ? (
            <div
              className={clsx({
                [styles.headerAuth]: true,
                [styles.optionalBg]: true,
              })}
            >
              <button className={styles.authLogin} onClick={() => setIsAuthModal('login')}>
                Вход
              </button>
              <button className={styles.authRegister} onClick={() => setIsAuthModal('register')}>
                Регистрация
              </button>
            </div>
          ) : (
            <button
              className={clsx({
                [styles.headerUsername]: true,
                [styles.optionalBg]: true,
                ['_icon-settings']: true,
              })}
              onClick={() => setIsAuthModal('settings')}
            >
              {userName}
            </button>
          )}
          <button
            className={clsx({
              [styles.headerUser]: true,
              [styles.optionalBg]: true,
              ['_icon-user']: !isAuth,
              ['_icon-settings']: isAuth,
            })}
            onClick={() => (isAuth ? setIsAuthModal('settings') : setIsAuthModal('login'))}
          ></button>
          <button
            className={clsx({
              [styles.headerBurger]: true,
              [styles.optionalBg]: true,
              [styles.headerBurgerRotated]: !!burger,
            })}
            onClick={() => setBurger(true)}
          >
            <span></span>
          </button>
          <AuthModal isAuthModal={isAuthModal} setIsAuthModal={setIsAuthModal} />
        </div>
      </div>
    </header>
  )
}

export default Header
