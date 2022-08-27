import React from 'react';
import styles from './SplashComponent.scss'
import { clsx } from '../../../utils/clsx'
import { Link } from 'react-router-dom'

type PropsType = {
  auth: boolean
}

export function SplashComponent ({ auth }:PropsType) {
 
  return (
    <section className={styles.mainSection}>
      <div className={globalThis.globalStyles.container}>
      <div className={styles.mainSectionBg}>
        <img src='./assets/svg/wave.svg' alt="" />
      </div>
        <div className={clsx({[styles.mainSectionWrapper]: true})}>
          <div className={styles.introText}>
            <h1 className={styles.introTextHeader}>
             Устал откладывать английский на потом?            
            </h1>
            <h2 className={styles.introTextSubheader}>
             Попробуй учить слова с Enggo!
            </h2>
            <p className={styles.introTextContent}>
            Ты не успеешь заметить, как выучишь почти 4000 английских слов, занимаясь всего по 20 минут* в день
            </p>
            <blockquote className={styles.introTextQuote}>
            * - минимально рекомендуемая норма времени ежедневного обучения в Enggo
            </blockquote>
            <div className={styles.introActions}>
              <button className={styles.introActionsGo}>EngGo!</button>
              <Link to='/textbook' className={clsx({
                [styles.introActionsMore]: true
                })} onClick={() => null}>
                  Узнать больше об EngGo
              </Link>
            </div>
          {auth &&
            <h1 className={styles.introTextHeader}>
              For authorized            
            </h1>
          }
          </div>
          <div className={styles.introDecoration}>
            <div className={styles.introDecorationText}>
              <span className={styles.introDecorationTextLine}>#ENGLISH</span>
              <span className={styles.introDecorationTextLine}>&amp;LOVE</span>
            </div>
            <div className={styles.introDecorationDog}>
              <img src='./assets/svg/enggo.svg' alt="ENGGO" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
