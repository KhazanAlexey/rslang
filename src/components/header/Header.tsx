import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

const Header: React.FC<any> = () => {
  return (
    <ul className={styles.header}>
      <Link to='/' onClick={() => null}>
        <li className={styles.headerItem}>Главная</li>
      </Link>
      <Link to='/textbook' onClick={() => null}>
        <li className={styles.headerItem}>Учебник</li>
      </Link>
      <Link to='/games' onClick={() => null}>
        <li className={styles.headerItem}>Games</li>
      </Link>
      <Link to='/login' onClick={() => null}>
        <li className={styles.headerItem}>Login</li>
      </Link>
      <div className={styles.test}>SVG_TEST_BACKGROUDIMAGE</div>
    </ul>
  )
}

export default Header
