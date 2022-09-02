import React, { useState } from 'react'
import Words from 'src/components/words/Words'
import { clsx } from 'src/utils/clsx'
import Detail from '../detail/Detail'
import Levels from '../levels/Levels'
import styles from './BookSubpage.module.scss'

const Pagination: React.FC<any> = (props) => {
  const { page, setPage } = props;

  const arrNumButtons = (): number[] => {
    if (page < 4) {
      return [ 1, 2, 3, 4, 5 ];
    } else if (page > 17) {
      return [ 16, 17, 18, 19, 20 ];
    } else {
      return [ page - 2, page - 1, +page, page + 1, page + 2 ];
    }
  };
  
  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  }
  
  const nextPage = () => {
    if (page < 20) setPage(page + 1);
  }

  const changePage = (numPage: number) => {
    setPage(numPage);
  }

  const pageList = arrNumButtons().map((numPage, ind) => 
    <li key={ind} className={styles.paginationItem}>
      <button className={clsx({
        [styles.paginationBtn]: true,
        [styles.paginationBtnActive]: numPage == page
      })} onClick={() => changePage(numPage)}>{numPage}</button>
    </li>
  );

  return (
    <div className={styles.pagination}>
      <button className={clsx({
        ['_icon-arrow']: true,
        [styles.paginationPrev]: true,
        [styles.paginationDisable]: page === 1
      })} onClick={prevPage}><span>Назад</span></button>
      <ul className={styles.paginationList}>
        {pageList}
      </ul> 
      <button className={clsx({
        ['_icon-arrow']: true,
        [styles.paginationNext]: true,
        [styles.paginationDisable]: page === 20
      })} onClick={nextPage}><span>Далее</span></button>
    </div>
  )
}

const BookSubpage: React.FC<any> = (props) => {
  const { activeLvl, setActiveLvl, activePage, setActivePage, levels } = props;

  const [ wordDetail, setWordDetail ] = useState('');

  // const activeLvl = 'Easy+';
  return (
    <section className={styles.book}>
      <section>
        <div className={globalThis.globalStyles.container}>
          <h2 className={globalThis.globalStyles.sectionTitle}>Сложность</h2>
          <Levels 
            activeLvl={activeLvl} 
            setActiveLvl={setActiveLvl} 
            levels={levels}
            activePage={activePage}
            setActivePage={setActivePage} />
        </div>
      </section>
      <section className={styles.bookSection}>
        <div className={globalThis.globalStyles.container}>
          <h2 className={globalThis.globalStyles.sectionTitle}>Все слова {levels[activeLvl - 1].title}</h2>
          <div className={styles.bookWrapper}>
            <div className={styles.bookWords}>
              <Words 
                page={activePage - 1} 
                lvl={activeLvl - 1}
                levels={levels}
                wordDetail={wordDetail}
                setWordDetail={setWordDetail} />
              <Pagination page={activePage} setPage={setActivePage} />
            </div>
            <Detail
              id={wordDetail}
              complete={false}
              hard={false} />
          </div>
        </div>
      </section>
    </section>
  )
}

export default BookSubpage
