import React from 'react'
import { Link } from 'react-router-dom'
import styles from './GamePage.module.scss'

const GamesPage: React.FC<any> = () => {
  return (
    <div className={styles.gamesWrapper}>
      <Link className={styles.game} to='/games/savanna' onClick={() => null}>
        <div>Savanna</div>
      </Link>
      <Link className={styles.game} to='/games/savanna' onClick={() => null}>
        <div>Savanna2</div>
      </Link>
      <Link className={styles.game} to='/games/savanna' onClick={() => null}>
        <div>Savanna3</div>
      </Link>
    </div>
  )
}

export default GamesPage
