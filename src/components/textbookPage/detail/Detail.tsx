import React, { useEffect, useState } from 'react'
import { clsx } from 'src/utils/clsx';
import styles from './Detail.module.scss'

const Detail: React.FC<any> = (props) => {
  const { wordEn, wordRu, transcription, 
    image, sound, valueEn, valueRu, 
    exampleEn, exampleRu } = props;
  const { complete, hard } = props;

  // TODO: сделать логику добавления в сложные
  const [isHard, setIsHard] = useState(hard);
  const hardHandler = () => {
    if (isHard === true) setIsHard(false)
    else setIsHard(true)
  }
  // TODO: сделать логику добавления в изученные
  const [isComplete, setIsComplete] = useState(complete);
  const completeHandler = () => {
    if (isComplete === true) setIsComplete(false)
    else setIsComplete(true)
  }
  // TODO: сделать управление озвучкой слова
  const [soundOn, setSoundOn] = useState(false);
  const soundHandler = () => {
    if (soundOn === true) setSoundOn(false)
    else setSoundOn(true)
  }

  return (
    <article className={clsx({
      [styles.detail]: true,
      [styles.detailComplete]: isComplete,
      [styles.detailHard]: isHard
    })}>
      <div className={styles.detailMain}>
        <h3 className={styles.detailTitle}>{wordEn}</h3>
        <button className={clsx({
          [styles.detailSound]: true,
          ['_icon-sound']: true,
          [styles.soundOn]: soundOn
        })} onClick={soundHandler}></button>
        <span className={styles.detailTranscription}>{transcription}</span>
        <p className={styles.detailTranslate}>{wordRu}</p>
        <hr className={styles.detailLine} />
      </div>
      <div className={styles.detailMore}>
        <ul className={styles.detailList}>
          <li className={styles.detailItem}>
            <h4 className={styles.detailSubtitle}>Значение слова</h4>
            <p className={styles.detailText}>{valueEn}</p>
            <p className={styles.detailText}>{valueRu}</p>
          </li>
          <li className={styles.detailItem}>
            <h4 className={styles.detailSubtitle}>Пример использования</h4>
            <p className={styles.detailText}>{exampleEn}</p>
            <p className={styles.detailText}>{exampleRu}</p>
          </li>
        </ul>
      </div>
      <div className={styles.detailImage}>
        <img src={image ?? 'assets/img/no-image.svg'} alt={wordEn} />
      </div>
      <div className={styles.detailControl}>
        <button className={clsx({
          [styles.controlBtn]: true,
          [styles.controlHard]: true,
          ['_icon-bookmark']: true
        })} onClick={hardHandler}>
          <span>Сложное</span>
        </button>
        <button className={clsx({
          [styles.controlBtn]: true,
          [styles.controlComplete]: true,
          ['_icon-star']: true
        })} onClick={completeHandler}>
          <span>Изучено</span>
        </button>
      </div>
    </article>
  )
}

export default Detail