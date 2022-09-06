import React from 'react'
import { Link } from 'react-router-dom'
import { clsx } from 'src/utils/clsx'
import styles from './GamePage.module.scss'

const GamesPage: React.FC = () => {
  return (
    <section className={styles.games}>
      <div className={globalThis.globalStyles.container}>
        <div className={styles.gamesHeader}>
          <h2>Мини-игры</h2>
          <p>Ингго любит поиграть! Го вместе!</p>
        </div>
        <div className={styles.gamesWrapper}>
          <div className={styles.gamesGame1}>
            <Link to='/games/audiocall'>
              <div className={styles.game}>
                <img src='./assets/png/bg-audiocall.png' alt='Аудиовызов' />
                <div className={styles.gameName}>Аудиовызов</div>
              </div>
            </Link>
          </div>
          <div className={styles.gamesGame2}>
            <Link to='/games/sprint'>
              <div className={styles.game}>
                <img src='./assets/png/bg-sprint.png' alt='Аудиовызов' />
                <div className={styles.gameName}>Спринт</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GamesPage
