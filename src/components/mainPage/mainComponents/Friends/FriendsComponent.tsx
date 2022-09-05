import React from 'react'
import styles from './FriendsComponent.scss'
import { clsx } from '../../../../utils/clsx'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'src/hooks/redux'

const FriendsComponent: React.FC<any> = () => {
  const { isAuth } = useAppSelector((state) => state.auth)
  return (
    <section className={styles.friendsSection}>
      <div className={globalThis.globalStyles.container}>
        <div className={clsx({ [styles.friendsSectionWrapper]: true })}>
          <h2 className={styles.friendsSectionHeader}>А что еще есть в Enggo?</h2>
          <div className={clsx({ 
            [styles.friendsSectionItem]: true,
            [styles.friendsSectionItemLeo]: true
          })}>
            <div className={styles.friendsSectionItemImg}>
              <img src="./assets/svg/leo.svg" alt="Leo" />
            </div>            
            <p className={styles.friendsSectionItemText}>
              Львенок Лео - давний друг Ингго и, по совместительству, владелец 
              крутой полноценной платформы по изучению английского языка - 
              <a href="https://lingualeo.com">LinguaLeo</a>. 
            </p>
            <div className={styles.friendsSectionActionBtn}>
              <a 
                className={styles.linkButton}
                href='https://lingualeo.com'
                rel='nofollow'
              >Учиться у Лео</a>
            </div>
          </div>
          <div className={clsx({ 
            [styles.friendsSectionItem]: true,
            [styles.friendsSectionItemLeo]: true
          })}>
            <div className={styles.friendsSectionItemImg}>
              <img src="./assets/svg/enggo-hunt.svg" alt="Sack Enggo" />
            </div>            
            <p className={styles.friendsSectionItemText}>
              Ингго очень понравились мини-игры “Аудиовызов” и “Спринт” в школе Лео, поэтому Ингго 
              решил перенять опыт старшего друга и сделать такие же игры на свой лад.              
            </p>
            <div className={styles.friendsSectionActionBtn}>
              <Link 
                className={styles.linkButton}
                to='/games'
              >Сыграть в мини-игры</Link>
            </div>
          </div>
          {isAuth &&
          <div className={clsx({ 
            [styles.friendsSectionItem]: true,
            [styles.friendsSectionItemLeo]: true
          })}>
            <div className={styles.friendsSectionItemImg}>
              <img src="./assets/svg/enggo-stat.svg" alt="Stats" />
            </div>
            <p className={styles.friendsSectionItemText}>
            Во время обучения, если ты авторизован, Ингго записывает все твои достижения в свой журнал 
            и ведет полноценную статистику твоего прогресса! 
            </p>
            <div className={styles.friendsSectionActionBtn}>
            <Link 
                className={styles.linkButton}
                to='/stat'
              >Проверить статистику</Link>
            </div>
          </div>
          } 
        </div>
      </div>
    </section>
  )
}

export default FriendsComponent
