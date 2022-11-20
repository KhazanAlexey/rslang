import React, { useEffect, useState } from 'react'
import { LvlType } from 'src/models/IGamesSettings'
import Level from './level/Level'
import styles from './Levels.module.scss'

type PropsType = {
  activeLvl: number
  setActiveLvl: React.Dispatch<number>
  activePage: number
  setActivePage: React.Dispatch<number>
  levels: LvlType[]
}

const Levels: React.FC<PropsType> = ({
  activeLvl,
  setActiveLvl,
  activePage,
  setActivePage,
  levels,
}) => {
  const levelList: JSX.Element[] = levels.map((level) => (
    <Level
      key={level.id}
      id={level.id}
      title={level.title}
      descr={level.descr}
      lvl={level.lvl}
      bg={level.bg}
      activeLvl={activeLvl}
      setActiveLvl={setActiveLvl}
      // activePage={activePage}
      setActivePage={setActivePage}
    />
  ))

  return <ul className={styles.levels}>{levelList}</ul>
}

export default Levels
