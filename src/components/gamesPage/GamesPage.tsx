import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { clsx } from 'src/utils/clsx'
import styles from './GamePage.module.scss'
import { useDispatch } from 'react-redux'
import { audioCallSlice } from '../../store/reducers/audioCallSlice'
import { sprintSlice } from '../../store/reducers/sprintSlice'

const GamesPage: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(audioCallSlice.actions.reset())
    dispatch(sprintSlice.actions.reset())
  }, [])
  return (
    <section className={styles.games}>
      <div className={globalThis.globalStyles.container}>
        <h2 className={styles.gamesTitle}>
          Мини-игры
          <span className={styles.gamesImage}>
            <img src='./assets/svg/enggo-hunt.svg' alt='Поиграй с Ингго' />
          </span>
        </h2>
        <p className={styles.gamesDescr}>
          Иннго обожает играть со своими друзьями, и поэтому подготовил для них несколько игр. А ты
          сможешь бросить вызов Ингго?
        </p>
        <ul className={styles.gamesList}>
          <li className={styles.gamesGame1}>
            <Link to='/games/audiocall' className={styles.game}>
              <p className={styles.gameName}>
                <span>Аудио</span> <span>вызов</span>
              </p>
              <span className={styles.gameGo}>Играть!</span>
              <span className={styles.gameImage}>
                <img src='./assets/png/bg-audiocall.png' alt='Аудиовызов' />
              </span>
            </Link>
          </li>
          <li className={styles.gamesGame2}>
            <Link to='/games/sprint' className={styles.game}>
              <p className={styles.gameName}>
                <span>Спринт</span>
              </p>
              <span className={styles.gameGo}>Играть!</span>
              <span className={styles.gameImage}>
                <img src='./assets/png/bg-sprint.png' alt='Аудиовызов' />
              </span>
            </Link>
          </li>
          <li className={styles.gamesEnggo}>
            <p hidden>Скоро тут появится еще одна игра</p>
            <img
              src='./assets/svg/enggo-games.svg'
              alt='Ингго уже готовит новую игру для своих друзей'
            />
          </li>
        </ul>
      </div>
    </section>
  )
}

export default GamesPage
