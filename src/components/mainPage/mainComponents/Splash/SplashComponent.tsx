import React from 'react'
import styles from './SplashComponent.scss'
import { clsx } from '../../../../utils/clsx'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from 'src/hooks/redux'
import ButtonCustom from 'src/components/common/button/Button'

const SplashComponent: React.FC<any> = () => {
  const { isAuth, name: userName } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  return (
    <section className={styles.mainSection}>
      <div className={globalThis.globalStyles.container}>
        <div className={clsx({ [styles.mainSectionWrapper]: true })}>
          <div className={styles.introText}>
            {!isAuth ? (
              <>
                <h1 className={styles.introTextHeader}>
                  Устал откладывать английский на&nbsp;потом?
                </h1>
                <h2 className={styles.introTextSubheader}>Попробуй поучить слова с Enggo!</h2>
                <p className={styles.introTextContent}>
                  Ты не успеешь заметить, как выучишь почти 4000 английских слов, занимаясь всего по
                  20 минут* в день
                </p>
                <blockquote className={styles.introTextQuote}>
                  * - минимально рекомендуемая норма времени ежедневного обучения в Enggo
                </blockquote>
              </>
            ) : (
              <>
                <h1 className={styles.introTextHeader}>Давно не виделись, {userName}!</h1>
                <h2 className={styles.introTextSubheader}>Продолжим учиться?</h2>
                <p className={styles.introTextContent}>
                  Кстати, не забывай проверять
                  <Link to='/stats' onClick={() => null}>
                    {' '}
                    статистику
                  </Link>
                  , чтобы наглядно анализировать свои результаты!
                </p>
              </>
            )}

            <div className={styles.introActions}>
              <button className={styles.introActionsGo} onClick={() => navigate('/textbook')}>
                Gooo!
              </button>
              <a
                href='#enggoSection'
                className={clsx({
                  [styles.introActionsMore]: true,
                  ['_icon-arrow']: true,
                })}
                onClick={() => null}
              >
                Узнать больше об Enggo
              </a>
            </div>
          </div>
          <div className={styles.introDecoration}>
            <div className={styles.introDecorationDog}>
              <img src='./assets/svg/enggo.svg' alt='The dog Enggo' />
              <div className={styles.introDecorationText}>
                <span className={styles.introDecorationTextLine}>#ENGLISH</span>
                <span className={styles.introDecorationTextLine}>&amp;LOVE</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainSectionBg}>
          <img src='./assets/svg/wave.svg' alt='' />
        </div>
      </div>
    </section>
  )
}

export default SplashComponent
