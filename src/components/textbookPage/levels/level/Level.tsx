import React, { useEffect, useState } from 'react'
import { clsx } from 'src/utils/clsx';
import styles from './Level.module.scss'

const Level: React.FC<any> = (props) => {
  const { title, descr, lvl } = props;
  return (
    <li className={clsx({
      [styles.level]: true,
      [styles.active]: false
    })}>
      <button className={styles.levelButton}>
        <h3 className={styles.levelTitle}>{title}</h3>
        <p className={styles.levelDescr}>{descr}</p>
        <span className={styles.levelLvl}>{lvl}</span>
      </button>      
    </li>
  )
}

export default Level