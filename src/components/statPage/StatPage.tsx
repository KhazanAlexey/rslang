import React from 'react'
import styles from './StatPage.module.scss'

const StatPage: React.FC<any> = () => {
  return (
    <div className={styles.stat}>
      <section className={styles.statInfo}>
        <div className={globalThis.globalStyles.container}>
          <h1 className={globalThis.globalStyles.pageTitle}>Статистика</h1>
          <p className={styles.statDescr}>Скоро тут будет страница статистики</p>
        </div>
      </section>
    </div>
  )
}

export default StatPage
