import React from 'react'
import Words from 'src/components/words/Words'
import { clsx } from 'src/utils/clsx'
import styles from './BookSubpage.module.scss'

const Pagination: React.FC<any> = (props) => {
  const { page, setPage } = props

  const arrNumButtons = (): number[] => {
    if (page < 4) {
      return [1, 2, 3, 4, 5]
    } else if (page > 27) {
      return [26, 27, 28, 29, 30]
    } else {
      return [page - 2, page - 1, +page, page + 1, page + 2]
    }
  }

  const prevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const nextPage = () => {
    if (page < 30) setPage(page + 1)
  }

  const changePage = (numPage: number) => {
    setPage(numPage)
  }

  const pageList = arrNumButtons().map((numPage, ind) => (
    <li key={ind} className={styles.paginationItem}>
      <button
        className={clsx({
          [styles.paginationBtn]: true,
          [styles.paginationBtnActive]: numPage == page,
        })}
        onClick={() => changePage(numPage)}
      >
        {numPage}
      </button>
    </li>
  ))

  return (
    <div className={styles.pagination}>
      <button
        className={clsx({
          ['_icon-arrow']: true,
          [styles.paginationPrev]: true,
          [styles.paginationDisable]: page === 1,
        })}
        onClick={prevPage}
      >
        <span>Назад</span>
      </button>
      <ul className={styles.paginationList}>{pageList}</ul>
      <button
        className={clsx({
          ['_icon-arrow']: true,
          [styles.paginationNext]: true,
          [styles.paginationDisable]: page === 30,
        })}
        onClick={nextPage}
      >
        <span>Далее</span>
      </button>
    </div>
  )
}

const BookSubpage: React.FC<any> = (props) => {
  const { activeLvl, bookWords, activePage, setActivePage, levels, isLoadingWords } =
    props

  const { wordDetail, setWordDetail } = props

  return (
    <div className={globalThis.globalStyles.bookWords}>
      <Words
        page={activePage - 1}
        lvl={activeLvl - 1}
        levels={levels}
        wordDetail={wordDetail}
        setWordDetail={setWordDetail}
        isLoadingWords={isLoadingWords}
        words={bookWords}
      />
      <Pagination page={activePage} setPage={setActivePage} />
    </div>
  )
}

export default BookSubpage
