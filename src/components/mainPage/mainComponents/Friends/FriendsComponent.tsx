import React from 'react'
import styles from './FriendsComponent.scss'
import { clsx } from '../../../../utils/clsx'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'src/hooks/redux'

const FriendsComponent: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth)

  const statHandler = (e) => {
    e.target.innerText = 'Сначала войдите в аккаунт'
    setTimeout(() => {
      e.target.innerText = 'Проверить статистику'
    }, 2000)
  }
  return (
    <section className={styles.friendsSection}>
      <div className={globalThis.globalStyles.container}>
        <div className={styles.friendsSectionWrapper}>
          <h2 className={styles.friendsSectionHeader}>А что еще есть в Enggo?</h2>
          <ul className={styles.friendsSectionList}>
            <li
              className={clsx({
                [styles.friendsSectionItem]: true,
                [styles.friendsSectionItemLeo]: true,
              })}
            >
              <div className={styles.friendsSectionItemImg}>
                <img src='./assets/svg/leo.svg' alt='Leo' />
              </div>
              <p className={styles.friendsSectionItemText}>
                Львенок Лео - давний друг Ингго и, по совместительству, владелец крутой полноценной
                платформы по изучению английского языка - <a href='https://lingualeo.com'>LinguaLeo</a>
                .
              </p>
              <a href='https://lingualeo.com' rel='nofollow' className={styles.linkButton}>
                Учиться у Лео
              </a>
            </li>
            <li
              className={clsx({
                [styles.friendsSectionItem]: true,
                [styles.friendsSectionItemLeo]: true,
              })}
            >
              <div className={styles.friendsSectionItemImg}>
                <img src='./assets/svg/enggo-hunt.svg' alt='Sack Enggo' />
              </div>
              <p className={styles.friendsSectionItemText}>
                Ингго очень понравились мини-игры “Аудиовызов” и “Спринт” в школе Лео, поэтому Ингго
                решил перенять опыт старшего друга и сделать такие же игры на свой лад.
              </p>
              <Link className={styles.linkButton} to='/games'>
                Сыграть в мини-игры
              </Link>
            </li> 
            <li
              className={clsx({
                [styles.friendsSectionItem]: true,
                [styles.friendsSectionItemLeo]: true,
              })}
            >
              <div className={styles.friendsSectionItemImg}>
                <img src='./assets/svg/enggo-stat.svg' alt='Stats' />
              </div>
              <p className={styles.friendsSectionItemText}>
                Во время обучения, если ты авторизован, Ингго записывает все твои достижения в свой
                журнал и ведет полноценную статистику твоего прогресса!
              </p>
              <Link className={clsx({
                  [styles.linkButton]: true,
                  [styles.linkButtonDisable]: !isAuth
                })}
                title={isAuth ? '' : 'Сначала войдите в аккаунт'}
                to={isAuth ? '/stat' : '#'}
                onClick={(e) => isAuth ? null : statHandler(e)}>
                Проверить статистику
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default FriendsComponent
