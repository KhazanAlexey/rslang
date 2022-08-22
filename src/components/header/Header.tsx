import React from 'react'
// @ts-ignore
import styles from './Header.module.scss'

const Header: React.FC<any> = () => {
  return (
    <div className={styles.header}>
      Header
      <div className={styles.test}>s</div>
    </div>
  )
}

export default Header
