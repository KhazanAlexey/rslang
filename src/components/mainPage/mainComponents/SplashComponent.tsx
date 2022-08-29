import React from 'react'
import styles from './SplashComponent.scss'
import { clsx } from '../../../utils/clsx'
import { Link } from 'react-router-dom'

type PropsType = {
  auth: boolean
}

const SplashComponent: React.FC<any> = ({ auth }: PropsType) => {
  return (
    <section className={styles.mainSection}>
      <div className={globalThis.globalStyles.container}>
        <div className={clsx({ [styles.mainSectionWrapper]: true })}>
          <div className={styles.introText}>
            <h1 className={styles.introTextHeader}>Устал откладывать английский на&nbsp;потом?</h1>
            <h2 className={styles.introTextSubheader}>Попробуй поучить слова с Enggo!</h2>
            <p className={styles.introTextContent}>
              Ты не успеешь заметить, как выучишь почти 4000 английских слов, занимаясь всего по 20
              минут* в день
            </p>
            <blockquote className={styles.introTextQuote}>
              * - минимально рекомендуемая норма времени ежедневного обучения в Enggo
            </blockquote>
            <div className={styles.introActions}>
              <button className={styles.introActionsGo}>Gooo!</button>
              <Link
                to='/textbook'
                className={clsx({
                  [styles.introActionsMore]: true,
                  ['_icon-arrow']: true
                })}
                onClick={() => null}
              >
                Узнать больше об Enggo
              </Link>
            </div>
            {auth && <h1 className={styles.introTextHeader}>For authorized</h1>}
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
