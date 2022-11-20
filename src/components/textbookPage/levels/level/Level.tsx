import React, { useEffect, useState } from 'react'
import { LvlType } from 'src/models/IGamesSettings'
import { clsx } from 'src/utils/clsx'
import styles from './Level.module.scss'

type PropsType = LvlType & {
  activeLvl: number
  setActiveLvl: React.Dispatch<number>
  setActivePage: React.Dispatch<number>
}

const Level: React.FC<PropsType> = ({
  id,
  title,
  descr,
  lvl,
  bg,
  activeLvl,
  setActiveLvl,
  setActivePage,
}) => {
  const changeLvl = () => {
    if (!(id == activeLvl)) {
      setActivePage(1)
      setActiveLvl(id)
    }
  }
  return (
    <li
      className={clsx({
        [styles.level]: true,
        [styles.active]: id == activeLvl,
      })}
      style={{ background: bg }}
    >
      <button className={styles.levelButton} onClick={changeLvl}>
        <h3 className={styles.levelTitle}>{title}</h3>
        <p className={styles.levelDescr}>{descr}</p>
        <span className={styles.levelLvl}>{lvl}</span>
      </button>
    </li>
  )
}

export default Level
