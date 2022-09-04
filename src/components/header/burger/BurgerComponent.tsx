import React from 'react'
import { NavLink } from 'react-router-dom'
import { clsx } from 'src/utils/clsx'
import styles from './BurgerComponent.scss'

interface BurgerProps {
  burger: React.ReactNode
  setBurger: (value:boolean) => void
}

export default function BurgerComponent({setBurger, burger}: BurgerProps) {

  return (
    <div className={clsx({
      [styles.burger]:true,
      [styles.burgerOpen]: !!burger
    })}
      onClick={() => setBurger(false)}> 
      <div className={globalThis.globalStyles.container}>
        <div className={styles.burgerWrapper} onClick={(e) => e.stopPropagation()}>
          <div className={styles.burgerHeader}>
            <h2>Меню</h2>
            <button 
              className={clsx({
                [styles.headerBurger]:true,
                [styles.headerBurgerRotated]: !!burger,
              })} 
              onClick={() => setBurger(false)}
            >
              <span></span>
            </button>
          </div>
          <div className={styles.burgerContents}>
            <nav className={styles.burgerNav}>
              <ul className={styles.burgerList}>
                <li className={styles.burgerItem}>
                  <NavLink
                    to='/'
                    className={({ isActive }) => (isActive ? styles.itemActive : '')}
                    onClick={() => setBurger(false)}
                  >
                    Главная страница
                  </NavLink>
                </li>
                <li className={styles.burgerItem}>
                  <NavLink
                    to='/textbook'
                    className={({ isActive }) => (isActive ? styles.itemActive : '')}
                    onClick={() => setBurger(false)}
                  >
                    Учебник
                  </NavLink>
                </li>
                <li className={styles.burgerItem}>
                  <NavLink
                    to='/games'
                    className={({ isActive }) => (isActive ? styles.itemActive : '')}
                    onClick={() => setBurger(false)}
                  >
                    Мини-игры
                  </NavLink>
                </li>
                <li className={styles.burgerItem}>
                  <NavLink
                    to='/stat'
                    className={({ isActive }) => (isActive ? styles.itemActive : '')}
                    onClick={() => setBurger(false)}
                  >
                    Статистика
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className={styles.burgerDog}>
              <div className={styles.dogWrapper}>
                <img src='./assets/svg/enggo.svg' alt='The dog Enggo' />
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
