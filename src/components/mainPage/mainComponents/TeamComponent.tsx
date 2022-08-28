import React from 'react'
import styles from './TeamComponent.scss'
import { clsx } from '../../../utils/clsx'

const TeamComponent: React.FC<any> = () => {
  return (
    <section className={styles.teamSection}>
      <div className={globalThis.globalStyles.container}>
        <div className={clsx({ [styles.teamSectionWrapper]: true })}>
          <div className={styles.teamMember}> Александр Баженов </div>
          <div className={styles.teamMember}> Алексей Хазан </div>
          <div className={styles.teamMember}> Федор Григорьев </div>
        </div>
      </div>
    </section>
  )
}

export default TeamComponent
