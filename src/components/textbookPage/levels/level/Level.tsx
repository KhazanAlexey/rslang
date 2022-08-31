import React, { useEffect, useState } from 'react'
import { clsx } from 'src/utils/clsx';
import styles from './Level.module.scss'

const Level: React.FC<any> = (props) => {
  const { id, title, descr, lvl, activeLvl, setActiveLvl } = props;
  const changeLvl = () => {
    if (!(id == activeLvl)) setActiveLvl(id);
  }
  return (
    <li className={clsx({
      [styles.level]: true,
      [styles.active]: id == activeLvl
    })}>
      <button className={styles.levelButton} onClick={changeLvl}>
        <h3 className={styles.levelTitle}>{title}</h3>
        <p className={styles.levelDescr}>{descr}</p>
        <span className={styles.levelLvl}>{lvl}</span>
      </button>      
    </li>
  )
}

export default Level