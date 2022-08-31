import React, { useState } from 'react'
import Words from 'src/components/words/Words'
import Detail from '../detail/Detail'
import Levels from '../levels/Levels'
import styles from './BookSubpage.module.scss'

const Pagination: React.FC<any> = (props) => {
  const { page, setPage } = props;

  const prevPage = () => {
    if (page >= 0) setPage(page - 1);
  }

  const nextPage = () => {
    setPage(page + 1);
  }

  return (
    <div className={styles.bookPagination}>
      <button className={styles.paginationPrev} onClick={prevPage}>Назад</button>
      {/* <ul className={styles.paginationList}>
        <li className={styles.paginationItem}>
          <button>1</button>
        </li>
        <li className={styles.paginationItem}>
          <button>2</button>
        </li>
        <li className={styles.paginationItem}>
          <button>3</button>
        </li>
        <li className={styles.paginationItem}>
          <button>4</button>
        </li>
        <li className={styles.paginationItem}>
          <button>5</button>
        </li>
      </ul> */}
      <button className={styles.paginationNext} onClick={nextPage}>Далее</button>
    </div>
  )
}

const BookSubpage: React.FC<any> = () => {
  const [ activePage, setActivePage ] = useState(0); // Отсюда отслеживаем активную страницу

  const activeLvl = 'Easy+';
  return (
    <section className={styles.book}>
      <section>
        <div className={globalThis.globalStyles.container}>
          <h2 className={globalThis.globalStyles.sectionTitle}>Сложность</h2>
          <Levels />
        </div>  
      </section>
      <section className={styles.bookSection}>  
        <div className={globalThis.globalStyles.container}>
          <h2 className={globalThis.globalStyles.sectionTitle}>Все слова {activeLvl}</h2>
          <div className={styles.bookWrapper}>
            <div>
              {/* Тут просто наглядный вывод номера страницы, это удалим, 
              как ререндер начнет работать */}
              {activePage}

              {/* --- !!!Этот компонент должен ререндериться при смене 
              активной страницы (группа пока по дефолту нулевая) --- */}
              <Words settings={{ page: activePage, lvl: 0 }} />

              {/* Здесь передаем в комп.пагинации изначально активную страницу 
              и управление ею*/}
              <Pagination page={activePage} setPage={setActivePage} /> 
            </div>
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
        </div>
      </section>
    </section>
  )
}

export default BookSubpage