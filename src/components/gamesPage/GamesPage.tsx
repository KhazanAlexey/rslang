import React from 'react'
import { Link } from 'react-router-dom'
import styles from './GamePage.module.scss'

const GamesPage: React.FC<any> = () => {
  return (
    <div className={styles.gamesWrapper}>
      <Link className={styles.game} to='/games/audiocall' onClick={() => null}>
        <div>AudioCall</div>
      </Link>
      <Link className={styles.game} to='/games/sprint' onClick={() => null}>
        <div>Sprint</div>
      </Link>
    </div>
  )
}

export default GamesPage
