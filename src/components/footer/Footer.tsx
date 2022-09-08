import React from 'react'
import { Link } from 'react-router-dom'
import { clsx } from 'src/utils/clsx'
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={globalThis.globalStyles.container}>
        <div className={clsx({ [styles.footerWrapper]: true })}>
          <div className={styles.footerFirst}>
            <div
              className={clsx({
                [styles.footerFirstLogo]: true,
                ['_icon-logo']: true,
              })}
            ></div>
            <div className={styles.footerFirstPhrase}>
              Онлайн-платформа для заучивания английских слов
            </div>
          </div>
          <div className={styles.footerSecond}>
            <div className={styles.footerSecondTeam}>
              <a
                href='https://github.com/KhazanAlexey'
                className={clsx({
                  ['_icon-github']: true,
                })}
              >
                Aliaxei Khazan
              </a>
              <a
                href='https://github.com/alexbazhen'
                className={clsx({
                  ['_icon-github']: true,
                })}
              >
                Aleksandr Bazhenov
              </a>
              <a
                href='https://github.com/tedgregory'
                className={clsx({
                  ['_icon-github']: true,
                })}
              >
                Fedor Grigoryev
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          Created in 2022 within the{' '}
          <a
            href='https://rs.school'
            className={clsx({
              ['_icon-rs']: true,
              [styles.footerBottomLink]: true,
            })}
          >
            {' '}
            RS School
          </a>{' '}
          JS-Frontend course JSFE2022Q1.
          <div className={styles.footerBottomBalloon}>
            <img src='./assets/svg/balloon.svg' alt='❤️️' />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
