import React from 'react'
import styles from './EnggoComponent.scss'
import { clsx } from '../../../../utils/clsx'
import ButtonCustom from 'src/components/common/button/Button'
import { Link, useNavigate } from 'react-router-dom'

const EnggoComponent: React.FC = () => {
  const navigate = useNavigate()
  return (
    <section className={styles.enggoSection} id='enggoSection'>
      <div className={globalThis.globalStyles.container}>
        <div className={clsx({ [styles.enggoSectionWrapper]: true })}>
          <div className={styles.enggoDecoration}>
            <div className={styles.enggoDecorationDog}>
              <img src='./assets/svg/enggo-chair.svg' alt='Sneaky Enggo' />
            </div>
          </div>
          <div className={styles.enggoText}>
            <h2 className={styles.enggoTextHeader}>Hi, guys, my name is Enggo</h2>
            <p className={styles.enggoTextContent}>
              Жизнерадостный пёс породы сиба-ину, готовый стать верным спутником по дороге к
              изучению английского языка - это всё про нашего героя Ингго!
            </p>
            <p className={styles.enggoTextContent}>
              Ингго - настоящий затейник и просто рыжий красавчик. Он обожает любознательных друзей
              и подготовил для них <Link to='/textbook'>учебник</Link>, состоящий из 3600 слов,
              распределив их по 6 разделам, от самых простых до самых сложных.
            </p>
            <div className={styles.enggoActions}>
              <ButtonCustom
                classes={clsx({
                  [styles.enggoActionsToTextbook]: true,
                  [styles.button]: true,
                  ['_icon-arrow']: true,
                })}
                onClick={() => navigate('/textbook')}
                text='Вау! Заглянуть в учебник!'
              />
            </div>
          </div>
        </div>
        <div className={styles.enggoSectionCopy}>
          <p>
            Ингго против нарушения авторских прав, и поэтому он хотел бы оставить ссылку на своего
            великолепного художника - @catalyststuff.
          </p>
        </div>
        <div className={styles.enggoSectionBg}>
          <img src='./assets/svg/wave.svg' alt='' />
        </div>
      </div>
    </section>
  )
}

export default EnggoComponent
