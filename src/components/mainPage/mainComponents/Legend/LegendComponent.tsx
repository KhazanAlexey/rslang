import React from 'react'
import styles from './LegendComponent.scss'
import { clsx } from '../../../../utils/clsx'

const LegendComponent: React.FC = () => {
  return (
    <section className={styles.legendSection}>
      <div className={globalThis.globalStyles.container}>
        <div className={clsx({ [styles.legendSectionWrapper]: true })}>
          <div className={styles.legendSectionPawLeft}>
            <img src='./assets/svg/paw.svg' alt='🐾' />
          </div>
          <div className={styles.legendSectionPawRight}>
            <img src='./assets/svg/paw.svg' alt='🐾' />
          </div>
          <p className={styles.legendSectionText}>
            <strong>Enggo</strong> - отличная возможность пополнить свой англоязычный словарь до
            уровня, комфортного для взаимопонимания
            <br />и общения с носителями языка.
          </p>
        </div>
      </div>
    </section>
  )
}

export default LegendComponent
