import React, { useEffect, useState } from 'react'
import Level from './level/Level'
import styles from './Levels.module.scss'


const Levels: React.FC<any> = (props) => {
  const { activeLvl, setActiveLvl, activePage, setActivePage, levels } = props;
  /* const levels = [
    {id: 1, title: 'Easy', descr: 'До 600 слов', lvl: 'A1', bg: '#AFE2FF'},
    {id: 2, title: 'Easy+', descr: 'До 1200 слов', lvl: 'A2', bg: '#AFFFB3'},
    {id: 3, title: 'Middle', descr: 'До 1800 слов', lvl: 'B1', bg: '#FFF2AF'},
    {id: 4, title: 'Middle+', descr: 'До 2400 слов', lvl: 'B2', bg: '#FFCCAF'},
    {id: 5, title: 'Hard', descr: 'До 3000 слов', lvl: 'C1', bg: '#EAAFFF'},
    {id: 6, title: 'Hard+', descr: 'До 3600 слов', lvl: 'C2', bg: '#BAAFFF'},
  ]; */
  const levelList: any = levels.map((level) => 
    <Level 
      key={level.id}
      id={level.id}
      title={level.title} 
      descr={level.descr} 
      lvl={level.lvl}
      bg={level.bg}
      activeLvl={activeLvl} 
      setActiveLvl={setActiveLvl}
      activePage={activePage}
      setActivePage={setActivePage} />
  );

  return (
    <ul className={styles.levels}>
      {levelList}
    </ul>
  )
}

export default Levels