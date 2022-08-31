import React, { useEffect, useState } from 'react'
import styles from './TextbookPage.module.scss'
import Words from '../words/Words'
import Detail from './detail/Detail'
import Levels from './levels/Levels'
import { clsx } from 'src/utils/clsx'
import BookSubpage from './bookSubpage/BookSubpage'
import HardSubpage from './hardSubpage/HardSubpage'
import CompleteSubpage from './completeSubpage/CompleteSubpage'
import { Link } from 'react-router-dom'

const TextBookPage: React.FC<any> = () => {
  const [ activeLvl, setActiveLvl ] = useState(0);


  const [ subpage, setSubpage ] = useState('book');
  const menuItems = ['Учебник', 'Сложные слова', 'Изученные'];
  const menuHandler = (e) => {
    e.preventDefault();
    switch (e.target.innerText) {
      case menuItems[0]: 
        console.log('Учебник');
        setSubpage('book');
        break;
      case menuItems[1]: 
        console.log('Сложные слова');
        setSubpage('hard');
        break;
      case menuItems[2]: 
        console.log('Изученные');
        setSubpage('complete');
        break;
      default: 
        break;
    }
  };

  return (
    <div className={styles.textbook}>
      <section className={styles.textbookInfo}>
        <div className={globalThis.globalStyles.container}>
          <div className={styles.textbookWrapper}>
            <div className={styles.textbookMain}>
              <h1 className={globalThis.globalStyles.pageTitle}>Учебник</h1>
              <p className={clsx({
                [styles.textbookDescr]: true,
                [globalThis.globalStyles.pageDescr]: true
              })}>Здесь ты можешь найти все слова, которые Ингго подготовил для тебя и узнать больше о каждом слове.</p>
              <ul className={styles.textbookMenu}>
                <li>
                  <button className={clsx({
                    ['_icon-textbook']: true,
                    [styles.textbookSubpage]: true,
                    [styles.subpageActive]: subpage == 'book'
                  })} onClick={menuHandler}>{menuItems[0]}</button>
                </li>
                <li>
                  <button className={clsx({
                    ['_icon-bookmark']: true,
                    [styles.textbookSubpage]: true,
                    [styles.subpageActive]: subpage == 'hard'
                  })} onClick={menuHandler}>{menuItems[1]}</button>
                </li>
                <li>
                  <button className={clsx({
                    ['_icon-star']: true,
                    [styles.textbookSubpage]: true,
                    [styles.subpageActive]: subpage == 'complete'
                  })} onClick={menuHandler}>{menuItems[2]}</button>
                </li>
              </ul>
            </div>
            <div className={styles.textbookGames}>
              <Link
                className={styles.textbookGame}
                to='/games/savanna'
                onClick={() => null}
              ></Link>
              <Link
                className={styles.textbookGame}
                to='/games/savanna'
                onClick={() => null}
              ></Link>
              <img src="./assets/svg/enggo-textbook.svg" alt="Поиграй с Enggo" />
            </div>
          </div>
        </div>        
      </section>

      {subpage == 'book' && 
        <BookSubpage />
      }
      {subpage == 'hard' && 
        <HardSubpage />
      }
      {subpage == 'complete' && 
        <CompleteSubpage />
      }

      {/* <section>
        <div className={globalThis.globalStyles.container}>
          <h2 className={globalThis.globalStyles.sectionTitle}>Сложность</h2>
          <Levels />
        </div>  
      </section>
      <section className=''>  
        <div className={globalThis.globalStyles.container}>
          <Detail 
              wordEn='reusable' 
              wordRu='многоразового использования'
              transcription='[riúzəbl]'
              image=''
              sound=''
              valueEn='An object that is reusable can be utilized over and over again.'
              valueRu='Объект, который можно использовать повторно, можно использовать снова и снова'
              exampleEn='Saburo keeps his empty jelly jars because they are reusable for storing sewing supplies.'
              exampleRu='Сабуро хранит свои пустые желейные банки, потому что их можно использовать для хранения швейных принадлежностей'
              complete={false}
              hard={false} />
        </div>
        <h1>Учебник</h1>
        <Words />
      </section>*/}
      <section></section>
    </div>
  )
}

export default TextBookPage
